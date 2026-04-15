import { useParams, useNavigate, Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Download, ShieldCheck, Eye, Sparkles, FileText } from "lucide-react";

type TierMeta = {
  title: string;
  tag: string;
  metric: string;
  desc: string;
  highlights: string[];
  specs: Record<string, string>;
};

const tierMap: Record<string, TierMeta> = {
  "digital-dominance": {
    title: "Digital Dominance",
    tag: "Coverage",
    metric: "10M+",
    desc: "10M+ annual impressions across our premium high-resolution digital network and immersive LED arrays.",
    highlights: [
      "Full network synchronization",
      "Dynamic content scheduling",
      "Interactive audience engagement",
      "Real-time metadata reporting"
    ],
    specs: {
      "Display Count": "45+ Professional Displays",
      "Max Resolution": "8K Immersive LED",
      "Reach": "10.2M Certified Impressions",
      "Ad Format": "Static, Motion, Interactive"
    }
  },
  "event-signature": {
    title: "Event Signature",
    tag: "Visibility",
    metric: "Top Tier",
    desc: "Own the stage at our world-class event plazas for exclusive launches, galas, and brand activations.",
    highlights: [
      "Premier venue priority",
      "Integrated technical support",
      "On-site media coordination",
      "Guest relations management"
    ],
    specs: {
      "Venue Capacity": "Up to 5,000 Pax",
      "A/V Setup": "Full Touring Grade Stage",
      "Promotion": "Dedicated Social/Digital Burst",
      "Frequency": "4 Major Activations/Year"
    }
  },
  "integrated-rights": {
    title: "Integrated Rights",
    tag: "Ownership",
    metric: "VIP Scale",
    desc: "A sovereign brand partnership with priority access to demographics and first-right for key activations.",
    highlights: [
      "Category exclusivity",
      "Strategic brand placement",
      "Direct data insights",
      "Loyalty program integration"
    ],
    specs: {
      "Partnership Level": "Tier 1 Sovereign",
      "Data Access": "Monthly Consumer Intel",
      "Adjacency": "Premium Prime Corridors",
      "Duration": "36-Month Commitment"
    }
  }
};

export function SponsorshipTierDetail() {
  const { tierSlug } = useParams<{ tierSlug: string }>();
  const navigate = useNavigate();
  const detail = tierSlug ? tierMap[tierSlug] : undefined;

  if (!detail) {
    return (
      <div className="page-wrapper bg-page min-h-screen pt-40 text-center">
        <h1 className="text-4xl font-black">Tier Not Found</h1>
        <Link to="/sponsorship" className="btn-luxe mt-8">Back to Sponsorship</Link>
      </div>
    );
  }

  const handleDownload = () => {
    // Simulate PDF download
    const content = `UB City - ${detail.title} Prospectus\n\nMetric: ${detail.metric}\n\nDescription: ${detail.desc}`;
    const blob = new Blob([content], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tierSlug}-prospectus.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page-wrapper bg-page min-h-screen pt-32 pb-40">
      <div className="max-w-7xl mx-auto px-6">
        <button 
          onClick={() => navigate(-1)} 
          className="group flex items-center gap-4 text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-16 hover:gap-6 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Sponsorship
        </button>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <p className="text-accent text-[10px] font-black uppercase tracking-[0.8em] mb-6">{detail.tag} Excellence</p>
            <h1 className="text-6xl md:text-8xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-none mb-10">
              {detail.title.split(" ")[0]} <br/><span className="text-gradient">{detail.title.split(" ")[1]}</span>
            </h1>
            <p className="text-2xl text-[color:var(--text-dim)] font-medium leading-relaxed mb-12 italic border-l-2 border-accent/30 pl-8">
              "{detail.desc}"
            </p>
            
            <div className="flex gap-6">
              <button onClick={handleDownload} className="btn-luxe !px-12">
                <Download className="w-5 h-5 mr-3" /> Download Case Study
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-pane p-12 rounded-[4rem] border border-[var(--border)] shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-5">
                {tierSlug === "digital-dominance" && <Eye className="w-64 h-64 text-accent" />}
                {tierSlug === "event-signature" && <Sparkles className="w-64 h-64 text-accent" />}
                {tierSlug === "integrated-rights" && <ShieldCheck className="w-64 h-64 text-accent" />}
             </div>

             <h3 className="text-accent text-[12px] font-black uppercase tracking-[0.5em] mb-12">Technical Protocol</h3>
             <div className="space-y-12">
                <div className="grid grid-cols-2 gap-8">
                   {Object.entries(detail.specs).map(([key, value]) => (
                     <div key={key}>
                        <p className="text-[9px] font-black uppercase tracking-widest text-accent mb-2 opacity-60">{key}</p>
                        <p className="text-lg font-bold text-ink-gradient">{value}</p>
                     </div>
                   ))}
                </div>

                <div className="pt-12 border-t border-[var(--border)]">
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-8 italic">Key Deliverables</p>
                   <div className="grid md:grid-cols-2 gap-6">
                      {detail.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-4 group">
                           <div className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-150 transition-transform" />
                           <p className="text-[11px] font-black uppercase tracking-wider text-ink-gradient/80 group-hover:text-accent transition-colors">{h}</p>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

