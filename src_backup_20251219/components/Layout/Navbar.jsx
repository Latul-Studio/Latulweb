import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import LogoHorizontal from "../../assets/Logo_icon/Logo Horizontal 1_1.png";

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    const links = [
        { name: 'Soluciones', href: '/servicios' },
        { name: 'Empresa', href: '/equipo' },
        { name: 'Proyectos', href: '/casos-de-exito' },
        { name: 'Contacto', href: '/contacto' }
    ];

    return (
        <>
            <nav className="fixed w-full z-50 top-0 left-0 glass-light h-20">
                <div className="container mx-auto px-8 h-full flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <img src={LogoHorizontal} alt="Latul Studio" className="h-10 w-auto" />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-10">
                        {links.map(item => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`text-sm font-medium transition-colors relative group ${location.pathname === item.href ? 'text-black' : 'text-gray-500 hover:text-black'
                                    }`}
                            >
                                {item.name}
                                <span className={`absolute -bottom-1 left-0 h-0.5 bg-black transition-all duration-300 ${location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                                    }`}></span>
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Link to="/contacto" className="hidden md:block text-sm font-bold px-6 py-2.5 rounded-full bg-black text-white hover:bg-gray-800 transition-all">
                            Agendar Demo
                        </Link>
                        <button
                            className="md:hidden text-black p-2 hover:bg-gray-100 rounded-full transition-colors"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-[60] bg-white p-8 flex flex-col items-center justify-center animate-in slide-in-from-top duration-300">
                    <button
                        className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <div className="flex flex-col gap-8 text-center">
                        {links.map(item => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="text-2xl font-bold text-black"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
