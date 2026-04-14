import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Globe } from "lucide-react";
import { NewsletterSignup } from "./NewsletterSignup";

const footerNav = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Why UB City", to: "/demographics" },
  { label: "Retail", to: "/retail" },
  { label: "Luxury", to: "/luxury" },
  { label: "Dining & Lifestyle", to: "/dining" },
  { label: "Attractions", to: "/entertainment" },
  { label: "Events", to: "/events" },
  { label: "Terms & Conditions", to: "/terms" },
];

const businessNav = [
  { label: "Start Leasing", to: "/inquire/leasing" },
  { label: "Start Sponsorship", to: "/inquire/sponsorship" },
  { label: "Book A Venue", to: "/inquire/venue-booking" },
  { label: "Sponsorship", to: "/sponsorship" },
  { label: "Leasing", to: "/leasing" },
  { label: "Venues", to: "/venues" },
  { label: "Demographics", to: "/demographics" },
  { label: "Strategy Deck", to: "/strategy" },
];

export function Footer() {
  const socialLinks = [
    { label: "Instagram", href: "https://www.instagram.com/ubcity.bangalore/", icon: Instagram },
    { label: "Facebook", href: "https://www.facebook.com/ubcity/", icon: Facebook },
    { label: "X", href: "https://x.com/ubcitybangalore", icon: Twitter },
    { label: "Website", href: "https://www.ubcity.com/", icon: Globe },
  ];

  return (
    <footer className="relative mt-12" style={{ backgroundColor: "var(--page-bg)", borderTop: "1px solid var(--card-border)" }}>
      {/* CTA Banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-accent/5 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Outfit'] mb-3 text-page">
                Ready to Be Part of <span className="text-gold-gradient">Something Extraordinary</span>?
              </h2>
              <p className="text-muted-custom text-base sm:text-lg max-w-xl">
                Join premium global brands at Bengaluru's iconic luxury destination.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/leasing"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold bg-accent rounded-full hover:bg-accent/90 transition-all duration-300 cta-shadow"
                style={{ color: "var(--btn-text-on-accent)" }}
              >
                Explore Opportunities <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="mailto:contact@ubcitybangalore.in"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-page rounded-full hover:bg-accent/5 transition-all duration-300"
                style={{ border: "1px solid var(--card-border)" }}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div style={{ borderTop: "1px solid var(--card-border)" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h3 className="text-lg font-bold tracking-[0.15em] font-['Outfit'] text-accent mb-4">
                UB CITY BENGALURU
              </h3>
              <p className="text-muted-custom text-sm leading-relaxed mb-6">
                The Collection at UB City - luxury shopping, dining, events, and lifestyle destination in Bengaluru.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-custom">
                  <MapPin className="w-4 h-4 text-accent/60 shrink-0" />
                  <span>The Collection, UB City, Vittal Mallya Road, Bengaluru</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-custom">
                  <Phone className="w-4 h-4 text-accent/60 shrink-0" />
                  <span>+91 80 4177 1111</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-custom">
                  <Mail className="w-4 h-4 text-accent/60 shrink-0" />
                  <span>contact@ubcitybangalore.in</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold tracking-[0.2em] text-faint uppercase mb-6">Explore</h4>
              <nav className="space-y-3">
                {footerNav.map((item) => (
                  <Link key={item.to} to={item.to} className="block text-sm text-muted-custom hover:text-accent transition-colors duration-300">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h4 className="text-xs font-semibold tracking-[0.2em] text-faint uppercase mb-6">Business</h4>
              <nav className="space-y-3">
                {businessNav.map((item) => (
                  <Link key={item.to} to={item.to} className="block text-sm text-muted-custom hover:text-accent transition-colors duration-300">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h4 className="text-xs font-semibold tracking-[0.2em] text-faint uppercase mb-6">Connect</h4>
              <div className="flex flex-wrap gap-3 mb-4">
                {socialLinks.map((platform) => (
                  <motion.a
                    key={platform.label}
                    href={platform.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-custom hover:text-accent transition-all duration-300"
                    aria-label={platform.label}
                    title={platform.label}
                  >
                    <platform.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
              <p className="text-xs text-muted-custom mb-6">
                Follow UB City on its official channels.
              </p>
              <h4 className="text-xs font-semibold tracking-[0.2em] text-faint uppercase mb-4">Newsletter</h4>
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ borderTop: "1px solid var(--card-border)" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ghost">© {new Date().getFullYear()} UB City Bengaluru. Interactive Experience.</p>
          <p className="text-xs text-ghost">Built for prospective partners, tenants, and sponsors.</p>
        </div>
      </div>
    </footer>
  );
}
