export interface CinemaMovie {
  id: string;
  title: string;
  languages: string[];
  rating: string;
  duration: string;
  genre: string;
  synopsis: string;
  poster: string;
  trailer: string;
  showtimes: string[];
  priceInr: number;
}

export const CINEMA_MOVIES: CinemaMovie[] = [
  {
    id: "c1",
    title: "Kalki 2898 AD",
    languages: ["Telugu", "Hindi", "English"],
    rating: "UA",
    duration: "2h 56m",
    genre: "Sci-Fi Action",
    synopsis: "A futuristic saga blending mythology and rebellion in a dystopian world.",
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200",
    trailer: "https://videos.pexels.com/video-files/7989443/7989443-uhd_2560_1440_25fps.mp4",
    showtimes: ["10:30", "14:15", "18:30", "22:05"],
    priceInr: 320,
  },
  {
    id: "c2",
    title: "Dune: Part Two",
    languages: ["English", "Hindi", "French", "Japanese"],
    rating: "UA-13+",
    duration: "2h 46m",
    genre: "Epic Sci-Fi",
    synopsis: "Paul Atreides unites with the Fremen to challenge imperial forces.",
    poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=1200",
    trailer: "https://videos.pexels.com/video-files/7989545/7989545-uhd_2560_1440_25fps.mp4",
    showtimes: ["09:50", "13:45", "17:40", "21:30"],
    priceInr: 380,
  },
  {
    id: "c3",
    title: "Aavesham",
    languages: ["Malayalam", "Kannada", "Hindi", "English"],
    rating: "UA",
    duration: "2h 28m",
    genre: "Action Comedy",
    synopsis: "A chaotic gangland entertainer with humor, style, and high energy.",
    poster: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200",
    trailer: "https://videos.pexels.com/video-files/7989620/7989620-uhd_2560_1440_25fps.mp4",
    showtimes: ["11:15", "15:10", "19:05", "23:00"],
    priceInr: 260,
  },
];

export const WORLD_LANGUAGES = ["Telugu", "Kannada", "Hindi", "English", "Japanese", "French"];

