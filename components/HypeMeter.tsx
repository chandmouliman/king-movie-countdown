"use client";

import { useState, useEffect } from "react";
import styles from "../app/page.module.css"; // We can reuse some typography styles or create new ones

export default function HypeMeter({ count }: { count: number }) {
    // Internal state removed, now controlled by parent

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.8), transparent)',
            width: '100%',
            marginTop: '2rem',
            marginBottom: '2rem'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '1rem',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}>
                <span style={{
                    fontFamily: 'var(--font-cinzel)',
                    fontSize: 'clamp(2rem, 10vw, 3.5rem)', // Responsive font size
                    fontWeight: '900',
                    color: '#d4af37',
                    textShadow: '0 0 20px rgba(212, 175, 55, 0.4)',
                    fontVariantNumeric: 'tabular-nums' // Ensures numbers don't jump around width-wise
                }}>
                    {count.toLocaleString()}
                </span>
                <span style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '1.2rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                }}>
                    PEOPLE JOINED THE ARMY
                </span>
            </div>

            {/* Live Indicator */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '0.5rem'
            }}>
                <span style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#ff0000',
                    borderRadius: '50%',
                    boxShadow: '0 0 10px #ff0000',
                    animation: 'pulse 1.5s infinite'
                }}></span>
                <span style={{
                    color: '#ff0000',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    fontFamily: 'var(--font-inter)'
                }}>
                    LIVE UPDATES
                </span>
            </div>

            <style jsx>{`
                @keyframes pulse {
                    0% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.2); }
                    100% { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
}
