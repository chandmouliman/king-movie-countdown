"use client";

import { useEffect, useState } from "react";
import styles from "../app/page.module.css";

export default function BackgroundVideo() {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setOffset(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div
            className={styles.backgroundVideoContainer}
            style={{ transform: `translateY(${offset * 0.3}px)` }} // Parallax effect: moves slower than scroll
        >
            {/* 
         Static Background Image - Primary Layer
       */}
            <img
                src="/assets/king-home.jpg"
                alt="Background"
                className={styles.bgImage}
                onError={(e) => {
                    console.log("Background image missing, trying fallback");
                    (e.target as HTMLImageElement).src = "/assets/king-home.jpg"; // Fallback to original
                }}
            />

            {/* 
         Video Layer - Overlays image if available
         Hidden on error to prevent black box blocking the image.
       */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className={styles.bgVideo}
                poster="/assets/king-home.jpg"
                onError={(e) => {
                    console.log("Video missing or error, hiding video element");
                    (e.target as HTMLVideoElement).style.display = 'none';
                }}
            >
                <source src="/assets/bg-video.mp4" type="video/mp4" />
            </video>

            <div className={styles.backgroundOverlay}></div>
        </div>
    );
}
