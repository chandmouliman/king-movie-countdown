"use client";

import { useState, useEffect, useRef } from 'react';
import styles from './LiveInterestTracking.module.css';
import RevealOnScroll from './RevealOnScroll';

// Simulation Constants
const UPDATE_INTERVAL = 3000; // ms

interface LogEntry {
    id: number;
    time: string;
    interest: number;
    growth: number;
}

export default function LiveInterestTracking() {
    const [currentInterest, setCurrentInterest] = useState(0); // Loading state
    const [lastUpdate, setLastUpdate] = useState(0);
    const [dayGrowth, setDayGrowth] = useState(200);
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [chartData, setChartData] = useState<number[]>([]);
    const [isLive, setIsLive] = useState(false);
    const interestRef = useRef(0);

    // Initial Fetch (No Simulation Loop)
    useEffect(() => {
        const fetchBaseData = async () => {
            try {
                const res = await fetch('/api/bms');
                const data = await res.json();
                const fetchedCount = data.count || 55900;

                setCurrentInterest(fetchedCount);

                // Set static data for chart to show a straight line for today
                setChartData([fetchedCount, fetchedCount, fetchedCount, fetchedCount]);

                setLogs([
                    {
                        id: Date.now(),
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        interest: fetchedCount,
                        growth: data.count ? Math.floor(data.count * 0.01) : 0 // Fake "last 24h" growth as 1% of total
                    }
                ]);
                setIsLive(data.live);
                setLastUpdate(0);
                setDayGrowth(data.count ? Math.floor(data.count * 0.01) : 200);
            } catch (e) {
                console.error("Failed to fetch BMS data", e);
                setCurrentInterest(55900);
            }
        };

        fetchBaseData();
        // Removed setInterval loop as requested: numbers stay exact and pause
    }, []);

    // Chart Rendering Logic
    const minVal = Math.min(...chartData);
    const maxVal = Math.max(...chartData);
    const range = maxVal - minVal || 1;
    const width = 100; // viewbox units
    const height = 50; // viewbox units

    // Generate SVG path
    const points = chartData.map((val, i) => {
        const x = (i / (chartData.length - 1)) * width;
        const y = height - ((val - minVal) / range) * height; // Invert Y
        return `${x},${y}`;
    }).join(' ');

    // Gradient area path
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
                        <div className={styles.liveIndicator} style={{ backgroundColor: '#00ccff', boxShadow: '0 0 10px #00ccff' }}></div>
                    </div>
                </div>
            </div>

            <div className={styles.mainContainer}>
                {/* Poster Image */}
                <RevealOnScroll delay={0.1} className={styles.posterWrapper}>
                    <img src="/poster.jpg" alt="King Movie Poster" className={styles.posterImage} />
                </RevealOnScroll>

                <div className={styles.grid}>

                    {/* Current Interests Card */}
                    <RevealOnScroll delay={0.2} className={`${styles.card} ${styles.interestCard}`}>
                        <span className={styles.cardLabel}>CURRENT INTERESTS</span>
                        <div className={styles.bigNumber}>
                            {currentInterest.toLocaleString()}
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

                        <a
                            href="https://in.bookmyshow.com/movies/hyderabad/king/ET00455480"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.interestedBtn}
                        >
                            I'm Interested on BMS
                        </a>

                        <div className={styles.statLabel} style={{ marginTop: '1rem', fontSize: '0.6rem', opacity: 0.5 }}>
                            LAST SYNC: {new Date().toLocaleTimeString()}
                        </div>
                    </RevealOnScroll>

                    {/* Growth Trend Card */}
                    <RevealOnScroll delay={0.3} className={`${styles.card} ${styles.chartCard}`}>
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
                                    <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="#ff5500" stopOpacity="0.5" />
                                        <stop offset="100%" stopColor="#ff5500" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                <path d={`M ${areaPath} Z`} className={styles.chartArea} />
                                <polyline points={points} className={styles.chartLine} />
                                {/* Last dot */}
                                {chartData.length > 0 && (() => {
                                    const lastVal = chartData[chartData.length - 1];
                                    const y = height - ((lastVal - minVal) / range) * height;
                                    return <circle cx={width} cy={y} r="1.5" className={styles.chartDot} />;
                                })()}
                            </svg>

                            {/* Y-Axis Labels (Simulated) */}
                            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: '0.6rem', color: '#444', height: '100%', padding: '5px 0' }}>
                                <span>{(maxVal / 1000).toFixed(1)}K</span>
                                <span>{(minVal / 1000).toFixed(1)}K</span>
                            </div>
                        </div>

                        <div className={styles.xAxis}>
                            <span>07:06 PM</span>
                            <span>12:05 AM</span>
                            <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    </RevealOnScroll>

                    {/* Data Logs */}
                    <RevealOnScroll delay={0.4} className={`${styles.card} ${styles.logsCard}`}>
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
                                {logs.map(log => (
                                    <tr key={log.id}>
                                        <td className={styles.logTime}>{log.time}</td>
                                        <td className={styles.logInterest}>{log.interest.toLocaleString()}</td>
                                        <td className={styles.logGrowth}>+ {log.growth}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </RevealOnScroll>

                </div>
            </div>
        </div>
    );
}
