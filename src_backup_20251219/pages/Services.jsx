import { useState, useEffect } from "react";
import {
    Cpu, Globe, Workflow,
    Target, Palette, MessageSquare, ShoppingCart, Megaphone, TrendingUp, LineChart,
    CheckCircle2, ArrowRight
} from "lucide-react";

const Services = () => {
    const [activeTab, setActiveTab] = useState("tech");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const techServices = [
        {
            id: "odoo",
            title: "Desarrollo Técnico y Soluciones Odoo a Medida",
            icon: Cpu,
            vision: "Entendemos Odoo no solo como un software, sino como la columna vertebral de la operación empresarial. Nuestro enfoque no es instalar por instalar, sino adaptar la arquitectura del sistema para que soporte la lógica de negocio única de grandes empresas y Startups en crecimiento. Nos especializamos en la ingeniería profunda del ERP: lo que no se ve, pero hace que todo funcione.",
            services: [
                "Desarrollo de Módulos Personalizados (Backend & Frontend)",
                "Migración de Versiones y Datos",
                "Integraciones y Conectividad (API Rest, XML-RPC)",
                "Auditoría Técnica y Performance",
                "Mantenimiento Evolutivo Nivel 3"
            ],
            details: [
                "Análisis de brechas (GAP Analysis)",
                "Programación lógica compleja en Python",
                "Scripts ETL para migraciones masivas",
                "Optimización PostgreSQL (Database Tuning)",
                "Despliegue en Docker/Kubernetes"
            ]
        },
        {
            id: "web-apps",
            title: "Desarrollo de Aplicaciones Web (Stack High-Performance)",
            icon: Globe,
            vision: "Nos alejamos de las plantillas genéricas para construir activos digitales de alto valor. Utilizamos un stack tecnológico moderno (React, Next.js y Django) para garantizar que cada plataforma no solo sea visualmente impactante, sino también segura, escalable y extremadamente rápida. Desarrollamos pensando en la experiencia del usuario final y en la rentabilidad del negocio.",
            services: [
                "Desarrollo de Web Apps (Dashboards, CRMs)",
                "Webs Corporativas de Alto Rendimiento",
                "E-commerce Avanzado y Marketplaces",
                "Plataformas Educativas (LMS)",
                "Portales de Cliente e Intranets"
            ],
            details: [
                "Server-Side Rendering (SSR) con Next.js",
                "APIs RESTful seguras con Django",
                "Integración con pasarelas de pago",
                "Autenticación JWT/OAuth2",
                "Pipelines CI/CD"
            ]
        },
        {
            id: "automation",
            title: "Automatización Inteligente e Integraciones (n8n)",
            icon: Workflow,
            vision: "El objetivo es que el software trabaje por las personas, y no al revés. Actuamos como arquitectos de procesos, utilizando n8n para unir sistemas desconectados (Marketing, Ventas, Operaciones) en un flujo único y coherente. Priorizamos la privacidad de los datos mediante instalaciones en servidores propios.",
            services: [
                "Infraestructura Self-Hosted",
                "Orquestación de Workflows",
                "Programación de Nodos Custom (JS)",
                "Sincronización Odoo-Marketing",
                "Sistemas de Alerta y Reporte"
            ],
            details: [
                "Despliegue en VPS/Cloud",
                "Webhooks de entrada y salida",
                "Transformación datos complejos (JSON)",
                "Manejo de errores (Error Handling)",
                "Tareas cronometradas (Cron Jobs)"
            ]
        }
    ];

    const marketingServices = [
        {
            id: "strategy",
            title: "Estrategia Integral de Marca & Negocio",
            icon: Target,
            vision: "No creemos en acciones aisladas ni en soluciones genéricas. Creemos en la estrategia como base del crecimiento. Nuestro enfoque une marca, negocio y ventas en una única visión clara y orientada a resultados.",
            services: [
                "Estrategia Integral (Blueprint 360°)",
                "Propuesta de valor y posicionamiento",
                "Análisis de mercado y cliente ideal",
                "Objetivos, KPIs y roadmap",
                "Acompañamiento mensual"
            ],
            details: [
                "Sesiones de descubrimiento profundo",
                "Auditoría de marca y procesos",
                "Definición de Buyer Persona",
                "Plan de acción a 30, 60 y 90 días"
            ]
        },
        {
            id: "branding",
            title: "Branding e Identidad Visual",
            icon: Palette,
            vision: "Una marca no es un logo, es la forma en que te presentas, te comunicas y es lo que te diferencia. Nuestro enfoque combina estrategia + diseño, evitando soluciones superficiales o modas pasajeras.",
            services: [
                "Creación de identidad visual",
                "Rebranding de marcas existentes",
                "Diseño de manual de marca",
                "Adaptación a soportes digitales y físicos"
            ],
            details: [
                "Investigación del sector y referencias",
                "Concepto creativo y personalidad",
                "Logotipo, paleta y tipografías",
                "Brandbook escalable"
            ]
        },
        {
            id: "communication",
            title: "Estrategia de Comunicación",
            icon: MessageSquare,
            vision: "Comunicar no es publicar por publicar. Es transmitir el mensaje correcto, al público correcto, en el momento adecuado. Diseñamos estrategias alineadas con los objetivos de tu negocio.",
            services: [
                "Estrategia de comunicación",
                "Definición de tono de voz",
                "Pilares de contenido",
                "Redacción (Copywriting)"
            ],
            details: [
                "Análisis de comunicación actual",
                "Objetivos por canal",
                "Lineamientos de redacción",
                "Calendarios estratégicos"
            ]
        },
        {
            id: "web-marketing",
            title: "Desarrollo Web & Landing Pages",
            icon: Globe,
            vision: "La web es el centro de tu negocio. Diseñamos sitios que no solo se ven bien, sino que convierten, comunican y acompañan el crecimiento. Enfoque boutique: cada web responde a una estrategia concreta.",
            services: [
                "Webs corporativas",
                "Landing pages de captación",
                "Optimización de sitios",
                "Arquitectura de contenidos"
            ],
            details: [
                "Estructuras para conversión",
                "Diseño alineado a marca",
                "Experiencia responsive",
                "Preparados para escalar"
            ]
        },
        {
            id: "ecommerce",
            title: "E-commerce & Estrategia Digital",
            icon: ShoppingCart,
            vision: "Vender online no es solo tener una tienda. Es tener una estrategia clara detrás. Diseñamos e-commerce preparados para convertir, crecer y conectarse con los procesos del negocio.",
            services: [
                "Tiendas online optimizadas",
                "Estrategia de catálogo",
                "Fichas de alta conversión",
                "Acompañamiento comercial"
            ],
            details: [
                "Estructura de productos",
                "UX de compra",
                "Medios de pago",
                "Estrategias de ticket promedio"
            ]
        },
        {
            id: "paid-media",
            title: "Publicidad Online (Paid Media)",
            icon: Megaphone,
            vision: "La publicidad sin estrategia es gasto inútil. Creamos campañas orientadas a resultados reales, alineadas con el negocio y apoyadas en datos.",
            services: [
                "Meta Ads y Google Ads",
                "Captación de leads y ventas",
                "Remarketing",
                "Optimización continua"
            ],
            details: [
                "Objetivos medibles",
                "Estructuras eficientes",
                "Creatividades de marca",
                "Escalado de resultados"
            ]
        },
        {
            id: "sales",
            title: "Acompañamiento Comercial",
            icon: TrendingUp,
            vision: "Muchos negocios tienen tráfico, pero no convierten. Trabajamos junto a tu equipo comercial para que cada oportunidad tenga más chances de cierre.",
            services: [
                "Optimización de ventas",
                "Argumentarios comerciales",
                "Guiones de contacto",
                "Coaching estratégico"
            ],
            details: [
                "Análisis de recorrido de leads",
                "Mejora de discursos",
                "Sistemas comerciales repetibles",
                "Mejora de cierre"
            ]
        },
        {
            id: "consulting",
            title: "Consultoría Mensual",
            icon: LineChart,
            vision: "El crecimiento no termina con una entrega. Acompañamos a tu empresa de forma continua para optimizar, ajustar y escalar tus resultados mes a mes.",
            services: [
                "Consultoría estratégica",
                "Mantenimiento web/técnico",
                "Soporte evolutivo",
                "Optimización continua"
            ],
            details: [
                "Ajuste de estrategias",
                "Mejora de procesos",
                "Análisis de resultados",
                "Escalado"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Hero */}
            <section className="relative py-24 px-6 overflow-hidden bg-black text-white">
                <div className="absolute inset-0 bg-grid-white/[0.05] -z-0" />
                <div className="container mx-auto relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
                        SOLUCIONES <span className="text-transparent bg-clip-text bg-gradient-to-r from-[--cyan-1] to-[--violet-1]">INTEGRALES</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Ingeniería profunda y estrategia de crecimiento unificadas.
                        Transformamos empresas combinando tecnología robusta con marketing de resultados.
                    </p>
                </div>
            </section>

            {/* Selector */}
            <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4">
                <div className="container mx-auto px-6 flex justify-center">
                    <div className="inline-flex bg-gray-100 p-1.5 rounded-full overflow-hidden">
                        <button
                            onClick={() => setActiveTab("tech")}
                            className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === "tech" ? "bg-black text-white shadow-lg" : "text-gray-500 hover:text-black"}`}
                        >
                            <Cpu className="w-4 h-4" />
                            INGENIERÍA & TECNOLOGÍA
                        </button>
                        <button
                            onClick={() => setActiveTab("marketing")}
                            className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === "marketing" ? "bg-black text-white shadow-lg" : "text-gray-500 hover:text-black"}`}
                        >
                            <Target className="w-4 h-4" />
                            MARKETING & CRECIMIENTO
                        </button>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-24 bg-gray-50 min-h-[60vh]">
                <div className="container mx-auto px-6">
                    <div className="grid gap-16">
                        {(activeTab === "tech" ? techServices : marketingServices).map((service, index) => (
                            <div
                                key={service.id}
                                className="group bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-500"
                            >
                                <div className="flex flex-col md:flex-row gap-12">

                                    {/* Header & Vision */}
                                    <div className="md:w-1/3 space-y-6">
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg ${activeTab === "tech" ? "bg-gradient-to-br from-[--cyan-2] to-[--cyan-1]" : "bg-gradient-to-br from-[--violet-2] to-[--violet-1]"}`}>
                                            <service.icon className="w-8 h-8" />
                                        </div>
                                        <h2 className="text-3xl font-bold leading-tight">{service.title}</h2>
                                        <p className="text-gray-600 leading-relaxed text-lg border-l-4 border-gray-100 pl-6 italic">
                                            "{service.vision}"
                                        </p>
                                    </div>

                                    {/* Details Grid */}
                                    <div className="md:w-2/3 grid md:grid-cols-2 gap-10 border-t md:border-t-0 md:border-l border-gray-100 pt-8 md:pt-0 md:pl-12">

                                        {/* Services List */}
                                        <div>
                                            <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-6 flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${activeTab === "tech" ? "bg-[--cyan-1]" : "bg-[--violet-1]"}`}></span>
                                                Qué Incluye
                                            </h3>
                                            <ul className="space-y-4">
                                                {service.services.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-gray-800 font-medium">
                                                        <CheckCircle2 className={`w-5 h-5 shrink-0 ${activeTab === "tech" ? "text-[--cyan-1]" : "text-[--violet-1]"}`} />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Methodology/Tasks */}
                                        <div>
                                            <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-6 flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${activeTab === "tech" ? "bg-[--cyan-3]" : "bg-[--violet-3]"}`}></span>
                                                Cómo Trabajamos
                                            </h3>
                                            <ul className="space-y-4">
                                                {service.details.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                                                        <ArrowRight className="w-4 h-4 mt-0.5 text-gray-300 shrink-0" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-black text-center text-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold mb-8">¿Listo para escalar tu negocio?</h2>
                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                        Agenda una sesión de descubrimiento y diseñemos juntos la estrategia que necesitas.
                    </p>
                    <a href="/contacto" className="inline-block bg-white text-black font-bold px-10 py-4 rounded-full hover:bg-gray-100 hover:scale-105 transition-all text-lg">
                        Hablar con un Consultor
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Services;
