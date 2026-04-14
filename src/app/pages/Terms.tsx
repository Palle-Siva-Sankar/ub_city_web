
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
    <div className="page-wrapper bg-page min-h-screen pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 pb-20">
        <section className="glass-pane rounded-[2rem] p-6 md:p-8">
          <p className="text-[10px] uppercase tracking-[0.2em] text-accent mb-2 font-black">Legal</p>
          <h1 className="text-3xl md:text-5xl font-black font-['Outfit'] tracking-tight">Terms & Conditions</h1>
          <p className="text-[color:var(--text-dim)] mt-3">
            Effective date: {new Date().toLocaleDateString()}. Please review these terms before using the website and services.
          </p>
        </section>

        <section className="mt-6 space-y-4">
          {sections.map((section) => (
            <article key={section.title} className="glass-pane rounded-2xl p-5 md:p-6 border border-white/10">
              <h2 className="text-xl font-black font-['Outfit'] mb-2">{section.title}</h2>
              <p className="text-[color:var(--text-dim)] leading-relaxed">{section.body}</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

