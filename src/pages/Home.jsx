import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Target, Brain, Cpu, Code, Database, Layers } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'framer-motion';
import InteractiveParticles from '../components/ui/InteractiveParticles'; // Asegúrate de crear este archivo

/* --- 1. LÓGICA 3D (TU HERO ORIGINAL - NO TOCAR) --- */
const useThreeHero = (containerRef) => {
    useEffect(() => {
        if (!containerRef.current) return;

        const mount = containerRef.current;

        // 1. Scene
        const scene = new THREE.Scene();
        // scene.background = null; // Transparent

        const width = mount.clientWidth;
        const height = mount.clientHeight;

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.z = 18;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        while (mount.firstChild) {
            mount.removeChild(mount.firstChild);
        }
        mount.appendChild(renderer.domElement);

        // 2. Object: TorusKnot (User Params)
        const geometry = new THREE.TorusKnotGeometry(3.5, 1.2, 150, 20, 2, 3);
        const material = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            roughness: 0.6,        // Restored value
            metalness: 0.1,        // Restored value
            clearcoat: 0.1,        // Restored value
            clearcoatRoughness: 0.4, // Restored value
            flatShading: false,
        });

        const object = new THREE.Mesh(geometry, material);
        object.castShadow = true;
        object.receiveShadow = true;
        scene.add(object);

        // 3. Lighting (Atmósfera Cyan: #056b93, #0f97bd, #50c6d0)

        // HemisphereLight: Gradiente de Blanco (Cielo) a Cyan 3 (Suelo/Sombras)
        // Esto tiñe las "sombras" de color sin oscurecer el objeto
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x50c6d0, 2.0);
        scene.add(hemiLight);

        // Directional: Luz Clave Blanca
        const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
        dirLight.position.set(10, 10, 10);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        dirLight.shadow.bias = -0.0001;
        scene.add(dirLight);

        // Spot: Acento Cyan 2
        const spotLight = new THREE.SpotLight(0x0f97bd, 3.0);
        spotLight.position.set(-10, 0, 5);
        spotLight.distance = 50;
        spotLight.angle = 0.5;
        scene.add(spotLight);

        // Fill: Relleno sutil Cyan 1 (Más oscuro) para profundidad
        const fillLight = new THREE.PointLight(0x056b93, 1.0);
        fillLight.position.set(0, -10, 0);
        scene.add(fillLight);

        // 4. Animation
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
            if (!containerRef.current) return;
            const w = containerRef.current.clientWidth;
            const h = containerRef.current.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (mount && mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement);
            }
            if (animationId) cancelAnimationFrame(animationId);
            renderer.dispose();
            geometry.dispose();
            material.dispose();
        };
    }, []);
};

/* --- UTILIDAD DE ANIMACIÓN --- */
const Reveal = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
        {children}
    </motion.div>
);

/* --- COMPONENTES DE SECCIÓN (ESTÉTICA CLEAN TECH) --- */

