import { motion } from "motion/react";
import { Link } from "react-router";
import { MapPin, Phone, Mail, Clock, Send, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { CONTACT } from "../data/mallData";
import { VIDEOS, POSTERS } from "../data/mediaAssets";
import { HeroVideoEmbed } from "../components/HeroVideoEmbed";

export function ReachUs() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="page-wrapper bg-page min-h-screen transition-colors duration-500 pb-32">
      {/* Hero */}
      <section className="relative min-h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-page hero-readable">
        <HeroVideoEmbed
          title="Reach Us"
          posterImage={POSTERS.citySkyline}
          videoSrc={VIDEOS.citySkyline}
        />
        <div className="absolute inset-0 bg-page/30 dark:bg-black/30 pointer-events-none" />
        <div className="relative z-10 max-w-[1400px] mx-auto text-center px-6">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }}>
            <div className="mb-12">
               <Link to="/" className="group inline-flex items-center gap-4 px-8 py-3 glass-pane border border-accent/30 rounded-full text-[9px] font-black uppercase tracking-[0.5em] text-accent hover:bg-accent hover:text-black transition-all shadow-gold mx-auto pointer-events-auto">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" /> Back to Home
               </Link>
            </div>
            <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full glass-pane border border-accent/40 mb-10 mx-auto group hover:bg-accent hover:text-black transition-all shadow-gold">
              <MapPin className="w-5 h-5 text-accent group-hover:text-black transition-colors" />
              <span className="text-[10px] font-black tracking-[0.6em] uppercase text-accent group-hover:text-black transition-colors">Premium Destination</span>
            </div>
            <h1 className="text-7xl md:text-[10rem] lg:text-[12rem] font-black font-['Outfit'] tracking-tighter uppercase leading-none text-ink-gradient shadow-2xl mb-8">
              Reach <span className="text-gradient">Us.</span>
            </h1>
            <p className="text-2xl md:text-3xl font-black font-['Outfit'] italic max-w-3xl mx-auto leading-tight hero-video-glass p-10 rounded-[4rem] text-ink-gradient border border-[var(--border)] shadow-2xl">
              Visit us at the heart of the city's finest business and luxury district.
            </p>
          </motion.div>
        </div>
        <div className="video-gradient-mask" />
      </section>

      {/* Contact Cards + Map */}
      <section className="py-40 px-6 md:px-12 bg-page relative z-10 transition-colors duration-500">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-20">
          {/* Info Cards */}
          <div className="grid sm:grid-cols-2 gap-10">
            {[
              { icon: MapPin, label: "Our Address", value: CONTACT.address },
              { icon: Phone, label: "Phone Support", value: CONTACT.phone },
              { icon: Mail, label: "Email Inquiry", value: CONTACT.email },
              { icon: Clock, label: "Working Hours", value: CONTACT.hours },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1, margin: "-10px" }}
                transition={{ delay: i * 0.1, duration: 1 }}
                className="glass-pane lighting-card p-12 rounded-[4rem] border border-[var(--border)] hover:border-accent group transition-all duration-700 shadow-xl overflow-hidden relative"
              >
                <div className="absolute top-0 left-0 w-32 h-32 bg-accent/5 blur-[60px] pointer-events-none" />
                <div className="w-20 h-20 rounded-[1.8rem] bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-10 group-hover:bg-accent group-hover:text-black transition-all shadow-lg relative z-10">
                   <item.icon className="w-10 h-10" />
                </div>
                <p className="text-[10px] font-black tracking-[0.6em] uppercase text-accent mb-6 leading-none relative z-10 opacity-70">{item.label}</p>
                <p className="text-ink-gradient font-black text-2xl md:text-3xl font-['Outfit'] leading-tight tracking-tighter mb-4 uppercase relative z-10">
                   {item.value.split(',')[0]}
                   <span className="block text-sm text-[color:var(--text-dim)] mt-4 font-black normal-case tracking-widest opacity-60 uppercase">
                      {item.value.split(',').slice(1).join(',')}
                   </span>
                </p>
              </motion.div>
            ))}
          </div>

          {/* Map Embed */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1, margin: "-10px" }}
            className="rounded-[5rem] overflow-hidden border border-[var(--border)] shadow-gold min-h-[600px] relative lighting-card group"
          >
            <iframe
              src={CONTACT.mapEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "600px", filter: "grayscale(1) invert(0.1) contrast(1.1) brightness(0.9)" }}
              className="dark:invert dark:grayscale dark:contrast-125 transition-all duration-1000 group-hover:grayscale-0 group-hover:invert-0 group-hover:contrast-100"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mall Location"
            />
            <div className="absolute inset-0 pointer-events-none border-[20px] border-[var(--page-bg)]/20 shadow-inner" />
            <div className="absolute top-10 left-10 glass-pane p-6 rounded-3xl border border-accent/30 pointer-events-none shadow-gold">
               <p className="text-accent text-[10px] font-black tracking-[0.4em] uppercase">Interactive Map</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-40 px-6 md:px-12 bg-page-bg-alt relative border-t border-[var(--border)] transition-colors duration-500">
        <div className="max-w-[1000px] mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.1, margin: "-10px" }}>
            <div className="text-center mb-24">
               <div className="flex items-center justify-center gap-6 mb-8">
                  <div className="w-16 h-px bg-accent" />
                  <p className="text-accent text-[11px] font-black tracking-[0.8em] uppercase">Get in Touch</p>
                  <div className="w-16 h-px bg-accent" />
               </div>
               <h2 className="text-6xl md:text-[8rem] font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-[0.9] mb-8">Send a <br/><span className="text-gradient">Message.</span></h2>
               <p className="text-xl md:text-2xl text-[color:var(--text-dim)] font-medium italic border-l-2 border-accent/30 pl-8 inline-block">Our dedicated team will assist you with your queries.</p>
            </div>

            <div className="glass-pane lighting-card rounded-[5rem] p-12 md:p-24 border border-[var(--border)] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 blur-[120px] pointer-events-none" />
              {submitted ? (
                <div className="text-center py-24">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-32 h-32 rounded-[2.5rem] bg-accent text-black flex items-center justify-center mx-auto mb-12 shadow-gold">
                    <Send className="w-14 h-14" />
                  </motion.div>
                  <h3 className="text-5xl font-black font-['Outfit'] text-ink-gradient mb-6 uppercase tracking-tighter">Message Sent</h3>
                  <p className="text-2xl text-[color:var(--text-dim)] font-medium italic">Your message has been received. We'll respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-12 relative z-10">
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <label className="text-[11px] font-black tracking-[0.4em] uppercase text-accent ml-8">Your Name</label>
                      <input required type="text" placeholder="John Doe" className="w-full glass-pane border border-[var(--border)] text-ink-gradient rounded-[2.5rem] px-12 py-8 focus:outline-none focus:border-accent transition-all duration-500 font-black text-sm placeholder:opacity-20 hover:border-accent/40" />
                    </div>
                    <div className="space-y-6">
                      <label className="text-[11px] font-black tracking-[0.4em] uppercase text-accent ml-8">Email Address</label>
                      <input required type="email" placeholder="john@example.com" className="w-full glass-pane border border-[var(--border)] text-ink-gradient rounded-[2.5rem] px-12 py-8 focus:outline-none focus:border-accent transition-all duration-500 font-black text-sm placeholder:opacity-20 hover:border-accent/40" />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <label className="text-[11px] font-black tracking-[0.4em] uppercase text-accent ml-8">Subject</label>
                    <input type="text" placeholder="Leasing / Concierge / Feedback" className="w-full glass-pane border border-[var(--border)] text-ink-gradient rounded-[2.5rem] px-12 py-8 focus:outline-none focus:border-accent transition-all duration-500 font-black text-sm placeholder:opacity-20 hover:border-accent/40" />
                  </div>
                  <div className="space-y-6">
                    <label className="text-[11px] font-black tracking-[0.4em] uppercase text-accent ml-8">Your Message</label>
                    <textarea required rows={6} placeholder="How can we help you?" className="w-full glass-pane border border-[var(--border)] text-ink-gradient rounded-[4rem] px-12 py-10 focus:outline-none focus:border-accent transition-all duration-500 resize-none font-medium italic text-xl leading-relaxed placeholder:opacity-20 hover:border-accent/40" />
                  </div>
                  <button type="submit" className="btn-luxe w-full mt-10 py-10 text-sm shadow-gold group">
                    <Send className="w-6 h-6 mr-4 group-hover:translate-x-2 transition-transform" /> Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}




