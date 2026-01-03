import { Link } from "react-router-dom";
import { Triangle } from "lucide-react";

const Footer = () => {
    return (
        <footer className="w-full py-8 border-t border-gray-100 bg-white">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Left: Logo */}
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold tracking-tighter text-[--text-primary]">LATUL</span>
                    <Triangle className="w-3 h-3 text-[--text-primary] rotate-180 fill-current" />
                </div>

                {/* Center: Copyright */}
                <div className="text-xs text-gray-400 font-medium">
                    © 2025 Latul Studio. Ingeniería de Negocio.
                </div>

                {/* Right: Legal Links */}
                <div className="flex items-center gap-6">
                    <Link to="/politica-de-privacidad" className="text-[10px] uppercase font-bold text-gray-400 hover:text-[--text-primary] transition-colors">
                        Política de Privacidad
                    </Link>
                    <Link to="/aviso-legal" className="text-[10px] uppercase font-bold text-gray-400 hover:text-[--text-primary] transition-colors">
                        Aviso Legal
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