const HeroSection = ({ mountRef }) => {
    // Variantes para la animación de entrada
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
                duration: 0.8
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const sideItemVariants = (direction) => ({
        hidden: { opacity: 0, x: direction === 'left' ? -50 : 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
        }
    });

    return (
        <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">
            {/* Background Stripes (Restored) */}
            <div className="absolute inset-0 -z-20 pointer-events-none opacity-50 bg-[linear-gradient(0deg,transparent_24vh,#f5f5f7_24vh,#f5f5f7_25vh)] bg-[length:100%_25vh]" />

            {/* 3D Scene Fade In */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }} // Original opacity-90
                transition={{ duration: 1.5, ease: "easeOut" }}
                ref={mountRef}
                className="absolute inset-0 z-0 pointer-events-none scale-100 md:scale-110"
            />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 h-full items-center"
            >

                {/* Left: Mission (Glass Box) */}
                <motion.div variants={sideItemVariants('left')} className="order-2 md:order-1 col-span-1 md:col-span-3 pr-0 md:pr-8 self-center mt-8 md:mt-0">
                    <div className="text-left md:text-right bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 transition-all duration-300 hover:bg-white/30 hover:scale-105 hover:shadow-[0_0_30px_rgba(80,198,208,0.3)] cursor-default">
                        <h4 className="text-[18px] font-medium leading-[29px] text-black mb-2">Nuestra Base</h4>
                        <p className="text-[18px] font-normal leading-[29px] text-gray-600">
                            La excelencia no es una meta.<br /> Es nuestro estándar mínimo.
                        </p>
                        <div className="h-px w-12 bg-gray-300 mr-auto md:ml-auto md:mr-0 mt-4" />
                    </div>
                </motion.div>

                {/* Center: Title */}
                <motion.div variants={itemVariants} className="order-1 md:order-2 col-span-1 md:col-span-6 text-center flex flex-col items-center justify-center pointer-events-auto">
                    <div className="inline-block px-4 py-2 mb-6 rounded-full border border-gray-200 bg-white/60 backdrop-blur-md">
                        <h1 className="text-xs md:text-sm font-bold tracking-[0.3em] text-[#0f97bd] uppercase">
                            Socio Tecnológico Integral
                        </h1>
                    </div>

                    <h2 className="text-4xl md:text-8xl font-[550] tracking-wide text-black mb-8 leading-[1.1] md:leading-[0.9] drop-shadow-sm">
                        CONSTRUIMOS <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-400">LO CASI</span> <br />
                        IMPOSIBLE
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <Link to="/contacto" className="px-8 py-4 bg-black text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#0f97bd] transition-colors shadow-xl w-full sm:w-auto">
                            Hablemos de Negocios
                        </Link>
                    </div>
                </motion.div>

                {/* Right: Vision (Glass Box) */}
                <motion.div variants={sideItemVariants('right')} className="order-3 md:order-3 col-span-1 md:col-span-3 pl-0 md:pl-8 self-center mt-4 md:mt-0">
                    <div className="text-left bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 transition-all duration-300 hover:bg-white/30 hover:scale-105 hover:shadow-[0_0_30px_rgba(80,198,208,0.3)] cursor-default">
                        <h4 className="text-[18px] font-medium leading-[29px] text-black mb-2">Visión</h4>
                        <p className="text-[18px] font-normal leading-[29px] text-gray-600">
                            Paz mental operativa.<br /> Control real del negocio.
                        </p>
                        <div className="h-px w-12 bg-gray-300 mr-auto mt-4" />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

/* --- TYPEWRITER SPECIALIZED COMPONENT --- */
const QuoteTyper = () => {
    // Definir el texto completo y los puntos de quiebre para el estilo
    const fullText = "La excelencia es nuestro punto de partida. No la meta.";
    // "La excelencia es nuestro" tiene 24 caracteres
    const split1 = 24;
    // " punto de partida." agrega 18 caracteres -> 42
    const split2 = 42;

    // Estado para controlar el progreso de escritura
    const [count, setCount] = React.useState(0);
    const [started, setStarted] = React.useState(false);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    // Iniciar con un pequeño delay cuando entra en vista
    React.useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => setStarted(true), 500);
            return () => clearTimeout(timer);
        }
    }, [isInView]);

    // Efecto de tictac para escritura
    React.useEffect(() => {
        if (!started) return;
        if (count >= fullText.length) return;

        // Velocidad orgánica variando entre 50ms y 90ms
        const speed = 50 + Math.random() * 40;
        const tick = setTimeout(() => {
            setCount(prev => prev + 1);
        }, speed);

        return () => clearTimeout(tick);
    }, [count, started, fullText.length]);

    // Derivar las partes del texto basadas en el contador actual
    const part1 = fullText.slice(0, Math.min(count, split1));
    const part2 = count > split1 ? fullText.slice(split1, Math.min(count, split2)) : "";
    const part3 = count > split2 ? fullText.slice(split2, count) : "";

    return (
        <span ref={ref} className="inline relative">
            {/* Parte 1: Texto Light */}
            <span>{part1}</span>

            {/* Break condicional si ya pasamos la parte 1 */}
            {count > split1 && <br className="hidden md:block" />}

            {/* Parte 2: Bold Cyan */}
            <span className="font-bold text-[#0f97bd]">{part2}</span>

            {/* Parte 3: Texto normal */}
            <span className={count > split2 ? "block mt-2 md:mt-0 md:inline" : ""}>{part3}</span>

            {/* Cursor Parpadeante: Siempre al final del flujo */}
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="inline-block w-[3px] h-[0.8em] bg-[#0f97bd] align-baseline ml-1"
            />
        </span>
    );
};

