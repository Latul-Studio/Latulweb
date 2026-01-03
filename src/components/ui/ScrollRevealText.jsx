import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ScrollRevealText = ({
    children,
    className = "",
    lineClassName = "",
    simple = false // If true, treat children as a single block. If false, split by <br/> logic handled by caller or just strings
}) => {
    // For this specific request, the user has a title with <br />. 
    // We can handle the array of lines passed as children if we structure it that way, 
    // or just animate the whole block if simpler.
    // Ideally for "letters rising", each line should rise efficiently.

    // Let's assume content is passed as an array of strings representing lines,
    // or we manually split it.

    const body = useRef(null);
    const isInView = useInView(body, { once: true, margin: "-10%" });

    const animation = {
        initial: { y: "100%" },
        enter: (i) => ({
            y: "0%",
            transition: {
                duration: 0.75,
                ease: [0.33, 1, 0.68, 1],
                delay: 0.075 * i
            }
        })
    };

    // If children is a string, split by newline if we want strict line control,
    // otherwise wrap everything.
    // But the user's title in Home.jsx is: "Si lo bueno ... <br /> ... indicado"
    // So passing it as an array of line strings is best for control.

    if (!Array.isArray(children)) {
        return (
            <div ref={body} className={className}>
                <div className="overflow-hidden">
                    <motion.div
                        variants={animation}
                        initial="initial"
                        animate={isInView ? "enter" : "initial"}
                        custom={0}
                        className={lineClassName}
                    >
                        {children}
                    </motion.div>
                </div>
            </div>
        )
    }

    return (
        <div ref={body} className={className}>
            {children.map((line, index) => (
                <div key={index} className="overflow-hidden pb-4">
                    <motion.div
                        variants={animation}
                        initial="initial"
                        animate={isInView ? "enter" : "initial"}
                        custom={index}
                        className={lineClassName}
                    >
                        {line}
                    </motion.div>
                </div>
            ))}
        </div>
    );
};

export default ScrollRevealText;
