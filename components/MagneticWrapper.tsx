"use client";

import { useRef, useState, useEffect, ReactNode } from 'react';

interface MagneticWrapperProps {
    children: ReactNode;
    strength?: number; // How strong the pull is (default 0.5)
}

export default function MagneticWrapper({ children, strength = 0.5 }: MagneticWrapperProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const x = (clientX - centerX) * strength;
        const y = (clientY - centerY) * strength;

        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                transition: 'transform 0.1s ease-out', // Smooth transition
                display: 'inline-block', // Ensure it wraps content tightly
                cursor: 'none' // Maintain custom cursor visibility
            }}
        >
            {children}
        </div>
    );
}
