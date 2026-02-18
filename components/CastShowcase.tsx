"use client";

import styles from './CastShowcase.module.css';
import RevealOnScroll from './RevealOnScroll';

const CAST_DATA = [
    {
        id: '01',
        name: 'Shah Rukh Khan',
        role: 'The King',
        image: '/cast/srk.jpg'
    },
    {
        id: '02',
        name: 'Suhana Khan',
        role: 'The Protege',
        image: '/cast/suhana.jpg'
    },
    {
        id: '03',
        name: 'Abhishek Bachchan',
        role: 'The Antagonist',
        image: '/cast/abhishek.jpg'
    }
];

const CREW_DATA = [
    {
        name: 'Siddharth Anand',
        role: 'Director',
        image: '/cast/siddharth.jpg'
    },
    {
        name: 'Gauri Khan',
        role: 'Producer',
        image: '/cast/gauri.jpg'
    },
    {
        name: 'Anirudh Ravichander',
        role: 'Music',
        image: '/cast/anirudh.png'
    },
    {
        name: 'Abbas Tyrewala',
        role: 'Dialogues',
        image: '/cast/abbas.jpg'
    },
    {
        name: 'Satchith Paulose',
        role: 'Cinematography',
        image: '/cast/satchith.jpg'
    },
    {
        name: 'Ruben',
        role: 'Edited By',
        image: '/cast/ruben.jpg'
    },
    {
        name: 'Red Chillies Ent.',
        role: 'Production',
        image: '/cast/redchillies.jpg'
    },
    {
        name: 'Marflix Pictures',
        role: 'Production',
        image: '/cast/marflix.jpg'
    },
    {
        name: 'PVR Inox Pictures',
        role: 'Distributed By',
        image: '/cast/pvr.jpg'
    },
    {
        name: 'Yash Raj Films',
        role: 'Distributed By',
        image: '/cast/yrf.png'
    }
];

export default function CastShowcase() {
    return (
        <section className={styles.container}>
            {/* CAST SECTION */}
            <div className={styles.heading}>
                <RevealOnScroll>
                    <h2 className={styles.subtitle}>THE <span className={styles.crewHighlight}>CAST</span></h2>
                </RevealOnScroll>
            </div>

            <RevealOnScroll delay={0.2}>
                <div className={styles.grid}>
                    {CAST_DATA.map((member) => (
                        <div key={member.id} className={styles.card}>
                            <div className={styles.imageContainer}>
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className={styles.image}
                                />
                                <div className={styles.scanlines}></div>
                            </div>

                            <div className={styles.number}>{member.id}</div>

                            <div className={styles.info}>
                                <div className={styles.name}>
                                    {member.name.split(' ').map((part, i) => (
                                        <div key={i}>{part}</div>
                                    ))}
                                </div>
                                <div className={styles.role}>{member.role}</div>
                            </div>

                            <div className={styles.crosshair}></div>
                        </div>
                    ))}
                </div>
            </RevealOnScroll>

            {/* CREW SECTION */}
            <div className={styles.crewHeader}>
                <RevealOnScroll delay={0.2}>
                    <h2 className={styles.crewTitle}>
                        THE TECHNICAL <span className={styles.crewHighlight}>TEAM</span>
                    </h2>
                </RevealOnScroll>
            </div>

            <RevealOnScroll delay={0.4}>
                <div className={styles.crewGrid}>
                    {CREW_DATA.map((member, index) => (
                        <div key={index} className={styles.crewCard}>
                            <div className={styles.crewImageContainer}>
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className={styles.crewImage}
                                />
                                <div className={styles.crewScanlines}></div>
                            </div>
                            <h3 className={styles.crewName}>{member.name}</h3>
                            <div className={styles.crewRole}>{member.role}</div>
                        </div>
                    ))}
                </div>
            </RevealOnScroll>
        </section>
    );
}
