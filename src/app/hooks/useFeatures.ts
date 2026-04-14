import { useState, useEffect, useCallback } from "react";
import { Product, OrderStatus } from "../data/mallData";

// ─── Interfaces ───

export interface Review {
  id?: number;
  name: string;
  text: string;
  rating: number;
  date: string;
}

export interface UserData {
  name: string;
  email: string;
  role: "visitor" | "admin";
  address?: string;
  phone?: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    status: OrderStatus;
    date: string;
    cancellationReason?: string;
    updates?: OrderUpdate[];
}

export interface OrderUpdate {
  id: string;
  label: string;
  note: string;
  timestamp: string;
  tone: "info" | "success" | "warning" | "danger";
}

const WISHLIST_STORAGE_KEY = "mall_wishlist";
const CART_STORAGE_KEY = "mall_cart";
const USER_SESSION_STORAGE_KEY = "mall_user_session";
const LEGACY_USER_STORAGE_KEY = "mall_user";
const ORDER_STORAGE_KEY = "mall_orders";
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 Hours

type StoredUserSession = {
  user: UserData;
  expiresAt: number;
};

function isStoredUserSession(value: unknown): value is StoredUserSession {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<StoredUserSession>;
  return !!candidate.user && typeof candidate.expiresAt === "number";
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

// ─── Wishlist Hook ───
export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const userSession = safeParse<StoredUserSession | null>(localStorage.getItem(USER_SESSION_STORAGE_KEY), null);
    const userEmail = userSession?.user?.email;
    const key = userEmail ? `${WISHLIST_STORAGE_KEY}_${userEmail}` : WISHLIST_STORAGE_KEY;
    setWishlist(safeParse<string[]>(localStorage.getItem(key), []));
  }, []);

  useEffect(() => {
    const userSession = safeParse<StoredUserSession | null>(localStorage.getItem(USER_SESSION_STORAGE_KEY), null);
    const userEmail = userSession?.user?.email;
    const key = userEmail ? `${WISHLIST_STORAGE_KEY}_${userEmail}` : WISHLIST_STORAGE_KEY;
    localStorage.setItem(key, JSON.stringify(wishlist));
  }, [wishlist]);

  const toggle = useCallback((slug: string) => {
    setWishlist(prev => {
      return prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug];
    });
  }, []);

  return { wishlist, toggle, count: wishlist.length };
}

// ─── Cart Hook (Marketplace Ready) ───
export function useCart() {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const userSession = safeParse<StoredUserSession | null>(localStorage.getItem(USER_SESSION_STORAGE_KEY), null);
        const userEmail = userSession?.user?.email;
        const key = userEmail ? `${CART_STORAGE_KEY}_${userEmail}` : CART_STORAGE_KEY;
        setCart(safeParse<CartItem[]>(localStorage.getItem(key), []));
    }, []);

    useEffect(() => {
        const userSession = safeParse<StoredUserSession | null>(localStorage.getItem(USER_SESSION_STORAGE_KEY), null);
        const userEmail = userSession?.user?.email;
        const key = userEmail ? `${CART_STORAGE_KEY}_${userEmail}` : CART_STORAGE_KEY;
        localStorage.setItem(key, JSON.stringify(cart));
    }, [cart]);

    const addToCart = useCallback((product: Product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            return existing
                ? prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
                : [...prev, { ...product, quantity: 1 }];
        });
    }, []);

    const removeFromCart = useCallback((id: string) => {
        setCart(prev => {
            return prev.filter(item => item.id !== id);
        });
    }, []);

    const updateQuantity = useCallback((id: string, delta: number) => {
        setCart(prev => {
            return prev.map(item => {
                if (item.id === id) {
                    const q = Math.max(1, item.quantity + delta);
                    return { ...item, quantity: q };
                }
                return item;
            });
        });
    }, []);

    const clearCart = useCallback(() => {
        setCart([]);
        localStorage.removeItem(CART_STORAGE_KEY);
    }, []);

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    return { cart, addToCart, removeFromCart, updateQuantity, clearCart, total, count };
}

