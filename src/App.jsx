import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/Router';
import Lenis from 'lenis'

/* --- CONFIGURACIÓN DE ESTILOS --- */
/* --- CONFIGURACIÓN DE ESTILOS --- */



import { USALProvider } from '@usal/react';

// ... (existing imports, keep them if possible, but replace strict block)
// Actually, to be safe, I'll do a targeted replacement of the App component return.

export default function App() {

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <Router>
      <USALProvider>
        <AppRouter />
      </USALProvider>
    </Router>
  );
}
