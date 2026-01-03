# Instrucciones de Contenido y SEO - Fase 4: Humanización y Jerarquía

**Rol:** SEO Specialist & UX Copywriter.
**Objetivo:** Integrar el contenido comercial revisado, ajustar la jerarquía de encabezados (H1/H2) para la keyword "Socio Tecnológico Integral" y eliminar el tono robótico/IA de los textos.
**Restricción Visual:** NO tocar la configuración 3D del Hero. Mantener el diseño minimalista/vidrio.

---

## 1. Configuración de Metadatos (SEO Técnico)

Asegúrate de envolver el contenido de `Home` (o usar un componente `SEO`) con las siguientes etiquetas para posicionamiento:

* **Meta Title:** `Latul Studio | Socio Tecnológico Integral para Empresas B2B`
* **Meta Description:** `Unificamos Estrategia, Tecnología y Ventas. Dejá de contratar proveedores aislados; somos tu Socio Tecnológico Integral para escalar con rentabilidad y orden.`
* **Keywords:** `Socio Tecnológico Integral, Consultoría Estratégica, Desarrollo de Software, Odoo Partner`.

---

## 2. Actualización de `src/pages/Home.jsx` (Contenido Humanizado)

Reemplaza el componente `Home` (manteniendo el hook `useThreeHero` intacto arriba) con esta versión.
Observa cómo hemos reestructurado el **Hero** para que el H1 sea la palabra clave, sin perder el impacto visual del slogan (ahora H2).

