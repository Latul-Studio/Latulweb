# Instrucciones de Rediseño: Estética "Clean Tech" & Antigravity Particles

**Rol:** Creative Frontend Developer.
**Objetivo:** Rediseñar `Home.jsx` eliminando contenedores y bordes para lograr una estética "Clean Tech" con fondo de partículas interactivo, manteniendo el Hero 3D original intacto.
**Stack:** React, Tailwind, Framer Motion (Nuevo), Canvas API.

## 1. Nuevo Componente: Fondo de Partículas Interactivo (`src/components/ui/InteractiveParticles.jsx`)

Este componente crea una red de puntos sutiles que huyen del mouse, generando esa sensación de "fluidez" o antigravedad en el fondo blanco.

```jsx
import React, { useEffect, useRef } from 'react';

const InteractiveParticles = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        // Configuración
        const particleCount = 80; // Cantidad de puntos (minimalista)
        const connectionDistance = 100;
        const mouseDistance = 150;

        let mouse = { x: null, y: null };

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5; // Velocidad lenta
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = 1.5; // Puntos pequeños
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 30) + 1;
            }

            update() {
                // Movimiento base
                this.x += this.vx;
                this.y += this.vy;

                // Rebote en bordes
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Interacción Mouse (Efecto Antigravedad/Repulsión)
                if (mouse.x != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < mouseDistance) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouseDistance - distance) / mouseDistance;
                        const directionX = forceDirectionX * force * this.density;
                        const directionY = forceDirectionY * force * this.density;
                        
                        this.x -= directionX * 5; // Fuerza de empuje
                        this.y -= directionY * 5;
                    }
                }
            }

            draw() {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'; // Puntos negros sólidos
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Conexiones sutiles (Red neuronal)
            particles.forEach((a, index) => {
                for (let bIndex = index; bIndex < particles.length; bIndex++) {
                    const b = particles[bIndex];
                    let dx = a.x - b.x;
                    let dy = a.y - b.y;
                    let distance = Math.sqrt(dx*dx + dy*dy);

                    if (distance < connectionDistance) {
                        ctx.strokeStyle = `rgba(0,0,0,${0.1 - distance/connectionDistance})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        handleResize();
        init();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 z-0 pointer-events-none opacity-40"
        />
    );
};

export default InteractiveParticles;