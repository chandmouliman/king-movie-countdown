"use client";

import styles from "../app/page.module.css";
import { useEffect } from "react";

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoId: string;
}

export default function VideoModal({ isOpen, onClose, videoId }: VideoModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeModalBtn} onClick={onClose}>
                    ✕
                </button>
                <div className={styles.videoWrapper}>
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                        title="Teaser Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
