import React, { useState, useEffect, useRef } from 'react';
import {
    ArrowRight,
    Brain,
    Cpu,
    Sparkles,
    Zap,
    Loader2,
    Code,
    Database,
    CheckCircle2,
    Mail,
    Globe
} from 'lucide-react';

/* --- GEMINI API CONFIGURATION (Moved inside component or kept as utility) --- */
const apiKey = ""; // The execution environment provides the key at runtime.

const callGemini = async (prompt, jsonMode = false) => {
    try {
        const payload = {
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: jsonMode ? "application/json" : "text/plain",
            }
        };

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }
        );

        if (!response.ok) throw new Error("Gemini API Error");

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    } catch (error) {
        console.error("Error calling Gemini:", error);
        return null;
    }
};

/* --- LIBRERÍA 3D (THREE.JS) --- */
const useThree = (containerRef) => {
    useEffect(() => {
        if (!containerRef.current) return;

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.async = true;
        script.onload = () => initThree(containerRef.current);
        document.body.appendChild(script);

        let scene, camera, renderer, object, animationId;

        const initThree = (mount) => {
            const THREE = window.THREE;
            scene = new THREE.Scene();
            scene.background = null;

            const width = mount.clientWidth;
            const height = mount.clientHeight;
            camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
            camera.position.z = 18;

            renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setSize(width, height);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            mount.appendChild(renderer.domElement);

            const geometry = new THREE.TorusKnotGeometry(3.5, 1.2, 150, 20, 2, 3);
            const material = new THREE.MeshPhysicalMaterial({
                color: 0xffffff,
                roughness: 0.6,
                metalness: 0.1,
                clearcoat: 0.1,
                clearcoatRoughness: 0.4,
                flatShading: false,
            });

            object = new THREE.Mesh(geometry, material);
            object.castShadow = true;
            object.receiveShadow = true;
            scene.add(object);

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
            scene.add(ambientLight);

            const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
            dirLight.position.set(10, 10, 10);
            dirLight.castShadow = true;
            dirLight.shadow.mapSize.width = 1024;
            dirLight.shadow.mapSize.height = 1024;
            scene.add(dirLight);

            const spotLight = new THREE.SpotLight(0x0f97bd, 0.8);
            spotLight.position.set(-10, 0, 5);
            scene.add(spotLight);

            const animate = () => {
                animationId = requestAnimationFrame(animate);
                object.rotation.x += 0.003;
                object.rotation.y += 0.005;
                renderer.render(scene, camera);
            };
            animate();

            const handleResize = () => {
                if (!mount) return;
                const w = mount.clientWidth;
                const h = mount.clientHeight;
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
                renderer.setSize(w, h);
            };
            window.addEventListener('resize', handleResize);
        };

        return () => {
            if (renderer) renderer.dispose();
            if (animationId) cancelAnimationFrame(animationId);
            if (script.parentNode) script.parentNode.removeChild(script);
        };
    }, [containerRef]);
};


/* --- HERO SECTION --- */
const Hero = () => {
    const mountRef = useRef(null);
    useThree(mountRef);

    return (
        <section id="home" className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden -mt-20 pt-20">
            <div className="absolute inset-0 -z-20 bg-stripes pointer-events-none" />
            <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none opacity-90 scale-100 md:scale-110" />

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 h-full items-center">

                <div className="hidden md:block md:col-span-3 text-right pr-8 self-center animate-in slide-in-from-left duration-1000 delay-300">
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Misión</h4>
                    <p className="text-sm font-medium text-gray-800 leading-relaxed">
                        Empowering Entrepreneurs <br /> to build the impossible.
                    </p>
                    <div className="h-px w-12 bg-gray-300 ml-auto mt-4" />
                </div>

                <div className="col-span-1 md:col-span-6 text-center flex flex-col items-center justify-center">
                    <div className="inline-block px-4 py-1 mb-6 rounded-full border border-gray-200 bg-white/50 backdrop-blur-sm animate-in fade-in zoom-in duration-700">
                        <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                            Latul Studio 2025
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-black mb-6 leading-none drop-shadow-sm animate-in slide-in-from-bottom duration-700 delay-100">
                        CONSTRUIMOS <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-500">LO CASI</span> <br />
                        IMPOSIBLE
                    </h1>

                    <div className="flex flex-col sm:flex-row gap-4 mt-12 animate-in slide-in-from-bottom duration-700 delay-200">
                        <a href="#platform" className="px-8 py-4 bg-black text-white rounded-full font-bold text-sm tracking-wide shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 hover-fill-cyan hover:text-white flex items-center justify-center">
                            EMPEZAR PROYECTO
                        </a>

                        <a href="#solutions" className="px-8 py-4 bg-transparent text-black border border-gray-200 rounded-full font-bold text-sm tracking-wide hover:border-black transition-all duration-300 flex items-center justify-center gap-2 group">
                            <span className="group-hover:text-[--violet-1] transition-colors">VER SERVICIOS</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>

                <div className="hidden md:block md:col-span-3 text-left pl-8 self-center animate-in slide-in-from-right duration-1000 delay-300">
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Metodología</h4>
                    <p className="text-sm font-medium text-gray-800 leading-relaxed">
                        Simplify Workflows. <br /> Maximize Revenue.
                    </p>
                    <div className="h-px w-12 bg-gray-300 mr-auto mt-4" />
                </div>
            </div>
        </section>
    );
};

