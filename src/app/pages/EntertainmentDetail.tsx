import { Link, useParams } from "react-router";
import { ArrowLeft, Sparkles } from "lucide-react";
import { ENTERTAINMENT_ATTRACTIONS, getAttractionBySlug } from "../data/entertainmentData";

export function EntertainmentDetail() {
  const { slug } = useParams<{ slug: string }>();
  const attraction = getAttractionBySlug(slug || "");

  if (!attraction) {
    return (
      <div className="page-wrapper bg-page min-h-screen pt-36 px-6">
        <div className="max-w-4xl mx-auto text-center py-24">
          <h1 className="text-5xl font-black font-['Outfit'] text-ink-gradient">Attraction Not Found</h1>
          <Link to="/entertainment" className="btn-luxe mt-8">Back to Entertainment</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper bg-page min-h-screen pt-32">
      <section className="px-6 md:px-12 mb-10">
        <div className="max-w-[1300px] mx-auto rounded-[2.5rem] overflow-hidden relative h-[360px]">
          <img src={attraction.heroImage} alt={attraction.title} className="w-full h-full object-cover" />
          <div className="video-gradient-mask absolute inset-0" />
          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
            <Link to="/entertainment" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/90 mb-5">
              <ArrowLeft className="w-4 h-4" /> Back to Entertainment
            </Link>
            <p className="hero-video-kicker text-xs tracking-[0.3em] uppercase mb-3">{attraction.subtitle}</p>
            <h1 className="text-4xl md:text-6xl font-black font-['Outfit'] hero-video-title uppercase tracking-tight">{attraction.title}</h1>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-[1300px] mx-auto grid lg:grid-cols-[1.3fr_0.7fr] gap-8">
          <div className="glass-pane rounded-[2rem] p-8">
            <p className="card-text-contrast text-lg leading-relaxed">{attraction.description}</p>
            <p className="mt-5 text-[color:var(--text-dim)]">
              Explore schedules, entry access, family-friendly timings, and premium booking options from this dedicated page.
            </p>
          </div>

          <div className="glass-pane rounded-[2rem] p-8">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6">
              <Sparkles className="w-7 h-7 text-accent" />
            </div>
            <h3 className="text-2xl font-black font-['Outfit'] mb-4">Plan Your Visit</h3>
            <p className="text-[color:var(--text-dim)] mb-7">Proceed with enquiry and slot planning for this attraction.</p>
            <Link to={`/inquire/${attraction.slug}`} className="btn-luxe w-full justify-center">
              {attraction.ctaLabel}
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-[1300px] mx-auto">
          <h3 className="text-2xl font-black mb-5">More Attractions</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {ENTERTAINMENT_ATTRACTIONS.filter((item) => item.slug !== attraction.slug).map((item) => (
              <Link key={item.slug} to={`/entertainment/${item.slug}`} className="glass-pane rounded-2xl overflow-hidden">
                <img src={item.heroImage} alt={item.title} className="w-full h-28 object-cover" />
                <div className="p-4">
                  <p className="font-bold">{item.title}</p>
                  <p className="text-xs text-accent mt-1">{item.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


