"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./GalleryModal.module.css";
// Reusing Gallery styles for consistent look

interface FanCardModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRegister: (name: string, city: string, mobile: string) => void;
}

export default function FanCardModal({ isOpen, onClose, onRegister }: FanCardModalProps) {
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [mobile, setMobile] = useState("");
    const [isGenerated, setIsGenerated] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const generateCard = () => {
        if (!name.trim() || !city.trim() || !mobile.trim()) return;
        setIsGenerated(true);
        onRegister(name, city, mobile); // Trigger count increment and data save

        setTimeout(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // 1. Background
            const width = 600;
            const height = 400;
            canvas.width = width;
            canvas.height = height;

            // Premium Gradient Background
            const gradient = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, 400);
            gradient.addColorStop(0, "#2a2a2a");
            gradient.addColorStop(1, "#000000");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            // Gold Border with Glow
            ctx.strokeStyle = "#d4af37";
            ctx.lineWidth = 4;
            ctx.shadowColor = "#d4af37";
            ctx.shadowBlur = 15;
            ctx.strokeRect(15, 15, width - 30, height - 30);

            // Reset Shadow
            ctx.shadowBlur = 0;

            // Inner Thin Border
            ctx.strokeStyle = "rgba(212, 175, 55, 0.3)";
            ctx.lineWidth = 1;
            ctx.strokeRect(25, 25, width - 50, height - 50);

            // Helper function to draw text (reused in fallback)
            const drawTextContent = () => {
                if (!ctx) return; // Ensure ctx is available
                ctx.textAlign = "center";

                // "SRK HYDERABAD FANS"
                ctx.fillStyle = "#d4af37";
                ctx.font = "bold 16px Cinzel";
                ctx.letterSpacing = "2px";
                ctx.fillText("SRK HYDERABAD FANS", width / 2, 160);

                // NAME
                ctx.fillStyle = "#ffffff";
                ctx.font = "bold 36px Inter";
                ctx.fillText(name.toUpperCase(), width / 2, 210);

                // CITY
                ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                ctx.font = "20px Cinzel";
                ctx.fillText(city.toUpperCase(), width / 2, 245);

                // KING TITLE (Bold Yellow)
                ctx.fillStyle = "#d4af37";
                ctx.font = "900 60px Cinzel";
                ctx.shadowColor = "rgba(212, 175, 55, 0.6)";
                ctx.shadowBlur = 25;
                ctx.fillText("KING", width / 2, 310);

                // Reset Shadow
                ctx.shadowColor = "transparent";
                ctx.shadowBlur = 0;

                // Member ID
                ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
                ctx.font = "12px Inter";
                ctx.textAlign = "left";
                ctx.fillText("ID: " + Math.random().toString(36).substr(2, 9).toUpperCase(), 40, 365);

                // Social Media Text (Bottom Corner)
                ctx.fillStyle = "#d4af37";
                ctx.font = "italic 12px Inter";
                ctx.textAlign = "right";
                ctx.fillText("Follow @SRKHydFans", width - 40, 365);
            };

            // 2. Logo (Load Image)
            const logo = new Image();
            // IMPORTANT: No crossOrigin for local files to avoid tainting canvas or loading errors
            logo.src = "/assets/DP.png";

            logo.onload = () => {
                const logoSize = 100;

                // Save context
                ctx.save();

                // Draw circular mask
                ctx.beginPath();
                ctx.arc(width / 2, 90, logoSize / 2, 0, Math.PI * 2);
                ctx.closePath();
                ctx.clip();

                // Draw Image
                ctx.drawImage(logo, width / 2 - logoSize / 2, 40, logoSize, logoSize);

                // Restore context
                ctx.restore();

                // Draw Gold Border around logo
                ctx.beginPath();
                ctx.arc(width / 2, 90, logoSize / 2, 0, Math.PI * 2);
                ctx.lineWidth = 3;
                ctx.strokeStyle = "#d4af37";
                ctx.stroke();

                // Draw Text
                drawTextContent();
            };

            // Fallback if logo fails
            logo.onerror = (err) => {
                console.error("Logo failed to load:", err);
                // Draw text anyway
                drawTextContent();
            };

        }, 100);
    };

    const downloadCard = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const link = document.createElement("a");
        link.download = `KING-FanCard-${name}.png`;
        link.href = canvas.toDataURL();
        link.click();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px' }}>
                <button className={styles.closeModalBtn} onClick={onClose}>
                    ✕
                </button>

                <div className={styles.galleryHeader}>
                    <h2 className={styles.galleryTitle}>JOIN THE ARMY</h2>
                </div>

                <div style={{
                    padding: '2rem',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.5rem',
                    color: '#fff'
                }}>
                    {!isGenerated ? (
                        <>
                            <p>Enter your details to generate your Official Fan ID Card.</p>
                            <input
                                type="text"
                                placeholder="YOUR NAME"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{
                                    padding: '1rem',
                                    borderRadius: '5px',
                                    border: '1px solid #d4af37',
                                    background: 'rgba(0,0,0,0.5)',
                                    color: '#d4af37',
                                    fontFamily: 'Cinzel',
                                    fontSize: '1.2rem',
                                    textAlign: 'center',
                                    width: '80%',
                                    outline: 'none'
                                }}
                            />
                            <input
                                type="text"
                                placeholder="MOBILE NUMBER"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                style={{
                                    padding: '1rem',
                                    borderRadius: '5px',
                                    border: '1px solid #d4af37',
                                    background: 'rgba(0,0,0,0.5)',
                                    color: '#d4af37',
                                    fontFamily: 'Cinzel',
                                    fontSize: '1.2rem',
                                    textAlign: 'center',
                                    width: '80%',
                                    outline: 'none'
                                }}
                            />
                            <input
                                type="text"
                                placeholder="YOUR CITY"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                style={{
                                    padding: '1rem',
                                    borderRadius: '5px',
                                    border: '1px solid #d4af37',
                                    background: 'rgba(0,0,0,0.5)',
                                    color: '#d4af37',
                                    fontFamily: 'Cinzel',
                                    fontSize: '1.2rem',
                                    textAlign: 'center',
                                    width: '80%',
                                    outline: 'none'
                                }}
                            />
                            <button
                                onClick={generateCard}
                                style={{
                                    padding: '1rem 3rem',
                                    borderRadius: '30px',
                                    background: '#d4af37',
                                    color: '#000',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                    border: 'none',
                                    fontFamily: 'Cinzel',
                                    marginTop: '1rem'
                                }}
                            >
                                GENERATE ID
                            </button>
                        </>
                    ) : (
                        <>
                            <canvas
                                ref={canvasRef}
                                style={{
                                    width: '100%',
                                    maxWidth: '500px',
                                    borderRadius: '10px',
                                    boxShadow: '0 0 30px rgba(212, 175, 55, 0.4)'
                                }}
                            />
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={downloadCard}
                                    style={{
                                        padding: '0.8rem 2rem',
                                        borderRadius: '30px',
                                        background: '#fff',
                                        color: '#000',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        border: 'none'
                                    }}
                                >
                                    DOWNLOAD
                                </button>
                                <button
                                    onClick={() => { setIsGenerated(false); setName(""); setCity(""); setMobile(""); }}
                                    style={{
                                        padding: '0.8rem 2rem',
                                        borderRadius: '30px',
                                        background: 'rgba(255,255,255,0.1)',
                                        color: '#fff',
                                        cursor: 'pointer',
                                        border: '1px solid rgba(255,255,255,0.2)'
                                    }}
                                >
                                    CREATE NEW
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
