# Instrucciones Maestras: Integración de Contenido Home & SEO

**Rol:** Frontend Architect & SEO Copywriter.
**Objetivo:** Reconstruir la estructura de `src/pages/Home.jsx` para integrar el contenido final, ajustar la jerarquía SEO (H1/H2) y añadir la nueva sección de "Excelencia".
**Restricción Crítica:** NO TOCAR la lógica del componente `useThreeHero` (la turbina 3D). Solo modificar el JSX retornado y los componentes de texto.

## 1. Configuración SEO (React Helmet)
Asegúrate de que la página tenga estos metadatos:
* **Title:** `Latul Studio | Socio Tecnológico Integral para Empresas`
* **Description:** `Consultoría estratégica, desarrollo a medida y automatización. Unificamos tecnología, marketing y ventas para empresas que buscan escalabilidad y orden.`
* **H1:** "Socio Tecnológico Integral" (Debe aparecer en el Hero).

## 2. Código Completo para `src/pages/Home.jsx`

**Instrucción:** Reemplaza TODO el contenido del archivo por el siguiente bloque. Este código ya incluye la turbina, la nueva jerarquía y todos los textos humanizados.

```jsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Target, Brain, Cpu, Code, Database, Layers } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

/* --- 1. LÓGICA 3D (INTACTA - NO TOCAR) --- */
const useThreeHero = (containerRef) => {
  useEffect(() => {
    if (!containerRef.current) return;
    const mount = containerRef.current;
    const scene = new THREE.Scene();
    const width = mount.clientWidth;
    const height = mount.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 18;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    while (mount.firstChild) mount.removeChild(mount.firstChild);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(3.5, 1.2, 150, 20, 2, 3);
    const material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff, roughness: 0.4, metalness: 0.1,
        clearcoat: 0.8, clearcoatRoughness: 0.2, flatShading: false,
    });
    const object = new THREE.Mesh(geometry, material);
    object.castShadow = true; object.receiveShadow = true;
    scene.add(object);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 10, 10);
    dirLight.castShadow = true;
    scene.add(dirLight);
    const spotLight = new THREE.SpotLight(0x0f97bd, 1.5);
    spotLight.position.set(-10, 0, 5);
    spotLight.lookAt(object.position);
    scene.add(spotLight);

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      object.rotation.x += 0.003;
      object.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth; h = mount.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (mount && mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      geometry.dispose(); material.dispose(); renderer.dispose();
    };
  }, []);
};

/* --- 2. COMPONENTES DE SECCIÓN (TEXTOS HUMANIZADOS) --- */

const HeroSection = ({ mountRef }) => (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden pt-20">
        <div className="absolute inset-0 -z-20 pointer-events-none opacity-50 bg-[linear-gradient(0deg,transparent_24vh,#f5f5f7_24vh,#f5f5f7_25vh)] bg-[length:100%_25vh]" />
        <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none opacity-90 scale-100 md:scale-110" />

        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center justify-center">
            {/* H1 para SEO (Keyword Focus) */}
            <div className="inline-block px-4 py-2 mb-6 rounded-full border border-gray-200 bg-white/60 backdrop-blur-md">
                <h1 className="text-xs md:text-sm font-bold tracking-[0.3em] text-[#0f97bd] uppercase">
                    Socio Tecnológico Integral
                </h1>
            </div>

            {/* H2 Visual (Impacto) */}
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-black mb-8 leading-[0.9] drop-shadow-sm">
                CONSTRUIMOS <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-400">LO CASI</span> <br/>
                IMPOSIBLE
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link to="/contacto" className="px-8 py-4 bg-black text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#0f97bd] transition-colors shadow-xl">
                    Hablemos de Negocios
                </Link>
            </div>
        </div>
    </section>
);

const ExcellenceSection = () => (
    <section className="py-32 bg-white border-b border-gray-100 flex items-center justify-center">
        <div className="container mx-auto px-6 text-center max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-light leading-tight text-black">
                "La excelencia es nuestro <br/> 
                <span className="font-bold border-b-4 border-[#0f97bd]">punto de partida</span>. <br/>
                No la meta."
            </h2>
            <p className="mt-8 text-gray-500 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
                Consultoría estratégica y desarrollo a medida para empresas que ya no se conforman con "lo estándar". Unificamos tecnología, marketing y ventas para que tu negocio tenga el orden y la escalabilidad que exige.
            </p>
        </div>
    </section>
);

const ValueProposition = () => (
    <section className="py-24 bg-[#F5F5F7] relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row gap-16 items-center">
                <div className="md:w-1/2">
                    <span className="text-[#bc1296] font-bold tracking-widest text-xs uppercase mb-4 block">El Diferencial Latul</span>
                    <h2 className="text-4xl font-bold text-black mb-6 leading-tight">
                        El fin de los departamentos aislados.
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6 text-justify">
                        En la mayoría de las organizaciones, tecnología, marketing y ventas operan como islas: desconectadas y hablando idiomas distintos. Eso frena el crecimiento.
                    </p>
                    <p className="text-gray-600 leading-relaxed text-justify">
                        En <strong className="text-black">Latul Studio</strong> rompemos esos silos. No somos generalistas que "hacen de todo un poco"; aportamos un seniority experto en cada área clave. Diseñamos una estrategia integral para que tu comunicación, tu infraestructura tecnológica y tu fuerza de ventas funcionen, por fin, como un solo motor.
                    </p>
                </div>
                <div className="md:w-1/2 grid grid-cols-2 gap-4">
                     <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <Layers className="w-8 h-8 text-[#0f97bd] mb-3" />
                        <span className="font-bold text-sm">Integración Total</span>
                     </div>
                     <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center translate-y-8">
                        <Target className="w-8 h-8 text-[#bc1296] mb-3" />
                        <span className="font-bold text-sm">Foco en KPI</span>
                     </div>
                </div>
            </div>
        </div>
    </section>
);

const Pillars = () => (
    <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
            <div className="text-center mb-20">
                <h2 className="text-3xl font-bold mb-4">Nuestros Pilares</h2>
                <div className="h-1 w-20 bg-gray-200 mx-auto rounded-full" />
            </div>

            <div className="grid md:grid-cols-3 gap-12">
                {/* Pilar 1 */}
                <div className="group">
                    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#0f97bd] group-hover:text-white transition-all duration-300">
                        <Activity className="w-6 h-6 text-gray-400 group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Estrategia & Conversión</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                        Menos "likes", más rentabilidad. Nos alejamos del marketing de vanidad. Diseñamos tu estrategia de marca y comunicación con un único objetivo: captar clientes cualificados y cerrar ventas de alto valor.
                    </p>
                    <Link to="/servicios/consultoria-estrategica" className="text-xs font-bold uppercase tracking-widest text-[#0f97bd] hover:underline">Ver Estrategia</Link>
                </div>

                {/* Pilar 2 */}
                <div className="group">
                    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#bc1296] group-hover:text-white transition-all duration-300">
                        <Code className="w-6 h-6 text-gray-400 group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Ingeniería & Odoo</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                        Arquitectura de sistemas sólida. Creamos las entrañas técnicas de tu empresa. Ya sea software a medida o Odoo, construimos infraestructuras que eliminan el caos operativo.
                    </p>
                    <Link to="/servicios/desarrollo-software-odoo" className="text-xs font-bold uppercase tracking-widest text-[#bc1296] hover:underline">Ver Tecnología</Link>
                </div>

                {/* Pilar 3 */}
                <div className="group">
                    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#0f97bd] group-hover:text-white transition-all duration-300">
                        <Cpu className="w-6 h-6 text-gray-400 group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Automatización & IA</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                        Tecnología que te devuelve tiempo. Usamos n8n e IA para orquestar tus procesos y eliminar tareas manuales. Tu equipo debe liderar y vender, no copiar datos.
                    </p>
                    <Link to="/servicios/automatizacion-ia" className="text-xs font-bold uppercase tracking-widest text-[#0f97bd] hover:underline">Ver Automatización</Link>
                </div>
            </div>
        </div>
    </section>
);

const AuthoritySection = () => (
    <section className="py-24 bg-black text-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Cuando "lo bueno" ya no es suficiente.</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-12">
                Somos el socio estratégico para líderes que redefinen las reglas del juego. 
                No buscamos parches temporales; nos obsesiona la ejecución técnica impecable y el orden absoluto. 
                Si tu estándar es la excelencia, hablamos el mismo idioma.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40">
                <span className="text-lg font-bold">SENIORITY</span>
                <span className="text-lg font-bold">RIGOR</span>
                <span className="text-lg font-bold">ORDEN</span>
                <span className="text-lg font-bold">ESCALA</span>
            </div>
        </div>
    </section>
);

const ContactCTA = () => (
    <section className="py-32 bg-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
            <span className="text-[#0f97bd] font-bold tracking-widest text-xs uppercase mb-4 block">Filtro de Calidad</span>
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter text-black">
                ¿LISTO PARA EL SIGUIENTE NIVEL?
            </h2>
            <p className="text-gray-600 mb-10 text-lg">
                Buscamos relaciones de alto valor, no transacciones puntuales. Si entiendes que la verdadera escalabilidad requiere inversión, estrategia y orden, estamos listos para trabajar contigo.
            </p>
            <Link to="/contacto" className="inline-block px-12 py-5 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#bc1296] transition-colors shadow-2xl hover:scale-105 transform duration-300">
                Comencemos el cambio
            </Link>
        </div>
    </section>
);

/* --- 3. COMPONENTE PRINCIPAL (ASSEMBLY) --- */
const Home = () => {
    const mountRef = useRef(null);
    useThreeHero(mountRef); // Hook 3D

    return (
        <div className="relative min-h-screen bg-white text-[#111827] overflow-x-hidden font-['Nunito_Sans']">
            {/* Metadatos Dinámicos */}
            <Helmet>
                <title>Latul Studio | Socio Tecnológico Integral</title>
                <meta name="description" content="Agencia de transformación digital y consultoría estratégica. Desarrollamos software a medida, Odoo y automatización con IA." />
            </Helmet>

            {/* Background Stripes */}
            <div className="fixed inset-0 pointer-events-none -z-20" style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 24vh, #f5f5f7 24vh, #f5f5f7 25vh)'
            }} />

            <HeroSection mountRef={mountRef} />
            <ExcellenceSection />
            <ValueProposition />
            <Pillars />
            <AuthoritySection />
            <ContactCTA />
        </div>
    );
};

export default Home;