// ─── Order Hook (Live Tracking Simulation) ───
export function useOrders() {
    const [orders, setOrders] = useState<Order[]>([]);

    const appendUpdateIfMissing = useCallback((order: Order, label: string, tone: OrderUpdate["tone"], note: string) => {
        const updates = order.updates || [];
        if (updates.some((update) => update.label === label)) return order;
        return {
            ...order,
            updates: [
                ...updates,
                {
                    id: crypto.randomUUID(),
                    label,
                    tone,
                    note,
                    timestamp: new Date().toISOString(),
                },
            ],
        };
    }, []);

    const normalizeOrder = useCallback((order: Order): Order => {
        const baseUpdates = order.updates && order.updates.length > 0
            ? order.updates
            : [
                {
                    id: crypto.randomUUID(),
                    label: "Order Placed",
                    note: "Your order has been placed successfully.",
                    timestamp: order.date,
                    tone: "info" as const,
                },
            ];
        return { ...order, updates: baseUpdates };
    }, []);

    const evolveOrderStatus = useCallback((order: Order): Order => {
        if (order.status === "Cancelled" || order.status === "Delivered") return order;
        const orderAgeMinutes = (Date.now() - new Date(order.date).getTime()) / 60000;
        let nextStatus: OrderStatus = order.status;
        if (orderAgeMinutes >= 12) nextStatus = "Delivered";
        else if (orderAgeMinutes >= 8) nextStatus = "Out for Delivery";
        else if (orderAgeMinutes >= 5) nextStatus = "Shipped";
        else if (orderAgeMinutes >= 2) nextStatus = "Processing";
        else nextStatus = "Pending";

        let nextOrder = order;
        if (nextStatus !== order.status) {
            nextOrder = { ...nextOrder, status: nextStatus };
        }

        if (nextStatus === "Processing") {
            nextOrder = appendUpdateIfMissing(nextOrder, "Processing", "info", "Payment verified and items are being prepared.");
        } else if (nextStatus === "Shipped") {
            nextOrder = appendUpdateIfMissing(nextOrder, "Shipped", "warning", "Your package has left the UB City dispatch center.");
        } else if (nextStatus === "Out for Delivery") {
            nextOrder = appendUpdateIfMissing(nextOrder, "Out for Delivery", "warning", "Delivery partner is on the way with your order.");
        } else if (nextStatus === "Delivered") {
            nextOrder = appendUpdateIfMissing(nextOrder, "Delivered", "success", "Order delivered successfully.");
        }

        return nextOrder;
    }, [appendUpdateIfMissing]);

    useEffect(() => {
        const userSession = safeParse<StoredUserSession | null>(localStorage.getItem(USER_SESSION_STORAGE_KEY), null);
        const userEmail = userSession?.user?.email;
        const key = userEmail ? `${ORDER_STORAGE_KEY}_${userEmail}` : ORDER_STORAGE_KEY;
        const savedOrders = safeParse<Order[]>(localStorage.getItem(key), []);
        const normalized = savedOrders.map(normalizeOrder).map(evolveOrderStatus);
        setOrders(normalized);
    }, [evolveOrderStatus, normalizeOrder]);

    useEffect(() => {
        const userSession = safeParse<StoredUserSession | null>(localStorage.getItem(USER_SESSION_STORAGE_KEY), null);
        const userEmail = userSession?.user?.email;
        const key = userEmail ? `${ORDER_STORAGE_KEY}_${userEmail}` : ORDER_STORAGE_KEY;
        localStorage.setItem(key, JSON.stringify(orders));
    }, [orders]);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setOrders((prev) => prev.map((order) => evolveOrderStatus(order)));
        }, 60000);
        return () => window.clearInterval(timer);
    }, [evolveOrderStatus]);

    const placeOrder = useCallback((items: CartItem[], total: number) => {
        const newOrder: Order = {
            id: `MOA-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            items,
            total,
            status: "Pending",
            date: new Date().toISOString(),
            updates: [
                {
                    id: crypto.randomUUID(),
                    label: "Order Placed",
                    note: `${items.length} product(s) confirmed and payment is pending verification.`,
                    timestamp: new Date().toISOString(),
                    tone: "info",
                },
            ],
        };
        setOrders(prev => {
            return [newOrder, ...prev];
        });
        return newOrder.id;
    }, []);

    const cancelOrder = useCallback((id: string, reason: string) => {
        setOrders(prev => {
            const next = prev.map((order) => {
                if (order.id !== id) return order;
                const cancelledOrder: Order = { ...order, status: "Cancelled" as OrderStatus, cancellationReason: reason };
                return appendUpdateIfMissing(cancelledOrder, "Cancelled", "danger", `Order cancelled: ${reason}`);
            });
            return next;
        });
    }, [appendUpdateIfMissing]);

    const isActiveOrder = (status: OrderStatus) =>
        status === "Pending" || status === "Processing" || status === "Shipped" || status === "Out for Delivery";

    const orderStats = {
        total: orders.length,
        active: orders.filter((order) => isActiveOrder(order.status)).length,
        cancelled: orders.filter((order) => order.status === "Cancelled").length,
        delivered: orders.filter((order) => order.status === "Delivered").length,
    };

    return { orders, placeOrder, cancelOrder, orderStats };
}

// ─── Recently Viewed Stores ───
export function useRecentlyViewed() {
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("mall_recent");
    if (saved) setRecent(JSON.parse(saved));
  }, []);

  const addViewed = useCallback((slug: string) => {
    setRecent(prev => {
      const filtered = prev.filter(s => s !== slug);
      const next = [slug, ...filtered].slice(0, 8);
      localStorage.setItem("mall_recent", JSON.stringify(next));
      return next;
    });
  }, []);

  return { recent, addViewed };
}

// ─── Newsletter Subscription ───
export function useNewsletter() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [email, setEmail] = useState("");

  const subscribe = useCallback(async (emailInput: string) => {
    setStatus("loading");
    await new Promise(r => setTimeout(r, 1500));
    
    if (emailInput && emailInput.includes("@")) {
      setStatus("success");
      const subs = JSON.parse(localStorage.getItem("mall_subscribers") || "[]");
      subs.push({ email: emailInput, date: new Date().toISOString() });
      localStorage.setItem("mall_subscribers", JSON.stringify(subs));
    } else {
      setStatus("error");
    }
  }, []);

  return { status, email, setEmail, subscribe };
}

// ─── User Session Management ───
export function useUserSession() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const parsedSession = safeParse<StoredUserSession | UserData | null>(localStorage.getItem(USER_SESSION_STORAGE_KEY), null);
    const parsedLegacy = safeParse<StoredUserSession | UserData | null>(localStorage.getItem(LEGACY_USER_STORAGE_KEY), null);
    const parsed = parsedSession || parsedLegacy;
    if (!parsed) {
      setUser(null);
      return;
    }

    if (isStoredUserSession(parsed)) {
      if (Date.now() >= parsed.expiresAt) {
        localStorage.removeItem(USER_SESSION_STORAGE_KEY);
        localStorage.removeItem(LEGACY_USER_STORAGE_KEY);
        setUser(null);
        return;
      }
      setUser(parsed.user);
      localStorage.setItem(USER_SESSION_STORAGE_KEY, JSON.stringify(parsed));
      localStorage.removeItem(LEGACY_USER_STORAGE_KEY);
      return;
    }

    // Backward compatibility: migrate old user-only payload to expiring session.
    setUser(parsed);
    localStorage.setItem(
      USER_SESSION_STORAGE_KEY,
      JSON.stringify({ user: parsed, expiresAt: Date.now() + SESSION_TTL_MS } as StoredUserSession),
    );
    localStorage.removeItem(LEGACY_USER_STORAGE_KEY);
  }, []);

  useEffect(() => {
    if (user) {
      const payload: StoredUserSession = {
        user,
        expiresAt: Date.now() + SESSION_TTL_MS,
      };
      localStorage.setItem(USER_SESSION_STORAGE_KEY, JSON.stringify(payload));
      localStorage.removeItem(LEGACY_USER_STORAGE_KEY);
    } else {
      localStorage.removeItem(USER_SESSION_STORAGE_KEY);
      localStorage.removeItem(LEGACY_USER_STORAGE_KEY);
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const timer = window.setInterval(() => {
      const parsed = safeParse<StoredUserSession | null>(localStorage.getItem(USER_SESSION_STORAGE_KEY), null);
      if (!parsed || Date.now() >= parsed.expiresAt) {
        setUser(null);
        localStorage.removeItem(USER_SESSION_STORAGE_KEY);
        localStorage.removeItem(LEGACY_USER_STORAGE_KEY);
      }
    }, 60000);
    return () => window.clearInterval(timer);
  }, [user]);

  const login = useCallback((userData: UserData) => {
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return { user, login, logout, isLoggedIn: !!user };
}

// ─── Cookie Consent ───
export function useCookieConsent() {
  const [consented, setConsented] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("mall_cookies");
    setConsented(saved === "accepted");
  }, []);

  const accept = useCallback(() => {
    localStorage.setItem("mall_cookies", "accepted");
    setConsented(true);
  }, []);

  return { consented, accept };
}

// ─── Store Reviews System ───
export function useReviews(storeSlug: string) {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const allReviews = JSON.parse(localStorage.getItem("mall_reviews") || "{}");
    setReviews(allReviews[storeSlug] || []);
  }, [storeSlug]);

  const addReview = useCallback((review: Omit<Review, "id" | "date">) => {
    const allReviews = JSON.parse(localStorage.getItem("mall_reviews") || "{}");
    if (!allReviews[storeSlug]) allReviews[storeSlug] = [];
    const newReview: Review = { ...review, id: Date.now(), date: new Date().toISOString() };
    allReviews[storeSlug].push(newReview);
    localStorage.setItem("mall_reviews", JSON.stringify(allReviews));
    setReviews(allReviews[storeSlug]);
  }, [storeSlug]);

  return { reviews, addReview, count: reviews.length };
}
