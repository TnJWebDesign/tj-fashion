import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, products, cartItems, orders, Product, CartItem, Order } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ── PRODUCTS ──────────────────────────────────────────────

export async function getProducts(filters?: { collection?: string; sortBy?: "price-asc" | "price-desc" | "newest" }) {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(products);

  if (filters?.collection) {
    query = query.where(eq(products.collection, filters.collection));
  }

  if (filters?.sortBy === "price-asc") {
    query = query.orderBy(products.price);
  } else if (filters?.sortBy === "price-desc") {
    query = query.orderBy(desc(products.price));
  } else if (filters?.sortBy === "newest") {
    query = query.orderBy(desc(products.createdAt));
  }

  return (await query) as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getProductById(id: number): Promise<Product | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getFeaturedProducts(limit = 6) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(products).where(eq(products.featured, true)).limit(limit);
}

// ── CART ───────────────────────────────────────────────────

export async function getCartItems(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(cartItems).where(eq(cartItems.userId, userId));
}

export async function addToCart(userId: number, productId: number, size: string, quantity: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await db.select().from(cartItems).where(
    and(
      eq(cartItems.userId, userId),
      eq(cartItems.productId, productId),
      eq(cartItems.size, size)
    )
  ).limit(1);

  if (existing.length > 0) {
    return await db.update(cartItems).set({
      quantity: existing[0]!.quantity + quantity,
      updatedAt: new Date(),
    }).where(eq(cartItems.id, existing[0]!.id));
  } else {
    return await db.insert(cartItems).values({
      userId,
      productId,
      size,
      quantity,
    });
  }
}

export async function removeFromCart(cartItemId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.delete(cartItems).where(eq(cartItems.id, cartItemId));
}

export async function updateCartItemQuantity(cartItemId: number, quantity: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  if (quantity <= 0) {
    return await removeFromCart(cartItemId);
  }

  return await db.update(cartItems).set({
    quantity,
    updatedAt: new Date(),
  }).where(eq(cartItems.id, cartItemId));
}

export async function clearCart(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.delete(cartItems).where(eq(cartItems.userId, userId));
}

// ── ORDERS ────────────────────────────────────────────────

export async function createOrder(userId: number, orderData: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.insert(orders).values({
    userId,
    ...orderData,
  });
}

export async function getOrder(orderId: number): Promise<Order | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserOrders(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
}

export async function updateOrderStatus(orderId: number, status: "pending" | "completed" | "failed" | "cancelled") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.update(orders).set({
    status,
    updatedAt: new Date(),
  }).where(eq(orders.id, orderId));
}
