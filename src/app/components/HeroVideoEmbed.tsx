import { useEffect, useMemo, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroVideoEmbedProps {
  embedUrl?: string;
  videoSrc?: string;
  posterImage: string;
  title: string;
  slideImages?: string[];
}

function getOptimizedEmbedUrl(embedUrl: string): string {
  try {
    const url = new URL(embedUrl);
    const host = url.hostname.toLowerCase();

    if (host.includes("youtube.com") || host.includes("youtube-nocookie.com")) {
      url.searchParams.set("autoplay", "1");
      url.searchParams.set("mute", "1");
      url.searchParams.set("loop", "1");
      url.searchParams.set("controls", "0");
      url.searchParams.set("modestbranding", "1");
      url.searchParams.set("rel", "0");
      url.searchParams.set("playsinline", "1");
      url.searchParams.set("iv_load_policy", "3");
      url.searchParams.set("disablekb", "1");
      url.searchParams.set("fs", "0");
      url.searchParams.set("cc_load_policy", "0");
      url.searchParams.set("showinfo", "0");
      if (!url.searchParams.get("playlist")) {
        const parts = url.pathname.split("/");
        const videoId = parts[parts.length - 1];
        if (videoId) url.searchParams.set("playlist", videoId);
      }
    }

    if (host.includes("vimeo.com")) {
      url.searchParams.set("autoplay", "1");
      url.searchParams.set("muted", "1");
      url.searchParams.set("loop", "1");
      url.searchParams.set("autopause", "0");
      url.searchParams.set("background", "1");
      url.searchParams.set("title", "0");
      url.searchParams.set("byline", "0");
      url.searchParams.set("portrait", "0");
    }

    return url.toString();
  } catch {
    return embedUrl;
  }
}

export function HeroVideoEmbed({ embedUrl, videoSrc, posterImage, title, slideImages }: HeroVideoEmbedProps) {
  const optimizedEmbedUrl = embedUrl ? getOptimizedEmbedUrl(embedUrl) : "";
  const [isVisible, setIsVisible] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const slides = useMemo(
    () =>
      (slideImages && slideImages.length >= 3
        ? slideImages.slice(0, 3)
        : [
            posterImage,
            "https://images.unsplash.com/photo-1481437156560-3205f6a55735?q=80&w=2000",
            "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?q=80&w=2000",
          ]),
    [posterImage, slideImages],
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isVisible) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isVisible]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      {/* Background Poster (visible while video loads or on mobile) */}
      {/* Background Poster (visible while video loads) */}
      <img
        src={posterImage}
        alt={title}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isVideoReady ? "opacity-0" : "opacity-100"
        }`}
        loading="eager"
      />

      {/* Interactive Slider Layers */}
      <div className="absolute inset-0 z-[5]">
        {slides.map((slide, index) => (
          <div
            key={slide}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === activeSlide ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            }`}
          >
            <img src={slide} alt={`Slide ${index}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {videoSrc ? (
        <video
          ref={videoRef}
          className={`absolute inset-0 z-10 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoReady && !hasVideoError ? "opacity-100" : "opacity-0"
          }`}
          src={videoSrc}
          muted
          loop
          playsInline
          autoPlay
          onLoadedData={() => setIsVideoReady(true)}
          onPlaying={() => setIsVideoReady(true)}
          onError={() => {
            setHasVideoError(true);
            setIsVideoReady(false);
          }}
        />
      ) : embedUrl ? (
        <div className="absolute inset-x-0 inset-y-0 z-10 scale-[1.35] pointer-events-none origin-center">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={optimizedEmbedUrl}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture"
            loading="lazy"
            allowFullScreen
          />
        </div>
      ) : null}

      {/* Navigation Arrows (Visible in Light Mode) */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-30 px-6 md:px-12 flex justify-between pointer-events-none">
        <button
          onClick={() => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="w-16 h-16 rounded-full glass-pane border border-accent/30 flex items-center justify-center text-accent hover:bg-accent hover:text-black transition-all pointer-events-auto backdrop-blur-3xl shadow-gold group"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button
          onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
          className="w-16 h-16 rounded-full glass-pane border border-accent/30 flex items-center justify-center text-accent hover:bg-accent hover:text-black transition-all pointer-events-auto backdrop-blur-3xl shadow-gold group"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-30 flex gap-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className={`transition-all duration-500 rounded-full h-1.5 ${
              i === activeSlide ? "w-12 bg-accent" : "w-1.5 bg-accent/20 hover:bg-accent/40"
            }`}
          />
        ))}
      </div>

      {/* Extreme Protection Gradient (Heavy in Light Mode) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-20 pointer-events-none" />
    </div>
  );
}

