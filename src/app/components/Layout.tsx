import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  Search,
  Globe,
  User,
  ChevronDown,
  Heart,
  ShoppingCart,
  MapPin,
  ArrowLeft,
  Package,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { SearchOverlay } from "./SearchOverlay";
import { LocationOverlay } from "./LocationOverlay";
import { OrdersHub } from "./OrdersHub";
import { CookieBanner } from "./CookieBanner";
import { Footer } from "./Footer";
import { SalesDock } from "./SalesDock";
import { SHOPPING_CATEGORIES } from "../data/mallData";
import {
  useWishlist,
  useCart,
  useOrders,
  useUserSession,
} from "../hooks/useFeatures";
import { useUserLocation } from "../hooks/useUserLocation";

import { Suspense } from "react";
import { AIAgent } from "./AIAgent";
import { SmoothScroll } from "./SmoothScroll";

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
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { toggleTheme, isDark } = useTheme();
  const { count: wishlistCount } = useWishlist();
  const { count: cartCount } = useCart();
  const { session } = useUserSession();

  // Core session-wide location bootstrap
  const { city } = useUserLocation();

  useEffect(() => {
    window.history.scrollRestoration = "manual";

    const handleLocationTrigger = () => setIsLocationOpen(true);
    window.addEventListener("open-location", handleLocationTrigger);

    return () => {
      window.removeEventListener("open-location", handleLocationTrigger);
    };
  }, []);

  const lastPathname = useRef(location.pathname);

  useEffect(() => {
    setIsMenuOpen(false);

    if (location.pathname !== lastPathname.current) {
      setIsPageLoading(true);
      const timer = setTimeout(() => {
        setIsPageLoading(false);
        lastPathname.current = location.pathname;
      }, 800); // 800ms loading transition
      return () => clearTimeout(timer);
    }

    if (location.hash === "#orders") {
      setIsOrdersOpen(true);
    }
  }, [location]);

  useEffect(() => {
    const anyOverlayOpen =
      isMenuOpen || isSearchOpen || isOrdersOpen || isLocationOpen;

    if (anyOverlayOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isSearchOpen, isOrdersOpen, isLocationOpen]);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen">
        <SearchOverlay
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
        <OrdersHub
          isOpen={isOrdersOpen}
          onClose={() => setIsOrdersOpen(false)}
        />

        {/* ─── Page Loading Overlay ─── */}
        <AnimatePresence>
          {isPageLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-page flex items-center justify-center pointer-events-none"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.1, opacity: 0 }}
                className="flex flex-col items-center gap-8"
              >
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 rounded-[2rem] bg-accent/20 animate-ping border border-accent/30 shadow-gold" />
                  <div className="absolute inset-0 rounded-[2rem] bg-page border-2 border-accent/40 flex items-center justify-center shadow-gold">
                    <Sparkles className="w-10 h-10 text-accent animate-pulse" />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-[10px] font-black uppercase tracking-[1em] text-accent animate-pulse ml-[1em]">
                    Synchronizing
                  </p>
                  <div className="w-48 h-px bg-[var(--border)] relative overflow-hidden">
                    <motion.div
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 bg-accent"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Apple Navbar ─── */}
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled ? "h-12 border-b" : "h-16"
          }`}
          style={{
            backgroundColor: "var(--nav-bg)",
            backdropFilter: "blur(20px) saturate(180%)",
            borderColor: scrolled ? "var(--border)" : "transparent",
          }}
        >
          <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between">
            <div className="flex items-center gap-4 sm:gap-6">
              {location.pathname !== "/" && (
                <button
                  onClick={() => navigate(-1)}
                  className="w-10 h-10 rounded-full glass-pane border border-[var(--border)] flex items-center justify-center hover:border-accent hover:bg-accent hover:text-on-accent transition-all group/back shadow-lg"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-5 h-5 text-ink-gradient group-hover:text-on-accent transition-colors" />
                </button>
              )}
              <Link
                to="/"
                className="text-xl font-bold tracking-tighter hover:opacity-70 transition-opacity flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-gold flex items-center justify-center text-on-accent text-[10px] font-black shadow-gold">
                  MOA
                </div>
                <span className="hidden sm:inline text-ink-gradient">
                  MALL OF AMERICA
                </span>
              </Link>
            </div>

            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 relative group ${
                    location.pathname === item.path
                      ? "text-accent"
                      : "text-[var(--text-main)] opacity-70 hover:opacity-100 hover:text-accent"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-500 ${location.pathname === item.path ? "w-full" : "w-0 group-hover:w-full"}`}
                  />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-10 h-10 rounded-full glass-pane border border-[var(--border)] flex items-center justify-center hover:border-accent transition-all group"
              >
                <Search className="w-4 h-4 text-ink-gradient group-hover:text-accent transition-colors" />
              </button>

              <div className="hidden sm:flex items-center gap-6">
                <Link
                  to="/wishlist"
                  className="relative w-10 h-10 rounded-full glass-pane border border-[var(--border)] flex items-center justify-center hover:border-accent transition-all group"
                >
                  <Heart
                    className={`w-4 h-4 ${wishlistCount > 0 ? "text-accent fill-accent" : "text-ink-gradient group-hover:text-accent transition-colors"}`}
                  />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-[9px] font-black text-on-accent flex items-center justify-center rounded-lg shadow-gold">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/cart"
                  className="relative w-10 h-10 rounded-full glass-pane border border-[var(--border)] flex items-center justify-center hover:border-accent transition-all group"
                >
                  <ShoppingCart
                    className={`w-4 h-4 ${cartCount > 0 ? "text-accent fill-accent" : "text-ink-gradient group-hover:text-accent transition-colors"}`}
                  />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-[9px] font-black text-on-accent flex items-center justify-center rounded-lg shadow-gold">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <button
                  onClick={() => setIsOrdersOpen(true)}
                  className="relative w-10 h-10 rounded-full glass-pane border border-[var(--border)] flex items-center justify-center hover:border-accent transition-all group"
                >
                  <Package className="w-4 h-4 text-ink-gradient group-hover:text-accent transition-colors" />
                </button>

                {/* Login icon removed to prevent duplicate profile icons */}
              </div>

              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-full glass-pane border border-[var(--border)] flex items-center justify-center hover:border-accent transition-all group"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-ink-gradient group-hover:text-accent transition-colors" />
                ) : (
                  <Moon className="w-4 h-4 text-ink-gradient group-hover:text-accent transition-colors" />
                )}
              </button>

              <Link
                to={session?.user ? "/profile" : "/login"}
                className="w-10 h-10 rounded-full glass-pane border border-[var(--border)] flex items-center justify-center hover:border-accent transition-all group"
              >
                <User className="w-4 h-4 text-ink-gradient group-hover:text-accent transition-colors" />
              </Link>

              {/* Language Picker Moved Before Hamburger for Tab Screens */}
              <div className="relative group hidden sm:block">
                <button className="flex items-center gap-3 px-4 py-2 h-10 rounded-full glass-pane border border-[var(--border)] hover:border-accent transition-all">
                  <Globe className="w-4 h-4 text-ink-gradient" />
                  <span className="text-[10px] font-black text-ink-gradient uppercase tracking-widest hidden md:inline">
                    EN
                  </span>
                </button>
                <div className="absolute top-full right-0 mt-4 w-48 glass-pane rounded-3xl p-4 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-700 shadow-2xl border border-[var(--border)] z-[60]">
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-accent mb-4 px-3">
                    Select Language
                  </p>
                  <div className="space-y-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className="w-full text-left px-4 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest text-ink-gradient hover:bg-accent hover:text-on-accent transition-all"
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-full glass-pane border border-[var(--border)] flex items-center justify-center hover:border-accent transition-all"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5 text-accent" />
                ) : (
                  <Menu className="w-5 h-5 text-ink-gradient" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* ─── Mobile Nav Drawer (Amazon Style) ─── */}
        <AnimatePresence mode="wait">
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md lg:hidden"
                onClick={() => setIsMenuOpen(false)}
                style={{ touchAction: "none" }} // Prevent scrolling on backdrop
              />

              {/* Sliding Drawer */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                className="fixed top-0 right-0 bottom-0 z-50 lg:hidden w-[85vw] max-w-[380px] bg-page border-l border-[var(--border)] shadow-2xl overflow-y-auto overflow-x-hidden overscroll-contain"
                style={{ WebkitOverflowScrolling: "touch" }}
                data-lenis-prevent="true"
              >
                {/* Drawer Header */}
                <div className="sticky top-0 z-20 bg-page/95 backdrop-blur-xl border-b border-[var(--border)] px-6 py-5 flex items-center justify-between">
                  <Link
                    to="/"
                    className="text-xl font-bold tracking-tighter flex items-center gap-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-gold flex items-center justify-center text-white text-[10px] font-black shadow-gold">
                      MOA
                    </div>
                    <span className="text-ink-gradient">MALL OF AMERICA</span>
                  </Link>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-10 h-10 rounded-full glass-pane border border-[var(--border)] flex items-center justify-center hover:border-accent transition-all group"
                  >
                    <X className="w-5 h-5 text-ink-gradient group-hover:text-accent transition-colors" />
                  </button>
                </div>

                <nav className="p-6 flex flex-col gap-8">
                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.8em] text-accent pl-2">
                      Menu
                    </p>
                    <div className="flex flex-col gap-2">
                      {navItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="text-lg font-black font-['Outfit'] tracking-wide py-3 px-4 rounded-2xl glass-pane border border-transparent hover:border-[var(--border)] nav-mobile-label hover:text-accent transition-all duration-300 uppercase relative overflow-hidden group"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="relative z-10">{item.label}</span>
                          <div className="absolute inset-0 bg-accent/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.8em] text-accent pl-2">
                      Shop By Category
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {SHOPPING_CATEGORIES.slice(0, 6).map((cat) => (
                        <Link
                          key={cat.slug}
                          to={`/shopping/category/${cat.slug}`}
                          className="glass-pane border border-[var(--border)] rounded-2xl p-4 text-[10px] flex flex-col items-center justify-center text-center gap-2 font-black uppercase tracking-widest nav-mobile-label hover:border-accent hover:text-accent transition-all shadow-sm"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {cat.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.8em] text-accent pl-2">
                      My Account
                    </p>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsOrdersOpen(true);
                      }}
                      className="w-full glass-pane border border-[var(--border)] rounded-2xl p-5 flex items-center justify-between group hover:border-accent transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all">
                          <Package className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-black font-['Outfit'] text-ink-gradient uppercase leading-none">
                            Orders & Returns
                          </p>
                          <p className="text-[9px] font-bold text-accent uppercase tracking-widest mt-1">
                            Track your items
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-accent" />
                    </button>
                  </div>

                  <div className="pt-6 border-t border-[var(--border)]">
                    <div className="grid grid-cols-4 gap-4 mb-8">
                      <Link
                        to="/reach-us"
                        className="flex flex-col items-center gap-3 group"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="w-12 h-12 rounded-xl glass-pane border border-[var(--border)] flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all shadow-sm">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-accent">
                          Map
                        </span>
                      </Link>
                      <Link
                        to="/wishlist"
                        className="flex flex-col items-center gap-3 group relative"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="w-12 h-12 rounded-xl glass-pane border border-[var(--border)] flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all shadow-sm">
                          <Heart className="w-5 h-5" />
                        </div>
                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-accent">
                          Wish
                        </span>
                        {wishlistCount > 0 && (
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-[9px] font-black text-white flex items-center justify-center rounded-lg shadow-gold">
                            {wishlistCount}
                          </span>
                        )}
                      </Link>
                      <Link
                        to="/cart"
                        className="flex flex-col items-center gap-3 group relative"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="w-12 h-12 rounded-xl glass-pane border border-[var(--border)] flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all shadow-sm">
                          <ShoppingCart className="w-5 h-5" />
                        </div>
                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-accent">
                          Cart
                        </span>
                        {cartCount > 0 && (
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-[9px] font-black text-white flex items-center justify-center rounded-lg shadow-gold">
                            {cartCount}
                          </span>
                        )}
                      </Link>
                      <Link
                        to={session?.user ? "/profile" : "/login"}
                        className="flex flex-col items-center gap-3 group"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="w-12 h-12 rounded-xl glass-pane border border-[var(--border)] flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all shadow-sm">
                          <User className="w-5 h-5" />
                        </div>
                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-accent">
                          Profile
                        </span>
                      </Link>
                    </div>
                    <div className="text-center py-2">
                      <p className="text-[10px] font-black tracking-[0.5em] text-accent/50 uppercase">
                        Language: EN
                      </p>
                    </div>
                  </div>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <main className="relative min-h-[60vh] pt-24 md:pt-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
            >
              <Suspense
                fallback={
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-page">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center gap-6"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center animate-pulse border border-accent/40 shadow-gold">
                        <Sparkles className="w-8 h-8 text-accent" />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-[0.8em] text-accent animate-pulse">
                        Synchronizing Architecture
                      </p>
                    </motion.div>
                  </div>
                }
              >
                <Outlet />
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>

        <AIAgent />
        <SalesDock />
        <Footer hideCTA={!["/", "/reach-us"].includes(location.pathname)} />
        <CookieBanner />
        <LocationOverlay
          isOpen={isLocationOpen}
          onClose={() => setIsLocationOpen(false)}
        />
      </div>
    </SmoothScroll>
  );
}
