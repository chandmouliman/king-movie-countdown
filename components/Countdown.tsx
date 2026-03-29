"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../app/page.module.css";

interface CountdownProps {
    targetDate: Date;
}

export default function Countdown({ targetDate }: CountdownProps) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTime = () => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            }
        };

        calculateTime();
        const timer = setInterval(calculateTime, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const pad = (num: number) => String(num).padStart(2, '0');

    const TimeUnit = ({ value, label }: { value: number, label: string }) => (
        <motion.div 
            whileHover={{ 
                scale: 1.05, 
                rotateY: 10, 
                rotateX: -5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.6), 0 0 20px var(--gold-glow)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={styles.timeBox}
        >
            <div className={styles.timeValue}>
                <AnimatePresence mode="popLayout">
                    <motion.span
                        key={value}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        {pad(value)}
                    </motion.span>
                </AnimatePresence>
            </div>
            <span className={styles.timeLabel}>{label}</span>
        </motion.div>
    );

    return (
        <div className={styles.countdown}>
            <TimeUnit value={timeLeft.days} label="DAYS" />
            <TimeUnit value={timeLeft.hours} label="HOURS" />
            <TimeUnit value={timeLeft.minutes} label="MINUTES" />
            <TimeUnit value={timeLeft.seconds} label="SECONDS" />
        </div>
    );
}
