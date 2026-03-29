"use client";

import { useRef, useState, useEffect, ReactNode } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

interface MagneticWrapperProps {
    children: ReactNode;
    strength?: number; // How strong the pull is (default 0.35)
}

export default function MagneticWrapper({ children, strength = 0.35 }: MagneticWrapperProps) {
    const ref = useRef<HTMLDivElement>(null);
    
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const x = (clientX - centerX) * strength;
        const y = (clientY - centerY) * strength;

        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                x: springX,
                y: springY,
                display: 'inline-block',
                cursor: 'none'
            }}
        >
            {children}
        </motion.div>
    );
}
