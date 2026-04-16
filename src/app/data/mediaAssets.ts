/**
 * Centralized media asset URLs.
 * All videos use Pexels (free, CORS-friendly, reliable CDN).
 * All fallback images use Unsplash with reliable photo IDs.
 */

// ─── Background Videos (Pexels – direct .mp4 links) ───
export const VIDEOS = {
  // Indoor theme park / Nickelodeon Universe style
  entertainment:
    "https://videos.pexels.com/video-files/3130182/3130182-uhd_2560_1440_30fps.mp4",

  // Massive shopping mall interior (North American style)
  shoppingMall:
    "https://videos.pexels.com/video-files/3244199/3244199-uhd_2560_1440_30fps.mp4",

  // Luxury fashion showcase
  fashion:
    "https://videos.pexels.com/video-files/5765760/5765760-uhd_2560_1440_30fps.mp4",

  // Cityscape / Bloomington MN style aerials
  aerialCity:
    "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4",

  // Crowd / Rotunda events
  events:
    "https://videos.pexels.com/video-files/2096572/2096572-uhd_2560_1440_30fps.mp4",

  // High-end dining / Culinary
  dining:
    "https://videos.pexels.com/video-files/2795405/2795405-uhd_2560_1440_25fps.mp4",

  // Theme Park Specific
  themePark:
    "https://videos.pexels.com/video-files/4243468/4243468-uhd_2560_1440_30fps.mp4",

  // YouTube Hero IDs (Updated for MOA thematic fit)
  youtubeHero: "O1UvFv5N_6I",
  youtubeRetail: "v_09aZ5A90M",
  youtubeLuxury: "kYJ_8r5zU3k",
} as const;

// ─── Fallback poster images (High-Fidelity Unsplash) ───
export const POSTERS = {
  entertainment:
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=2000&auto=format",
  shoppingMall:
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2000&auto=format",
  fashion:
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format",
  aerialCity:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format",
  themePark:
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=2000&auto=format",
} as const;
