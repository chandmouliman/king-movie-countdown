"use client";

import { useState, useEffect } from "react";
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

    return (
        <div className={styles.countdown}>
            <div className={styles.timeBox}>
                <span className={styles.timeValue}>{pad(timeLeft.days)}</span>
                <span className={styles.timeLabel}>DAYS</span>
            </div>
            <div className={styles.separator}>:</div>
            <div className={styles.timeBox}>
                <span className={styles.timeValue}>{pad(timeLeft.hours)}</span>
                <span className={styles.timeLabel}>HOURS</span>
            </div>
            <div className={styles.separator}>:</div>
            <div className={styles.timeBox}>
                <span className={styles.timeValue}>{pad(timeLeft.minutes)}</span>
                <span className={styles.timeLabel}>MINUTES</span>
            </div>
            <div className={styles.separator}>:</div>
            <div className={styles.timeBox}>
                <span className={styles.timeValue}>{pad(timeLeft.seconds)}</span>
                <span className={styles.timeLabel}>SECONDS</span>
            </div>
        </div>
    );
}
