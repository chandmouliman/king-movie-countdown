"use client";

import { useState, useEffect } from "react";
import styles from "./SplashScreen.module.css";

interface SplashScreenProps {
    onEnter: () => void;
}

export default function SplashScreen({ onEnter }: SplashScreenProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [isFading, setIsFading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setIsLoaded(true), 200);
        return () => clearTimeout(t);
    }, []);

    const handleClick = () => {
        setIsFading(true);
        onEnter();
        setTimeout(() => setIsVisible(false), 1200);
    };

    if (!isVisible) return null;

    return (
        <div
            className={`${styles.splash} ${isFading ? styles.fadeOut : ""}`}
            onClick={handleClick}
        >
            {/* Background image */}
            <img
                src="/assets/king-splashs-creen.jpg"
                alt="King Movie"
                className={styles.bg}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />

            {/* Dark overlay */}
            <div className={styles.overlay} />

            {/* Content */}
            <div className={`${styles.content} ${isLoaded ? styles.contentVisible : ""}`}>
                {/* Tagline */}
                <p className={styles.tagline}>SHAH RUKH KHAN</p>

                {/* Title with shimmer */}
                <h1 className={styles.title}>KING</h1>
                <p className={styles.sub}>DARR NAHI — DEHSHAT HOON</p>

                {/* Enter button with pulse rings */}
                <div className={styles.enterWrapper}>
                    <div className={styles.ring1} />
                    <div className={styles.ring2} />
                    <button className={styles.enterBtn}>
                        <span className={styles.enterBtnInner}>ENTER</span>
                    </button>
                </div>

                <p className={styles.hint}>Click anywhere to continue</p>
            </div>
        </div>
    );
}
