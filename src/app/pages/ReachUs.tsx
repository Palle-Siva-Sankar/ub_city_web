import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
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
    <div className="page-wrapper bg-page">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-page hero-readable">
        <HeroVideoEmbed
          title="Reach Us"
          posterImage={POSTERS.citySkyline}
          videoSrc={VIDEOS.citySkyline}
        />
        <div className="relative z-10 max-w-[1400px] mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 mb-8 mx-auto group hover:bg-white/10 transition-colors">
              <MapPin className="w-4 h-4 text-accent" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase hero-video-kicker">Find Us</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black font-['Outfit'] hero-video-title tracking-tighter uppercase leading-[0.95] mb-6">
              Reach <span className="text-gradient">Us.</span>
            </h1>
            <p className="text-xl hero-video-subtitle font-light max-w-2xl mx-auto leading-relaxed hero-video-glass p-4 rounded-2xl">
              Connect with luxury. We are located in the heart of the central business district.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards + Map */}
      <section className="pb-20 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12">
          {/* Info Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon: MapPin, label: "Address", value: CONTACT.address },
              { icon: Phone, label: "Phone", value: CONTACT.phone },
              { icon: Mail, label: "Email", value: CONTACT.email },
              { icon: Clock, label: "Hours", value: CONTACT.hours },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-pane p-8 rounded-[2rem] border border-[var(--glass-border)] hover:border-accent transition-all duration-500 group"
              >
                <item.icon className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold tracking-widest uppercase text-[color:var(--text-dim)] mb-2">{item.label}</p>
                <p className="text-[color:var(--text-main)] font-medium text-sm leading-relaxed">{item.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Map Embed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] overflow-hidden border border-[var(--glass-border)] shadow-2xl min-h-[400px]"
          >
            <iframe
              src={CONTACT.mapEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mall Location"
            />
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-6 md:px-10 bg-page-alt">
        <div className="max-w-[800px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold font-['Outfit'] text-[color:var(--text-main)] mb-8 text-center">Send Us a Message</h2>

            {submitted ? (
              <div className="text-center py-16">
                <Send className="w-16 h-16 text-accent mx-auto mb-6" />
                <h3 className="text-2xl font-bold font-['Outfit'] text-[color:var(--text-main)] mb-2">Message Sent!</h3>
                <p className="text-muted-custom font-light">Thank you for reaching out. We'll respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <input required type="text" placeholder="Your Name" className="w-full bg-page border border-[var(--border)] text-[color:var(--text-main)] rounded-xl px-5 py-4 focus:outline-none focus:border-accent transition-colors" />
                  <input required type="email" placeholder="Your Email" className="w-full bg-page border border-[var(--border)] text-[color:var(--text-main)] rounded-xl px-5 py-4 focus:outline-none focus:border-accent transition-colors" />
                </div>
                <input type="text" placeholder="Subject" className="w-full bg-page border border-[var(--border)] text-[color:var(--text-main)] rounded-xl px-5 py-4 focus:outline-none focus:border-accent transition-colors" />
                <textarea required rows={5} placeholder="Your Message" className="w-full bg-page border border-[var(--border)] text-[color:var(--text-main)] rounded-xl px-5 py-4 focus:outline-none focus:border-accent transition-colors resize-none" />
                <button type="submit" className="w-full px-8 py-5 bg-accent text-[var(--btn-text-on-accent)] font-bold tracking-widest uppercase text-sm rounded-full hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

