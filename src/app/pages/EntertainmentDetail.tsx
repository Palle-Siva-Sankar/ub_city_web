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
    <div className="page-wrapper bg-page min-h-screen transition-colors duration-500">
      <section className="px-6 md:px-12 pt-32 mb-10">
        <div className="max-w-[1400px] mx-auto rounded-[4rem] overflow-hidden relative h-[450px] shadow-gold lighting-card group">
          <img src={attraction.heroImage} alt={attraction.title} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000" />
          <div className="video-gradient-mask absolute inset-0" />
          <div className="absolute inset-0 p-10 md:p-20 flex flex-col justify-end relative z-10">
            <Link to="/entertainment" className="group inline-flex items-center gap-4 px-6 py-3 glass-pane border border-accent/30 rounded-full text-[9px] font-black uppercase tracking-[0.4em] text-accent hover:bg-accent hover:text-black transition-all shadow-gold mb-12 w-fit">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" /> Return to Entertainment Sector
            </Link>
            <div className="flex items-center gap-4 mb-8">
               <Sparkles className="w-6 h-6 text-accent" />
               <p className="text-[10px] font-black tracking-[0.6em] text-accent uppercase leading-none">{attraction.subtitle}</p>
            </div>
            <h1 className="text-5xl md:text-8xl font-black font-['Outfit'] text-white uppercase tracking-tighter leading-none mb-4 shadow-2xl">
              {attraction.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1.3fr_0.7fr] gap-12">
          <div className="glass-pane lighting-card rounded-[3.5rem] p-12 md:p-16 border border-[var(--border)] shadow-sm">
            <p className="text-ink-gradient text-2xl md:text-3xl font-light italic leading-relaxed mb-12">"{attraction.description}"</p>
            <div className="p-8 rounded-[2.5rem] bg-accent/10 border border-accent/20">
               <p className="text-ink-gradient font-medium text-lg leading-relaxed">
                 Explore schedules, entry access, family-friendly timings, and premium booking options from this dedicated page.
               </p>
            </div>
          </div>

          <div className="glass-pane lighting-card rounded-[3.5rem] p-12 border border-[var(--border)] flex flex-col shadow-sm">
            <div className="w-20 h-20 rounded-[2rem] bg-accent/20 border border-accent/30 flex items-center justify-center mb-10 shadow-gold group-hover:rotate-12 transition-all">
              <Sparkles className="w-10 h-10 text-accent" />
            </div>
            <h3 className="text-3xl font-black font-['Outfit'] text-ink-gradient mb-4 uppercase tracking-tighter">Plan Your Visit</h3>
            <p className="text-[color:var(--text-dim)] mb-12 text-lg font-medium">Proceed with enquiry and slot planning for this attraction.</p>
            <Link to={`/inquire/${attraction.slug}`} className="btn-luxe w-full mt-auto">
              {attraction.ctaLabel}
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-6 mb-12">
             <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[var(--border)]" />
             <h3 className="text-[10px] font-black tracking-[0.5em] text-accent uppercase">Explore More</h3>
             <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[var(--border)]" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {ENTERTAINMENT_ATTRACTIONS.filter((item) => item.slug !== attraction.slug).map((item) => (
              <Link key={item.slug} to={`/entertainment/${item.slug}`} className="glass-pane lighting-card rounded-[2.5rem] overflow-hidden border border-[var(--border)] hover:border-accent group transition-all duration-700">
                <div className="h-48 overflow-hidden">
                  <img src={item.heroImage} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.5] group-hover:grayscale-0" />
                </div>
                <div className="p-8">
                  <p className="text-ink-gradient text-2xl font-black font-['Outfit'] uppercase tracking-tight mb-2 leading-none">{item.title}</p>
                  <p className="text-[10px] font-black text-accent uppercase tracking-widest leading-none">{item.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


