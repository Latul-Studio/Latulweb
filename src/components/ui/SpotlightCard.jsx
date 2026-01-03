import React from 'react';

const SpotlightCard = ({ children, className = "" }) => {
    const divRef = React.useRef(null);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = React.useState(0);

    const handleMouseMove = (e) => {
        if (!divRef.current) return;

        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    }

    const handleMouseLeave = () => {
        setOpacity(0);
    }

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden group h-full rounded-sm bg-gray-50 focus-within:ring-2 focus-within:ring-violet-500 ${className}`}
        >
            {/* The Black Spotlight Layer (Revealed by mouse) */}
            <div
                className="pointer-events-none absolute -inset-px transition duration-300 z-0"
                style={{
                    opacity,
                    background: `radial-gradient(1400px circle at ${position.x}px ${position.y}px, rgba(0,0,0,1), transparent 80%)`,
                }}
            />

            {/* Content Container - Ensure it sits on top */}
            <div className="relative z-10 h-full">
                {children}
            </div>
        </div>
    );
};

export default SpotlightCard;
