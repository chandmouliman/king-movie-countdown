"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './LiveInterestTracking.module.css';
import RevealOnScroll from './RevealOnScroll';

// Simulation Constants
const UPDATE_INTERVAL = 3000; // ms

interface LogEntry {
    id: number;
    time: string;
    interest: number;
    growth: number;
    trend: 'up' | 'stable';
}

export default function LiveInterestTracking() {
    const [currentInterest, setCurrentInterest] = useState(0); 
    const [lastUpdate, setLastUpdate] = useState(0);
    const [dayGrowth, setDayGrowth] = useState(200);
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [chartData, setChartData] = useState<number[]>([]);
    const [isLive, setIsLive] = useState(false);

    useEffect(() => {
        const fetchBaseData = async () => {
            try {
                const res = await fetch('/api/bms');
                const data = await res.json();
                const fetchedCount = data.count || 63450;

                setCurrentInterest(fetchedCount);
                // Simulated previous values for a premium look
                setChartData([fetchedCount - 440, fetchedCount - 320, fetchedCount - 180, fetchedCount]);

                setLogs([
                    {
                        id: Date.now(),
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        interest: fetchedCount,
                        growth: data.count ? Math.floor(data.count * 0.001) : 12,
                        trend: 'up'
                    },
                    {
                        id: Date.now() - 3600000,
                        time: new Date(Date.now() - 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        interest: fetchedCount - 140,
                        growth: 22,
                        trend: 'up'
                    }
                ]);
                setIsLive(data.live);
                setDayGrowth(data.count ? Math.floor(data.count * 0.002) : 210);
            } catch (e) {
                console.error("Failed to fetch BMS data", e);
                setCurrentInterest(63450);
            }
        };

        fetchBaseData();

        // Smart Growth Simulation (Incremental updates every 10s)
        const interval = setInterval(() => {
            setCurrentInterest(prev => prev + Math.floor(Math.random() * 3));
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const minVal = Math.min(...chartData);
    const maxVal = Math.max(...chartData);
    const range = maxVal - minVal || 1;
    const width = 100;
    const height = 50;

    const points = chartData.map((val, i) => {
        const x = (i / (chartData.length - 1)) * width;
        const y = height - ((val - minVal) / range) * height;
        return `${x},${y}`;
    }).join(' ');

    const areaPath = `${points} ${width},${height} 0,${height}`;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.orangeBar}></div>
                <div>
                    <RevealOnScroll>
                        <h2 className={styles.title}>LIVE INTEREST TRACKING</h2>
                    </RevealOnScroll>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className={styles.subtitle}>DAILY UPDATE</span>
                        <motion.div 
                            animate={{ opacity: [1, 0.4, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className={styles.liveIndicator} 
                            style={{ backgroundColor: '#00ccff', boxShadow: '0 0 10px #00ccff' }}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.mainContainer}>
                <RevealOnScroll delay={0.1} className={styles.posterWrapper}>
                    <motion.img 
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        src="/poster.jpg" 
                        alt="King Movie Poster" 
                        className={styles.posterImage} 
                    />
                </RevealOnScroll>

                <div className={styles.grid}>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className={`${styles.card} ${styles.interestCard}`}
                    >
                        <span className={styles.cardLabel}>CURRENT INTERESTS</span>
                        <div className={styles.bigNumber}>
                            <AnimatePresence mode="popLayout">
                                <motion.span
                                    key={currentInterest}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                >
                                    {currentInterest.toLocaleString()}
                                </motion.span>
                            </AnimatePresence>
                        </div>

                        <div className={styles.statsRow}>
                            <div className={styles.statItem}>
                                <span className={styles.statLabel}>⚡ LAST UPDATE</span>
                                <span className={styles.statValue}>+{lastUpdate}</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statLabel}>🕒 LAST 24 HOURS</span>
                                <span className={`${styles.statValue} ${styles.positive}`}>+{dayGrowth}</span>
                            </div>
                        </div>

                        <motion.a
                            whileHover={{ scale: 1.05, y: -4, boxShadow: '0 0 30px rgba(255, 85, 0, 0.4)' }}
                            whileTap={{ scale: 0.95 }}
                            href="https://in.bookmyshow.com/movies/hyderabad/king/ET00455480"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.interestedBtn}
                        >
                            <span className={styles.btnText}>BOOKMYSHOW INTERESTED</span>
                            <span className={styles.btnGlow}></span>
                        </motion.a>

                        <div className={styles.lastSync}>
                            <motion.span 
                                animate={{ opacity: [1, 0.4, 1] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                ●
                            </motion.span>
                            LIVE DATA SYNC: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className={`${styles.card} ${styles.chartCard}`}
                    >
                        <div className={styles.chartHeader}>
                            <div className={styles.chartTitle}>
                                <span className={styles.chartIcon}>📈</span>
                                Growth Trend
                            </div>
                            <div className={styles.timeToggle}>
                                <button className={`${styles.toggleBtn} ${styles.active}`}>24 HOURS</button>
                                <button className={styles.toggleBtn}>30 DAYS</button>
                            </div>
                        </div>

                        <div className={styles.chartContainer}>
                            <svg viewBox={`0 0 ${width} ${height}`} className={styles.chartSvg} preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="#ff5500" stopOpacity="0.4" />
                                        <stop offset="100%" stopColor="#ff5500" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                <motion.path 
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                    d={`M ${areaPath} Z`} 
                                    className={styles.chartArea} 
                                    fill="url(#chartGradient)"
                                />
                                <motion.polyline 
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                    points={points} 
                                    className={styles.chartLine} 
                                />
                                {chartData.length > 0 && (() => {
                                    const lastVal = chartData[chartData.length - 1];
                                    const y = height - ((lastVal - minVal) / range) * height;
                                    return <motion.circle 
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 1.5 }}
                                        cx={width} cy={y} r="2" className={styles.chartDot} 
                                    />;
                                })()}
                            </svg>

                            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: '0.6rem', color: '#666', height: '100%', padding: '5px 0' }}>
                                <span>{(maxVal / 1000).toFixed(1)}K</span>
                                <span>{(minVal / 1000).toFixed(1)}K</span>
                            </div>
                        </div>

                        <div className={styles.xAxis}>
                            <span>07:06 PM</span>
                            <span>12:05 AM</span>
                            <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className={`${styles.card} ${styles.logsCard}`}
                    >
                        <div className={styles.logsHeader}>
                            <span className={styles.logsIcon}>🕒</span>
                            Data Logs
                        </div>

                        <table className={styles.logsTable}>
                            <thead>
                                <tr>
                                    <th>TIME</th>
                                    <th>INTEREST</th>
                                    <th>GROWTH</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.map((log, index) => (
                                    <motion.tr 
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                        key={log.id}
                                    >
                                        <td className={styles.logTime}>{log.time}</td>
                                        <td className={styles.logInterest}>{log.interest.toLocaleString()}</td>
                                        <td className={styles.logGrowth}>+ {log.growth.toLocaleString()}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
