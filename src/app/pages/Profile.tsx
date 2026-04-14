import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import {
  User,
  MapPin,
  CreditCard,
  Bell,
  ShieldCheck,
  History,
  Package,
  Sparkles,
  Phone,
  Mail,
  Save,
  PlusCircle,
  Trash2,
  LogOut,
} from "lucide-react";
import { useOrders, useUserSession } from "../hooks/useFeatures";
import { toast } from "sonner";
import { formatINR } from "../utils/currency";

type AddressBookItem = {
  id: string;
  label: string;
  line1: string;
  city: string;
  pin: string;
};

type PaymentMethodItem = {
  id: string;
  type: "card" | "upi";
  value: string;
};

const ADDRESS_KEY = "mall_profile_addresses";
const PAYMENT_KEY = "mall_profile_payments";
const PREFS_KEY = "mall_profile_preferences";
const PROFILE_PHOTO_KEY = "mall_profile_photo";
const PROFILE_FORM_KEY = "mall_profile_form";

function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function Profile() {
  const { orders, cancelOrder, orderStats } = useOrders();
  const { user, login, logout } = useUserSession();
  const activeStatuses = ["Pending", "Processing", "Shipped", "Out for Delivery"] as const;

  const [profileForm, setProfileForm] = useState({
    name: user?.name || "UB City Member",
    email: user?.email || "member@ubcity.com",
    phone: user?.phone || "",
  });

  const [addressBook, setAddressBook] = useState<AddressBookItem[]>(() =>
    loadJson<AddressBookItem[]>(ADDRESS_KEY, []),
  );
  const [payments, setPayments] = useState<PaymentMethodItem[]>(() =>
    loadJson<PaymentMethodItem[]>(PAYMENT_KEY, []),
  );
  const [preferences, setPreferences] = useState(() =>
    loadJson(PREFS_KEY, {
      orderUpdates: true,
      promoAlerts: true,
      locationOffers: true,
    }),
  );
  const [profilePhoto, setProfilePhoto] = useState<string>(() => localStorage.getItem(PROFILE_PHOTO_KEY) || "");

  const [newAddress, setNewAddress] = useState({ label: "", line1: "", city: "", pin: "" });
  const [newPayment, setNewPayment] = useState<{ type: "card" | "upi"; value: string }>({ type: "card", value: "" });
  const [cancelReasonByOrder, setCancelReasonByOrder] = useState<Record<string, string>>({});
  const [orderFilter, setOrderFilter] = useState<"all" | "active" | "cancelled" | "delivered">("all");
  const profileSectionRef = useRef<HTMLElement | null>(null);
  const securitySectionRef = useRef<HTMLElement | null>(null);
  const preferenceSectionRef = useRef<HTMLElement | null>(null);
  const orderSectionRef = useRef<HTMLElement | null>(null);

  const visibleOrders = useMemo(() => {
    if (orderFilter === "active") return orders.filter((order) => activeStatuses.includes(order.status as (typeof activeStatuses)[number]));
    if (orderFilter === "cancelled") return orders.filter((order) => order.status === "Cancelled");
    if (orderFilter === "delivered") return orders.filter((order) => order.status === "Delivered");
    return orders;
  }, [activeStatuses, orderFilter, orders]);

  const getOrderProgress = (status: string) => {
    switch (status) {
      case "Pending":
        return 20;
      case "Processing":
        return 40;
      case "Shipped":
        return 65;
      case "Out for Delivery":
        return 85;
      case "Delivered":
        return 100;
      case "Cancelled":
        return 100;
      default:
        return 0;
    }
  };

  useEffect(() => {
    const savedProfile = loadJson(PROFILE_FORM_KEY, null as { name: string; email: string; phone: string } | null);
    if (savedProfile) {
      setProfileForm(savedProfile);
      return;
    }
    if (user) {
      setProfileForm({
        name: user.name || "UB City Member",
        email: user.email || "member@ubcity.com",
        phone: user.phone || "",
      });
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(PROFILE_FORM_KEY, JSON.stringify(profileForm));
  }, [profileForm]);

  useEffect(() => {
    if (window.location.hash === "#orders") {
      orderSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const saveProfile = () => {
    login({
      name: profileForm.name.trim() || "UB City Member",
      email: profileForm.email.trim() || "member@ubcity.com",
      phone: profileForm.phone.trim(),
      role: user?.role || "visitor",
    });
    toast.success("Profile updated");
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    window.location.href = "/login";
  };

  const addAddress = () => {
    if (!newAddress.label || !newAddress.line1 || !newAddress.city || !newAddress.pin) {
      toast.error("Fill all address fields");
      return;
    }
    const next = [...addressBook, { id: crypto.randomUUID(), ...newAddress }];
    setAddressBook(next);
    localStorage.setItem(ADDRESS_KEY, JSON.stringify(next));
    setNewAddress({ label: "", line1: "", city: "", pin: "" });
    toast.success("Address added");
  };

  const removeAddress = (id: string) => {
    const next = addressBook.filter((item) => item.id !== id);
    setAddressBook(next);
    localStorage.setItem(ADDRESS_KEY, JSON.stringify(next));
  };

  const addPaymentMethod = () => {
    if (!newPayment.value.trim()) {
      toast.error("Enter card/UPI details");
      return;
    }
    const next = [...payments, { id: crypto.randomUUID(), ...newPayment }];
    setPayments(next);
    localStorage.setItem(PAYMENT_KEY, JSON.stringify(next));
    setNewPayment({ type: "card", value: "" });
    toast.success("Payment method saved");
  };

  const removePaymentMethod = (id: string) => {
    const next = payments.filter((item) => item.id !== id);
    setPayments(next);
    localStorage.setItem(PAYMENT_KEY, JSON.stringify(next));
  };

  const togglePreference = (key: "orderUpdates" | "promoAlerts" | "locationOffers") => {
    const next = { ...preferences, [key]: !preferences[key] };
    setPreferences(next);
    localStorage.setItem(PREFS_KEY, JSON.stringify(next));
  };

  const handleCancelOrder = (orderId: string) => {
    const reason = cancelReasonByOrder[orderId]?.trim();
    if (!reason) {
      toast.error("Add cancellation reason");
      return;
    }
    cancelOrder(orderId, reason);
    toast.error(`Order ${orderId} cancelled`);
  };

  const handleProfilePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      setProfilePhoto(result);
      localStorage.setItem(PROFILE_PHOTO_KEY, result);
      toast.success("Profile photo updated");
    };
    reader.readAsDataURL(file);
  };

  const removeProfilePhoto = () => {
    setProfilePhoto("");
    localStorage.removeItem(PROFILE_PHOTO_KEY);
    toast.success("Profile photo removed");
  };

  const jumpToSection = (section: "profile" | "security" | "notifications" | "orders") => {
    const sectionMap = {
      profile: profileSectionRef.current,
      security: securitySectionRef.current,
      notifications: preferenceSectionRef.current,
      orders: orderSectionRef.current,
    };
    sectionMap[section]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="page-wrapper bg-page min-h-screen pt-20 md:pt-40">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 pb-20 md:pb-28 space-y-6 md:space-y-8">
        <section ref={profileSectionRef} className="glass-pane rounded-[2rem] p-6 md:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 md:gap-6 mb-6">
            <div className="flex items-center gap-3 md:gap-4 min-w-0">
              <div className="w-16 h-16 rounded-2xl bg-accent/15 border border-accent/25 overflow-hidden flex items-center justify-center">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-7 h-7 text-accent" />
                )}
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-black font-['Outfit'] break-words">{profileForm.name}</h2>
                <p className="text-[color:var(--text-dim)] text-sm break-all">{profileForm.email}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label className="px-3 md:px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[9px] md:text-[10px] font-black uppercase tracking-[0.14em] md:tracking-[0.18em] cursor-pointer hover:border-accent transition-all">
                Add Photo
                <input type="file" accept="image/*" className="hidden" onChange={handleProfilePhotoChange} />
              </label>
              {profilePhoto && (
                <button
                  onClick={removeProfilePhoto}
                  className="px-3 md:px-4 py-2 rounded-full border border-red-500/30 text-red-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.14em] md:tracking-[0.18em]"
                >
                  Remove
                </button>
              )}
              <button onClick={saveProfile} className="btn-luxe !py-2.5 !px-4 md:!px-6 !text-[9px]">
                <Save className="w-4 h-4 mr-1" /> Save Profile
              </button>
              <button
                onClick={handleLogout}
                className="hidden md:inline-flex items-center gap-1 px-3 md:px-4 py-2 rounded-full border border-red-500/30 text-red-300 text-[9px] md:text-[10px] font-black uppercase tracking-[0.14em] md:tracking-[0.18em]"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <label className="glass-pane rounded-2xl p-4 border border-white/10">
              <p className="text-[10px] uppercase tracking-[0.2em] mb-2 text-[color:var(--text-dim)] inline-flex items-center gap-1"><User className="w-3 h-3" /> Name</p>
              <input value={profileForm.name} onChange={(e) => setProfileForm((p) => ({ ...p, name: e.target.value }))} className="w-full bg-transparent outline-none text-[color:var(--text-main)]" />
            </label>
            <label className="glass-pane rounded-2xl p-4 border border-white/10">
              <p className="text-[10px] uppercase tracking-[0.2em] mb-2 text-[color:var(--text-dim)] inline-flex items-center gap-1"><Mail className="w-3 h-3" /> Email</p>
              <input value={profileForm.email} onChange={(e) => setProfileForm((p) => ({ ...p, email: e.target.value }))} className="w-full bg-transparent outline-none text-[color:var(--text-main)]" />
            </label>
            <label className="glass-pane rounded-2xl p-4 border border-white/10">
              <p className="text-[10px] uppercase tracking-[0.2em] mb-2 text-[color:var(--text-dim)] inline-flex items-center gap-1"><Phone className="w-3 h-3" /> Phone</p>
              <input value={profileForm.phone} onChange={(e) => setProfileForm((p) => ({ ...p, phone: e.target.value }))} className="w-full bg-transparent outline-none text-[color:var(--text-main)]" />
            </label>
          </div>
        </section>

        <section ref={securitySectionRef} className="grid lg:grid-cols-2 gap-6">
          <div className="glass-pane rounded-[2rem] p-6">
            <h3 className="text-xl font-black font-['Outfit'] mb-4 inline-flex items-center gap-2"><MapPin className="w-5 h-5 text-accent" /> Address Book</h3>
            <div className="space-y-3 mb-4">
              {addressBook.map((addr) => (
                <div key={addr.id} className="rounded-xl border border-white/10 p-3 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-bold">{addr.label}</p>
                    <p className="text-sm text-[color:var(--text-dim)]">{addr.line1}, {addr.city} - {addr.pin}</p>
                  </div>
                  <button onClick={() => removeAddress(addr.id)} className="text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input placeholder="Label" value={newAddress.label} onChange={(e) => setNewAddress((v) => ({ ...v, label: e.target.value }))} className="rounded-xl bg-white/5 border border-white/10 px-3 py-2" />
              <input placeholder="City" value={newAddress.city} onChange={(e) => setNewAddress((v) => ({ ...v, city: e.target.value }))} className="rounded-xl bg-white/5 border border-white/10 px-3 py-2" />
              <input placeholder="Address line" value={newAddress.line1} onChange={(e) => setNewAddress((v) => ({ ...v, line1: e.target.value }))} className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 col-span-2" />
              <input placeholder="PIN" value={newAddress.pin} onChange={(e) => setNewAddress((v) => ({ ...v, pin: e.target.value }))} className="rounded-xl bg-white/5 border border-white/10 px-3 py-2" />
              <button onClick={addAddress} className="rounded-xl bg-accent text-black font-black text-xs uppercase tracking-[0.2em] px-3 py-2 inline-flex items-center justify-center gap-2"><PlusCircle className="w-4 h-4" /> Add</button>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <Link
                to="/profile/actions/security-controls"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.15em] text-red-300 hover:text-red-200"
              >
                Open Security Settings (Delete Account)
              </Link>
            </div>
          </div>

          <div className="glass-pane rounded-[2rem] p-6">
            <h3 className="text-xl font-black font-['Outfit'] mb-4 inline-flex items-center gap-2"><CreditCard className="w-5 h-5 text-accent" /> Payment Methods</h3>
            <div className="space-y-3 mb-4">
              {payments.map((method) => (
                <div key={method.id} className="rounded-xl border border-white/10 p-3 flex items-center justify-between gap-3">
                  <p className="text-sm break-all">
                    <span className="uppercase text-[10px] tracking-[0.2em] text-[color:var(--text-dim)] mr-2">{method.type}</span>
                    {method.value}
                  </p>
                  <button onClick={() => removePaymentMethod(method.id)} className="text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[110px_1fr_auto] gap-2">
              <select value={newPayment.type} onChange={(e) => setNewPayment((v) => ({ ...v, type: e.target.value as "card" | "upi" }))} className="rounded-xl bg-white/5 border border-white/10 px-2 py-2">
                <option value="card">Card</option>
                <option value="upi">UPI</option>
              </select>
              <input placeholder={newPayment.type === "upi" ? "name@bank" : "Card last 4 / card label"} value={newPayment.value} onChange={(e) => setNewPayment((v) => ({ ...v, value: e.target.value }))} className="rounded-xl bg-white/5 border border-white/10 px-3 py-2" />
              <button onClick={addPaymentMethod} className="rounded-xl bg-accent text-black font-black text-xs uppercase tracking-[0.2em] px-3 py-2">Add</button>
            </div>
          </div>
        </section>

        <section ref={preferenceSectionRef} className="glass-pane rounded-[2rem] p-6">
          <h3 className="text-xl font-black font-['Outfit'] mb-4 inline-flex items-center gap-2"><Bell className="w-5 h-5 text-accent" /> Preferences</h3>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { key: "orderUpdates", label: "Order updates", icon: Package, path: "/profile/preferences/order-updates" },
              { key: "promoAlerts", label: "Promotional alerts", icon: Sparkles, path: "/profile/preferences/promo-alerts" },
              { key: "locationOffers", label: "Location-based offers", icon: MapPin, path: "/profile/preferences/location-offers" },
            ].map((pref) => (
              <Link
                key={pref.key}
                to={pref.path}
                className={`rounded-2xl p-4 border text-left transition-all ${
                  preferences[pref.key as "orderUpdates" | "promoAlerts" | "locationOffers"]
                    ? "border-accent bg-accent/10"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <pref.icon className="w-4 h-4 mb-2 text-accent" />
                <p className="font-bold">{pref.label}</p>
                <p className="text-xs text-[color:var(--text-dim)] mt-1">Manage settings</p>
              </Link>
            ))}
          </div>
        </section>

        <section ref={orderSectionRef} className="glass-pane rounded-[2rem] p-6">
          <h3 className="text-xl font-black font-['Outfit'] mb-4 inline-flex items-center gap-2"><History className="w-5 h-5 text-accent" /> Orders</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-[color:var(--text-dim)]">Total</p>
              <p className="text-xl font-black">{orderStats.total}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-[color:var(--text-dim)]">Active</p>
              <p className="text-xl font-black text-accent">{orderStats.active}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-[color:var(--text-dim)]">Delivered</p>
              <p className="text-xl font-black">{orderStats.delivered}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-[color:var(--text-dim)]">Cancelled</p>
              <p className="text-xl font-black text-red-400">{orderStats.cancelled}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { id: "all", label: "All Orders" },
              { id: "active", label: "Active" },
              { id: "delivered", label: "Delivered" },
              { id: "cancelled", label: "Cancelled" },
            ].map((chip) => (
              <button
                key={chip.id}
                onClick={() => setOrderFilter(chip.id as "all" | "active" | "cancelled" | "delivered")}
                className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border transition-all ${
                  orderFilter === chip.id ? "bg-accent text-black border-accent" : "bg-white/5 border-white/10 text-[color:var(--text-main)]"
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {visibleOrders.map((order) => (
              <motion.div key={order.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-white/10 p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <p className="font-black break-all">{order.id}</p>
                  <span className={`text-[10px] uppercase tracking-[0.2em] px-2 py-1 rounded-full ${
                    order.status === "Cancelled" ? "bg-red-500/10 text-red-400" : "bg-accent/10 text-accent"
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-xs text-[color:var(--text-dim)] mb-3">{new Date(order.date).toLocaleString()}</p>
                <p className="text-sm mb-3">{order.items.length} item(s) • <strong>{formatINR(order.total * 83)}</strong></p>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 mb-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[color:var(--text-dim)] mb-2">Products</p>
                  <div className="space-y-1.5">
                    {order.items.map((item) => (
                      <div key={`${order.id}-${item.id}`} className="flex items-center justify-between gap-2 text-xs">
                        <span className="truncate">{item.name} x {item.quantity}</span>
                        <span className="text-accent whitespace-nowrap">{formatINR(item.price * item.quantity * 83)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {order.updates && order.updates.length > 0 && (
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3 mb-3">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[color:var(--text-dim)] mb-2">Latest Updates</p>
                    <div className="space-y-2">
                      {order.updates.slice(-3).reverse().map((update) => (
                        <div key={update.id} className="text-xs">
                          <p className={`font-bold ${update.tone === "danger" ? "text-red-400" : update.tone === "success" ? "text-emerald-400" : update.tone === "warning" ? "text-amber-300" : "text-accent"}`}>
                            {update.label}
                          </p>
                          <p className="text-[color:var(--text-dim)]">{update.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeStatuses.includes(order.status as (typeof activeStatuses)[number]) ? (
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <input
                      value={cancelReasonByOrder[order.id] || ""}
                      onChange={(e) => setCancelReasonByOrder((prev) => ({ ...prev, [order.id]: e.target.value }))}
                      placeholder="Cancellation reason"
                      className="flex-1 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm"
                    />
                    <button onClick={() => handleCancelOrder(order.id)} className="rounded-xl px-3 py-2 border border-red-500/30 text-red-400 text-xs font-black uppercase tracking-[0.15em] whitespace-nowrap">
                      Cancel
                    </button>
                  </div>
                ) : order.status === "Delivered" ? (
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2">
                    <p className="text-xs text-emerald-300">Delivered successfully. You can place a new order from shopping/cart.</p>
                  </div>
                ) : (
                  <p className="text-xs text-red-400">Reason: {order.cancellationReason || "Not specified"}</p>
                )}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-[color:var(--text-dim)] mb-1">
                    <span>Order Progress</span>
                    <span>{order.status === "Cancelled" ? "Stopped" : `${getOrderProgress(order.status)}%`}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        order.status === "Cancelled" ? "bg-red-400" : "bg-accent"
                      }`}
                      style={{ width: `${getOrderProgress(order.status)}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {visibleOrders.length === 0 && <p className="text-sm text-[color:var(--text-dim)]">No matching orders yet. Place an order from cart to see live updates here.</p>}
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Edit profile details", desc: "Update your identity and contact details.", icon: User, path: "/profile/actions/edit-profile" },
            { title: "Security controls", desc: "Manage account privacy and protection settings.", icon: ShieldCheck, path: "/profile/actions/security-controls" },
            { title: "Notification center", desc: "Configure all communication preferences.", icon: Bell, path: "/profile/actions/notification-center" },
          ].map((tile) => (
            <Link
              key={tile.title}
              to={tile.path}
              className="glass-pane rounded-2xl p-5 border border-white/10 text-left hover:border-accent hover:bg-white/10 transition-all"
            >
              <tile.icon className="w-5 h-5 text-accent mb-2" />
              <p className="font-black">{tile.title}</p>
              <p className="text-sm text-[color:var(--text-dim)] mt-1">{tile.desc}</p>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}

