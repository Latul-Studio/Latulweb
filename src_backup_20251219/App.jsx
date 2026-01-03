import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Services from './pages/Services';
import Home from './pages/Home';

/* --- CONFIGURACIÓN DE ESTILOS --- */
const Styles = () => (
  <style>{`
    :root {
      --cyan-1: #056b93;
      --cyan-2: #0f97bd;
      --cyan-3: #50c6d0;
      
      --violet-1: #930768;
      --violet-2: #bc1296;
      --violet-3: #d051bc;
      
      --bg-white: #ffffff;
      --bg-gray: #f5f5f7;
      --text-black: #111111;
      --text-gray: #666666;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      background-color: var(--bg-white);
      color: var(--text-black);
      overflow-x: hidden;
    }

    .hover-cyan:hover {
      border-color: var(--cyan-2);
      color: var(--cyan-1);
      box-shadow: 0 4px 20px rgba(15, 151, 189, 0.15);
    }
    
    .hover-violet:hover {
      border-color: var(--violet-2);
      color: var(--violet-1);
      box-shadow: 0 4px 20px rgba(188, 18, 150, 0.15);
    }

    .glass-light {
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }

    .bg-stripes {
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 24vh,
        #f5f5f7 24vh,
        #f5f5f7 25vh
      );
    }

    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #fff; }
    ::-webkit-scrollbar-thumb { background: #ddd; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--cyan-3); }

    .fade-up-enter { opacity: 0; transform: translateY(20px); }
    .fade-up-enter-active { opacity: 1; transform: translateY(0); transition: opacity 500ms, transform 500ms; }
  `}</style>
);

export default function App() {
  return (
    <Router>
      <Styles />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/equipo" element={<div className="container mx-auto px-6 py-24"><h1>Equipo...</h1></div>} />
          <Route path="/casos-de-exito" element={<div className="container mx-auto px-6 py-24"><h1>Casos de Éxito...</h1></div>} />
          <Route path="/contacto" element={<div className="container mx-auto px-6 py-24"><h1>Contacto...</h1></div>} />
        </Routes>
      </Layout>
    </Router>
  );
}
