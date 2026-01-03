import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout/Layout';


// Public Pages
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/public/About'));
const Contact = lazy(() => import('../pages/public/Contact'));
const Portfolio = lazy(() => import('../pages/public/Portfolio'));

// Services Pages
// Note: We used named exports for Services/Legal to bundle them, but lazy loading usually needs default exports. 
// For simplicity in this shell phase, I will create a wrapper or just import them directly if they are small, 
// OR I will fix the import to use named exports with lazy.
// Strategy: Keep it simple. Since they are in one file, we can't lazy load them individually easily without default exports.
// For now, let's load ServicesPages normally or lazy load the whole chunk.
// Actually, `import()` returns a promise resolving to the module. We can do:
// const Consulting = lazy(() => import('../pages/services/ServicesPages').then(module => ({ default: module.Consulting })));

const Consulting = lazy(() => import('../pages/services/ServicesPages').then(module => ({ default: module.Consulting })));
const Branding = lazy(() => import('../pages/services/ServicesPages').then(module => ({ default: module.Branding })));
const WebDev = lazy(() => import('../pages/services/ServicesPages').then(module => ({ default: module.WebDev })));
const Ecommerce = lazy(() => import('../pages/services/ServicesPages').then(module => ({ default: module.Ecommerce })));
const PaidMedia = lazy(() => import('../pages/services/ServicesPages').then(module => ({ default: module.PaidMedia })));
const SocialMedia = lazy(() => import('../pages/services/ServicesPages').then(module => ({ default: module.SocialMedia })));
const Odoo = lazy(() => import('../pages/services/ServicesPages').then(module => ({ default: module.Odoo })));
const AutomationAI = lazy(() => import('../pages/services/ServicesPages').then(module => ({ default: module.AutomationAI })));

// Legal Pages
const Privacy = lazy(() => import('../pages/legal/LegalPages').then(module => ({ default: module.Privacy })));
const LegalWarning = lazy(() => import('../pages/legal/LegalPages').then(module => ({ default: module.LegalWarning })));


const LoadingFallback = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
    </div>
);

const AppRouter = () => {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <Routes>
                {/* Main Layout Routes */}
                <Route element={<Layout />}>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/nosotros" element={<About />} />
                    <Route path="/contacto" element={<Contact />} />
                    <Route path="/casos-de-exito" element={<Portfolio />} />

                    {/* Services Silos */}
                    <Route path="/servicios/consultoria-estrategica" element={<Consulting />} />
                    <Route path="/servicios/branding-identidad" element={<Branding />} />
                    <Route path="/servicios/desarrollo-web" element={<WebDev />} />
                    <Route path="/servicios/ecommerce" element={<Ecommerce />} />
                    <Route path="/servicios/publicidad-paid-media" element={<PaidMedia />} />
                    <Route path="/servicios/comunicacion-social-media" element={<SocialMedia />} />
                    <Route path="/servicios/desarrollo-software-odoo" element={<Odoo />} />
                    <Route path="/servicios/automatizacion-ia" element={<AutomationAI />} />

                    {/* Legal */}
                    <Route path="/politica-de-privacidad" element={<Privacy />} />
                    <Route path="/aviso-legal" element={<LegalWarning />} />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AppRouter;
