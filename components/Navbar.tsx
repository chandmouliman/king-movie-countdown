"use client";

import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import MagneticWrapper from "./MagneticWrapper";

interface NavbarProps {
    onOpenGallery: () => void;
    onOpenFDFS: () => void;
    onOpenFanCard: () => void;
}

export default function Navbar({ onOpenGallery, onOpenFDFS, onOpenFanCard }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

            setScrolled(scrollTop > 60);
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Scroll progress bar */}
            <div
                className="scroll-progress"
                style={{ width: `${scrollProgress}%` }}
            />

            <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
                {/* Logo */}
                <div className={styles.logo}>
                    <span className={styles.logoK}>K</span>
                    <span className={styles.logoText}>ING</span>
                </div>

                <ul className={styles.navList}>
                    <MagneticWrapper>
                        <li className={styles.navItem} onClick={onOpenGallery}>
                            GALLERY
                        </li>
                    </MagneticWrapper>
                    <MagneticWrapper>
                        <li className={styles.navItem} onClick={onOpenFDFS}>
                            KING FDFS
                        </li>
                    </MagneticWrapper>
                    <MagneticWrapper>
                        <li className={styles.navItem} onClick={onOpenFanCard}>
                            JOIN SRK HYDERABAD FANS
                        </li>
                    </MagneticWrapper>
                </ul>
            </nav>
        </>
    );
}
