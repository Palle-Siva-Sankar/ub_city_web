import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Sun, Moon, Search, Globe, User, ChevronDown, Heart, ShoppingCart, MapPin, ArrowLeft, Package, ArrowRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { SearchOverlay } from "./SearchOverlay";
import { OrdersHub } from "./OrdersHub";
import { CookieBanner } from "./CookieBanner";
import { Footer } from "./Footer";
import { SalesDock } from "./SalesDock";
import { SHOPPING_CATEGORIES } from "../data/mallData";
import { useWishlist, useCart, useOrders, useUserSession } from "../hooks/useFeatures";
import { useLenis } from "lenis/react";


const navItems = [
    { path: "/", label: "Home" },
    { path: "/shopping", label: "Shopping", hasDropdown: true },
    { path: "/dine", label: "Dine" },
    { path: "/entertainment", label: "Entertainment" },
    { path: "/cinema", label: "Cinema" },
    { path: "/gallery", label: "Gallery" },
    { path: "/reach-us", label: "Reach Us" },
];

const quickMenuItems = [
    { path: "/reach-us", label: "Location", icon: MapPin },
    { path: "/cart", label: "Cart", icon: ShoppingCart },
    { path: "/profile", label: "Profile", icon: User },
];

const languages = [
    { code: "EN", label: "English" },
    { code: "FR", label: "Français" },
    { code: "AR", label: "العربية" },
    { code: "ZH", label: "中文" },
];

