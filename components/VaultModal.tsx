"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./GalleryModal.module.css";
// Reusing Gallery styles for consistent look

interface VaultModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function VaultModal({ isOpen, onClose }: VaultModalProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (isOpen && videoRef.current) {
            videoRef.current.play().catch(e => console.log("Autoplay blocked", e));
        } else if (!isOpen && videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose} style={{ zIndex: 2000 }}>
            <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
                style={{
                    maxWidth: '800px',
                    background: 'linear-gradient(135deg, #1a0b0b 0%, #000000 100%)',
                    border: '1px solid #d4af37',
                    boxShadow: '0 0 50px rgba(212, 175, 55, 0.3)'
                }}
            >
                <button className={styles.closeModalBtn} onClick={onClose}>
                    ✕
                </button>

                <div className={styles.galleryHeader} style={{ marginBottom: '1rem' }}>
                    <h2 className={styles.galleryTitle} style={{ fontSize: '2.5rem', textShadow: '0 0 20px #d4af37' }}>
                        THE ROYAL VAULT
                    </h2>
                    <p style={{ color: '#d4af37', fontFamily: 'Cinzel', letterSpacing: '2px', fontSize: '0.9rem' }}>
                        ACCESS GRANTED: LEVEL 5 CLEARANCE
                    </p>
                </div>

                <div style={{
                    padding: '2rem',
                    textAlign: 'center',
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem'
                }}>
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '16/9',
                        background: '#000',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        {/* Placeholder for Exclusive Content - e.g., a Motion Poster or Concept Art */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            background: 'radial-gradient(circle, rgba(60,60,60,1) 0%, rgba(0,0,0,1) 100%)'
                        }}>
                            <h3 style={{ fontFamily: 'Cinzel', fontSize: '2rem', color: '#fff', marginBottom: '1rem' }}>
                                EXCLUSIVE CONCEPT ART
                            </h3>
                            <p style={{ color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>
                                "The King Returns to His Throne"
                            </p>
                            {/* You can replace this with an actual image or video tag later */}
                            <div style={{
                                marginTop: '2rem',
                                width: '60px',
                                height: '60px',
                                border: '4px solid #d4af37',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <span style={{ fontSize: '2rem', color: '#d4af37' }}>🔒</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ textAlign: 'left', background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '8px' }}>
                        <h4 style={{ color: '#d4af37', fontFamily: 'Cinzel', marginBottom: '0.5rem' }}>
                            CLASSIFIED INTEL:
                        </h4>
                        <p style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)' }}>
                            Rumor has it that the first teaser will drop exactly at midnight on the King's birthday.
                            Keep your eyes on the countdown. The storm is coming.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        style={{
                            padding: '1rem 3rem',
                            borderRadius: '30px',
                            background: 'transparent',
                            border: '1px solid #d4af37',
                            color: '#d4af37',
                            fontFamily: 'Cinzel',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            alignSelf: 'center',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                        CLOSE VAULT
                    </button>
                </div>
            </div>
        </div>
    );
}
