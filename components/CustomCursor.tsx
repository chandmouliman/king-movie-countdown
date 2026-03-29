"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHoverStart);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHoverStart);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="custom-cursor"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
      >
        <motion.div
          animate={{
            scale: isHovered ? 1.5 : 1,
            backgroundColor: isHovered ? "rgba(212, 175, 55, 0.3)" : "rgba(212, 175, 55, 0.1)",
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: "1px solid var(--gold)",
            position: "absolute",
            top: "-16px",
            left: "-16px",
            pointerEvents: "none",
            zIndex: 999999,
          }}
        />
        <motion.div
          animate={{
            scale: isHovered ? 0.5 : 1,
          }}
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "var(--gold-bright)",
            position: "absolute",
            top: "-3px",
            left: "-3px",
            pointerEvents: "none",
            zIndex: 999999,
            boxShadow: "0 0 10px var(--gold-glow)",
          }}
        />
      </motion.div>
    </>
  );
}
