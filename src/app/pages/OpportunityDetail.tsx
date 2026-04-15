import { Link, useParams, useNavigate } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";

type OpportunityMeta = {
  title: string;
  category: string;
  summary: string;
  highlights: string[];
  inquirePath: string;
};

const opportunityMap: Record<string, OpportunityMeta> = {
  "flagship-anchor": {
    title: "Flagship Anchor Opportunity",
    category: "Leasing",
    summary: "Large-format destination tenancy with premium visibility, curated adjacency, and long-term brand positioning.",
    highlights: ["50,000+ sq ft potential footprints", "High-visibility access corridors", "Premium launch support"],
    inquirePath: "/inquire/leasing",
  },
  "inline-retail": {
    title: "Inline Retail Opportunity",
    category: "Leasing",
    summary: "Strategic inline formats designed for strong conversion and brand discovery.",
    highlights: ["Curated tenant mix", "Flexible format options", "High footfall adjacency"],
    inquirePath: "/inquire/leasing",
  },
  "popup-experiential": {
    title: "Pop-up & Experiential Opportunity",
    category: "Leasing",
    summary: "Short-term high-impact activations for launches, seasonal campaigns, and test-market entry.",
    highlights: ["Short-window deployment", "Premium launch zones", "Integrated promotional support"],
    inquirePath: "/inquire/leasing",
  },
  "sponsorship-presenting": {
    title: "Presenting Sponsorship",
    category: "Sponsorship",
    summary: "Top-tier category ownership and campaign-level dominance across key mall touchpoints.",
    highlights: ["Category exclusivity", "High-impact media inventory", "Activation calendar alignment"],
    inquirePath: "/inquire/sponsorship",
  },
  "sponsorship-signature": {
    title: "Signature Sponsorship",
    category: "Sponsorship",
    summary: "Strong always-on presence with targeted event and digital amplification.",
    highlights: ["Campaign burst windows", "Zone-based brand visibility", "Partnership optimization support"],
    inquirePath: "/inquire/sponsorship",
  },
  "venue-rotunda": {
    title: "Rotunda Venue Booking",
    category: "Venue Booking",
    summary: "Book the destination's marquee central space for high-visibility branded experiences.",
    highlights: ["Prime central stage", "High audience circulation", "Launch-ready format"],
    inquirePath: "/inquire/venue-booking",
  },
  "venue-concert-spaces": {
    title: "Concert Spaces Booking",
    category: "Venue Booking",
    summary: "Flexible entertainment-capable venue formats for concerts, showcases, and public events.",
    highlights: ["Scalable audience format", "Production-ready zones", "Event operations support"],
    inquirePath: "/inquire/venue-booking",
  },
  "bespoke-architecture": {
    title: "Bespoke Luxury Architecture",
    category: "Design",
    summary: "Precision-engineered environments featuring Italian marble, custom glass facades, and tailored lighting for absolute brand purity.",
    highlights: ["Custom facade integration", "Premium material sourcing", "Architectural lighting control"],
    inquirePath: "/inquire/leasing",
  },
  "vip-concierge": {
    title: "VIP Concierge Protocol",
    category: "Service",
    summary: "Dedicated high-net-worth individual support team providing private styling suites, valet, and seamless premium logistics.",
    highlights: ["Private styling suites", "Valet-first entry points", "Dedicated HNW desk"],
    inquirePath: "/reach-us",
  },
  "unmatched-exclusivity": {
    title: "Unmatched Brand Exclusivity",
    category: "Strategic",
    summary: "Hermetically curated adjacencies ensuring your brand sits alongside true global peers in a sovereign ecosystem.",
    highlights: ["Curated tenant adjacency", "Category protection", "Strategic floor-plan mapping"],
    inquirePath: "/leasing",
  },
};

