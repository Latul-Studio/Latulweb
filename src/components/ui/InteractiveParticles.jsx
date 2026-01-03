import React, { useEffect, useRef } from 'react';

const InteractiveParticles = ({ morph = true }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        let width, height;
        let particles = [];
        let animationFrameId;

        // Configuración
        const PARTICLE_COUNT = 2200; // Incrementado para la Phi que es más compleja
        const TEXT_SIZE_RATIO = 0.8; // "Más grande" (80% del alto)
        const EASE_FACTOR = 0.02;
        const MOUSE_RADIUS = 100;
        const MOUSE_STRENGTH = 3;

        let mouse = { x: -1000, y: -1000 };

        // Helper: Generate target points from text
        const getMorphTargets = (w, h) => {
            const offscreen = document.createElement('canvas');
            offscreen.width = w;
            offscreen.height = h;
            const oCtx = offscreen.getContext('2d');

            // Draw "Phi" (Φ)
            const fontSize = h * TEXT_SIZE_RATIO;
            // Usamos una fuente serif clásica o matemática
            oCtx.font = `400 ${fontSize}px "Times New Roman", serif`;
            oCtx.fillStyle = '#000000';
            oCtx.textAlign = 'center';
            oCtx.textBaseline = 'middle';

            // Posición: Lado derecho "ocupando bien el espacio"
            // Centrado en el 75% del ancho (zona derecha)
            oCtx.fillText('Φ', w * 0.75, h * 0.52);

            // Scan pixels
            const imageData = oCtx.getImageData(0, 0, w, h).data;
            const points = [];
            const gap = 3; // Menor gap = más detalle para el símbolo

            for (let y = 0; y < h; y += gap) {
                for (let x = 0; x < w; x += gap) {
                    const alpha = imageData[(y * w + x) * 4 + 3];
                    if (alpha > 128) {
                        points.push({ x, y });
                    }
                }
            }
            return points;
        };

        class Particle {
            constructor(w, h) {
                this.x = Math.random() * w;
                this.y = Math.random() * h;

                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 1.5 + 0.5;

                this.targetX = null;
                this.targetY = null;

                this.angle = Math.random() * Math.PI * 2;
            }

            update(mouseX, mouseY) {
                if (this.targetX !== null && this.targetY !== null) {
                    const dx = this.targetX - this.x;
                    const dy = this.targetY - this.y;

                    this.x += dx * EASE_FACTOR;
                    this.y += dy * EASE_FACTOR;
                } else {
                    this.x += this.vx;
                    this.y += this.vy;

                    if (this.x < 0 || this.x > width) this.vx *= -1;
                    if (this.y < 0 || this.y > height) this.vy *= -1;
                }

                // Mouse Interaction
                if (Math.abs(mouseX - this.x) < MOUSE_RADIUS && Math.abs(mouseY - this.y) < MOUSE_RADIUS) {
                    const dx = this.x - mouseX;
                    const dy = this.y - mouseY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < MOUSE_RADIUS) {
                        const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
                        const angle = Math.atan2(dy, dx);
                        const moveX = Math.cos(angle) * force * MOUSE_STRENGTH;
                        const moveY = Math.sin(angle) * force * MOUSE_STRENGTH;

                        this.x += moveX;
                        this.y += moveY;
                    }
                }
            }

            draw(ctx) {
                ctx.fillStyle = 'rgba(17, 24, 39, 0.6)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;

            // 1. Generate Targets
            let targets = [];
            if (morph) {
                targets = getMorphTargets(width, height);
                // Shuffle targets
                for (let i = targets.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [targets[i], targets[j]] = [targets[j], targets[i]];
                }
            }

            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const p = new Particle(width, height);
                if (morph && i < targets.length) {
                    p.targetX = targets[i].x;
                    p.targetY = targets[i].y;
                }
                particles.push(p);
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                p.update(mouse.x, mouse.y);
                p.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            init();
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        init();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [morph]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-auto opacity-50 mix-blend-multiply"
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export default InteractiveParticles;