const ExcellenceSection = () => (
    <section className="relative min-h-screen md:h-screen flex items-center bg-white overflow-hidden py-24 md:py-0">
        {/* Particles Background - Now forming Phi on the right */}
        <InteractiveParticles />

        <div className="container mx-auto px-6 relative z-10 w-full">
            <Reveal>
                <div className="grid md:grid-cols-12 gap-12 items-center">
                    {/* Left Side: Content (Title + Description) */}
                    <div className="md:col-span-7 flex flex-col items-start text-left">
                        {/* Title with Typewriter */}
                        <h2 className="text-4xl md:text-7xl font-light leading-[1.1] text-black tracking-tight mb-8 min-h-[160px] md:min-h-[240px]">
                            <QuoteTyper />
                        </h2>

                        <div className="w-24 h-px bg-gray-200 mb-8"></div>

                        {/* Description - Now vertically stacked and left aligned */}
                        <div className="space-y-6 max-w-2xl">
                            <p className="text-xl text-gray-800 font-medium leading-relaxed">
                                Consultoría estratégica y desarrollo a medida para empresas que ya no se conforman con "lo estándar".
                            </p>
                            <p className="text-gray-500 leading-relaxed">
                                Unificamos tecnología, marketing y ventas. Sin intermediarios, sin ruido. Solo ejecución pura para que tu negocio tenga el orden y la escalabilidad que exige.
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Reserved for Particle Symbol (Phi) */}
                    <div className="md:col-span-5 h-full min-h-[400px]">
                        {/* Space intentionally left empty for the canvas animation */}
                    </div>
                </div>
            </Reveal>
        </div>
    </section>
);

const ValueProposition = () => (
    <section className="py-32 bg-white relative">
        <div className="container mx-auto px-6">
            <Reveal>
                <span className="text-gray-400 font-bold tracking-widest text-xs uppercase mb-8 block">El Diferencial Latul</span>
            </Reveal>

            <div className="flex flex-col md:flex-row gap-20 items-start">
                <div className="md:w-1/2">
                    <Reveal delay={0.1}>
                        <h2 className="text-5xl md:text-6xl font-bold text-black leading-tight mb-8 tracking-tighter">
                            El fin de los <br /> departamentos aislados.
                        </h2>
                    </Reveal>
                </div>
                <div className="md:w-1/2">
                    <Reveal delay={0.2}>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            En la mayoría de las organizaciones, tecnología, marketing y ventas operan como islas: desconectadas y hablando idiomas distintos. Eso frena el crecimiento.
                        </p>
                        <p className="text-lg text-black font-medium leading-relaxed">
                            En Latul Studio rompemos esos silos. No somos generalistas; aportamos un seniority experto en cada área clave para que tu empresa funcione como un solo motor.
                        </p>
                    </Reveal>
                </div>
            </div>
        </div>
    </section>
);

import SpotlightCard from '../components/ui/SpotlightCard';

const Pillars = () => (
    <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
            <Reveal>
                <div className="mb-24 border-b border-black/10 pb-6 flex justify-between items-end">
                    <h2 className="text-[60px] leading-[60px] font-bold text-black tracking-tight">Nuestros Pilares</h2>
                </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Pilar 1 */}
                <Reveal delay={0.1}>
                    <SpotlightCard className="p-8 pb-24">
                        <Activity className="w-8 h-8 text-black group-hover:text-[#0f97bd] mb-8 transition-colors" />
                        <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors leading-tight">
                            Estrategia de Negocio y <br /> Marketing de Conversión
                        </h3>
                        <p className="text-black font-bold text-sm mb-2 group-hover:text-white transition-colors">
                            Menos "likes", más rentabilidad.
                        </p>
                        <p className="text-gray-500 text-[18px] leading-[29px] font-normal mb-8 group-hover:text-gray-400 transition-colors">
                            Nos alejamos del marketing de vanidad. Diseñamos tu estrategia de marca y comunicación con un único objetivo en mente: captar clientes cualificados y cerrar ventas de alto valor. Si no suma a la facturación, no es prioridad.
                        </p>
                        <Link to="/servicios/consultoria-estrategica" className="absolute bottom-[14px] text-xs font-bold uppercase tracking-widest text-black group-hover:text-white flex items-center gap-2">
                            Explorar <ArrowRight className="w-3 h-3" />
                        </Link>
                    </SpotlightCard>
                </Reveal>

                {/* Pilar 2 */}
                <Reveal delay={0.2}>
                    <SpotlightCard className="p-8 pb-24">
                        <Code className="w-8 h-8 text-black group-hover:text-[#bc1296] mb-8 transition-colors" />
                        <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors leading-tight">
                            Ingeniería de Software y <br /> Ecosistema Odoo
                        </h3>
                        <p className="text-black font-bold text-sm mb-2 group-hover:text-white transition-colors">
                            Arquitectura de sistemas sólida y escalable.
                        </p>
                        <p className="text-gray-500 text-[18px] leading-[29px] font-normal mb-8 group-hover:text-gray-400 transition-colors">
                            Diseñamos las entrañas técnicas de tu empresa para que funcionen como un reloj suizo. Desde software personalizado hasta implementaciones profundas de Odoo, creamos infraestructuras robustas y escalables que eliminan el caos operativo de forma definitiva.
                        </p>
                        <Link to="/servicios/desarrollo-software-odoo" className="absolute bottom-[14px] text-xs font-bold uppercase tracking-widest text-black group-hover:text-white flex items-center gap-2">
                            Explorar <ArrowRight className="w-3 h-3" />
                        </Link>
                    </SpotlightCard>
                </Reveal>

                {/* Pilar 3 */}
                <Reveal delay={0.3}>
                    <SpotlightCard className="p-8 pb-24">
                        <Cpu className="w-8 h-8 text-black group-hover:text-[#0f97bd] mb-8 transition-colors" />
                        <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors leading-tight">
                            Automatización y <br /> Eficiencia de Procesos
                        </h3>
                        <p className="text-black font-bold text-sm mb-2 group-hover:text-white transition-colors">
                            Tecnología que te devuelve tiempo.
                        </p>
                        <p className="text-gray-500 text-[18px] leading-[29px] font-normal mb-8 group-hover:text-gray-400 transition-colors">
                            Utilizamos herramientas como n8n e Inteligencia Artificial para orquestar tus procesos y eliminar esas tareas manuales que queman a tu equipo. Construimos flujos de trabajo inteligentes para que tu gente pueda dedicarse a lo que realmente importa: liderar y vender.
                        </p>
                        <Link to="/servicios/automatizacion-ia" className="absolute bottom-[14px] text-xs font-bold uppercase tracking-widest text-black group-hover:text-white flex items-center gap-2">
                            Explorar <ArrowRight className="w-3 h-3" />
                        </Link>
                    </SpotlightCard>
                </Reveal>
            </div>
        </div>
    </section>
);

