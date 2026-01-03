# Instrucciones Maestras: Reparación de Hero y Menú Móvil "Stripe-Style"

**Prioridad:** CRÍTICA (Bloqueante).
**Objetivo:** Restaurar el Hero 3D y desplegar el nuevo menú móvil con navegación anidada (Drill-Down).
[cite_start]**Referencia Visual:** Navegación móvil tipo Stripe (Panel principal -> Deslizar a Panel Secundario).

---

## PASO 1: Limpieza de Entorno (OBLIGATORIO)

Antes de tocar cualquier archivo, ejecuta en tu terminal para asegurar que no haya conflictos de librerías:

1.  **Detén el servidor** de desarrollo.
2.  **Elimina** cualquier script de Three.js (CDN) en el archivo `index.html`.
3.  **Instala** las dependencias limpias:
    `npm install three lucide-react`

---

## PASO 2: Reemplazo Total de `src/pages/Home.jsx` (Fix Hero)

**Instrucción:** NO edites el archivo existente. **Reemplaza TODO su contenido** por el siguiente código.
**Por qué:** Este código usa `import * as THREE from 'three'` nativo. Esto elimina el conflicto de "Multiple instances" que rompe la pantalla. Además, restaura la turbina de cerámica blanca con luz Cyan.

*(Antigravity: Usa el código del bloque "Home.jsx" proporcionado en las instrucciones anteriores, asegurando que use `useThreeHero` con `geometry.dispose()` en el cleanup).*

---

## PASO 3: Reemplazo Total de `src/components/layout/Navbar.jsx` (Lógica Drill-Down)

**Instrucción:** Reemplaza TODO el contenido de `Navbar.jsx`.
**Lógica de Interacción:** Implementaremos el patrón "Drill-Down" (taladrado) visto en la referencia de Stripe.
* **Estado:** `mobileView` controla qué panel se ve ('main' o 'services').
* **Transición:** Usaremos clases de Tailwind `translate-x` para deslizar los paneles lateralmente, simulando una app nativa.
* **Z-Index:** Forzaremos `z-50` para que el menú nunca quede cortado por el Hero.

### Código Fuente para `Navbar.jsx`:

```jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronRight, ChevronLeft, Brain, Cpu, Globe, ShoppingCart } from 'lucide-react';
// Ajusta esta ruta a tu estructura real
import LogoHorizontal from '../../assets/Logo_icon/Logo Horizontal 1_1.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileView, setMobileView] = useState('main'); // Estados: 'main' | 'services'

  // Función para cerrar y resetear la vista al fondo
  const closeMenu = () => {
    setIsOpen(false);
    setTimeout(() => setMobileView('main'), 300); // Espera a que termine la animación
  };

  // Clases base para enlaces de escritorio
  const desktopLinkClass = "text-xs font-normal uppercase tracking-widest text-black hover:text-[#0f97bd] transition-colors";

  return (
    <>
      {/* --- NAVBAR FIJO (Escritorio y Móvil) --- */}
      <nav className="fixed top-0 left-0 w-full h-20 bg-white/80 backdrop-blur-xl border-b border-white/20 z-50 flex items-center justify-between px-6 transition-all duration-300">
        
        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="z-50">
          <img src={LogoHorizontal} alt="Latul Studio" className="h-8 md:h-10 w-auto object-contain" />
        </Link>

        {/* Menú Escritorio (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/nosotros" className={desktopLinkClass}>Nosotros</Link>
          
          {/* Dropdown Desktop (Hover) */}
          <div className="group relative h-full flex items-center cursor-pointer">
            <span className={`${desktopLinkClass} flex items-center gap-1`}>Servicios</span>
            <div className="absolute top-full left-0 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform -translate-x-4">
              <div className="w-64 bg-white/95 backdrop-blur-xl border border-gray-100 shadow-2xl rounded-xl p-2 flex flex-col gap-1">
                <Link to="/servicios/consultoria-estrategica" className="block px-4 py-3 rounded-lg hover:bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-800 hover:text-[#0f97bd]">Estrategia</Link>
                <Link to="/servicios/automatizacion-ia" className="block px-4 py-3 rounded-lg hover:bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-800 hover:text-[#0f97bd]">Automatización & IA</Link>
                <Link to="/servicios/desarrollo-web" className="block px-4 py-3 rounded-lg hover:bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-800 hover:text-[#0f97bd]">Desarrollo Web</Link>
              </div>
            </div>
          </div>

          <Link to="/casos-de-exito" className={desktopLinkClass}>Casos de Éxito</Link>
        </div>

        {/* Botones Derecha */}
        <div className="flex items-center gap-4 z-50">
          <Link to="/contacto" className="hidden md:block px-6 py-2 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#0f97bd] transition-colors shadow-lg">
            Hablemos
          </Link>
          {/* Toggle Móvil */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-black bg-gray-100/50 rounded-full backdrop-blur-md">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* --- MENU MÓVIL (Full Screen Drill-Down) --- */}
      <div className={`fixed inset-0 z-40 bg-white md:hidden transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* CONTENEDOR VISTAS (Relativo para posicionar paneles absolutos) */}
        <div className="relative w-full h-full pt-24 px-6 overflow-hidden">
          
          {/* PANEL 1: PRINCIPAL (Se desliza a la izquierda al entrar a Servicios) */}
          <div className={`absolute inset-0 pt-24 px-6 w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${mobileView === 'main' ? 'translate-x-0' : '-translate-x-1/3 opacity-0 pointer-events-none'}`}>
            <nav className="flex flex-col gap-6">
              <Link to="/" onClick={closeMenu} className="text-2xl font-light uppercase tracking-widest border-b border-gray-100 pb-4">Inicio</Link>
              <Link to="/nosotros" onClick={closeMenu} className="text-2xl font-light uppercase tracking-widest border-b border-gray-100 pb-4">Nosotros</Link>
              
              {/* Trigger Navegación Nivel 2 */}
              <button 
                onClick={() => setMobileView('services')} 
                className="w-full flex justify-between items-center text-2xl font-light uppercase tracking-widest border-b border-gray-100 pb-4 group"
              >
                Servicios 
                <div className="p-2 bg-gray-50 rounded-full group-active:bg-[#0f97bd] group-active:text-white transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </button>

              <Link to="/casos-de-exito" onClick={closeMenu} className="text-2xl font-light uppercase tracking-widest border-b border-gray-100 pb-4">Casos de Éxito</Link>
              
              <Link to="/contacto" onClick={closeMenu} className="mt-8 w-full py-4 bg-black text-white text-center font-bold uppercase tracking-widest rounded-full">
                Empezar Proyecto
              </Link>
            </nav>
          </div>

          {/* PANEL 2: SERVICIOS (Entra desde la derecha) */}
          <div className={`absolute inset-0 pt-24 px-6 w-full h-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${mobileView === 'services' ? 'translate-x-0' : 'translate-x-full'}`}>
            
            {/* Botón Volver */}
            <button onClick={() => setMobileView('main')} className="flex items-center gap-2 mb-8 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
              <ChevronLeft className="w-4 h-4" /> Volver al Menú
            </button>
            
            <h3 className="text-xl font-bold mb-6 text-black">Soluciones</h3>
            
            <div className="flex flex-col gap-3 overflow-y-auto pb-20">
              {/* Item 1 */}
              <Link to="/servicios/consultoria-estrategica" onClick={closeMenu} className="flex gap-4 p-4 rounded-xl border border-gray-100 active:bg-gray-50 transition-colors">
                <Brain className="w-6 h-6 text-[#0f97bd] shrink-0 mt-1" />
                <div>
                  <span className="block text-sm font-bold uppercase tracking-wide">Estrategia</span>
                  <span className="text-xs text-gray-500 block mt-1">Consultoría integral de negocio.</span>
                </div>
              </Link>

              {/* Item 2 */}
              <Link to="/servicios/automatizacion-ia" onClick={closeMenu} className="flex gap-4 p-4 rounded-xl border border-gray-100 active:bg-gray-50 transition-colors">
                <Cpu className="w-6 h-6 text-[#bc1296] shrink-0 mt-1" />
                <div>
                  <span className="block text-sm font-bold uppercase tracking-wide">Automatización & IA</span>
                  <span className="text-xs text-gray-500 block mt-1">Robótica y eficiencia operativa.</span>
                </div>
              </Link>

              {/* Item 3 */}
              <Link to="/servicios/desarrollo-web" onClick={closeMenu} className="flex gap-4 p-4 rounded-xl border border-gray-100 active:bg-gray-50 transition-colors">
                <Globe className="w-6 h-6 text-[#0f97bd] shrink-0 mt-1" />
                <div>
                  <span className="block text-sm font-bold uppercase tracking-wide">Desarrollo Web</span>
                  <span className="text-xs text-gray-500 block mt-1">Sitios de alto rendimiento.</span>
                </div>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Navbar;