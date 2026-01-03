import { Link } from "react-router-dom";
import LogoHorizontal from "../../assets/Logo_icon/Logo Horizontal 1_1.png";

const Footer = () => (
    <footer className="bg-white py-12 border-t border-gray-100">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <Link to="/" className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                <img src={LogoHorizontal} alt="Latul Studio" className="h-6 w-auto" />
            </Link>
            <div className="flex gap-4 text-xs text-gray-400">
                <Link to="/legal/terminos" className="hover:text-black">Términos</Link>
                <Link to="/legal/privacidad" className="hover:text-black">Privacidad</Link>
            </div>
            <div className="text-gray-400 text-xs">
                &copy; 2025 Todos los derechos reservados.
            </div>
        </div>
    </footer>
);

export default Footer;
