"use client";

import styles from "../app/page.module.css";

export default function TeaserCard({ thumbnailUrl, onClick }: { thumbnailUrl: string; onClick: () => void }) {
    return (
        <div className={styles.teaserCard} onClick={onClick}>
            <div className={styles.cardImageContainer}>
                <img src={thumbnailUrl} alt="Teaser" className={styles.cardImage} />
                <div className={styles.playOverlay}>
                    <span className={styles.playIcon}>▶</span>
                </div>
            </div>
        </div>
    );
}
