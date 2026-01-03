# Instrucciones de Reparación Total (Hero + Navbar V3)

**Diagnóstico:** Conflicto crítico entre instancias de Three.js (CDN vs NPM) y errores de apilamiento (z-index) en el Menú.
**Solución:** Refactorizar `Home.jsx` para usar importaciones nativas y reescribir `Navbar.jsx` con lógica de estado para navegación móvil.

## PASO 1: Limpieza de Dependencias
Asegúrate de tener instalada la librería `three` en el proyecto (y no usar scripts en index.html).
Ejecuta en terminal:
`npm install three lucide-react`

---

## PASO 2: Reparar `src/pages/Home.jsx` (Versión Estable)
Este código elimina la inyección de scripts que causaba el conflicto y restaura la "Turbina de Cerámica Blanca".

```jsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three'; // IMPORTACIÓN NATIVA (Soluciona el conflicto)
import { ArrowRight, Activity, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

/* --- LIBRERÍA 3D (Refactorizada sin CDN) --- */
const useThreeHero = (containerRef) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const mount = containerRef.current;
    
    // 1. Scene Setup
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color(0xffffff); // Opcional: transparente es mejor para superponer
    
    const width = mount.clientWidth;
    const height = mount.clientHeight;
    
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimización de rendimiento
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Limpieza preventiva
    while (mount.firstChild) {
      mount.removeChild(mount.firstChild);
    }
    mount.appendChild(renderer.domElement);

    // 2. Objeto: Turbina Abstracta (Cerámica Blanca High-Tech)
    const geometry = new THREE.TorusKnotGeometry(3.5, 1.2, 150, 20, 2, 3);
    const material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,        // BLANCO PURO
        roughness: 0.4,         // Satinado
        metalness: 0.1,         // Poco metálico
        clearcoat: 0.8,         // Barniz brillante
        clearcoatRoughness: 0.2,
        flatShading: false,
    });
    
    const object = new THREE.Mesh(geometry, material);
    object.castShadow = true;
    object.receiveShadow = true;
    scene.add(object);

    // 3. Iluminación (Clave para el efecto Cyan)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 10, 10);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Luz de acento CYAN
    const spotLight = new THREE.SpotLight(0x0f97bd, 1.5);
    spotLight.position.set(-10, 0, 5);
    spotLight.lookAt(object.position);
    scene.add(spotLight);

    // 4. Animación
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      object.rotation.x += 0.003;
      object.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    // 5. Resize
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (mount && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []); // Dependencias vacías = solo al montar
};

/* --- COMPONENTE HOME --- */
const Home = () => {
  const mountRef = useRef(null);
  useThreeHero(mountRef); // Hook personalizado seguro

  return (
    <div className="w-full">
        {/* HERO SECTION */}
        <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden pt-20">
           {/* Background Stripes */}
           <div className="absolute inset-0 -z-20 pointer-events-none opacity-50 bg-[linear-gradient(0deg,transparent_24vh,#f5f5f7_24vh,#f5f5f7_25vh)] bg-[length:100%_25vh]" />
           
           {/* 3D Container */}
           <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none opacity-90 scale-100 md:scale-110" />

           <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 h-full items-center pointer-events-none">
              
              {/* Left Column (Desktop only) */}
              <div className="hidden md:block md:col-span-3 text-right pr-8 self-center animate-in slide-in-from-left duration-1000 delay-300">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Misión</h4>
                <p className="text-sm font-medium text-gray-800 leading-relaxed">
                  Transformar la <br/> complejidad en estructura.
                </p>
                <div className="h-px w-12 bg-gray-300 ml-auto mt-4" />
              </div>

              {/* Center Content */}
              <div className="col-span-1 md:col-span-6 text-center flex flex-col items-center justify-center pointer-events-auto">
                 <div className="inline-block px-4 py-1 mb-6 rounded-full border border-gray-200 bg-white/50 backdrop-blur-sm">
                    <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                       Latul Studio 2025
                    </span>
                 </div>
          
                 <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-black mb-6 leading-none drop-shadow-sm">
                   CONSTRUIMOS <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-500">LO CASI</span> <br/>
                   IMPOSIBLE
                 </h1>
                 
                 <div className="flex flex-col sm:flex-row gap-4 mt-12">
                   <Link to="/contacto" className="px-8 py-4 bg-black text-white rounded-full font-bold text-sm tracking-wide shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:bg-[#0f97bd] hover:border-[#0f97bd]">
                     EMPEZAR PROYECTO
                   </Link>
                   <Link to="/servicios" className="px-8 py-4 bg-transparent text-black border border-gray-200 rounded-full font-bold text-sm tracking-wide hover:border-black transition-all duration-300 flex items-center gap-2 group bg-white/50 backdrop-blur-sm">
                     <span className="group-hover:text-[#bc1296] transition-colors">VER SERVICIOS</span>
                     <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </Link>
                 </div>
              </div>

              {/* Right Column (Desktop only) */}
              <div className="hidden md:block md:col-span-3 text-left pl-8 self-center animate-in slide-in-from-right duration-1000 delay-300">
                 <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Visión</h4>
                 <p className="text-sm font-medium text-gray-800 leading-relaxed">
                   Paz mental, control real <br/> y relaciones a largo plazo.
                 </p>
                 <div className="h-px w-12 bg-gray-300 mr-auto mt-4" />
              </div>
           </div>
        </section>
        
        {/* Aquí irían el resto de secciones (Philosophy, Services, etc.) */}
    </div>
  );
};

export default Home;