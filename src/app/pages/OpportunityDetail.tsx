import { Link, useParams } from "react-router";
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
};

export function OpportunityDetail() {
  const { slug } = useParams<{ slug: string }>();
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
    <div className="page-wrapper bg-page min-h-screen pt-28">
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <Link to={-1 as any} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] mb-6 text-[color:var(--text-dim)]">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <section className="glass-pane rounded-[2rem] p-6 md:p-8">
          <p className="text-[10px] uppercase tracking-[0.2em] text-accent font-black">{detail.category}</p>
          <h1 className="text-3xl md:text-5xl font-black font-['Outfit'] mt-2">{detail.title}</h1>
          <p className="text-[color:var(--text-dim)] mt-4 leading-relaxed">{detail.summary}</p>

          <div className="mt-6 grid sm:grid-cols-3 gap-3">
            {detail.highlights.map((point) => (
              <div key={point} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                {point}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={detail.inquirePath} className="btn-luxe">
              Start Conversation <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
            <Link to="/" className="px-5 py-3 rounded-full border border-white/10 bg-white/5 text-xs font-black uppercase tracking-[0.15em]">
              Return to Deck
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

