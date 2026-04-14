import { Outlet, Link, useLocation } from "react-router";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Sun, Moon, Search, Globe, User, ChevronDown, Heart, ShoppingCart, MapPin } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { SearchOverlay } from "./SearchOverlay";
import { CookieBanner } from "./CookieBanner";
import { Footer } from "./Footer";
import { SalesDock } from "./SalesDock";
import { SHOPPING_CATEGORIES } from "../data/mallData";
import { useWishlist } from "../hooks/useFeatures";
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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isShoppingOpen, setIsShoppingOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme, toggleTheme, isDark } = useTheme();
    const { count: wishlistCount } = useWishlist();
    const reduceMotion = useReducedMotion();
    const lenis = useLenis();

    // Pause Lenis smooth scroll when hamburger menu is open so native overflow-y scroll works
    useEffect(() => {
        if (!lenis) return;
        if (isMenuOpen) {
            lenis.stop();
        } else {
            lenis.start();
        }
    }, [isMenuOpen, lenis]);

    const langRef = useRef<HTMLDivElement>(null);
    const shoppingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", handleScroll, { passive: true });

        const handleClickOutside = (e: MouseEvent) => {
            if (langRef.current && !langRef.current.contains(e.target as Node)) {
                setIsLangOpen(false);
            }
            if (shoppingRef.current && !shoppingRef.current.contains(e.target as Node)) {
                setIsShoppingOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
        setIsLangOpen(false);
        setIsShoppingOpen(false);
        window.scrollTo(0, 0);
    }, [location]);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    return (
        <div className="page-wrapper relative min-h-screen">
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

            {/* ─── Fixed Navbar ─── */}
            <AnimatePresence>
                <motion.header
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    exit={{ y: -100 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow,height] duration-500 ${scrolled ? "backdrop-blur-md h-16 border-b nav-shadow" : "h-20 max-lg:border-b max-lg:backdrop-blur-sm"
                        }`}
                    style={{ backgroundColor: "var(--nav-bg)", borderColor: "var(--card-border)" }}
                >
                    <div className="max-w-[1400px] mx-auto px-3 sm:px-6 md:px-10 py-3.5 md:py-4.5 flex items-center justify-between gap-2 sm:gap-4 min-w-0">

                        {/* Logo */}
                        <Link to="/" className="shrink-0 group min-w-0 max-w-[46%] sm:max-w-none" aria-label="UB City Bengaluru Home">
                            <div className="flex flex-col leading-tight">
                                <span className="text-xs sm:text-base md:text-xl font-bold tracking-[0.12em] sm:tracking-[0.18em] font-['Outfit'] text-page group-hover:text-accent transition-colors duration-200 truncate">
                                    UB CITY
                                </span>
                                <span className="text-[9px] sm:text-[10px] tracking-[0.22em] sm:tracking-[0.3em] text-faint uppercase truncate">
                                    Bengaluru
                                </span>
                            </div>
                        </Link>

                        {/* Mobile / tablet search (in bar; opens overlay) */}
                        <button
                            type="button"
                            onClick={() => setIsSearchOpen(true)}
                            className="lg:hidden flex flex-1 min-w-0 max-w-[220px] sm:max-w-xs items-center gap-2 rounded-xl py-2 pl-3 pr-3 sm:pl-4 sm:pr-4 text-left active:scale-[0.98] transition-all duration-200"
                            style={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--card-border)", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
                            aria-label="Open search"
                        >
                            <Search className="w-4 h-4 shrink-0 text-page opacity-40" />
                            <span className="truncate text-[11px] sm:text-[13px] font-medium text-[color:var(--text-dim)]">Search...</span>
                        </button>

                        {/* Desktop Nav with Mega Menu */}
                        <nav className="hidden lg:flex items-center gap-1">
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.path || (item.path === "/shopping" && location.pathname.startsWith("/shopping"));

                                if (item.hasDropdown) {
                                    return (
                                        <div key={item.path} className="relative" ref={shoppingRef}>
                                            <button
                                                onMouseEnter={() => setIsShoppingOpen(true)}
                                                onClick={() => setIsShoppingOpen(!isShoppingOpen)}
                                                className="relative px-4 py-2.5 text-sm font-medium tracking-wide transition-colors duration-300 rounded-full text-page opacity-75 hover:opacity-100 flex items-center gap-1"
                                                style={{ color: isActive ? "var(--accent)" : undefined, opacity: isActive ? 1 : undefined }}
                                            >
                                                {item.label}
                                                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isShoppingOpen ? "rotate-180" : ""}`} />
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="navIndicator"
                                                        className="absolute inset-0 rounded-full border border-accent/20"
                                                        style={{ backgroundColor: "rgba(200,169,81,0.08)" }}
                                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                                    />
                                                )}
                                            </button>

                                            {/* Mega Menu Dropdown */}
                                            <AnimatePresence>
                                                {isShoppingOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: 10 }}
                                                        transition={{ duration: 0.2 }}
                                                        onMouseLeave={() => setIsShoppingOpen(false)}
                                                        className="absolute top-12 left-1/2 -translate-x-1/2 w-[500px] glass-pane rounded-[2rem] overflow-hidden py-4 px-6 border border-[var(--border)] shadow-2xl"
                                                        style={{ backgroundColor: "var(--nav-bg)" }}
                                                    >
                                                        <div className="flex items-center gap-2 mb-4 px-2">
                                                            <Link to="/shopping" className="text-xs font-bold tracking-widest uppercase text-accent hover:underline">
                                                                View All Shopping →
                                                            </Link>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-1">
                                                            {SHOPPING_CATEGORIES.map((cat, i) => (
                                                                <motion.div
                                                                    key={cat.slug}
                                                                    initial={{ opacity: 0, x: -10 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: i * 0.03 }}
                                                                >
                                                                    <Link
                                                                        to={`/shopping#${cat.slug}`}
                                                                        onClick={() => setIsShoppingOpen(false)}
                                                                        className="block px-4 py-2.5 text-sm text-page hover:text-accent hover:bg-[var(--card-bg)] rounded-xl transition-all font-medium"
                                                                    >
                                                                        {cat.label}
                                                                    </Link>
                                                                </motion.div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                }

                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className="relative px-4 py-2.5 text-sm font-medium tracking-wide transition-colors duration-300 rounded-full text-page opacity-75 hover:opacity-100"
                                        style={{ color: isActive ? "var(--accent)" : undefined, opacity: isActive ? 1 : undefined }}
                                    >
                                        {item.label}
                                        {isActive && (
                                            <motion.div
                                                layoutId="navIndicator"
                                                className="absolute inset-0 rounded-full border border-accent/20"
                                                style={{ backgroundColor: "rgba(200,169,81,0.08)" }}
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Utility Icons & CTAs */}
                        <div className="flex items-center shrink-0 gap-1.5 sm:gap-3">

                            {/* Search (desktop mega-nav layout) */}
                            <button onClick={() => setIsSearchOpen(true)} className="hidden lg:flex w-10 h-10 items-center justify-center rounded-full hover:bg-[var(--card-bg)] hover:border border-transparent hover:border-[var(--card-border)] transition-colors duration-200">
                                <Search className="w-4 h-4 text-page" />
                            </button>

                            {/* Location */}
                            <Link
                                to="/reach-us"
                                className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full transition-colors duration-200"
                                style={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--card-border)" }}
                                aria-label="Location"
                            >
                                <MapPin className="w-4 h-4 text-page" />
                            </Link>

                            {/* Cart */}
                            <Link
                                to="/cart"
                                className="hidden md:flex w-10 h-10 items-center justify-center rounded-full hover:bg-[var(--card-bg)] border border-transparent hover:border-[var(--card-border)] transition-colors duration-200"
                                aria-label="Cart"
                            >
                                <ShoppingCart className="w-4 h-4 text-page" />
                            </Link>

                            {/* Wishlist */}
                            <Link to="/wishlist" className="relative hidden md:flex w-10 h-10 items-center justify-center rounded-full hover:bg-[var(--card-bg)] border border-transparent hover:border-[var(--card-border)] transition-colors duration-200">
                                <Heart className={`w-4 h-4 ${wishlistCount > 0 ? "text-red-500 fill-red-500" : "text-page"}`} />
                                {wishlistCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-[9px] font-bold text-white flex items-center justify-center rounded-full">
                                        {wishlistCount}
                                    </span>
                                )}
                            </Link>

                            {/* Language */}
                            <div className="relative hidden sm:block" ref={langRef}>
                                <button
                                    onClick={() => setIsLangOpen(!isLangOpen)}
                                    className="w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200"
                                    style={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--card-border)" }}
                                    aria-label="Language"
                                >
                                    <Globe className="w-4 h-4 text-page" />
                                </button>

                                <AnimatePresence>
                                    {isLangOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute top-12 right-0 w-40 glass-pane rounded-2xl overflow-hidden py-2 border border-[var(--border)] shadow-2xl"
                                        >
                                            {languages.map((lang) => (
                                                <button key={lang.code} onClick={() => setIsLangOpen(false)} className="w-full text-left px-5 py-2 text-sm text-page hover:bg-page transition-colors hover:text-accent font-medium">
                                                    <span className="opacity-50 mr-3">{lang.code}</span> {lang.label}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Login / User */}
                            <Link to="/login" className="hidden lg:flex w-10 h-10 items-center justify-center rounded-full hover:bg-[var(--card-bg)] hover:border border-transparent hover:border-[var(--card-border)] transition-colors duration-200 group">
                                <User className="w-4 h-4 text-page group-hover:text-accent" />
                            </Link>

                            {/* Theme Toggle */}
                            <motion.button
                                whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                                whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                                onClick={toggleTheme}
                                className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full transition-colors duration-200"
                                style={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--card-border)", boxShadow: "var(--card-box-shadow)" }}
                                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    {isDark ? (
                                        <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                            <Sun className="w-4.5 h-4.5 text-accent" />
                                        </motion.div>
                                    ) : (
                                        <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                            <Moon className="w-4.5 h-4.5 text-accent" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>

                            {/* Mobile Menu Toggle */}
                            <button
                                type="button"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200"
                                style={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--card-border)" }}
                                aria-expanded={isMenuOpen}
                                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            >
                                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </motion.header>
            </AnimatePresence>

            {/* ─── Mobile Nav ─── */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: reduceMotion ? 0 : "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: reduceMotion ? 0 : "100%" }}
                        transition={{ duration: reduceMotion ? 0.15 : 0.28, ease: [0.32, 0.72, 0, 1] }}
                        className="fixed inset-0 z-40 lg:hidden bg-page/95 supports-[backdrop-filter]:backdrop-blur-xl"
                    >
                        <div data-lenis-prevent className="pt-24 sm:pt-28 px-5 sm:px-8 pb-10 flex flex-col h-full min-h-0 overflow-y-auto overscroll-contain touch-pan-y">
                            <nav className="flex flex-col gap-1 sm:gap-2">
                                {navItems.map((item, i) => (
                                    <motion.div key={item.path} initial={reduceMotion ? false : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: reduceMotion ? 0 : Math.min(i * 0.03, 0.15) }}>
                                        <Link
                                            to={item.path}
                                            className="block text-xl sm:text-2xl font-bold font-['Outfit'] py-2.5 sm:py-3 transition-colors duration-200"
                                            style={{ color: location.pathname === item.path ? "var(--accent)" : "var(--text-main)", opacity: location.pathname === item.path ? 1 : 0.72 }}
                                        >
                                            {item.label}
                                        </Link>

                                        {/* Mobile Shopping Sub-links */}
                                        {item.hasDropdown && (
                                            <div className="pl-6 flex flex-col gap-1 mb-4">
                                                {SHOPPING_CATEGORIES.map((cat) => (
                                                    <Link key={cat.slug} to={`/shopping#${cat.slug}`} className="text-sm text-page opacity-50 hover:opacity-100 hover:text-accent py-1 transition-all">
                                                        {cat.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}

                                <Link to="/wishlist" className="block text-xl sm:text-2xl font-bold font-['Outfit'] py-2.5 sm:py-3 transition-colors duration-200 flex items-center gap-3" style={{ color: "var(--text-main)", opacity: 0.72 }}>
                                    Wishlist <Heart className={`w-6 h-6 ${wishlistCount > 0 ? "text-red-500 fill-red-500" : ""}`} />
                                    {wishlistCount > 0 && <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">{wishlistCount}</span>}
                                </Link>

                                <div className="border-t border-[var(--border)] pt-4 mt-4">
                                    <p className="text-xs font-bold tracking-widest uppercase text-page opacity-30 mb-3">Orders</p>
                                    <Link
                                        to="/profile/preferences/order-updates"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block text-lg font-bold font-['Outfit'] py-2 text-page opacity-50 hover:opacity-100 hover:text-accent transition-colors flex items-center gap-3"
                                    >
                                        <ShoppingCart className="w-5 h-5" /> Order Updates
                                    </Link>
                                    <Link
                                        to="/profile/actions/notification-center"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block text-lg font-bold font-['Outfit'] py-2 text-page opacity-50 hover:opacity-100 hover:text-accent transition-colors flex items-center gap-3"
                                    >
                                        <User className="w-5 h-5" /> Order Notifications
                                    </Link>
                                </div>

                                <div className="border-t border-[var(--border)] pt-4 mt-4">
                                    <p className="text-xs font-bold tracking-widest uppercase text-page opacity-30 mb-3">More</p>
                                    {quickMenuItems.map((item) => (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="block text-lg font-bold font-['Outfit'] py-2 text-page opacity-50 hover:opacity-100 hover:text-accent transition-colors flex items-center gap-3"
                                        >
                                            <item.icon className="w-5 h-5" /> {item.label}
                                        </Link>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => toggleTheme()}
                                        className="w-full text-left block text-lg font-bold font-['Outfit'] py-2 text-page opacity-50 hover:opacity-100 hover:text-accent transition-colors flex items-center gap-3"
                                    >
                                        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />} Theme
                                    </button>
                                </div>

                                {/* B2B Links for Mobile */}
                                <div className="border-t border-[var(--border)] pt-4 mt-4">
                                    <p className="text-xs font-bold tracking-widest uppercase text-page opacity-30 mb-3">Commercial</p>
                                    {[
                                        { path: "/leasing", label: "Leasing" },
                                        { path: "/sponsorship", label: "Sponsorship" },
                                        { path: "/demographics", label: "Demographics" },
                                    ].map((item) => (
                                        <Link key={item.path} to={item.path} className="block text-lg font-bold font-['Outfit'] py-2 text-page opacity-50 hover:opacity-100 hover:text-accent transition-colors">
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </nav>

                            <div className="mt-6 sm:mt-8 flex flex-col gap-4 border-t border-[var(--border)] pt-6 sm:pt-8">
                                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-page opacity-70 hover:opacity-100 font-bold uppercase tracking-widest text-sm transition-opacity duration-200">
                                    <User className="w-5 h-5 shrink-0" /> Login
                                </Link>
                                <div>
                                    <p className="text-xs font-bold tracking-widest uppercase text-page opacity-30 mb-2">Language</p>
                                    <div className="flex flex-wrap gap-2">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                type="button"
                                                onClick={() => setIsMenuOpen(false)}
                                                className="rounded-full px-3 py-1.5 text-xs font-semibold border border-[var(--card-border)] bg-[var(--card-bg)] text-page/80 hover:border-accent hover:text-accent transition-colors duration-200"
                                            >
                                                {lang.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="relative z-10 min-h-screen">
                <Outlet />
            </main>

            <SalesDock />
            <Footer />
            <CookieBanner />
        </div>
    );
}
