import { motion } from "motion/react";
import { useParams, Link } from "react-router";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const inquiryConfig = {
  leasing: {
    title: "Retail Leasing",
    subtitle: "Secure premium footprint inside a high-traffic destination.",
    primaryCta: "Submit Leasing Interest",
    scopePlaceholder: "Desired footprint, target category, preferred zone, go-live timeline...",
  },
  sponsorship: {
    title: "Sponsorship & Partnerships",
    subtitle: "Activate brand campaigns across high-impact audience moments.",
    primaryCta: "Submit Sponsorship Brief",
    scopePlaceholder: "Campaign objectives, audience focus, preferred activation types, budget range...",
  },
  "venue-booking": {
    title: "Venue & Event Booking",
    subtitle: "Host concerts, product launches, and marquee experiences.",
    primaryCta: "Submit Event Booking Request",
    scopePlaceholder: "Event format, expected attendance, required venue features, target date windows...",
  },
} as const;

export function Inquire() {
  const { action } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const selectedConfig =
    (action && inquiryConfig[action as keyof typeof inquiryConfig]) || {
      title: "Commercial Inquiry",
      subtitle: "Connect with the commercial team for a tailored opportunity review.",
      primaryCta: "Submit Formal Disclosure",
      scopePlaceholder: "Provide business context, objectives, and requirements...",
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-page pt-20">
         <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center p-12 glass-pane rounded-[3rem] max-w-xl mx-auto shadow-2xl border border-[var(--border)]">
           <CheckCircle2 className="w-24 h-24 text-accent mb-8" />
           <h2 className="text-4xl font-['Outfit'] font-bold text-page mb-4">Request Successfully <br/>Routed</h2>
           <p className="text-muted-custom font-light mb-8 text-lg">Your inquiry for <strong className="text-page">{selectedConfig.title}</strong> has been logged. Our commercial team will contact your provided mobile number shortly.</p>
           <Link to="/" className="text-sm font-bold tracking-widest uppercase text-accent border border-accent rounded-full px-8 py-4 hover:bg-accent hover:text-[var(--btn-text-on-accent)] transition-all">
             Return to Destination
           </Link>
         </motion.div>
      </div>
    );
  }

  return (
    <div className="page-wrapper bg-page pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <Link to={-1 as any} className="inline-flex items-center gap-2 text-sm font-bold tracking-widest text-page opacity-50 hover:opacity-100 transition-opacity uppercase mb-12">
          <ArrowLeft className="w-4 h-4" /> Go Back
        </Link>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <p className="text-accent text-sm tracking-[0.4em] font-bold uppercase mb-4">Commercial Inquiry</p>
          <h1 className="text-5xl md:text-7xl font-['Outfit'] font-bold text-page mb-6">
            Initiate <span className="text-gold-gradient">{selectedConfig.title}</span>
          </h1>
          <p className="text-lg text-muted-custom font-light max-w-2xl">
            {selectedConfig.subtitle}
          </p>
        </motion.div>

        <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} onSubmit={handleSubmit} className="glass-pane rounded-[3rem] p-10 md:p-16 border border-[var(--glass-border)] shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-widest uppercase text-page opacity-60">Legal Entity / Brand Name</label>
              <input required type="text" className="w-full bg-page-alt border border-[var(--glass-border)] text-page rounded-xl px-5 py-4 focus:outline-none focus:border-accent transition-colors" placeholder="e.g. LVMH Group" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-widest uppercase text-page opacity-60">Primary Contact Focus</label>
              <select className="w-full bg-page-alt border border-[var(--glass-border)] text-page rounded-xl px-5 py-4 focus:outline-none focus:border-accent transition-colors cursor-pointer appearance-none">
                <option value="Executive">Executive / C-Suite</option>
                <option value="RealEstate">Real Estate Director</option>
                <option value="Agency">Agency Representative</option>
                <option value="Production">Event Production Lead</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-widest uppercase text-page opacity-60">Corporate Email</label>
              <input required type="email" className="w-full bg-page-alt border border-[var(--glass-border)] text-page rounded-xl px-5 py-4 focus:outline-none focus:border-accent transition-colors" placeholder="name@company.com" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-widest uppercase text-page opacity-60">Direct Mobile</label>
              <input required type="tel" className="w-full bg-page-alt border border-[var(--glass-border)] text-page rounded-xl px-5 py-4 focus:outline-none focus:border-accent transition-colors" placeholder="+1 (555) 000-0000" />
            </div>
          </div>
          
          <div className="flex flex-col gap-2 mb-12">
            <label className="text-xs font-bold tracking-widest uppercase text-page opacity-60">Scope of Inquiry</label>
            <textarea required rows={4} className="w-full bg-page-alt border border-[var(--glass-border)] text-page rounded-xl px-5 py-4 focus:outline-none focus:border-accent transition-colors" placeholder={selectedConfig.scopePlaceholder}></textarea>
          </div>

          <button type="submit" disabled={isLoading} className="w-full md:w-auto px-12 py-5 bg-page border border-[var(--border)] text-page font-bold tracking-widest uppercase text-sm rounded-full hover:bg-accent hover:border-accent hover:text-[var(--btn-text-on-accent)] transition-all flex items-center justify-center gap-3">
             {isLoading ? <span className="w-5 h-5 border-2 border-[var(--page-bg)] border-t-transparent rounded-full animate-spin" /> : selectedConfig.primaryCta}
          </button>
        </motion.form>
      </div>
    </div>
  );
}

