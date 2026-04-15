import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import {
  User,
  MapPin,
  CreditCard,
  Bell,
  ShieldCheck,
  Package,
  Sparkles,
  Phone,
  Mail,
  Save,
  PlusCircle,
  Trash2,
  LogOut,
} from "lucide-react";
import { useUserSession } from "../hooks/useFeatures";
import { formatINR } from "../utils/currency";
import { POSTERS } from "../data/mediaAssets";
import { toast } from "sonner";

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
  const { user, login, logout } = useUserSession();

  const [profileForm, setProfileForm] = useState(() => 
    loadJson(PROFILE_FORM_KEY, {
      name: user?.name || "UB City Member",
      email: user?.email || "member@ubcity.com",
      phone: user?.phone || "",
    })
  );

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
  const [newPayment, setNewPayment] = useState<Omit<PaymentMethodItem, "id">>({ type: "card", value: "" });

  const profileSectionRef = useRef<HTMLDivElement>(null);
  const securitySectionRef = useRef<HTMLDivElement>(null);
  const preferenceSectionRef = useRef<HTMLDivElement>(null);

  const saveProfile = () => {
    localStorage.setItem(PROFILE_FORM_KEY, JSON.stringify(profileForm));
    toast.success("Profile saved successfully");
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    window.location.href = "/login";
  };

  const addAddress = () => {
    if (!newAddress.label || !newAddress.line1 || !newAddress.city || !newAddress.pin) {
      toast.error("Please fill all address fields");
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
      toast.error("Please enter card or UPI details");
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
    toast.success(`${next[key] ? "Enabled" : "Disabled"}: ${key === "orderUpdates" ? "Order Updates" : key === "promoAlerts" ? "Promo Alerts" : "Location Offers"}`);
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

  return (
    <div className="page-wrapper bg-page min-h-screen pt-32 md:pt-48 transition-colors duration-500 relative">
      {/* ─── Cinematic Background ─── */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-110 blur-3xl opacity-20 dark:opacity-10"
          style={{ backgroundImage: `url(${POSTERS.citySkyline})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-page via-page/90 to-page" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-32 space-y-12 md:space-y-20 relative z-10">
        
        {/* Profile Header */}
        <section ref={profileSectionRef} className="glass-pane lighting-card rounded-[4rem] p-10 md:p-16 border border-[var(--border)] shadow-2xl overflow-hidden relative">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-16">
            <div className="flex items-center gap-8 min-w-0">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] bg-accent/10 border border-accent/20 overflow-hidden flex items-center justify-center shadow-gold shrink-0">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 md:w-14 md:h-14 text-accent" />
                )}
              </div>
              <div className="min-w-0">
                <h2 className="text-4xl md:text-6xl font-black font-['Outfit'] text-ink-gradient break-words leading-none mb-4 uppercase tracking-tighter">{profileForm.name}</h2>
                <div className="flex items-center gap-4 text-sm font-bold text-accent uppercase tracking-widest opacity-60">
                   <ShieldCheck className="w-4 h-4" /> Verified User
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <label className="px-8 py-3 rounded-full glass-pane border border-[var(--border)] text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-accent hover:text-black transition-all shadow-sm">
                 Change Photo
                <input type="file" accept="image/*" className="hidden" onChange={handleProfilePhotoChange} />
              </label>
              <button onClick={saveProfile} className="btn-luxe px-8 py-3 text-[10px]">
                <Save className="w-4 h-4 mr-2" /> Save Profile
              </button>
              <button onClick={handleLogout} className="px-8 py-3 rounded-full border border-red-500/20 bg-red-500/5 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
                Logout
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
               <label className="text-[10px] font-black uppercase tracking-[0.4em] text-accent ml-6">Full Name</label>
               <input value={profileForm.name} onChange={(e) => setProfileForm((p) => ({ ...p, name: e.target.value }))} className="w-full glass-pane border border-[var(--input-border)] rounded-[2.5rem] px-8 py-5 text-ink-gradient font-bold outline-none focus:border-accent transition-all" />
            </div>
            <div className="space-y-3">
               <label className="text-[10px] font-black uppercase tracking-[0.4em] text-accent ml-6">Email Address</label>
               <input value={profileForm.email} onChange={(e) => setProfileForm((p) => ({ ...p, email: e.target.value }))} className="w-full glass-pane border border-[var(--input-border)] rounded-[2.5rem] px-8 py-5 text-ink-gradient font-bold outline-none focus:border-accent transition-all" />
            </div>
            <div className="space-y-3">
               <label className="text-[10px] font-black uppercase tracking-[0.4em] text-accent ml-6">Phone Number</label>
               <input value={profileForm.phone} onChange={(e) => setProfileForm((p) => ({ ...p, phone: e.target.value }))} className="w-full glass-pane border border-[var(--input-border)] rounded-[2.5rem] px-8 py-5 text-ink-gradient font-bold outline-none focus:border-accent transition-all" />
            </div>
          </div>
        </section>

        {/* Addresses & Payments */}
        <section ref={securitySectionRef} className="grid lg:grid-cols-2 gap-12">
          <div className="glass-pane lighting-card rounded-[4rem] p-10 md:p-16 border border-[var(--border)] shadow-xl">
            <h3 className="text-3xl font-black font-['Outfit'] text-ink-gradient mb-10 inline-flex items-center gap-4 uppercase tracking-tighter leading-none">
              <MapPin className="w-8 h-8 text-accent" /> My Addresses
            </h3>
            <div className="space-y-6 mb-12">
              {addressBook.map((addr) => (
                <div key={addr.id} className="glass-pane rounded-3xl border border-[var(--border)] p-8 flex items-start justify-between gap-6 hover:border-accent/30 transition-all group">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-accent mb-2">{addr.label}</p>
                    <p className="text-lg font-bold text-ink-gradient leading-relaxed">{addr.line1}, {addr.city} - {addr.pin}</p>
                  </div>
                  <button onClick={() => removeAddress(addr.id)} className="text-red-500/40 hover:text-red-500 transition-all mt-1"><Trash2 className="w-5 h-5" /></button>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input placeholder="Label (e.g. Home)" value={newAddress.label} onChange={(e) => setNewAddress((v) => ({ ...v, label: e.target.value }))} className="rounded-[1.5rem] glass-pane border border-[var(--input-border)] px-6 py-4 text-sm font-bold text-ink-gradient outline-none focus:border-accent" />
              <input placeholder="City" value={newAddress.city} onChange={(e) => setNewAddress((v) => ({ ...v, city: e.target.value }))} className="rounded-[1.5rem] glass-pane border border-[var(--input-border)] px-6 py-4 text-sm font-bold text-ink-gradient outline-none focus:border-accent" />
              <input placeholder="Address Line" value={newAddress.line1} onChange={(e) => setNewAddress((v) => ({ ...v, line1: e.target.value }))} className="rounded-[1.5rem] glass-pane border border-[var(--input-border)] px-6 py-4 text-sm font-bold text-ink-gradient outline-none focus:border-accent col-span-2" />
              <input placeholder="PIN Code" value={newAddress.pin} onChange={(e) => setNewAddress((v) => ({ ...v, pin: e.target.value }))} className="rounded-[1.5rem] glass-pane border border-[var(--input-border)] px-6 py-4 text-sm font-bold text-ink-gradient outline-none focus:border-accent" />
              <button onClick={addAddress} className="btn-luxe py-4 text-[10px]"><PlusCircle className="w-4 h-4 mr-2" /> Add Address</button>
            </div>
          </div>

          <div className="glass-pane lighting-card rounded-[4rem] p-10 md:p-16 border border-[var(--border)] shadow-xl">
            <h3 className="text-3xl font-black font-['Outfit'] text-ink-gradient mb-10 inline-flex items-center gap-4 uppercase tracking-tighter leading-none">
              <CreditCard className="w-8 h-8 text-accent" /> Payment Methods
            </h3>
            <div className="space-y-6 mb-12">
              {payments.map((method) => (
                <div key={method.id} className="glass-pane rounded-3xl border border-[var(--border)] p-8 flex items-center justify-between gap-6 hover:border-accent/30 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                       {method.type === "card" ? <CreditCard className="w-6 h-6 text-accent" /> : <Sparkles className="w-6 h-6 text-accent" />}
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-1">{method.type === "card" ? "Credit/Debit Card" : "UPI ID"}</p>
                       <p className="text-lg font-black font-['Outfit'] text-ink-gradient tracking-widest">{method.value}</p>
                    </div>
                  </div>
                  <button onClick={() => removePaymentMethod(method.id)} className="text-red-500/40 hover:text-red-500 transition-all"><Trash2 className="w-5 h-5" /></button>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr_auto] gap-4">
              <select value={newPayment.type} onChange={(e) => setNewPayment((v) => ({ ...v, type: e.target.value as "card" | "upi" }))} className="rounded-[1.5rem] glass-pane border border-[var(--input-border)] px-5 py-4 text-[10px] font-black uppercase tracking-widest outline-none bg-page">
                <option value="card" className="bg-page">Card</option>
                <option value="upi" className="bg-page">UPI</option>
              </select>
              <input placeholder={newPayment.type === "upi" ? "name@bank" : "XXXX XXXX XXXX XXXX"} value={newPayment.value} onChange={(e) => setNewPayment((v) => ({ ...v, value: e.target.value }))} className="rounded-[1.5rem] glass-pane border border-[var(--input-border)] px-6 py-4 text-sm font-bold text-ink-gradient outline-none focus:border-accent" />
              <button onClick={addPaymentMethod} className="btn-luxe px-8 py-4 text-[10px]">Save</button>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section ref={preferenceSectionRef} className="glass-pane lighting-card rounded-[4rem] p-10 md:p-16 border border-[var(--border)] shadow-xl">
          <h3 className="text-3xl font-black font-['Outfit'] text-ink-gradient mb-12 inline-flex items-center gap-4 uppercase tracking-tighter leading-none">
            <Bell className="w-8 h-8 text-accent" /> Notifications
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { key: "orderUpdates", label: "Order Updates", icon: Package, desc: "Real-time order tracking notifications" },
              { key: "promoAlerts", label: "Promo Alerts", icon: Sparkles, desc: "Exclusive UB City offers and news" },
              { key: "locationOffers", label: "Location Offers", icon: MapPin, desc: "Nearby store discovery notifications" },
            ].map((pref) => (
              <button
                key={pref.key}
                onClick={() => togglePreference(pref.key as any)}
                className={`group rounded-[2.5rem] p-10 border transition-all duration-700 text-left relative overflow-hidden ${
                  preferences[pref.key as keyof typeof preferences]
                    ? "border-accent bg-accent/5 shadow-gold"
                    : "glass-pane border-[var(--border)]"
                }`}
              >
                <pref.icon className={`w-10 h-10 mb-8 transition-transform group-hover:scale-110 ${preferences[pref.key as keyof typeof preferences] ? "text-accent" : "text-ink-gradient opacity-30"}`} />
                <p className={`text-2xl font-black font-['Outfit'] uppercase tracking-tighter mb-2 ${preferences[pref.key as keyof typeof preferences] ? "text-ink-gradient" : "text-[color:var(--text-dim)]"}`}>{pref.label}</p>
                <p className="text-xs font-medium italic text-[color:var(--text-dim)]">{pref.desc}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Bottom Actions */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Manage Security", desc: "Change password and manage privacy.", icon: ShieldCheck },
            { title: "Activity Log", desc: "View your recent activity on the platform.", icon: Package },
            { title: "Support", desc: "Get help from our concierge team.", icon: Sparkles },
          ].map((tile) => (
            <div
              key={tile.title}
              className="glass-pane lighting-card rounded-[3rem] p-10 border border-[var(--border)] group hover:border-accent/40 shadow-xl transition-all duration-700"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-8 transition-transform group-hover:scale-110 group-hover:rotate-3">
                 <tile.icon className="w-8 h-8 text-accent" />
              </div>
              <p className="text-2xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter mb-2">{tile.title}</p>
              <p className="text-sm font-medium italic text-[color:var(--text-dim)] leading-relaxed">{tile.desc}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}