/* --- SERVICIOS PREVIEW --- */
const ServicesPreview = () => {
    const services = [
        { title: "Estrategia", desc: "Arquitectura de negocios escalables.", icon: Brain, colorClass: "hover-cyan" },
        { title: "Ingeniería IA", desc: "Automatización de procesos complejos.", icon: Cpu, colorClass: "hover-violet" },
        { title: "Desarrollo", desc: "Software crítico y alta disponibilidad.", icon: Code, colorClass: "hover-cyan" },
        { title: "Data Science", desc: "Transformamos caos en valor.", icon: Database, colorClass: "hover-violet" },
    ];

    return (
        <section id="solutions" className="py-24 bg-white relative z-10 border-t border-gray-100">
            <div className="container mx-auto px-6">
                <div className="mb-16 text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Soluciones Integrales</h2>
                    <p className="text-gray-500">Un ecosistema de servicios diseñado para llevar tu empresa desde la idea hasta la dominación del mercado.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((s, i) => (
                        <div key={i} className={`group p-8 rounded-2xl border border-gray-100 bg-white transition-all duration-500 hover:-translate-y-2 cursor-default ${s.colorClass}`}>
                            <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-white group-hover:shadow-md transition-all">
                                <s.icon className="w-6 h-6 text-gray-400 group-hover:text-current transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-black mb-2">{s.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* --- AI LAB (GEMINI) --- */
const AILabComponent = () => {
    const [idea, setIdea] = useState('');
    const [loading, setLoading] = useState(false);
    const [inspiring, setInspiring] = useState(false);
    const [analysis, setAnalysis] = useState(null);

    const analyzeIdea = async () => {
        if (!idea.trim()) return;
        setLoading(true);
        setAnalysis(null);

        const prompt = `
      Actúa como CTO de 'Latul Studio'. Analiza: "${idea}".
      Devuelve JSON:
      {
        "viabilidad": "Evaluar viabilidad (Alta/Media/Baja)",
        "stack": "3-4 tecnologías clave",
        "veredicto": "Opinión experta en 1 frase profesional."
      }
    `;

        const resultString = await callGemini(prompt, true);

        if (resultString) {
            try {
                const resultJson = JSON.parse(resultString);
                setAnalysis(resultJson);
            } catch (e) {
                setAnalysis({
                    viabilidad: "Error",
                    stack: "N/A",
                    veredicto: "Inténtalo de nuevo."
                });
            }
        }
        setLoading(false);
    };

    const inspireMe = async () => {
        setInspiring(true);
        const prompt = `Genera una idea de startup "Moonshot" en Español, máx 15 palabras.`;
        const inspiration = await callGemini(prompt);
        if (inspiration) {
            setIdea(inspiration.trim());
            setAnalysis(null);
        }
        setInspiring(false);
    };

    return (
        <section id="platform" className="py-24 bg-[#F5F5F7] border-y border-gray-200">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="flex flex-col md:flex-row gap-12 items-start">
                    <div className="md:w-1/3">
                        <span className="text-[--violet-2] font-bold tracking-widest text-xs uppercase mb-4 block flex items-center gap-2">
                            Latul AI Lab <Sparkles className="w-3 h-3 animate-pulse" />
                        </span>
                        <h2 className="text-4xl font-bold mb-6 text-black">Arquitecto <br /> de Ideas</h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8">
                            Valida tu próximo "Moonshot" con nuestra IA potenciada por Gemini. Obtén un análisis de viabilidad técnica al instante.
                        </p>
                    </div>

                    <div className="md:w-2/3 w-full">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden transition-all duration-500 hover:shadow-lg">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16 pointer-events-none" />

                            <div className="relative">
                                <textarea
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-black text-sm min-h-[120px] focus:outline-none focus:border-[--cyan-2] transition-colors resize-none mb-4 pr-12"
                                    placeholder={inspiring ? "Pensando en el futuro..." : "Ej: Un sistema de agricultura vertical controlado por drones..."}
                                    value={idea}
                                    onChange={(e) => setIdea(e.target.value)}
                                    disabled={inspiring || loading}
                                />
                                <button
                                    onClick={inspireMe}
                                    disabled={inspiring || loading}
                                    className="absolute bottom-6 right-3 p-2 text-gray-400 hover:text-[--violet-2] hover:bg-violet-50 rounded-full transition-all"
                                    title="Generar Idea"
                                >
                                    {inspiring ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                                </button>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-[10px] md:text-xs text-gray-400 flex items-center gap-1">
                                    <Sparkles className="w-3 h-3 text-[--cyan-2]" /> Powered by Gemini
                                </span>
                                <button
                                    onClick={analyzeIdea}
                                    disabled={loading || !idea}
                                    className="px-6 py-3 bg-black text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[--violet-2] transition-colors disabled:opacity-50 flex items-center gap-2"
                                >
                                    {loading ? "Procesando..." : "Analizar Idea"}
                                </button>
                            </div>

                            {analysis && (
                                <div className="mt-8 pt-8 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-2 duration-700">
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <span className="text-xs text-gray-400 uppercase block mb-1">Viabilidad</span>
                                            <span className={`font-bold text-sm ${analysis.viabilidad.includes('Baja') ? 'text-red-500' : 'text-black'}`}>
                                                {analysis.viabilidad}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-xs text-gray-400 uppercase block mb-1">Tech Stack</span>
                                            <span className="text-black font-bold text-sm">{analysis.stack}</span>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg border-l-2 border-[--cyan-2]">
                                        <p className="text-sm text-gray-600 italic">"{analysis.veredicto}"</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

/* --- CLIENTES & TESTIMONIOS (NUEVA SECCIÓN) --- */
const Clients = () => (
    <section id="clients" className="py-20 bg-white">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Confianza</span>
                <h3 className="text-2xl font-bold mt-2">Empresas que construyen el futuro</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Placeholder logos */}
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-16 bg-gray-100 rounded flex items-center justify-center font-bold text-gray-400">
                        CLIENTE 0{i}
                    </div>
                ))}
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-gray-50 rounded-2xl">
                    <div className="flex gap-1 text-[--cyan-2] mb-4"><CheckCircle2 className="w-5 h-5" /></div>
                    <p className="text-gray-600 italic mb-6">"Latul transformó nuestra infraestructura legacy en un sistema de IA moderno en semanas, no meses."</p>
                    <div>
                        <p className="font-bold text-black">Sofia Martinez</p>
                        <p className="text-xs text-gray-500">CTO, FinTech Global</p>
                    </div>
                </div>
                <div className="p-8 bg-gray-50 rounded-2xl">
                    <div className="flex gap-1 text-[--violet-2] mb-4"><CheckCircle2 className="w-5 h-5" /></div>
                    <p className="text-gray-600 italic mb-6">"Su capacidad para entender modelos de negocio complejos y traducirlos a código es inigualable."</p>
                    <div>
                        <p className="font-bold text-black">Carlos Ruiz</p>
                        <p className="text-xs text-gray-500">Founder, AgriTech One</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
)

/* --- CONTACTO (NUEVA SECCIÓN) --- */
const Contact = () => (
    <section id="contact" className="py-24 bg-black text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">¿Listo para lo imposible?</h2>
            <p className="text-gray-400 mb-12 text-lg">Cuéntanos tu desafío. Nosotros ponemos la ingeniería.</p>

            <form className="max-w-md mx-auto flex flex-col gap-4 text-left">
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email Corporativo</label>
                    <input type="email" placeholder="tu@empresa.com" className="w-full mt-2 p-4 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[--cyan-2] transition-colors" />
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Mensaje</label>
                    <textarea rows="4" placeholder="Breve descripción del proyecto..." className="w-full mt-2 p-4 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[--cyan-2] transition-colors resize-none"></textarea>
                </div>
                <button type="button" className="mt-4 w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-[--cyan-2] hover:text-white transition-all">
                    ENVIAR SOLICITUD
                </button>
            </form>

            <div className="mt-16 flex justify-center gap-8 text-sm text-gray-500">
                <a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><Mail className="w-4 h-4" /> hello@latul.studio</a>
                <span className="flex items-center gap-2 hover:text-white transition-colors"><Globe className="w-4 h-4" /> Buenos Aires, AR</span>
            </div>
        </div>
    </section>
)

const Home = () => {
    return (
        <>
            <Hero />
            <ServicesPreview />
            <AILabComponent />
            <Clients />
            <Contact />
        </>
    );
};

export default Home;
