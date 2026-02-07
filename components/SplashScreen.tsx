"use client";

import { useState, useEffect } from "react";
import styles from "../app/page.module.css";

interface SplashScreenProps {
    onEnter: () => void;
}

export default function SplashScreen({ onEnter }: SplashScreenProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [isFading, setIsFading] = useState(false);

    const handleClick = () => {
        setIsFading(true);
        onEnter();
        setTimeout(() => {
            setIsVisible(false);
        }, 1000); // 1s fade out duration
    };

    if (!isVisible) return null;

    return (
        <div
            className={styles.splashScreen}
            onClick={handleClick}
            style={{
                opacity: isFading ? 0 : 1,
                transition: "opacity 1s ease-out",
                pointerEvents: isFading ? "none" : "auto"
            }}
        >
            <img
                src="/assets/king-splashs-creen.jpg"
                alt="Splash Background"
                className={styles.splashBg}
                onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    console.error("Splash background image not found");
                }}
            />
            <div className={styles.splashContent}>
                <div className={styles.splashText}>
                    <h2>Shah RUkh Khan's KING</h2>
                    <p>(Click here )</p>
                </div>
            </div>
        </div>
    );
}
