import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Globe } from "lucide-react";
import { NewsletterSignup } from "./NewsletterSignup";

const footerNav = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Why MOA", to: "/demographics" },
  { label: "Retail", to: "/retail" },
  { label: "Luxury", to: "/luxury" },
  { label: "Dining", to: "/dine" },
  { label: "Attractions", to: "/attractions" },
  { label: "Events", to: "/events" },
  { label: "Terms", to: "/terms" },
];

const businessNav = [
  { label: "Start Leasing", to: "/inquire/leasing" },
  { label: "Start Sponsorship", to: "/inquire/sponsorship" },
  { label: "Book A Venue", to: "/inquire/venue-booking" },
  { label: "Sponsorship", to: "/sponsorship" },
  { label: "Leasing", to: "/leasing" },
  { label: "Venues", to: "/venues" },
  { label: "Demographics", to: "/demographics" },
];

const designNav = [
  { label: "Design System", to: "/brand-style-guide" },
  { label: "Cards & Grids", to: "/brand-style-guide#cards" },
  { label: "Buttons & CTAs", to: "/brand-style-guide#buttons" },
  { label: "Typography", to: "/brand-style-guide#typography" },
  { label: "Strategy Deck", to: "/strategy" },
];

export function Footer({ hideCTA = false }: { hideCTA?: boolean }) {
  const socialLinks = [
    { label: "Instagram", href: "https://www.instagram.com/mallofamerica/", icon: Instagram },
    { label: "Facebook", href: "https://www.facebook.com/MallofAmerica/", icon: Facebook },
    { label: "X", href: "https://x.com/mallofamerica", icon: Twitter },
    { label: "Website", href: "https://www.mallofamerica.com/", icon: Globe },
  ];

  return (
    <footer className="relative mt-24 border-t border-[var(--border)] transition-colors duration-500 bg-page">
      {/* CTA Banner */}
      {!hideCTA && (
        <div className="relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-accent/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16 text-center lg:text-left">
              <div className="max-w-3xl">
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
                   <div className="w-12 h-px bg-accent" />
                   <p className="text-accent text-[11px] font-black tracking-[0.6em] uppercase">Sector Opportunities</p>
                </div>
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-['Outfit'] mb-8 text-ink-gradient uppercase tracking-tighter leading-none">
                  Initialize Your <span className="text-gradient">Global Presence.</span>
                </h2>
                <p className="text-2xl text-[color:var(--text-dim)] font-medium italic border-l-2 border-accent/20 pl-8 leading-relaxed">
                  Join the world's most iconic retail and entertainment platform. Deploy your brand within our 40-million-guest ecosystem.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto shrink-0">
                <Link
                  to="/leasing"
                  className="btn-luxe px-12 py-5"
                >
                  Explore Nexus <ArrowRight className="w-5 h-5 ml-4" />
                </Link>
                <a
                  href="mailto:guestservice@mallofamerica.com"
                  className="px-12 py-5 rounded-full glass-pane border border-[var(--border)] font-black tracking-[0.4em] uppercase text-[10px] hover:border-accent hover:text-accent transition-all duration-500 !text-accent"
                >
                  Secure Dialogue
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer */}
      <div className="border-t border-[var(--border)] bg-page/50 backdrop-blur-3xl transition-colors duration-500">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24">
            <div className="space-y-10 lg:col-span-1">
              <div>
                <Link to="/" className="text-2xl font-black tracking-tighter text-ink-gradient flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-gold flex items-center justify-center text-white text-[10px] shadow-gold">MOA</div>
                    MALL OF AMERICA
                </Link>
                <p className="text-[color:var(--text-dim)] text-sm font-black uppercase tracking-[0.1em] leading-relaxed mb-10 opacity-60">
                  Mall of America - North America's premier high-fidelity retail, gastronomy, and attraction destination.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-5 group">
                  <div className="w-10 h-10 rounded-xl glass-pane border border-[var(--border)] flex items-center justify-center group-hover:border-accent transition-colors">
                    <MapPin className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-ink-gradient opacity-80 group-hover:opacity-100">60 East Broadway, Bloomington, MN</span>
                </div>
                <div className="flex items-center gap-5 group">
                  <div className="w-10 h-10 rounded-xl glass-pane border border-[var(--border)] flex items-center justify-center group-hover:border-accent transition-colors">
                    <Phone className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-ink-gradient opacity-80 group-hover:opacity-100">+1 952 883 8800</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-black tracking-[0.6em] text-accent uppercase mb-10">Sector Map</h4>
              <nav className="space-y-4">
                {footerNav.map((item) => (
                  <Link key={item.to} to={item.to} className="block text-xs font-black uppercase tracking-[0.2em] text-ink-gradient opacity-60 hover:opacity-100 hover:text-accent transition-all duration-300">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h4 className="text-[10px] font-black tracking-[0.6em] text-accent uppercase mb-10">Business Protocols</h4>
              <nav className="space-y-4">
                {businessNav.map((item) => (
                  <Link key={item.to} to={item.to} className="block text-xs font-black uppercase tracking-[0.2em] text-ink-gradient opacity-60 hover:opacity-100 hover:text-accent transition-all duration-300">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="space-y-12">
              <div>
                <h4 className="text-[10px] font-black tracking-[0.6em] text-accent uppercase mb-10">Nexus Synchronize</h4>
                <div className="flex flex-wrap gap-4 mb-8">
                  {socialLinks.map((platform) => (
                    <motion.a
                      key={platform.label}
                      href={platform.href}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-2xl glass-pane border border-[var(--border)] flex items-center justify-center text-ink-gradient hover:border-accent hover:text-accent transition-all duration-500 shadow-lg"
                      aria-label={platform.label}
                    >
                      <platform.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-[10px] font-black tracking-[0.6em] text-accent uppercase mb-8">Intelligence Feed</h4>
                <NewsletterSignup />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[var(--border)] bg-page-bg-alt transition-colors duration-500">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-[9px] font-black uppercase tracking-[0.5em] text-ink-gradient opacity-40">© {new Date().getFullYear()} MALL OF AMERICA. NORTH AMERICA'S ICONIC DESTINATION.</p>
          <div className="flex items-center gap-8">
             <p className="text-[9px] font-black uppercase tracking-[0.5em] text-ink-gradient opacity-40">Operational Status: Optimal</p>
             <p className="text-[9px] font-black uppercase tracking-[0.5em] text-accent">Internal Registry Only</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
