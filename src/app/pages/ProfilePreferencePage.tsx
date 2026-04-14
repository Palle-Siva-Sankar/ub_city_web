import { Link, useLocation, useParams } from "react-router";
import { Bell, MapPin, Package, ArrowRight } from "lucide-react";

const PREFS_KEY = "mall_profile_preferences";

type PreferenceState = {
  orderUpdates: boolean;
  promoAlerts: boolean;
  locationOffers: boolean;
};

function loadPrefs(): PreferenceState {
  try {
    return JSON.parse(localStorage.getItem(PREFS_KEY) || "") as PreferenceState;
  } catch {
    return { orderUpdates: true, promoAlerts: true, locationOffers: true };
  }
}

const config = {
  "order-updates": {
    key: "orderUpdates" as const,
    title: "Order Updates",
    desc: "Get real-time updates for placed, shipped, delivered, and cancelled orders.",
    icon: Package,
  },
  "promo-alerts": {
    key: "promoAlerts" as const,
    title: "Promotional Alerts",
    desc: "Receive new offers, festive campaigns, and limited-time brand deals.",
    icon: Bell,
  },
  "location-offers": {
    key: "locationOffers" as const,
    title: "Location-Based Offers",
    desc: "Show nearby deals and experiences based on your current location.",
    icon: MapPin,
  },
};

export function ProfilePreferencePage() {
  const location = useLocation();
  const { prefKey } = useParams<{ prefKey: keyof typeof config }>();
  const pathPrefKey = location.pathname.split("/").pop() as keyof typeof config | undefined;
  const resolvedKey = prefKey || pathPrefKey;
  const selected = resolvedKey ? config[resolvedKey] : undefined;
  const prefs = loadPrefs();

  if (!selected) {
    return (
      <div className="page-wrapper bg-page min-h-screen pt-24 px-6">
        <div className="max-w-4xl mx-auto glass-pane rounded-[2rem] p-8">
          <p className="text-lg font-bold">Preference page not found.</p>
          <Link to="/profile" className="btn-luxe mt-6">Back to Profile</Link>
        </div>
      </div>
    );
  }

  const isEnabled = prefs[selected.key];

  return (
    <div className="page-wrapper bg-page min-h-screen pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 pb-20">
        <section className="glass-pane rounded-[2rem] p-6 md:p-8">
          <selected.icon className="w-10 h-10 text-accent mb-3" />
          <h1 className="text-3xl md:text-4xl font-black font-['Outfit']">{selected.title}</h1>
          <p className="text-[color:var(--text-dim)] mt-3">{selected.desc}</p>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--text-dim)]">Current Status</p>
            <p className={`text-lg font-black mt-1 ${isEnabled ? "text-accent" : "text-red-400"}`}>{isEnabled ? "Enabled" : "Disabled"}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/profile" className="btn-luxe">
              Back to Profile
            </Link>
            <Link to="/profile/actions/notification-center" className="px-5 py-3 rounded-full border border-white/10 bg-white/5 text-xs font-black uppercase tracking-[0.15em] inline-flex items-center gap-2">
              Notification Center <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

