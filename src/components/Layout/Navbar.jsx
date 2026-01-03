import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Menu, X, ChevronRight, ChevronLeft, ArrowUpRight,
    Brain, Target, TrendingUp, Globe, ShoppingCart, Megaphone, MessageCircle, Database, Sparkles
} from 'lucide-react';
import LogoHorizontal from '../../assets/Logo_icon/Logo Horizontal 1_1.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [mobileView, setMobileView] = useState('main'); // 'main' | 'services'

    const closeMenu = () => {
        setIsOpen(false);
        setTimeout(() => setMobileView('main'), 300);
    };

    // Typo constants: Uppercase, Weight 400
    const typoClass = "font-normal uppercase tracking-widest";
    const linkClass = `text-xs text-black hover:text-[#0f97bd] transition-colors ${typoClass}`;
    const mobileLinkClass = `text-xl text-black border-b border-gray-100 pb-4 ${typoClass}`;

    // Enhanced Data Structure with Icons and Colors
    const serviceCategories = [
        {
            title: "Estrategia & Crecimiento",
            items: [
                { name: "Consultoría Estratégica", path: "/servicios/consultoria-estrategica", icon: Brain, color: "group-hover:text-[#0f97bd]" },
                { name: "Branding e Identidad", path: "/servicios/branding-identidad", icon: Target, color: "group-hover:text-[#bc1296]" },
                { name: "Consultoría Ventas", path: "/servicios/consultoria-ventas", icon: TrendingUp, color: "group-hover:text-[#0f97bd]" },
            ]
        },
        {
            title: "Marketing & Conversión",
            items: [
                { name: "Desarrollo Web", path: "/servicios/desarrollo-web", icon: Globe, color: "group-hover:text-[#0f97bd]" },
                { name: "Ecommerce", path: "/servicios/ecommerce", icon: ShoppingCart, color: "group-hover:text-[#bc1296]" },
                { name: "Publicidad Paid Media", path: "/servicios/publicidad-paid-media", icon: Megaphone, color: "group-hover:text-[#0f97bd]" },
                { name: "Social Media", path: "/servicios/comunicacion-social-media", icon: MessageCircle, color: "group-hover:text-[#bc1296]" },
            ]
        },
        {
            title: "Tecnología High Ticket",
            items: [
                { name: "Desarrollo Software Odoo", path: "/servicios/desarrollo-software-odoo", icon: Database, highlight: true, color: "group-hover:text-[#0f97bd]" },
            ]
        },
        {
            title: "Automatización",
            items: [
                { name: "Automatización IA", path: "/servicios/automatizacion-ia", icon: Sparkles, color: "group-hover:text-[#bc1296]" },
            ]
        }
    ];

    return (
        <>
            {/* --- DESKTOP NAVBAR --- */}
            {/* Glassmorphism Refined: More transparency (70%), Higher Blur (2xl), Distinct Border */}
            <nav className="fixed top-0 left-0 w-full h-20 bg-white/70 backdrop-blur-2xl border-b border-white/40 z-50 flex items-center justify-between px-6 transition-all duration-300 shadow-sm supports-[backdrop-filter]:bg-white/60">

                {/* Left: Logo (flex-1 to balance) */}
                <div className="flex-1">
                    <Link to="/" onClick={closeMenu} className="z-50 block w-max">
                        <img src={LogoHorizontal} alt="Latul Studio" className="h-8 md:h-10 w-auto object-contain" />
                    </Link>
                </div>

                {/* Center: Desktop Links (flex-1 justify-center) */}
                <div className="hidden md:flex flex-1 justify-center items-center gap-8">
                    <Link to="/nosotros" className={linkClass}>Nosotros</Link>

                    {/* Services Dropdown Container */}
                    <div className="group relative h-full flex items-center cursor-pointer">
                        <span className={`${linkClass} flex items-center gap-1 py-8`}>Servicios</span>

                        {/* Mega Menu Dropdown */}
                        {/* Transition adjusted for smoothness */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] translate-y-2 group-hover:translate-y-0">

                            {/* Card Container - Glassy but Readable */}
                            <div className="w-[900px] bg-white/85 backdrop-blur-2xl border border-white/50 shadow-[0_20px_60px_rgba(0,0,0,0.15)] rounded-2xl p-8 grid grid-cols-4 gap-8 mt-2">

                                {serviceCategories.map((cat, idx) => (
                                    <div key={idx} className="flex flex-col">
                                        <h4 className={`text-[10px] text-gray-400 mb-6 border-b border-gray-200/50 pb-2 ${typoClass}`}>
                                            {cat.title}
                                        </h4>

                                        <div className="flex flex-col gap-2">
                                            {cat.items.map((item, i) => (
                                                <Link
                                                    key={i}
                                                    to={item.path}
                                                    className="group/item flex items-center gap-3 p-2 -ml-2 rounded-lg hover:bg-white/60 hover:shadow-sm transition-all duration-200"
                                                >
                                                    <div className={`p-2 rounded-md bg-white/50 text-gray-400 group-hover/item:bg-white group-hover/item:shadow-sm transition-all duration-300 ${item.color}`}>
                                                        <item.icon strokeWidth={1.5} className="w-5 h-5 transition-transform duration-300 group-hover/item:scale-110" />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <span className={`text-[11px] font-bold text-gray-700 group-hover/item:text-black transition-colors ${typoClass} ${item.highlight ? 'text-[#0f97bd]' : ''}`}>
                                                            {item.name}
                                                        </span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>

                    <Link to="/casos-de-exito" className={linkClass}>Casos de Éxito</Link>
                </div>

                {/* Actions (flex-1 justify-end) */}
                <div className="flex-1 flex justify-end items-center gap-4 z-50">
                    <Link to="/contacto" className={`hidden md:block px-6 py-2 bg-black text-white hover:bg-[#0f97bd] rounded-full transition-colors shadow-lg hover:shadow-[#0f97bd]/20 ${typoClass} text-[10px]`}>
                        Hablemos
                    </Link>

                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-black bg-gray-100/50 rounded-full backdrop-blur-md">
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* --- MOBILE DRILL-DOWN MENU --- */}
            <div className={`fixed inset-0 z-40 bg-white md:hidden transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                <div className="relative w-full h-full pt-24 px-6 overflow-hidden">

                    {/* PANEL 1: MAIN MENU */}
                    <div className={`absolute inset-0 pt-24 px-6 w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${mobileView === 'main' ? 'translate-x-0' : '-translate-x-1/3 opacity-0 pointer-events-none'}`}>
                        <nav className="flex flex-col gap-6">
                            <Link to="/" onClick={closeMenu} className={mobileLinkClass}>Inicio</Link>
                            <Link to="/nosotros" onClick={closeMenu} className={mobileLinkClass}>Nosotros</Link>

                            <button
                                onClick={() => setMobileView('services')}
                                className={`w-full flex justify-between items-center ${mobileLinkClass} group`}
                            >
                                Servicios
                                <div className="p-2 bg-gray-50 rounded-full group-active:bg-[#0f97bd] group-active:text-white transition-colors">
                                    <ChevronRight className="w-5 h-5" />
                                </div>
                            </button>

                            <Link to="/casos-de-exito" onClick={closeMenu} className={mobileLinkClass}>Casos de Éxito</Link>

                            <Link to="/contacto" onClick={closeMenu} className={`mt-8 w-full py-4 bg-black text-white text-center rounded-full ${typoClass}`}>
                                Empezar Proyecto
                            </Link>
                        </nav>
                    </div>

                    {/* PANEL 2: SERVICES LIST */}
                    <div className={`absolute inset-0 pt-24 px-6 w-full h-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${mobileView === 'services' ? 'translate-x-0' : 'translate-x-full'}`}>

                        <button onClick={() => setMobileView('main')} className={`flex items-center gap-2 mb-8 text-gray-400 hover:text-black transition-colors ${typoClass} text-xs`}>
                            <ChevronLeft className="w-4 h-4" /> Volver
                        </button>

                        <h3 className={`text-xl mb-8 text-black ${typoClass}`}>Nuestras Soluciones</h3>

                        <div className="flex flex-col gap-8 overflow-y-auto h-[calc(100vh-200px)] pb-10">
                            {serviceCategories.map((cat, idx) => (
                                <div key={idx}>
                                    <h4 className={`text-xs text-[#0f97bd] mb-3 border-b border-gray-100 pb-1 ${typoClass}`}>{cat.title}</h4>
                                    <div className="flex flex-col gap-3 pl-2">
                                        {cat.items.map((item, i) => (
                                            <Link
                                                key={i}
                                                to={item.path}
                                                onClick={closeMenu}
                                                className={`block text-sm text-gray-600 active:text-black ${typoClass} flex items-center gap-3 py-2 group`}
                                            >
                                                <item.icon className={`w-5 h-5 text-gray-300 ${item.color.replace('group-hover:', '')}`} />
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
};

export default Navbar;
