import { useParams, useNavigate, Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Zap, ShieldCheck, BarChart3, Clock, Users, MapPin } from "lucide-react";

type OpMeta = {
  title: string;
  category: string;
  summary: string;
  metrics: { label: string; value: string; icon: any }[];
  content: string;
};

const opMap: Record<string, OpMeta> = {
  "curated-tenant-mix": {
    title: "Curated Tenant Mix",
    category: "Inline Retail",
    summary: "Strategic adjacency protocols ensuring brand synergy and maximum cross-conversion between tier-1 retailers.",
    metrics: [
      { label: "Synergy Rate", value: "94%", icon: Zap },
      { label: "Traffic Flow", value: "High", icon: BarChart3 },
      { label: "Category", value: "Premium", icon: ShieldCheck }
    ],
    content: "Our curation engine analyzes consumer behavior to place brands in proximity to high-intent neighbors, driving discovery and organic footfall."
  },
  "flexible-format-options": {
    title: "Flexible Format Options",
    category: "Inline Retail",
    summary: "Versatile architectural frameworks allowing brands to scale their physical presence from 500 to 10,000 sq ft.",
    metrics: [
      { label: "Adaptability", value: "Extreme", icon: Zap },
      { label: "Lead Time", value: "4 Weeks", icon: Clock }
    ],
    content: "Modular store shells with standardized utilities allow for rapid brand deployment and future-proof expansion paths."
  },
  "high-footfall-adjacency": {
    title: "High Footfall Adjacency",
    category: "Inline Retail",
    summary: "Premium positioning near key circulation hubs, anchor entrances, and luxury corridors.",
    metrics: [
      { label: "Avg Footfall", value: "25k/day", icon: Users },
      { label: "Visibility", value: "A+", icon: MapPin }
    ],
    content: "Maximize brand exposure by positioning your storefront along the high-frequency paths of Bloomington, MN's most affluent demographics."
  },
  "short-window-deployment": {
    title: "Short-Window Deployment",
    category: "Pop-up & Experiential",
    summary: "Rapid activation protocols for seasonal launches, product drops, and market testing.",
    metrics: [
      { label: "Setup Time", value: "48 hours", icon: Clock },
      { label: "Impact", value: "Massive", icon: Zap }
    ],
    content: "Deploy high-fidelity branded environments in days, not months. Perfect for testing new concepts or capturing peak seasonal demand."
  },
  "premium-launch-zones": {
    title: "Premium Launch Zones",
    category: "Pop-up & Experiential",
    summary: "Designated high-visibility zones in central rotundas and luxury plazas for maximum impact.",
    metrics: [
      { label: "Impressions", value: "500k/week", icon: BarChart3 },
      { label: "Prestige", value: "Elite", icon: ShieldCheck }
    ],
    content: "Position your brand at the literal center of the experience. These zones are engineered for social media virality and extreme physical presence."
  },
  "integrated-promotional-support": {
    title: "Integrated Support",
    category: "Pop-up & Experiential",
    summary: "Full-stack marketing integration across our digital network, loyalty programs, and social channels.",
    metrics: [
      { label: "Social Reach", value: "2M+", icon: Users },
      { label: "Digital Ads", value: "Included", icon: Zap }
    ],
    content: "Your activation is amplified by our sovereign digital network, ensuring that your message reaches the right audience before they even arrive."
  }
};

export function OperationsDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const detail = slug ? opMap[slug] : undefined;

  if (!detail) {
    return (
      <div className="page-wrapper bg-page min-h-screen pt-40 text-center">
        <h1 className="text-4xl font-black">Detail Not Found</h1>
        <Link to="/" className="btn-luxe mt-8">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="page-wrapper bg-page min-h-screen pt-32 pb-40">
      <div className="max-w-5xl mx-auto px-6">
        <button 
          onClick={() => navigate(-1)} 
          className="group flex items-center gap-4 text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-16 hover:gap-6 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Perspective
        </button>

        <div className="glass-pane p-12 md:p-20 rounded-[4rem] border border-[var(--border)] shadow-2xl relative overflow-hidden">
           <div className="relative z-10">
              <p className="text-accent text-[10px] font-black uppercase tracking-[0.8em] mb-6">{detail.category} Protocol</p>
              <h1 className="text-4xl md:text-7xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-none mb-10">
                {detail.title}
              </h1>
              <p className="text-xl md:text-2xl text-[color:var(--text-dim)] font-medium leading-relaxed mb-16 border-l-2 border-accent/20 pl-8">
                {detail.summary}
              </p>

              <div className="grid md:grid-cols-3 gap-8 mb-20">
                 {detail.metrics.map((m, i) => (
                   <div key={i} className="glass-pane p-8 rounded-3xl border border-accent/10">
                      <m.icon className="w-6 h-6 text-accent mb-4" />
                      <p className="text-[9px] font-black uppercase tracking-widest text-accent mb-1 opacity-60">{m.label}</p>
                      <p className="text-2xl font-bold text-ink-gradient">{m.value}</p>
                   </div>
                 ))}
              </div>

              <div className="prose prose-invert max-w-none">
                 <h4 className="text-accent text-[11px] font-black uppercase tracking-[0.4em] mb-6">Executive Brief</h4>
                 <p className="text-lg text-ink-gradient/80 leading-relaxed font-medium italic">
                    {detail.content}
                 </p>
              </div>

              <div className="mt-16 pt-16 border-t border-[var(--border)]">
                 <Link to="/inquire/leasing" className="btn-luxe">Request Full Spec Sheet</Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}



