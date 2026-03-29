"use client";

import { motion } from 'framer-motion';
import styles from './KKRLivePulse.module.css';

const KKR_RESULTS = [
    {
        date: "MAR 29, 2026",
        opponent: "MUMBAI INDIANS",
        venue: "Wankhede Stadium, Mumbai",
        result: "MI won by 6 wickets",
        kkrScore: "220/4 (20)",
        oppScore: "224/4 (19.1)",
        status: "LOST",
        topPerformer: "N. Rana (88 off 42)"
    }
];

const KKR_SCHEDULE = [
    {
        date: "APR 02",
        time: "7:30 PM",
        opponent: "SUNRISERS HYDERABAD",
        venue: "Eden Gardens, Kolkata",
        type: "HOME"
    },
    {
        date: "APR 06",
        time: "7:30 PM",
        opponent: "PUNJAB KINGS",
        venue: "Eden Gardens, Kolkata",
        type: "HOME"
    },
    {
        date: "APR 09",
        time: "7:30 PM",
        opponent: "LUCKNOW SUPER GIANTS",
        venue: "Eden Gardens, Kolkata",
        type: "HOME"
    },
    {
        date: "APR 14",
        time: "7:30 PM",
        opponent: "CHENNAI SUPER KINGS",
        venue: "M.A. Chidambaram Stadium, Chennai",
        type: "AWAY"
    }
];

export default function KKRLivePulse() {
    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <div className={styles.purpleBar}></div>
                <div>
                    <h2 className={styles.title}>KKR LIVE PULSE</h2>
                    <span className={styles.subtitle}>IPL 2026 CAMPAIGN</span>
                </div>
                <div className={styles.liveTag}>LIVE</div>
            </div>

            <div className={styles.grid}>
                {/* Latest Result */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={styles.card}
                >
                    <div className={styles.cardHeader}>LATEST MATCH</div>
                    {KKR_RESULTS.map((match, i) => (
                        <div key={i} className={styles.matchDetail}>
                            <div className={styles.matchDate}>{match.date}</div>
                            <div className={styles.teams}>
                                <div className={styles.team}>
                                    <span className={styles.teamName}>KKR</span>
                                    <span className={styles.score}>{match.kkrScore}</span>
                                </div>
                                <div className={styles.vs}>vs</div>
                                <div className={styles.team}>
                                    <span className={styles.teamName}>MI</span>
                                    <span className={styles.score}>{match.oppScore}</span>
                                </div>
                            </div>
                            <div className={`${styles.result} ${match.status === 'LOST' ? styles.lost : styles.won}`}>
                                {match.result}
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Upcoming Schedule */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className={`${styles.card} ${styles.scheduleCard}`}
                >
                    <div className={styles.cardHeader}>UPCOMING FIXTURES</div>
                    <div className={styles.scheduleList}>
                        {KKR_SCHEDULE.map((item, i) => (
                            <div key={i} className={styles.scheduleItem}>
                                <div className={styles.schedDate}>
                                    <span className={styles.dateNum}>{item.date}</span>
                                    <span className={styles.time}>{item.time}</span>
                                </div>
                                <div className={styles.schedOpp}>
                                    <div className={styles.oppHeader}>
                                        <span className={styles.vsLabel}>vs</span>
                                        <span className={styles.oppName}>{item.opponent}</span>
                                        <span className={styles.venueTag}>{item.type}</span>
                                    </div>
                                    <span className={styles.venue}>{item.venue}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
            
            <div className={styles.korboLorbo}>
                KORBO LORBO JEETBO RE! 💜🏆
            </div>
        </section>
    );
}