import TextMorphParticles from '../components/ui/TextMorphParticles';

const AuthoritySection = () => (
    <section className="py-40 bg-black text-white relative overflow-hidden h-screen flex items-center">
        <div className="container mx-auto px-6 relative z-10 w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left: Content */}
                <Reveal>
                    <div className="max-w-2xl md:pl-16">
                        <h2 className="text-4xl md:text-8xl font-bold mb-12 tracking-tighter leading-none">
                            Cuando "lo bueno" <br /> ya no es suficiente.
                        </h2>
                        <div className="w-24 h-1 bg-[#0f97bd] mb-8"></div>
                        <p className="text-[#0f97bd] font-bold text-lg tracking-wide uppercase mb-4">
                            La excelencia es el punto de partida.
                        </p>
                        <p className="text-gray-400 text-xl leading-relaxed mb-8">
                            Somos el socio estratégico para líderes que redefinen las reglas del juego.
                            No buscamos parches temporales; nos obsesiona la ejecución técnica impecable y el orden absoluto.
                        </p>
                    </div>
                </Reveal>

                {/* Right: Particle Word Cycle Animation */}
                <div className="h-[400px] w-full relative">
                    <TextMorphParticles words={['Seniority', 'Rigor', 'Orden', 'Escala']} />
                </div>
            </div>
        </div>
    </section>
);

import ScrollRevealText from '../components/ui/ScrollRevealText';

const ContactCTA = () => (
    <section className="h-screen bg-white flex flex-col justify-center relative overflow-hidden">
        <InteractiveParticles morph={false} />
        <div className="container mx-auto px-6 relative z-10">
            <Reveal>
                <span className="text-[#0f97bd] font-bold tracking-[0.3em] text-xs uppercase mb-8 block ml-2">Filtro de Calidad</span>
            </Reveal>

            <ScrollRevealText
                className="mb-12"
                lineClassName="text-6xl md:text-[120px] leading-[0.95] font-[550] text-black tracking-tight"
            >
                {["Si lo bueno ya no es suficiente,", "estás en el lugar indicado."]}
            </ScrollRevealText>

            <Reveal delay={0.2}>
                <p className="text-gray-500 mb-12 text-lg max-w-xl leading-relaxed ml-2">
                    Buscamos relaciones de alto valor. Si entiendes que la verdadera escalabilidad requiere inversión y orden, estamos listos.
                </p>
                <div className="ml-2">
                    {/* Button or CTA could go here, keeping layout clean for now per snippet */}
                    <Link to="/contacto" className="inline-flex items-center justify-center px-10 py-4 text-base font-bold text-white transition-all duration-200 bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 rounded-sm">
                        Agendar Auditoría
                    </Link>
                </div>
            </Reveal>
        </div>
    </section>
);

/* --- 3. COMPONENTE PRINCIPAL (ASSEMBLY) --- */
const Home = () => {
    const mountRef = useRef(null);
    useThreeHero(mountRef); // Hook 3D

    return (
        <div className="relative min-h-screen bg-white text-[#111827] overflow-x-hidden selection:bg-black selection:text-white">
            <Helmet>
                <title>Latul Studio | Socio Tecnológico Integral</title>
                <meta name="description" content="Agencia de transformación digital y consultoría estratégica." />
            </Helmet>

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