import React, { useEffect, useRef } from 'react';

const TextMorphParticles = ({ words = ["Seniority", "Rigor", "Orden", "Escala"] }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        let width, height;
        let particles = [];
        let animationFrameId;

        // Configuration
        const PARTICLE_COUNT = 2000;
        const EASE = 0.03; // Much slower formation (was 0.08)
        const HOLD_TIME = 2500; // Hold longer
        const BREAK_TIME = 1500; // Slower disperse

        let currentWordIndex = 0;
        let state = 'forming'; // 'forming', 'holding', 'breaking'
        let lastStateChangeTime = Date.now();

        let targets = [];

        const getWordPoints = (text, w, h) => {
            const offscreen = document.createElement('canvas');
            offscreen.width = w;
            offscreen.height = h;
            const oCtx = offscreen.getContext('2d');

            const fontSize = Math.min(w * 0.25, 120);

            oCtx.font = `900 ${fontSize}px "Google Sans", sans-serif`;
            oCtx.fillStyle = '#ff0000';
            oCtx.textAlign = 'center';
            oCtx.textBaseline = 'middle';
            oCtx.fillText(text, w / 2, h / 2);

            const imageData = oCtx.getImageData(0, 0, w, h).data;
            const points = [];
            const gap = 3;

            for (let y = 0; y < h; y += gap) {
                for (let x = 0; x < w; x += gap) {
                    if (imageData[(y * w + x) * 4 + 3] > 128) {
                        points.push({ x, y });
                    }
                }
            }
            return points;
        };

        class Particle {
            constructor(w, h) {
                // Initialize randomly but centrally to avoid edge startup pop
                this.x = Math.random() * w;
                this.y = Math.random() * h;

                // Very slow drift velocity
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;

                this.size = Math.random() * 2 + 0.5;
                this.baseX = this.x;
                this.baseY = this.y;

                this.targetX = null;
                this.targetY = null;

                const colors = ['#ffffff', '#0f97bd', '#505864']; // Added darker gray for depth
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update(w, h) {
                if (this.targetX !== null && this.targetY !== null) {
                    // Move to target
                    const dx = this.targetX - this.x;
                    const dy = this.targetY - this.y;
                    this.x += dx * EASE;
                    this.y += dy * EASE;

                    // Add subtle noise so it doesn't look frozen
                    this.x += (Math.random() - 0.5) * 0.2;
                    this.y += (Math.random() - 0.5) * 0.2;
                } else {
                    // If no target (breaking or surplus), float gently
                    // Do NOT explode. Just drift.
                    this.x += this.vx;
                    this.y += this.vy;
                }
            }

            draw(ctx) {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const assignTargets = (points) => {
            // Shuffle for organic fill
            for (let i = points.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [points[i], points[j]] = [points[j], points[i]];
            }

            particles.forEach((p, i) => {
                if (i < points.length) {
                    p.targetX = points[i].x;
                    p.targetY = points[i].y;
                } else {
                    // IMPORTANT: When releasing, set target to null so they start drifting
                    p.targetX = null;
                    p.targetY = null;
                    // Reset velocities to something gentle
                    p.vx = (Math.random() - 0.5) * 1.5;
                    p.vy = (Math.random() - 0.5) * 1.5;
                }
            });
        }

        const init = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            width = canvas.width = rect.width;
            height = canvas.height = rect.height;

            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(new Particle(width, height));
            }

            targets = getWordPoints(words[0], width, height);
            assignTargets(targets);
        };

        const loop = () => {
            const now = Date.now();
            const elapsed = now - lastStateChangeTime;

            if (state === 'forming') {
                if (elapsed > 2000) {
                    state = 'holding';
                    lastStateChangeTime = now;
                }
            } else if (state === 'holding') {
                if (elapsed > HOLD_TIME) {
                    state = 'breaking';
                    lastStateChangeTime = now;
                    // Release all targets
                    particles.forEach(p => {
                        p.targetX = null;
                        p.targetY = null;
                        // Organic scatter direction (outwards from center)
                        const dx = p.x - width / 2;
                        const dy = p.y - height / 2;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        // Gentle push outwards
                        p.vx = (dx / dist) * Math.random() * 2;
                        p.vy = (dy / dist) * Math.random() * 2;
                    });
                }
            } else if (state === 'breaking') {
                if (elapsed > BREAK_TIME) {
                    currentWordIndex = (currentWordIndex + 1) % words.length;
                    const nextWord = words[currentWordIndex];
                    targets = getWordPoints(nextWord, width, height);
                    assignTargets(targets);

                    state = 'forming';
                    lastStateChangeTime = now;
                }
            }

            // Draw Background (Clear)
            ctx.clearRect(0, 0, width, height);

            // Update & Draw Particles
            particles.forEach(p => {
                p.update(width, height);
                p.draw(ctx);
            });

            // --- VIGNETTE MASK (The "Anti-Box" Solution) ---
            // Draw a radial gradient on top that fades edges to transparent (or black, since bg is black)
            // Ideally we want particles to FADE OUT opacity near edges.
            // GlobalCompositeOperation 'destination-in' allows us to use a gradient as an alpha mask.

            ctx.globalCompositeOperation = 'destination-in';
            // Use Math.max(width, height) to ensure we cover wide text properly
            const radiusBase = Math.max(width, height);
            const gradient = ctx.createRadialGradient(width / 2, height / 2, radiusBase * 0.2, width / 2, height / 2, radiusBase * 0.8);
            gradient.addColorStop(0, 'rgba(0,0,0,1)'); // Center fully visible
            gradient.addColorStop(1, 'rgba(0,0,0,0)'); // Edges transparent
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            // Reset composite
            ctx.globalCompositeOperation = 'source-over';

            animationFrameId = requestAnimationFrame(loop);
        };

        init();
        loop();

        const handleResize = () => {
            init();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [words]);

    return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default TextMorphParticles;
