import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Box, Type, MousePointer2, ExternalLink, Sparkles, ShieldCheck, Zap, Store } from "lucide-react";
import { HeroVideoEmbed } from "../components/HeroVideoEmbed";

export function BrandStyleGuide() {
    return (
        <div className="page-wrapper bg-page transition-colors duration-500">
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden hero-readable">
                <HeroVideoEmbed 
                    title="Brand Architecture"
                    posterImage="https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=2000"
                    videoSrc="/videos/design-system-hero.mp4"
                />
                <div className="relative z-10 text-center px-6">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }}>
                        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-accent/20 backdrop-blur-2xl border border-accent/30 mb-8 mx-auto">
                            <Box className="w-4 h-4 text-accent" />
                            <span className="text-[10px] font-black tracking-[0.4em] uppercase hero-video-kicker">Design System</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black font-['Outfit'] shadow-2xl uppercase tracking-tighter leading-none mb-6 text-ink-gradient">
                            Brand <span className="text-gradient">Assets.</span>
                        </h1>
                        <p className="text-xl hero-video-subtitle font-medium max-w-2xl mx-auto leading-relaxed text-[color:var(--text-dim)]">
                            A showcase of the strategic design elements, typography, and interactive components that define the UB City digital experience.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* TYPOGRAPHY */}
            <section className="py-24 px-6 md:px-12 bg-page border-t border-[var(--border)]">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex items-center gap-8 mb-20">
                        <div className="w-16 h-16 rounded-3xl bg-accent/10 flex items-center justify-center border border-accent/20">
                            <Type className="w-8 h-8 text-accent" />
                        </div>
                        <div>
                            <p className="text-accent text-[10px] font-black tracking-[0.5em] uppercase mb-2">Visual Language</p>
                            <h2 className="text-4xl md:text-6xl font-black font-['Outfit'] uppercase tracking-tighter text-ink-gradient">Typography <span className="text-gradient">& Inks.</span></h2>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="glass-pane rounded-[3rem] p-12 border border-[var(--border)]">
                            <h3 className="text-accent text-[10px] font-black uppercase tracking-[0.3em] mb-10">Headings & Hierarchy</h3>
                            <div className="space-y-12">
                                <div>
                                    <p className="text-ghost text-[10px] mb-4">H1 Display Heavy</p>
                                    <h1 className="text-7xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-none">The Collection.</h1>
                                </div>
                                <div>
                                    <p className="text-ghost text-[10px] mb-4">H2 Section Hero</p>
                                    <h2 className="text-5xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-none">Strategic Alliances.</h2>
                                </div>
                                <div>
                                    <p className="text-ghost text-[10px] mb-4">Ink Gradient Hero</p>
                                    <h1 className="text-6xl font-black text-gradient uppercase tracking-tighter leading-none shadow-gold">Luxury Reimagined.</h1>
                                </div>
                            </div>
                        </div>
                        <div className="glass-pane rounded-[3rem] p-12 border border-[var(--border)]">
                            <h3 className="text-accent text-[10px] font-black uppercase tracking-[0.3em] mb-10">Body & Utility</h3>
                            <div className="space-y-10">
                                <div>
                                    <p className="text-ghost text-[10px] mb-4">Main Body (18px SF Pro)</p>
                                    <p className="text-lg font-medium text-[color:var(--text-dim)] leading-relaxed">
                                        UB City is Bengaluru's first luxury mall, designed as a premium high-intent destination for the world's most discerning audiences.
                                    </p>
                                </div>
                                <div>
                                    <p className="text-ghost text-[10px] mb-4">Accent Utility (10px Black)</p>
                                    <p className="text-[10px] font-black uppercase tracking-[0.6em] text-accent">Worldwide Distribution Network</p>
                                </div>
                                <div>
                                    <p className="text-ghost text-[10px] mb-4">Dim Highlight</p>
                                    <p className="text-sm font-medium text-[color:var(--text-dim)]/70 italic">Footfall patterns based on Q4 2025 analytics.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BUTTONS */}
            <section className="py-24 px-6 md:px-12 bg-page-bg-alt/20 border-t border-[var(--border)]">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex items-center gap-8 mb-20">
                        <div className="w-16 h-16 rounded-3xl bg-accent/10 flex items-center justify-center border border-accent/20">
                            <MousePointer2 className="w-8 h-8 text-accent" />
                        </div>
                        <div>
                            <p className="text-accent text-[10px] font-black tracking-[0.5em] uppercase mb-2">Interactivity</p>
                            <h2 className="text-4xl md:text-6xl font-black font-['Outfit'] uppercase tracking-tighter text-ink-gradient">Call to <span className="text-gradient">Action.</span></h2>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* THE LUXE BUTTON */}
                        <div className="glass-pane rounded-[3rem] p-10 flex flex-col items-center justify-center text-center border border-[var(--border)]">
                            <p className="text-ghost text-[10px] mb-8 font-black uppercase tracking-widest">Btn Luxe (Primary)</p>
                            <button className="btn-luxe w-full">Start Your Journey</button>
                            <p className="mt-8 text-[11px] text-[color:var(--text-dim)] font-medium">Standardized for high-intent conversions and strategic calls.</p>
                        </div>

                        {/* SECONDARY GHOST */}
                        <div className="glass-pane rounded-[3rem] p-10 flex flex-col items-center justify-center text-center border border-[var(--border)]">
                            <p className="text-ghost text-[10px] mb-8 font-black uppercase tracking-widest">Ghost Outline (Secondary)</p>
                            <button className="px-12 py-5 rounded-full border border-accent/30 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-accent hover:text-black transition-all w-full flex items-center justify-center gap-4">
                                Discover More <ArrowRight className="w-4 h-4" />
                            </button>
                            <p className="mt-8 text-[11px] text-[color:var(--text-dim)] font-medium">Used for informational depth and non-primary explorations.</p>
                        </div>

                        {/* ICON TRAPS */}
                        <div className="glass-pane rounded-[3rem] p-10 flex flex-col items-center justify-center text-center border border-[var(--border)]">
                            <p className="text-ghost text-[10px] mb-8 font-black uppercase tracking-widest">Iconic Trap (System)</p>
                            <div className="flex gap-6">
                                <button className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center transition-all hover:bg-accent hover:text-black shadow-gold">
                                    <ExternalLink className="w-6 h-6" />
                                </button>
                                <button className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all hover:border-accent">
                                    <Sparkles className="w-6 h-6 text-accent" />
                                </button>
                            </div>
                            <p className="mt-10 text-[11px] text-[color:var(--text-dim)] font-medium">System controls for light/dark toggle and search.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CARDS */}
            <section className="py-24 px-6 md:px-12 bg-page border-t border-[var(--border)]">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex items-center gap-8 mb-20">
                        <div className="w-16 h-16 rounded-3xl bg-accent/10 flex items-center justify-center border border-accent/20">
                            <Box className="w-8 h-8 text-accent" />
                        </div>
                        <div>
                            <p className="text-accent text-[10px] font-black tracking-[0.5em] uppercase mb-2">Architecture</p>
                            <h2 className="text-4xl md:text-6xl font-black font-['Outfit'] uppercase tracking-tighter text-ink-gradient">The Card <span className="text-gradient">Matrix.</span></h2>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {/* LIGHTING CARD */}
                        <div className="glass-pane lighting-card rounded-[3.5rem] p-12 border border-[var(--border)]">
                             <div className="flex items-center gap-4 mb-10">
                                <span className="px-6 py-2 rounded-full bg-accent text-[10px] font-black text-black uppercase tracking-widest">Interactive</span>
                                <div className="h-px flex-1 bg-accent/20" />
                             </div>
                             <h3 className="text-3xl font-black text-ink-gradient mb-4 uppercase tracking-tighter leading-none">The Lighting Card.</h3>
                             <p className="text-[color:var(--text-dim)] font-medium leading-relaxed mb-8">Features a radial spotlight effect that follows the cursor on desktop, providing high tactile depth.</p>
                             <div className="flex items-center justify-between mt-auto">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Active State</span>
                                <ArrowRight className="w-6 h-6 text-accent" />
                             </div>
                        </div>

                         {/* PREMIUM CARD */}
                         <div className="glass-pane rounded-[3.5rem] overflow-hidden border border-[var(--border)] group">
                             <div className="aspect-video relative overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-t from-page to-transparent" />
                                <div className="absolute bottom-8 left-8">
                                    <h4 className="text-2xl font-black text-ink-gradient uppercase tracking-tighter">Luxe Image Trap</h4>
                                </div>
                             </div>
                             <div className="p-8">
                                <p className="text-[color:var(--text-dim)] text-sm mb-6">Standard component for retail, cinema, and dining listings with cinematic hover scaling.</p>
                                <div className="flex gap-4">
                                     <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent"><ShieldCheck className="w-5 h-5" /></div>
                                     <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent"><Zap className="w-5 h-5" /></div>
                                     <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent"><Store className="w-5 h-5" /></div>
                                </div>
                             </div>
                        </div>

                         {/* GLASS PANE */}
                         <div className="glass-pane rounded-[3.5rem] p-12 border border-[var(--border)] flex flex-col justify-center items-center text-center">
                             <div className="w-20 h-20 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center mb-10 shadow-gold">
                                <Sparkles className="w-10 h-10 text-accent" />
                             </div>
                             <h3 className="text-3xl font-black text-ink-gradient mb-6 uppercase tracking-tighter leading-none">Glass Morphic.</h3>
                             <p className="text-[color:var(--text-dim)] font-medium leading-relaxed">System-wide transparency layer (20px blur) used for modals, overlays, and secondary components.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}