export function OpportunityDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const detail = slug ? opportunityMap[slug] : undefined;

  if (!detail) {
    return (
      <div className="page-wrapper bg-page min-h-screen pt-28">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="glass-pane rounded-[2rem] p-8">
            <h1 className="text-3xl font-black font-['Outfit']">Opportunity not found</h1>
            <p className="text-[color:var(--text-dim)] mt-3">This opportunity page is not available.</p>
            <Link to="/" className="btn-luxe mt-6">Return Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper bg-page min-h-screen pt-32 transition-colors duration-500 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-accent/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-32 relative z-10">
        <div className="mb-16">
           <button onClick={() => navigate(-1)} className="group inline-flex items-center gap-6 px-8 py-4 glass-pane border border-accent/30 rounded-full text-[10px] font-black uppercase tracking-[0.5em] text-accent hover:bg-accent hover:text-black transition-all shadow-gold">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" /> Return to Perspective
           </button>
        </div>

        <section className="glass-pane lighting-card rounded-[4rem] p-12 md:p-24 border border-[var(--border)] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[100px] pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row gap-20 items-start">
             <div className="flex-1">
                <div className="flex items-center gap-4 mb-6 md:mb-8">
                   <div className="w-8 md:w-12 h-px bg-accent" />
                   <p className="text-accent text-[9px] md:text-[10px] font-black tracking-[0.6em] uppercase">{detail.category} Protocol</p>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-[8rem] font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-[0.9] mb-8 md:mb-12">
                  {detail.title.split(" ").map((word, i) => (
                    <span key={i} className={i === 1 ? "text-gradient" : ""}>{word} </span>
                  ))}
                </h1>
                <p className="text-lg md:text-2xl lg:text-3xl text-ink-gradient/80 font-medium italic border-l-2 border-accent/20 pl-6 md:pl-8 leading-relaxed mb-10 md:mb-16">
                   "{detail.summary}"
                </p>

                <div className="flex flex-wrap gap-6 mt-16">
                  <Link to={detail.inquirePath} className="btn-luxe !px-16 !py-6 text-sm">
                    Initialize Dialogue <ArrowRight className="w-6 h-6 ml-4" />
                  </Link>
                  <Link to="/strategy" className="px-16 py-6 glass-pane border border-[var(--border)] text-ink-gradient font-black tracking-[0.4em] uppercase text-[10px] rounded-full hover:border-accent hover:text-accent transition-all shadow-xl">
                     Executive Briefing
                  </Link>
                </div>
             </div>

             <div className="w-full lg:w-[450px] space-y-8">
                <div className="glass-pane p-10 rounded-[3rem] border border-accent/20 bg-accent/5">
                   <h3 className="text-[10px] font-black tracking-[0.5em] text-accent uppercase mb-8">Operational Highlights</h3>
                    <div className="space-y-6">
                       {detail.highlights.map((point, i) => {
                         const slug = point.toLowerCase().replace(/ /g, "-");
                         return (
                           <Link key={i} to={`/operations/${slug}`} className="flex items-start gap-5 group py-2 border-b border-transparent hover:border-accent/10 transition-all">
                              <div className="w-2 h-2 rounded-full bg-accent mt-1.5 shadow-gold group-hover:scale-150 transition-transform" />
                              <div className="flex-1">
                                <p className="text-ink-gradient text-sm font-black uppercase tracking-widest leading-relaxed opacity-70 group-hover:opacity-100">{point}</p>
                                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-accent mt-1 opacity-0 group-hover:opacity-100 transition-all">Explore Protocol →</p>
                              </div>
                           </Link>
                         );
                       })}
                    </div>
                </div>

                <div className="glass-pane p-10 rounded-[3rem] border border-[var(--border)] bg-page/50 backdrop-blur-3xl">
                   <p className="text-[10px] font-black tracking-[0.4em] text-accent uppercase mb-6 opacity-60 italic">Strategic Adjacency</p>
                   <p className="text-ink-gradient/60 text-xs font-medium leading-relaxed italic">
                      All opportunities are subject to registry approval and brand alignment protocols within the UB City curated ecosystem.
                   </p>
                </div>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
}
