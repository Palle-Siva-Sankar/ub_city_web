import { createBrowserRouter, Navigate } from "react-router";
import { lazy, Suspense } from "react";
import { Layout } from "./components/Layout";

// Lazy-loaded pages for Apple-style performance
const Overview = lazy(() => import("./pages/Overview").then(m => ({ default: m.Overview })));
const Shopping = lazy(() => import("./pages/Shopping").then(m => ({ default: m.Shopping })));
const ShoppingCategory = lazy(() => import("./pages/ShoppingCategory").then(m => ({ default: m.ShoppingCategory })));
const BrandStore = lazy(() => import("./pages/BrandStore").then(m => ({ default: m.BrandStore })));
const Dine = lazy(() => import("./pages/DinePage").then(m => ({ default: m.Dine })));
const DiningDetail = lazy(() => import("./pages/DiningDetail").then(m => ({ default: m.DiningDetail })));
const Cinema = lazy(() => import("./pages/Cinema").then(m => ({ default: m.Cinema })));
const CinemaMovieDetail = lazy(() => import("./pages/CinemaMovieDetail").then(m => ({ default: m.CinemaMovieDetail })));
const Gallery = lazy(() => import("./pages/Gallery").then(m => ({ default: m.Gallery })));
const ReachUs = lazy(() => import("./pages/ReachUs").then(m => ({ default: m.ReachUs })));
const Wishlist = lazy(() => import("./pages/Wishlist").then(m => ({ default: m.Wishlist })));
const About = lazy(() => import("./pages/About").then(m => ({ default: m.About })));
const Cart = lazy(() => import("./pages/Cart").then(m => ({ default: m.Cart })));
const Checkout = lazy(() => import("./pages/Checkout").then(m => ({ default: m.Checkout })));
const Profile = lazy(() => import("./pages/Profile").then(m => ({ default: m.Profile })));
const Leasing = lazy(() => import("./pages/Leasing").then(m => ({ default: m.Leasing })));
const Sponsorship = lazy(() => import("./pages/Sponsorship").then(m => ({ default: m.Sponsorship })));
const Venues = lazy(() => import("./pages/Venues").then(m => ({ default: m.Venues })));
const Events = lazy(() => import("./pages/Events").then(m => ({ default: m.Events })));
const Terms = lazy(() => import("./pages/Terms").then(m => ({ default: m.Terms })));

const StrategyDeck = lazy(() => import("./pages/StrategyDeck").then(m => ({ default: m.StrategyDeck })));
const Login = lazy(() => import("./pages/Login").then(m => ({ default: m.Login })));
const BrandStyleGuide = lazy(() => import("./pages/BrandStyleGuide").then(m => ({ default: m.BrandStyleGuide })));
const AcquisitionIntel = lazy(() => import("./pages/preferences/AcquisitionIntel").then(m => ({ default: m.AcquisitionIntel })));
const CurationAlerts = lazy(() => import("./pages/preferences/CurationAlerts").then(m => ({ default: m.CurationAlerts })));
const ProximitySync = lazy(() => import("./pages/preferences/ProximitySync").then(m => ({ default: m.ProximitySync })));

// Fallbacks for specific details
const BrandDetail = lazy(() => import("./pages/BrandDetail").then(m => ({ default: m.BrandDetail })));
const Dining = lazy(() => import("./pages/Dining").then(m => ({ default: m.Dining })));
const Entertainment = lazy(() => import("./pages/Entertainment").then(m => ({ default: m.Entertainment })));
const EntertainmentDetail = lazy(() => import("./pages/EntertainmentDetail").then(m => ({ default: m.EntertainmentDetail })));
const Inquire = lazy(() => import("./pages/Inquire").then(m => ({ default: m.Inquire })));
const Demographics = lazy(() => import("./pages/Demographics").then(m => ({ default: m.Demographics })));
const OpportunityDetail = lazy(() => import("./pages/OpportunityDetail").then(m => ({ default: m.OpportunityDetail })));
const ProfilePreferencePage = lazy(() => import("./pages/ProfilePreferencePage").then(m => ({ default: m.ProfilePreferencePage })));
const ProfileActionPage = lazy(() => import("./pages/ProfileActionPage").then(m => ({ default: m.ProfileActionPage })));
const Retail = lazy(() => import("./pages/Retail").then(m => ({ default: m.Retail })));
const Luxury = lazy(() => import("./pages/Luxury").then(m => ({ default: m.Luxury })));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Overview /> },

      // Consumer-facing (MOA Marketplace)
      { path: "shopping", element: <Shopping /> },
      { path: "shopping/category/:categorySlug", element: <ShoppingCategory /> },
      { path: "shopping/:brandSlug", element: <BrandStore /> },
      { path: "dine", element: <Dine /> },
      { path: "dine/menu/:slug", element: <DiningDetail /> },
      { path: "cinema", element: <Cinema /> },
      { path: "cinema/movie/:id", element: <CinemaMovieDetail /> },
      { path: "wellness", element: <Navigate to="/about" replace /> },
      { path: "marriott", element: <Navigate to="/about" replace /> },
      { path: "gallery", element: <Gallery /> },
      { path: "reach-us", element: <ReachUs /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "about", element: <About /> },
      { path: "terms", element: <Terms /> },
      { path: "brand-style-guide", element: <BrandStyleGuide /> },
      
      // E-commerce Flow
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "profile", element: <Profile /> },
      { path: "profile/preferences/order-updates", element: <AcquisitionIntel /> },
      { path: "profile/preferences/promo-alerts", element: <CurationAlerts /> },
      { path: "profile/preferences/location-offers", element: <ProximitySync /> },
      { path: "profile/preferences/:prefKey", element: <ProfilePreferencePage /> },
      { path: "profile/actions/edit-profile", element: <ProfileActionPage /> },
      { path: "profile/actions/security-controls", element: <ProfileActionPage /> },
      { path: "profile/actions/notification-center", element: <ProfileActionPage /> },
      { path: "profile/actions/:actionKey", element: <ProfileActionPage /> },

      // Original B2B pitch pages (Legacy)
      { path: "retail", element: <Retail /> },
      { path: "luxury", element: <Luxury /> },
      { path: "dining", element: <Dining /> },
      { path: "entertainment", element: <Entertainment /> },
      { path: "entertainment/:slug", element: <EntertainmentDetail /> },
      { path: "events", element: <Events /> },
      { path: "sponsorship", element: <Sponsorship /> },
      { path: "leasing", element: <Leasing /> },
      { path: "venues", element: <Venues /> },

      // Dynamic engines
      { path: "inquire/:action", element: <Inquire /> },
      { path: "brand/:id", element: <BrandDetail /> },
      { path: "demographics", element: <Demographics /> },
      { path: "opportunity/:slug", element: <OpportunityDetail /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
  { path: "/strategy", element: <StrategyDeck /> },
  { path: "/login", element: <Login /> },
]);