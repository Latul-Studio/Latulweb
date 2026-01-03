/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                // REEMPLAZO: Definir Google Sans como la fuente principal sans-serif
                sans: ['"Google Sans"', 'sans-serif'],
            },
            // Map Tailwind utilities to our fluid VW variables
            spacing: {
                'xs': 'var(--spacing-xs)',
                'sm': 'var(--spacing-sm)',
                'md': 'var(--spacing-md)',
                'lg': 'var(--spacing-lg)',
                'xl': 'var(--spacing-xl)',
            },
            borderRadius: {
                'xs': 'var(--shape-corner-xs)',
                'sm': 'var(--shape-corner-sm)',
                'md': 'var(--shape-corner-md)',
                'lg': 'var(--shape-corner-lg)',
                'xl': 'var(--shape-corner-xl)',
                'full': '9999px', // Keeping pill strict
            },
            backdropBlur: {
                'sm': '0.5vw',
                'md': '1vw',
                'lg': '2vw',
            }
        },
    },
    plugins: [],
}