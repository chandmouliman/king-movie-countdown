"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../app/page.module.css";

interface AudioPlayerProps {
    isPlaying: boolean;
    onToggle: () => void;
}

export default function AudioPlayer({ isPlaying, onToggle }: AudioPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        if (isPlaying && audioRef.current) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Audio play prevented:", error);
                    // If blocked, we might revert isPlaying state or show a UI hint
                });
            }
            setHasInteracted(true);
        } else if (!isPlaying && audioRef.current) {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    return (
        <>
            <audio ref={audioRef} src="/assets/king-theme.mp3" />

            {/* Visual Control Button */}
            {/* Visual Control Button - Always Visible */}
            <button
                className={styles.audioControl}
                onClick={onToggle}
                aria-label={isPlaying ? "Mute Sound" : "Enable Sound"}
            >
                {isPlaying ? "AUDIO ON" : "AUDIO OFF"}
            </button>
        </>
    );
}
