import { Link, useLocation, useParams } from "react-router";
import { Bell, ShieldCheck, User, ArrowRight } from "lucide-react";
import { useOrders, useUserSession } from "../hooks/useFeatures";
import { toast } from "sonner";

const actionConfig = {
  "edit-profile": {
    title: "Edit Profile Details",
    desc: "Manage your account identity and contact details.",
    icon: User,
    ctaLabel: "Open Profile Form",
    ctaPath: "/profile",
  },
  "security-controls": {
    title: "Security Controls",
    desc: "Manage account safety, payment methods, and sign-in trust settings.",
    icon: ShieldCheck,
    ctaLabel: "Open Security Section",
    ctaPath: "/profile",
  },
  "notification-center": {
    title: "Notification Center",
    desc: "Control alerts for orders, promotions, and location-based recommendations.",
    icon: Bell,
    ctaLabel: "Open Preferences",
    ctaPath: "/profile",
  },
};

export function ProfileActionPage() {
  const location = useLocation();
  const { actionKey } = useParams<{ actionKey: keyof typeof actionConfig }>();
  const pathActionKey = location.pathname.split("/").pop() as keyof typeof actionConfig | undefined;
  const resolvedKey = actionKey || pathActionKey;
  const selected = resolvedKey ? actionConfig[resolvedKey] : undefined;
  const { user, logout } = useUserSession();
  const { orderStats } = useOrders();

  const handleDeleteAccount = () => {
    const shouldDelete = window.confirm(
      "Delete your account data from this device? This will clear profile, cart, wishlist, and order history."
    );
    if (!shouldDelete) return;

    const keysToClear = [
      "mall_user_session",
      "mall_user",
      "mall_profile_addresses",
      "mall_profile_payments",
      "mall_profile_preferences",
      "mall_profile_photo",
      "mall_profile_form",
      "mall_cart",
      "mall_wishlist",
      "mall_orders",
      "mall_order_announcements",
      "mall_last_location",
      "mall_last_language",
    ];

    keysToClear.forEach((key) => localStorage.removeItem(key));
    logout();
    toast.success("Account data deleted from this device.");
    window.location.href = "/";
  };

  if (!selected) {
    return (
      <div className="page-wrapper bg-page min-h-screen pt-24 px-6">
        <div className="max-w-4xl mx-auto glass-pane rounded-[2rem] p-8">
          <p className="text-lg font-bold">Action page not found.</p>
          <Link to="/profile" className="btn-luxe mt-6">Back to Profile</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper bg-page min-h-screen pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 pb-20">
        <section className="glass-pane rounded-[2rem] p-6 md:p-8">
          <selected.icon className="w-10 h-10 text-accent mb-3" />
          <h1 className="text-3xl md:text-4xl font-black font-['Outfit']">{selected.title}</h1>
          <p className="text-[color:var(--text-dim)] mt-3">{selected.desc}</p>

          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-[10px] uppercase tracking-[0.16em] text-[color:var(--text-dim)]">Account</p>
              <p className="font-black mt-1">{user?.name || "Guest User"}</p>
              <p className="text-sm text-[color:var(--text-dim)] break-all">{user?.email || "member@ubcity.com"}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-[10px] uppercase tracking-[0.16em] text-[color:var(--text-dim)]">Orders Snapshot</p>
              <p className="font-black mt-1">{orderStats.total} total • {orderStats.active} active</p>
              <p className="text-sm text-[color:var(--text-dim)]">{orderStats.delivered} delivered • {orderStats.cancelled} cancelled</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to={selected.ctaPath} className="btn-luxe">
              {selected.ctaLabel}
            </Link>
            {resolvedKey === "security-controls" && (
              <button
                onClick={handleDeleteAccount}
                className="px-5 py-3 rounded-full border border-red-500/40 bg-red-500/10 text-xs font-black uppercase tracking-[0.15em] text-red-300"
              >
                Delete Account
              </button>
            )}
            <Link to="/profile" className="px-5 py-3 rounded-full border border-white/10 bg-white/5 text-xs font-black uppercase tracking-[0.15em] inline-flex items-center gap-2">
              Back to Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}




