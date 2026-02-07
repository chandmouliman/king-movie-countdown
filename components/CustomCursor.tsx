"use client";

import { useEffect, useState } from "react";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updateCursor = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        const handleLinkHover = () => setIsHovering(true);
        const handleLinkLeave = () => setIsHovering(false);

        window.addEventListener("mousemove", updateCursor);
        window.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("mouseenter", handleMouseEnter);

        const hoverableElements = document.querySelectorAll("a, button, .clickable");
        hoverableElements.forEach((el) => {
            el.addEventListener("mouseenter", handleLinkHover);
            el.addEventListener("mouseleave", handleLinkLeave);
        });

        const observer = new MutationObserver(() => {
            const newHoverables = document.querySelectorAll("a, button, .clickable");
            newHoverables.forEach((el) => {
                el.addEventListener("mouseenter", handleLinkHover);
                el.addEventListener("mouseleave", handleLinkLeave);
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", updateCursor);
            window.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("mouseenter", handleMouseEnter);
            hoverableElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleLinkHover);
                el.removeEventListener("mouseleave", handleLinkLeave);
            });
            observer.disconnect();
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            <div
                className={`${styles.cursorDot} ${isHovering ? styles.hover : ""}`}
                style={{ left: `${position.x}px`, top: `${position.y}px` }}
            />
            <div
                className={`${styles.cursorRing} ${isHovering ? styles.hover : ""}`}
                style={{ left: `${position.x}px`, top: `${position.y}px` }}
            />
        </>
    );
}
