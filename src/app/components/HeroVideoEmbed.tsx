import { useEffect, useMemo, useState, useRef } from "react";

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
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#050608]">
      {slides.map((slide, index) => (
        <img
          key={`${slide}-${index}`}
          src={slide}
          alt={title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            activeSlide === index ? "opacity-40" : "opacity-0"
          }`}
          loading="lazy"
        />
      ))}
      {(!isMobile && videoSrc) ? (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover scale-[1.01] brightness-110 contrast-105 saturate-110 transition-opacity duration-700 ${
            isVideoReady && !hasVideoError ? "opacity-100" : "opacity-0"
          }`}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setIsVideoReady(true)}
          onError={() => {
            setHasVideoError(true);
            setIsVideoReady(false);
          }}
        />
      ) : (!isMobile && embedUrl) ? (
        <iframe
          className="absolute inset-0 w-full h-full scale-[1.01] brightness-110 contrast-105 saturate-110"
          src={isVisible ? optimizedEmbedUrl : ""}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          loading="lazy"
          allowFullScreen
        />
      ) : null}
      <div className="absolute inset-0 video-gradient-mask opacity-60" />
    </div>
  );
}

