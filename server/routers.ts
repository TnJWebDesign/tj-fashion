import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-12-27.acacia",
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // Products
  products: router({
    list: publicProcedure
      .input(z.object({
        collection: z.string().optional(),
        sortBy: z.enum(["price-asc", "price-desc", "newest"]).optional(),
      }))
      .query(async ({ input }) => {
        return await db.getProducts(input);
      }),

    featured: publicProcedure
      .input(z.object({ limit: z.number().default(6) }))
      .query(async ({ input }) => {
        return await db.getFeaturedProducts(input.limit);
      }),

    bySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getProductBySlug(input.slug);
      }),

    byId: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getProductById(input.id);
      }),
  }),

  // Cart
  cart: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      const items = await db.getCartItems(ctx.user.id);
      const enriched = await Promise.all(
        items.map(async (item) => {
          const product = await db.getProductById(item.productId);
          return { ...item, product };
        })
      );
      return enriched;
    }),

    add: protectedProcedure
      .input(z.object({
        productId: z.number(),
        size: z.string(),
        quantity: z.number().min(1),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.addToCart(ctx.user.id, input.productId, input.size, input.quantity);
        return { success: true };
      }),

    remove: protectedProcedure
      .input(z.object({ cartItemId: z.number() }))
      .mutation(async ({ input }) => {
        await db.removeFromCart(input.cartItemId);
        return { success: true };
      }),

    updateQuantity: protectedProcedure
      .input(z.object({ cartItemId: z.number(), quantity: z.number() }))
      .mutation(async ({ input }) => {
        await db.updateCartItemQuantity(input.cartItemId, input.quantity);
        return { success: true };
      }),

    clear: protectedProcedure.mutation(async ({ ctx }) => {
      await db.clearCart(ctx.user.id);
      return { success: true };
    }),
  }),

  // Checkout
  checkout: router({
    createPaymentIntent: protectedProcedure
      .input(z.object({
        items: z.array(z.object({
          productId: z.number(),
          name: z.string(),
          size: z.string(),
          quantity: z.number(),
          price: z.string(),
        })),
        total: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        try {
          const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(parseFloat(input.total) * 100),
            currency: "usd",
            metadata: {
              userId: ctx.user.id.toString(),
              items: JSON.stringify(input.items),
            },
          });

          return {
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
          };
        } catch (error) {
          console.error("Stripe error:", error);
          throw new Error("Failed to create payment intent");
        }
      }),

    confirmOrder: protectedProcedure
      .input(z.object({
        paymentIntentId: z.string(),
        items: z.array(z.object({
          productId: z.number(),
          name: z.string(),
          size: z.string(),
          quantity: z.number(),
          price: z.string(),
        })),
        total: z.string(),
        shippingAddress: z.object({
          name: z.string(),
          email: z.string(),
          address: z.string(),
          city: z.string(),
          state: z.string(),
          zip: z.string(),
          country: z.string(),
        }),
      }))
      .mutation(async ({ ctx, input }) => {
        try {
          const paymentIntent = await stripe.paymentIntents.retrieve(input.paymentIntentId);

          if (paymentIntent.status !== "succeeded") {
            throw new Error("Payment not confirmed");
          }

          const order = await db.createOrder(ctx.user.id, {
            stripePaymentId: input.paymentIntentId,
            status: "completed",
            total: input.total,
            items: input.items,
            shippingAddress: input.shippingAddress,
          });

          await db.clearCart(ctx.user.id);

          return { success: true, orderId: order };
        } catch (error) {
          console.error("Order confirmation error:", error);
          throw new Error("Failed to confirm order");
        }
      }),
  }),

  // Orders
  orders: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserOrders(ctx.user.id);
    }),

    get: protectedProcedure
      .input(z.object({ orderId: z.number() }))
      .query(async ({ ctx, input }) => {
        const order = await db.getOrder(input.orderId);
        if (!order || order.userId !== ctx.user.id) {
          throw new Error("Order not found");
        }
        return order;
      }),
  }),
});

export type AppRouter = typeof appRouter;
