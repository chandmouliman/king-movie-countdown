"use client";

import { useEffect, useRef } from 'react';

export default function GoldParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        const particles: Particle[] = [];
        const particleCount = 100; // Creating 100 particles

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            alpha: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.2; // Slow movement X
                this.vy = (Math.random() - 0.5) * 0.2; // Slow movement Y
                this.size = Math.random() * 2 + 0.5; // Random size
                this.alpha = Math.random() * 0.5 + 0.2; // Random opacity
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Wrap around screen
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;

                // Interaction with mouse
                const dx = mouseRef.current.x - this.x;
                const dy = mouseRef.current.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 150;

                if (distance < maxDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (maxDistance - distance) / maxDistance;
                    const directionX = forceDirectionX * force * 0.5; // Push strength
                    const directionY = forceDirectionY * force * 0.5;

                    this.vx -= directionX;
                    this.vy -= directionY;
                } else {
                    // Return to normal speed slowly
                    if (this.vx > 0.2) this.vx -= 0.01;
                    else if (this.vx < -0.2) this.vx += 0.01;
                    if (this.vy > 0.2) this.vy -= 0.01;
                    else if (this.vy < -0.2) this.vy += 0.01;
                }
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.beginPath();
                // Gold color: 212, 175, 55
                ctx.fillStyle = `rgba(212, 175, 55, ${this.alpha})`;
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(particle => {
                particle.update();
                particle.draw(ctx);
            });

            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 5
            }}
        />
    );
}
