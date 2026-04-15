/**
 * Centralized media asset URLs.
 * All videos use Pexels (free, CORS-friendly, reliable CDN).
 * All fallback images use Unsplash with reliable photo IDs.
 */

// ─── Background Videos (Pexels – direct .mp4 links) ───
export const VIDEOS = {
  // City skyline / skyscrapers – used for "Why This Property", Venues, Leasing, About
  citySkyline:
    "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4",

  // Shopping mall interior – used for Retail slide
  shoppingMall:
    "https://videos.pexels.com/video-files/3244199/3244199-uhd_2560_1440_30fps.mp4",

  // Fashion / luxury – used for Luxury slide & Login
  fashion:
    "https://videos.pexels.com/video-files/5765760/5765760-uhd_2560_1440_30fps.mp4",

  // Ferris wheel / amusement – used for Entertainment / Attractions
  entertainment:
    "https://videos.pexels.com/video-files/3130182/3130182-uhd_2560_1440_30fps.mp4",

  // YouTube Hero (UB City Cinematic / Luxury Mall)
  youtubeHero: "kYJ_8r5zU3k",
  youtubeRetail: "O1UvFv5N_6I",
  youtubeLuxury: "v_09aZ5A90M",
  youtubeDining: "O1UvFv5N_6I",

  // Business district / walking – used for Final CTA
  businessDistrict:
    "https://videos.pexels.com/video-files/2795405/2795405-uhd_2560_1440_25fps.mp4",

  // Aerial city flyover – used for Sponsorship
  aerialCity:
    "https://videos.pexels.com/video-files/1826896/1826896-uhd_2560_1440_24fps.mp4",

  // Events / Concert – used for Events page
  events:
    "https://videos.pexels.com/video-files/2096572/2096572-uhd_2560_1440_30fps.mp4",

  // Spa / wellness
  spaWellness:
    "https://videos.pexels.com/video-files/3209203/3209203-uhd_2560_1440_25fps.mp4",

  // Hotel lobby
  hotelLobby:
    "https://videos.pexels.com/video-files/6985575/6985575-uhd_2560_1440_25fps.mp4",
} as const;

// ─── Fallback poster images (High-Fidelity Unsplash) ───
export const POSTERS = {
  citySkyline:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format",
  shoppingMall:
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2000&auto=format",
  fashion:
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format",
  entertainment:
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=2000&auto=format",
  businessDistrict:
    "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?q=80&w=2000&auto=format",
  aerialCity:
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2000&auto=format",
} as const;
