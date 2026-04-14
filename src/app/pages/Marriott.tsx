import { Link } from "react-router";
import { VIDEOS } from "../data/mediaAssets";

export function Marriott() {
  return (
    <div className="page-wrapper bg-page min-h-screen">
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden hero-readable">
        <div className="video-bg-container">
          <video autoPlay loop muted playsInline className="video-bg opacity-55">
            <source src={VIDEOS.hotelLobby} type="video/mp4" />
          </video>
          <div className="video-gradient-mask" />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-6xl md:text-8xl font-black font-['Outfit']">Executive Apartments</h1>
          <p className="text-lg mt-4 max-w-2xl mx-auto">Extended stay luxury suites for global business travelers and premium guests.</p>
          <Link to="/reach-us" className="btn-luxe mt-8">Reserve Stay Inquiry</Link>
        </div>
      </section>
    </div>
  );
}


