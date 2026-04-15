import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

export function Terms() {
  const sections = [
    {
      title: "Acceptance of Terms",
      body: "By accessing and using UB City Bengaluru digital services, you agree to comply with these Terms and all applicable laws and regulations.",
    },
    {
      title: "Account Responsibility",
      body: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
    },
    {
      title: "Orders, Payments, and Cancellations",
      body: "Order information, payment status, and cancellation policies are shown in your account area. UB City may update fulfillment timelines and order status as needed.",
    },
    {
      title: "Privacy and Data Usage",
      body: "We store profile and preference data to improve your experience. You can manage account settings and request account deletion from the Security Controls section.",
    },
    {
      title: "Intellectual Property",
      body: "All site content, graphics, and branding are protected by copyright and trademark laws. Unauthorized use is prohibited.",
    },
    {
      title: "Limitation of Liability",
      body: "UB City is not liable for indirect or consequential damages arising from use of this website, to the extent permitted by law.",
    },
  ];

  return (
    <div className="page-wrapper bg-page min-h-screen pt-32 md:pt-40 transition-colors duration-500 pb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="mb-12">
            <Link to="/" className="group inline-flex items-center gap-4 px-8 py-3 glass-pane border border-accent/30 rounded-full text-[9px] font-black uppercase tracking-[0.5em] text-accent hover:bg-accent hover:text-black transition-all shadow-gold">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" /> Return to Nexus
            </Link>
        </div>

        <section className="glass-pane lighting-card rounded-[4rem] p-12 md:p-20 border border-[var(--border)] shadow-2xl mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[80px] pointer-events-none" />
          <div className="flex items-center gap-4 mb-8">
             <div className="w-12 h-12 rounded-2xl bg-accent/20 border border-accent/20 flex items-center justify-center">
                <p className="text-accent font-black">§</p>
             </div>
             <p className="text-[11px] font-black uppercase tracking-[0.6em] text-accent">Legal Registry Protocol</p>
          </div>
          <h1 className="text-5xl md:text-8xl font-black font-['Outfit'] tracking-tighter text-ink-gradient uppercase leading-none mb-8">Governance & <span className="text-gradient">Mandates.</span></h1>
          <p className="text-xl md:text-2xl text-[color:var(--text-dim)] font-medium italic border-l-2 border-accent/30 pl-8 leading-relaxed max-w-4xl">
            Effective Deployment: {new Date().toLocaleDateString()}. Please review these operational parameters before initializing website services and secure transactions.
          </p>
        </section>

        <section className="space-y-8">
          {sections.map((section, i) => (
            <article key={section.title} className="glass-pane lighting-card rounded-[3rem] p-10 md:p-14 border border-[var(--border)] shadow-xl group hover:border-accent transition-all duration-700">
              <div className="flex items-center gap-6 mb-8">
                 <span className="text-accent font-black font-['Outfit'] text-2xl opacity-20 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
                 <h2 className="text-3xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-none group-hover:text-accent transition-colors">{section.title}</h2>
              </div>
              <p className="text-[color:var(--text-dim)] text-lg leading-relaxed font-medium italic opacity-80 group-hover:opacity-100 transition-opacity border-l border-[var(--border)] pl-8 group-hover:border-accent duration-700">{section.body}</p>
            </article>
          ))}
        </section>

        <div className="mt-20 p-12 glass-pane rounded-[3rem] border border-accent/20 text-center shadow-gold">
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-4">Secure Channel Acknowledgement</p>
           <p className="text-sm font-black text-ink-gradient opacity-60">By continuing to use this platform, you acknowledge full compliance with the registry parameters defined above.</p>
        </div>
      </div>
    </div>
  );
}