export function Layout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isOrdersOpen, setIsOrdersOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { toggleTheme, isDark } = useTheme();
    const { count: wishlistCount } = useWishlist();
    const { count: cartCount } = useCart();
    const lenis = useLenis();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }

        if (location.hash === "#orders") {
            setIsOrdersOpen(true);
        }
    }, [location, lenis]);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [isMenuOpen]);

    return (
        <div className="relative min-h-screen">
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <OrdersHub isOpen={isOrdersOpen} onClose={() => setIsOrdersOpen(false)} />

            {/* ─── Apple Navbar ─── */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    scrolled ? "h-12 border-b" : "h-16"
                }`}
                style={{ 
                    backgroundColor: "var(--nav-bg)", 
                    backdropFilter: "blur(20px) saturate(180%)",
                    borderColor: scrolled ? "var(--border)" : "transparent"
                }}
            >
                <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-4 sm:gap-6">
                        {location.pathname !== "/" && (
                            <button 
                                onClick={() => navigate(-1)}
                                className="w-10 h-10 rounded-full glass-pane border border-[var(--border)] flex items-center justify-center hover:border-accent hover:bg-accent hover:text-black transition-all group/back shadow-lg"
                                aria-label="Go back"
                            >
                                <ArrowLeft className="w-5 h-5 text-ink-gradient group-hover:text-black transition-colors" />
                            </button>
                        )}
                        <Link to="/" className="text-xl font-bold tracking-tighter hover:opacity-70 transition-opacity flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-gold flex items-center justify-center text-white text-xs font-black shadow-gold">UB</div>
                            <span className="hidden sm:inline text-ink-gradient">UB CITY</span>
                        </Link>
                    </div>

                    <nav className="hidden lg:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 relative group ${
                                    location.pathname === item.path ? "text-accent" : "text-ink-gradient opacity-60 hover:opacity-100"
                                }`}
                            >
                                {item.label}
                                <span className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-500 ${location.pathname === item.path ? "w-full" : "w-0 group-hover:w-full"}`} />
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-6">
                        <button onClick={() => setIsSearchOpen(true)} className="w-10 h-10 rounded-full glass-pane border border-[var(--border)] flex items-center justify-center hover:border-accent transition-all group">
                            <Search className="w-4 h-4 text-ink-gradient group-hover:text-accent transition-colors" />
                        </button>
                        
                        <div className="hidden sm:flex items-center gap-6">
                            <Link to="/wishlist" className="relative w-10 h-10 rounded-full glass-pane border border-[var(--border)] flex items-center justify-center hover:border-accent transition-all group">
                                <Heart className={`w-4 h-4 ${wishlistCount > 0 ? "text-accent fill-accent" : "text-ink-gradient group-hover:text-accent transition-colors"}`} />
                                {wishlistCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-[9px] font-black text-black flex items-center justify-center rounded-lg shadow-gold">
                                        {wishlistCount}
                                    </span>
                                )}
                            </Link>

                            <Link to="/cart" className="relative w-10 h-10 rounded-full glass-pane border border-[var(--border)] flex items-center justify-center hover:border-accent transition-all group">
                                <ShoppingCart className={`w-4 h-4 ${cartCount > 0 ? "text-accent fill-accent" : "text-ink-gradient group-hover:text-accent transition-colors"}`} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-[9px] font-black text-black flex items-center justify-center rounded-lg shadow-gold">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            <button onClick={() => setIsOrdersOpen(true)} className="relative w-10 h-10 rounded-full glass-pane border border-[var(--border)] flex items-center justify-center hover:border-accent transition-all group">
                                <Package className="w-4 h-4 text-ink-gradient group-hover:text-accent transition-colors" />
                            </button>

                            <Link to="/login" className="relative w-10 h-10 rounded-full glass-pane border border-[var(--border)] flex items-center justify-center hover:border-accent transition-all group">
                                <User className="w-4 h-4 text-ink-gradient group-hover:text-accent transition-colors" />
                            </Link>
                            
                            {/* Language Picker */}
                            <div className="relative group">
                                <button className="flex items-center gap-3 px-4 py-2 rounded-full glass-pane border border-[var(--border)] hover:border-accent transition-all">
                                    <Globe className="w-4 h-4 text-ink-gradient" />
                                    <span className="text-[10px] font-black text-ink-gradient uppercase tracking-widest">EN</span>
                                </button>
                                <div className="absolute top-full right-0 mt-4 w-48 glass-pane rounded-3xl p-4 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-700 shadow-2xl border border-[var(--border)] z-[60]">
                                     <p className="text-[9px] font-black uppercase tracking-[0.4em] text-accent mb-4 px-3">Select Language</p>
                                    <div className="space-y-1">
                                        {languages.map((lang) => (
                                            <button key={lang.code} className="w-full text-left px-4 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest text-ink-gradient hover:bg-accent hover:text-black transition-all">
                                                {lang.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button onClick={toggleTheme} className="w-10 h-10 rounded-full glass-pane border border-[var(--border)] flex items-center justify-center hover:border-accent transition-all group">
                            {isDark ? <Sun className="w-4 h-4 text-ink-gradient group-hover:text-accent transition-colors" /> : <Moon className="w-4 h-4 text-ink-gradient group-hover:text-accent transition-colors" />}
                        </button>
                        
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden w-10 h-10 rounded-full glass-pane border border-[var(--border)] flex items-center justify-center hover:border-accent transition-all">
                            {isMenuOpen ? <X className="w-5 h-5 text-accent" /> : <Menu className="w-5 h-5 text-ink-gradient" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* ─── Mobile Nav ─── */}
            <AnimatePresence mode="wait">
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="fixed inset-0 z-40 lg:hidden h-[100dvh] w-screen overflow-y-auto overflow-x-hidden bg-page/98 dark:bg-black/98 custom-scrollbar overscroll-contain touch-pan-y pt-32 px-8 pb-32"
                        style={{ WebkitOverflowScrolling: 'touch' }}
                    >
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] pointer-events-none" />
                        
                        <nav className="relative z-10 flex flex-col gap-12">
                            <div className="space-y-6">
                                 <p className="text-[11px] font-black uppercase tracking-[0.8em] text-accent">Navigation</p>
                                <div className="grid grid-cols-1 gap-4">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className="text-2xl font-black font-['Outfit'] tracking-tighter py-2 text-ink-gradient hover:text-accent transition-all duration-500 uppercase leading-none border-b border-[var(--border)]/10"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                 <p className="text-[11px] font-black uppercase tracking-[0.8em] text-accent">Categories</p>
                                <div className="grid grid-cols-2 gap-4">
                                    {SHOPPING_CATEGORIES.slice(0, 6).map((cat) => (
                                        <Link
                                            key={cat.slug}
                                            to={`/shopping/category/${cat.slug}`}
                                            className="glass-pane border border-[var(--border)] rounded-3xl p-6 text-xs font-black uppercase tracking-widest text-ink-gradient hover:border-accent hover:text-accent transition-all"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {cat.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                 <p className="text-[11px] font-black uppercase tracking-[0.8em] text-accent">Order Management</p>
                                <button 
                                    onClick={() => { setIsMenuOpen(false); setIsOrdersOpen(true); }}
                                    className="w-full glass-pane border border-accent/30 rounded-[2.5rem] p-8 flex items-center justify-between group hover:border-accent transition-all shadow-gold"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all">
                                            <Package className="w-6 h-6" />
                                        </div>
                                        <div className="text-left">
                                             <p className="text-lg font-black font-['Outfit'] text-ink-gradient uppercase leading-none">Track My Orders</p>
                                             <p className="text-[9px] font-bold text-accent uppercase tracking-widest mt-1">Order History & Tracking</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-accent" />
                                </button>
                            </div>

                            <motion.div 
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="mt-auto pt-10 border-t border-[var(--border)]"
                            >
                                <div className="grid grid-cols-4 gap-6 mb-12">
                                    <Link to="/reach-us" className="flex flex-col items-center gap-4 group" onClick={() => setIsMenuOpen(false)}>
                                        <div className="w-16 h-16 rounded-[1.5rem] glass-pane border border-[var(--border)] flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all shadow-gold"><MapPin className="w-6 h-6" /></div>
                                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-accent">Map</span>
                                    </Link>
                                    <Link to="/wishlist" className="flex flex-col items-center gap-4 group relative" onClick={() => setIsMenuOpen(false)}>
                                        <div className="w-16 h-16 rounded-[1.5rem] glass-pane border border-[var(--border)] flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all shadow-gold"><Heart className="w-6 h-6" /></div>
                                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-accent">Wishlist</span>
                                        {wishlistCount > 0 && <span className="absolute -top-1 right-2 w-6 h-6 bg-accent text-[10px] font-black text-white flex items-center justify-center rounded-xl shadow-gold">{wishlistCount}</span>}
                                    </Link>
                                    <Link to="/cart" className="flex flex-col items-center gap-4 group relative" onClick={() => setIsMenuOpen(false)}>
                                        <div className="w-16 h-16 rounded-[1.5rem] glass-pane border border-[var(--border)] flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all shadow-gold"><ShoppingCart className="w-6 h-6" /></div>
                                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-accent">Cart</span>
                                        {cartCount > 0 && <span className="absolute -top-1 right-2 w-6 h-6 bg-accent text-[10px] font-black text-white flex items-center justify-center rounded-xl shadow-gold">{cartCount}</span>}
                                    </Link>
                                    <Link to="/profile" className="flex flex-col items-center gap-4 group" onClick={() => setIsMenuOpen(false)}>
                                        <div className="w-16 h-16 rounded-[1.5rem] glass-pane border border-[var(--border)] flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all shadow-gold"><User className="w-6 h-6" /></div>
                                         <span className="text-[9px] font-black uppercase tracking-[0.3em] text-accent">Profile</span>
                                    </Link>
                                </div>

                                <div className="flex items-center justify-center gap-3 flex-wrap">
                                    {languages.map(lang => (
                                        <button key={lang.code} className="px-6 py-3 rounded-full glass-pane border border-[var(--border)] text-[10px] font-black text-accent uppercase tracking-[0.4em] hover:bg-accent hover:text-white transition-all shadow-lg active:scale-95">
                                            {lang.code}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        </nav>
                </motion.div>
                )}
            </AnimatePresence>

            <main className="relative">
                <Outlet />
            </main>

            <SalesDock />
            <Footer />
            <CookieBanner />
        </div>
    );
}