```jsx
/* --- COMPONENTES INTERNOS ACTUALIZADOS --- */

// 1. HERO SECTION (SEO + Impacto)
const HeroContent = () => (
    <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 h-full items-center pointer-events-none">
        
        {/* Izquierda: Misión (Humanizada) */}
        <div className="hidden md:block md:col-span-3 text-right pr-8 self-center animate-in slide-in-from-left duration-1000 delay-300">
            <div className="text-right bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Nuestra Base</h4>
                <p className="text-sm font-medium text-gray-800 leading-relaxed">
                    La excelencia no es una meta.<br/> Es nuestro estándar mínimo.
                </p>
                <div className="h-px w-12 bg-gray-300 ml-auto mt-4" />
            </div>
        </div>

        {/* Centro: Título SEO + Slogan Visual */}
        <div className="col-span-1 md:col-span-6 text-center flex flex-col items-center justify-center pointer-events-auto">
            
            {/* H1 SEMÁNTICO (Keyword Principal) */}
            <div className="inline-block px-6 py-2 mb-8 rounded-full border border-gray-200 bg-white/60 backdrop-blur-md shadow-sm">
                <h1 className="text-xs md:text-sm font-bold tracking-[0.3em] text-[#0f97bd] uppercase">
                    Socio Tecnológico Integral
                </h1>
            </div>
    
            {/* H2 VISUAL (El Slogan Gigante) */}
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-black mb-8 leading-[0.9] drop-shadow-sm">
                CONSTRUIMOS <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-400">LO CASI</span> <br/>
                IMPOSIBLE
            </h2>
            
            <p className="text-gray-600 text-sm md:text-base max-w-lg mx-auto mb-10 leading-relaxed font-medium">
                Consultoría estratégica y desarrollo a medida para quienes exigen orden, escalabilidad y resultados que muevan la aguja.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contacto" className="px-8 py-4 bg-black text-white rounded-full font-bold text-xs uppercase tracking-widest shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:bg-[#0f97bd] hover:border-[#0f97bd]">
                    Hablemos de Negocios
                </Link>
                <Link to="/servicios" className="px-8 py-4 bg-white/50 backdrop-blur-sm text-black border border-gray-200 rounded-full font-bold text-xs uppercase tracking-widest hover:border-black transition-all duration-300 flex items-center gap-2 group">
                    <span className="group-hover:text-[#bc1296] transition-colors">Explorar Soluciones</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>

        {/* Derecha: Visión (Humanizada) */}
        <div className="hidden md:block md:col-span-3 text-left pl-8 self-center animate-in slide-in-from-right duration-1000 delay-300">
            <div className="text-left bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Visión</h4>
                <p className="text-sm font-medium text-gray-800 leading-relaxed">
                    Paz mental operativa.<br/> Control real del negocio.
                </p>
                <div className="h-px w-12 bg-gray-300 mr-auto mt-4" />
            </div>
        </div>
    </div>
);

// 2. FILOSOFÍA (El Problema de los Silos - Humanizado)
const Philosophy = () => (
    <section className="py-24 bg-white border-t border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-gray-50 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 opacity-60" />

        <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mb-20">
                <span className="text-[#bc1296] font-bold tracking-widest text-xs uppercase mb-4 block">El Diferencial Latul</span>
                <h2 className="text-3xl md:text-5xl font-bold text-black leading-tight mb-6">
                    El fin de los departamentos <br /> que funcionan como <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#056b93] to-[#50c6d0]">islas desconectadas.</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Marketing no habla con Ventas. Sistemas va por su lado. Ese caos te está costando dinero. 
                    En Latul, rompemos esos silos. No somos generalistas; somos expertos senior unificando tu estrategia, tu tecnología y tu equipo comercial en un solo motor.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {[
                    {
                        title: "Estrategia de Marca & Ventas",
                        desc: "Olvídate de los 'likes'. Diseñamos tu comunicación para cerrar tratos. Captamos clientes cualificados y blindamos tu proceso de venta.",
                        icon: Target,
                        color: "text-[#0f97bd]"
                    },
                    {
                        title: "Ingeniería & Ecosistema Odoo",
                        desc: "Las entrañas de tu empresa deben funcionar como un reloj suizo. Software a medida e implementaciones de Odoo que eliminan el desorden.",
                        icon: Code,
                        color: "text-[#bc1296]"
                    },
                    {
                        title: "Automatización Inteligente",
                        desc: "Si es repetitivo, lo hace un robot. Usamos IA y n8n para borrar el trabajo manual y que tu equipo vuelva a pensar, no a copiar datos.",
                        icon: Cpu,
                        color: "text-[#0f97bd]"
                    }
                ].map((item, i) => (
                    <div key={i} className="p-8 rounded-2xl bg-[#F5F5F7] hover:bg-white border border-transparent hover:border-gray-200 transition-all duration-300 hover:shadow-xl group">
                        <item.icon className={`w-8 h-8 ${item.color} mb-6`} />
                        <h3 className="text-lg font-bold text-black mb-3">{item.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// 3. AI LAB (Humanizado)
// ... (Mantener componente AILabComponent existente pero revisar textos si es necesario, 
// por ahora se ve bien técnicamente, solo asegúrate de que el título "Arquitecto de Ideas" se mantenga)

// 4. TECH STACK (Visual - Mantener)

// 5. CLIENTS / AUTHORITY (Humanizado)
const AuthoritySection = () => (
    <section className="py-24 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('[https://www.transparenttextures.com/patterns/cubes.png](https://www.transparenttextures.com/patterns/cubes.png)')] opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">
                "Lo bueno" no es suficiente.
            </h2>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
                Somos el socio estratégico para líderes que redefinen las reglas del juego. 
                Si entiendes que la excelencia requiere inversión, orden y honestidad brutal, estamos en el mismo equipo.
            </p>
            <div className="h-px w-24 bg-[#0f97bd] mx-auto mb-12"></div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
                {/* Placeholder de logos o stats si quisieras, por ahora texto simple o logos */}
                <span className="text-xl font-bold tracking-widest">NEXUS</span>
                <span className="text-xl font-bold tracking-widest">VERTEX</span>
                <span className="text-xl font-bold tracking-widest">NOVA</span>
                <span className="text-xl font-bold tracking-widest">PRIME</span>
            </div>
        </div>
    </section>
);

// 6. CONTACT CTA (Cierre de Venta)
const ContactCTA = () => (
    <section className="py-32 bg-white text-center">
        <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter text-black">
                EL SIGUIENTE NIVEL <br/> TE ESPERA.
            </h2>
            <p className="text-gray-600 mb-10 text-lg">
                Buscamos relaciones de alto valor, no transacciones rápidas.
            </p>
            <Link to="/contacto" className="inline-block px-12 py-5 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#bc1296] transition-colors shadow-2xl hover:scale-105 transform duration-300">
                Ver si encajamos
            </Link>
        </div>
    </section>
);

/* --- COMPONENTE PRINCIPAL HOME --- */
const Home = () => {
    const mountRef = useRef(null);
    useThreeHero(mountRef); // Tu hook 3D original

    return (
        <div className="relative min-h-screen bg-white text-[#111827] overflow-x-hidden font-['Nunito_Sans']">
            {/* Background Stripes */}
            <div className="fixed inset-0 pointer-events-none -z-20" style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 24vh, #f5f5f7 24vh, #f5f5f7 25vh)'
            }} />

            {/* HERO WRAPPER */}
            <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">
                <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none opacity-90 scale-100 md:scale-110" />
                <HeroContent />
            </section>

            <Philosophy />
            {/* Puedes reinsertar ServicesPreview si quieres mantener los iconos pequeños o usar el nuevo bloque de Philosophy como servicios principales */}
            <AILabComponent /> 
            <TechStack />
            <AuthoritySection />
            <ContactCTA />
        </div>
    );
};

export default Home;