"use client";

import styles from "./GalleryModal.module.css";
// Reusing Gallery styles for consistent look

interface FDFSModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function FDFSModal({ isOpen, onClose }: FDFSModalProps) {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeModalBtn} onClick={onClose}>
                    ✕
                </button>

                <div className={styles.galleryHeader}>
                    <h2 className={styles.galleryTitle}>FDFS HYDERABAD</h2>
                </div>

                <div style={{
                    padding: '4rem 2rem',
                    textAlign: 'center',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontFamily: 'var(--font-inter)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '300px'
                }}>
                    <h3 style={{
                        fontFamily: 'var(--font-cinzel)',
                        fontSize: '1.5rem',
                        color: 'var(--gold)',
                        marginBottom: '1.5rem'
                    }}>Join The KING's Army</h3>

                    <p style={{ lineHeight: '1.6', maxWidth: '500px' }}>
                        Join the biggest First Day First Show celebration for Shah Rukh Khan's KING in Hyderabad.
                        <br /><br />
                        Event details and registration will open soon.
                        Stay tuned!
                    </p>
                </div>
            </div>
        </div>
    );
}
