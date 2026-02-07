"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import SplashScreen from "../components/SplashScreen";
import BackgroundVideo from "../components/BackgroundVideo";
import GoldParticles from "../components/GoldParticles";
import Countdown from "../components/Countdown";
import AudioPlayer from "../components/AudioPlayer";
import VideoModal from "../components/VideoModal";
import GalleryModal from "../components/GalleryModal";
import FDFSModal from "../components/FDFSModal";
import FanCardModal from "../components/FanCardModal";
import VaultModal from "../components/VaultModal";
import HypeMeter from "../components/HypeMeter";
import Navbar from "@/components/Navbar";
import TeaserCard from "@/components/TeaserCard";
import CastCard from "@/components/CastCard";


// Target Date: December 24, 2026
const TARGET_DATE = new Date("2026-12-24T00:00:00");

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTeaserOpen, setIsTeaserOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isFDFSOpen, setIsFDFSOpen] = useState(false);
  const [isFanCardOpen, setIsFanCardOpen] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [fanCount, setFanCount] = useState(0); // Live Fan Pulse Count

  // Fetch initial count from API
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch('/api/register');
        const data = await res.json();
        if (data.count) setFanCount(data.count);
      } catch (error) {
        console.error("Failed to fetch fan count", error);
      }
    };
    fetchCount();
  }, []);

  const handleEnter = () => {
    setIsPlaying(true);
  };

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  const handleOpenVideo = (videoId: string) => {
    setActiveVideoId(videoId);
    setIsTeaserOpen(true);
  };

  const handleCloseVideo = () => {
    setIsTeaserOpen(false);
    setActiveVideoId(null);
  };

  const handleOpenGallery = () => {
    setIsGalleryOpen(true);
  };

  const handleCloseGallery = () => {
    setIsGalleryOpen(false);
  };

  const handleOpenFDFS = () => {
    setIsFDFSOpen(true);
  };

  const handleCloseFDFS = () => {
    setIsFDFSOpen(false);
  };

  const handleOpenFanCard = () => {
    setIsFanCardOpen(true);
  };

  const handleCloseFanCard = () => {
    setIsFanCardOpen(false);
  };

  const handleRegistration = async (name: string, city: string, mobile: string) => {
    // Optimistic update
    setFanCount(prev => prev + 1);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, city, mobile }),
      });

      const data = await res.json();
      if (data.count) {
        setFanCount(data.count); // Sync with server count
      }
    } catch (error) {
      console.error("Failed to save registration", error);
      // Rollback if needed, but for now we keep the optimistic update locally
    }
  };

  return (
    <div className={styles.container}>
      {/* 1. Splash Screen - Entry point */}
      <SplashScreen onEnter={handleEnter} />

      {/* 2. Background Video */}
      <BackgroundVideo />

      {/* Gold Particles Layer */}
      <GoldParticles />

      {/* Cinematic Overlays */}
      <div className="cinematic-grain"></div>
      <div className="vignette"></div>

      {/* 3. Audio Controller */}
      <AudioPlayer isPlaying={isPlaying} onToggle={toggleAudio} />

      {/* 4. Navigation */}
      <Navbar
        onOpenGallery={handleOpenGallery}
        onOpenFDFS={handleOpenFDFS}
        onOpenFanCard={handleOpenFanCard}
      />

      {/* 5. Main Content */}
      <main className={styles.main}>
        <div className={styles.rightContent}>
          <div className={styles.heroContent}>
            <h2 className={styles.tagline}>DARR NAHI DEHSHAT HOON</h2>
            <h1 className={styles.title}>KING</h1>
          </div>

          <div className={styles.centerContent}>
            <Countdown targetDate={TARGET_DATE} />

            <div className={styles.ctaButtons}>
              <button
                className={styles.primaryBtn}
                onClick={() => handleOpenVideo("Uu2QK9Z9X5E")}
              >
                WATCH TEASER
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Description Section */}
      <section className={`${styles.descriptionSection} reveal-on-scroll`} style={{ animationDelay: '0.2s' }}>
        <h3 className={styles.subHeading}>KING Movie Release Countdown</h3>
        <p className={styles.contextText}>
          KING is an upcoming Indian epic movie directed by Siddharth Anand. The film is scheduled to release worldwide on December 24th, 2026. This King movie countdown website tracks the exact time left until release in days, hours, minutes, and seconds.
        </p>
      </section>

      {/* Video Teaser Section */}
      <section className={`${styles.videoSection} reveal-on-scroll`} style={{ animationDelay: '0.4s' }}>
        <TeaserCard
          thumbnailUrl="https://img.youtube.com/vi/Uu2QK9Z9X5E/maxresdefault.jpg"
          onClick={() => handleOpenVideo("Uu2QK9Z9X5E")}
        />
        <TeaserCard
          thumbnailUrl="https://img.youtube.com/vi/M3mfut2RdHk/maxresdefault.jpg"
          onClick={() => handleOpenVideo("M3mfut2RdHk")}
        />
      </section>

      {/* Live Fan Pulse */}
      <section className="reveal-on-scroll" style={{ animationDelay: '0.5s' }}>
        <HypeMeter count={fanCount} />
      </section>

      {/* Cast & Crew Section */}
      <section className={`${styles.castSection} reveal-on-scroll`} style={{ animationDelay: '0.6s' }}>
        <h2 className={styles.sectionTitle}>Cast & Crew</h2>

        <div className={styles.castCategory}>
          <h3 className={styles.categoryTitle}>Cast</h3>
          <div className={styles.castGrid}>
            <CastCard name="Shah Rukh Khan" role="Lead" />
            <CastCard name="Suhana Khan" role="Lead" />
            <CastCard name="Abhishek Bachchan" role="Antagonist" />
          </div>
        </div>

        <div className={styles.castCategory}>
          <h3 className={styles.categoryTitle}>Director</h3>
          <div className={styles.castGrid}>
            <CastCard name="Siddharth Anand" />
          </div>
        </div>

        <div className={styles.castCategory}>
          <h3 className={styles.categoryTitle}>Music</h3>
          <div className={styles.castGrid}>
            <CastCard name="Anirudh Ravichander" />
          </div>
        </div>

        <div className={styles.castCategory}>
          <h3 className={styles.categoryTitle}>Producers</h3>
          <div className={styles.castGrid}>
            <CastCard name="Gauri Khan" />
            <CastCard name="Siddharth Anand" />
          </div>
        </div>
      </section>



      {/* Footer Section */}
      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <div className={styles.footerLogo}>KING</div>
          <p className={styles.copyrightText}>© 2026 KING. All Rights Reserved.</p>
          <p className={styles.disclaimerText}>This is a fan-made countdown website. All rights belong to respective owners.</p>
          <div className={styles.footerLinks}>
            <a href="/privacy-policy" className={styles.footerLink}>Privacy Policy</a>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
            <a href="/contact" className={styles.footerLink}>Contact</a>
          </div>
        </div>

        <div className={styles.footerRight}>
          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>FOLLOW</h4>
            <a href="#" className={styles.columnLink}>Instagram</a>
            <a href="#" className={styles.columnLink}>Twitter</a>
            <a href="#" className={styles.columnLink}>YouTube</a>
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>DEVELOPER</h4>
            <a href="https://twitter.com/SRKHydFans" target="_blank" rel="noopener noreferrer" className={styles.columnLink}>@SRKHydFans</a>
          </div>
        </div>


      </footer>

      {/* Teaser Modal */}
      <VideoModal
        isOpen={isTeaserOpen}
        onClose={handleCloseVideo}
        videoId={activeVideoId || "Uu2QK9Z9X5E"} // Default fallback
      />

      {/* Gallery Modal */}
      <GalleryModal
        isOpen={isGalleryOpen}
        onClose={handleCloseGallery}
      />

      {/* FDFS Modal */}
      <FDFSModal
        isOpen={isFDFSOpen}
        onClose={handleCloseFDFS}
      />

      {/* Fan Card Modal */}
      <FanCardModal
        isOpen={isFanCardOpen}
        onClose={handleCloseFanCard}
        onRegister={handleRegistration}
      />
    </div>
  );
}
