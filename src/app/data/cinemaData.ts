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
  price: number;
}

export const CINEMA_MOVIES: CinemaMovie[] = [
  {
    id: "c1",
    title: "Deadpool & Wolverine",
    languages: ["English", "French", "Spanish"],
    rating: "R",
    duration: "2h 7m",
    genre: "Action Comedy",
    synopsis: "The ultimate team-up: Wade Wilson and Logan must unite to save their universe.",
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200",
    trailer: "https://videos.pexels.com/video-files/7989443/7989443-uhd_2560_1440_25fps.mp4",
    showtimes: ["11:30 AM", "2:15 PM", "6:30 PM", "9:45 PM"],
    price: 18,
  },
  {
    id: "c2",
    title: "Inside Out 2",
    languages: ["English", "French", "Japanese"],
    rating: "PG",
    duration: "1h 36m",
    genre: "Family Animation",
    synopsis: "The emotions deal with the introduction of Anxiety as Riley enters her teens.",
    poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=1200",
    trailer: "https://videos.pexels.com/video-files/7989545/7989545-uhd_2560_1440_25fps.mp4",
    showtimes: ["10:00 AM", "12:45 PM", "3:30 PM", "6:15 PM"],
    priceInr: 15,
  },
  {
    id: "c3",
    title: "Despicable Me 4",
    languages: ["English", "Spanish", "Chinese"],
    rating: "PG",
    duration: "1h 34m",
    genre: "Animated Adventure",
    synopsis: "Gru and the Minions return for a new chapter of mayhem and family fun.",
    poster: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200",
    trailer: "https://videos.pexels.com/video-files/7989620/7989620-uhd_2560_1440_25fps.mp4",
    showtimes: ["11:15 AM", "2:00 PM", "4:45 PM", "7:30 PM"],
    priceInr: 14,
  },
];

export const WORLD_LANGUAGES = ["English", "Spanish", "French", "Japanese", "Chinese"];

