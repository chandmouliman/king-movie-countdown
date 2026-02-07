"use client";

import styles from "./Navbar.module.css";
import MagneticWrapper from "./MagneticWrapper";

interface NavbarProps {
    onOpenGallery: () => void;
    onOpenFDFS: () => void;
    onOpenFanCard: () => void;
}

export default function Navbar({ onOpenGallery, onOpenFDFS, onOpenFanCard }: NavbarProps) {
    return (
        <nav className={styles.navbar}>
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
    );
}
