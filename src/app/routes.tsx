import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { Overview } from "./pages/Overview";
import { Retail } from "./pages/Retail";
import { Luxury } from "./pages/Luxury";
import { Dining } from "./pages/Dining";
import { Entertainment } from "./pages/Entertainment";
import { Events } from "./pages/Events";
import { Sponsorship } from "./pages/Sponsorship";
import { Leasing } from "./pages/Leasing";
import { Venues } from "./pages/Venues";
import { Login } from "./pages/Login";

import { Inquire } from "./pages/Inquire";
import { BrandDetail } from "./pages/BrandDetail";
import { Demographics } from "./pages/Demographics";
import { StrategyDeck } from "./pages/StrategyDeck";

// New MOA-style pages
import { Shopping } from "./pages/Shopping";
import { Dine } from "./pages/DinePage";
import { Cinema } from "./pages/Cinema";
import { Gallery } from "./pages/Gallery";
import { ReachUs } from "./pages/ReachUs";
import { Wishlist } from "./pages/Wishlist";

// E-commerce Evolution Pages
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Profile } from "./pages/Profile";
import { BrandStore } from "./pages/BrandStore";
import { ShoppingCategory } from "./pages/ShoppingCategory";
import { DiningDetail } from "./pages/DiningDetail";
import { About } from "./pages/About";
import { EntertainmentDetail } from "./pages/EntertainmentDetail";
import { CinemaMovieDetail } from "./pages/CinemaMovieDetail";
import { ProfilePreferencePage } from "./pages/ProfilePreferencePage";
import { ProfileActionPage } from "./pages/ProfileActionPage";
import { Terms } from "./pages/Terms";
import { OpportunityDetail } from "./pages/OpportunityDetail";
import { BrandStyleGuide } from "./pages/BrandStyleGuide";
import { AcquisitionIntel } from "./pages/preferences/AcquisitionIntel";
import { CurationAlerts } from "./pages/preferences/CurationAlerts";
import { ProximitySync } from "./pages/preferences/ProximitySync";

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