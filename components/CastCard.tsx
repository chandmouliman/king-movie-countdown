"use client";

import { useState } from "react";
import styles from "../app/page.module.css";

interface CastCardProps {
    name: string;
    role?: string;
}

export default function CastCard({ name, role }: CastCardProps) {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
        const rotateY = ((x - centerX) / centerX) * 10;

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseEnter = () => setIsHovered(true);

    const handleMouseLeave = () => {
        setIsHovered(false);
        setRotation({ x: 0, y: 0 });
    };

    return (
        <div
            className={styles.castCard}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: isHovered
                    ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.05, 1.05, 1.05)`
                    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                transition: 'transform 0.1s ease-out',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(30,30,30,0.9) 0%, rgba(10,10,10,0.95) 100%)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                boxShadow: isHovered ? '0 15px 30px rgba(0,0,0,0.5), 0 0 15px rgba(212, 175, 55, 0.2)' : '0 5px 15px rgba(0,0,0,0.3)'
            }}
        >
            {/* Holographic Shine Effect */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(105deg, transparent 20%, rgba(212,175,55,0.1) 25%, transparent 30%)',
                    transform: isHovered ? `translateX(${rotation.y * 5}%) translateY(${rotation.x * 5}%)` : 'translateX(-100%)',
                    transition: 'transform 0.1s ease-out',
                    zIndex: 1,
                    pointerEvents: 'none'
                }}
            />

            <div style={{ position: 'relative', zIndex: 2 }}>
                {role && <span className={styles.castRole} style={{ color: '#d4af37', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>{role}</span>}
                <h4 className={styles.castName} style={{ fontFamily: 'Cinzel', fontSize: '1.4rem', color: '#fff', margin: 0 }}>{name}</h4>
            </div>
        </div>
    );
}
