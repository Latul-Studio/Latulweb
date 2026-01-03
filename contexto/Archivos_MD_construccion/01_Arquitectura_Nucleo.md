# Instrucciones de Arquitectura Frontend - Fase 1: Cimientos y Escalabilidad

**Rol:** Actúa como Senior Frontend Architect y SEO Strategist.
**Contexto:** Estamos construyendo "Latul Studio" (Antigravity), una plataforma de consultoría tecnológica de alto nivel.
**Stack:** React + Vite + Tailwind CSS.

## Objetivos de esta fase:
Implementar la arquitectura de enrutamiento basada en el Sitemap definido, configurar el manejo de estado global (Redux) y preparar la seguridad para una futura integración con Backend (Python/Django).

## 1. Instalación de Dependencias Críticas
Necesito que instales y configures las siguientes librerías para asegurar escalabilidad:
- `react-router-dom`: Para el manejo de rutas.
- `@reduxjs/toolkit` y `react-redux`: Para el manejo de estado global (auth, UI state).
- `react-helmet-async`: Para la inyección de meta-etiquetas SEO dinámicas por página.
- `axios`: Configurado con interceptores para manejo de tokens JWT (preparación para backend).

## 2. Estructura de Enrutamiento (Sitemap)
Basado en el documento de estrategia, implementa el siguiente árbol de rutas en `App.jsx` o un `Router.jsx` dedicado. Usa `Lazy Loading` para los componentes de las páginas internas para optimizar el rendimiento (WPO).

**Rutas Públicas:**
- `/` (Home - Distribuidor de tráfico)
- `/nosotros` (Historia y Visión)
- `/contacto` (Formulario cualificado)
- `/casos-de-exito` (Portfolio)
- `/casos-de-exito/:slug` (Detalle de proyecto)

**Silos de Servicios (Landing Pages Independientes para SEO):**
- `/servicios/consultoria-estrategica`
- `/servicios/branding-identidad`
- `/servicios/desarrollo-web`
- `/servicios/ecommerce`
- `/servicios/publicidad-paid-media`
- `/servicios/comunicacion-social-media`
- `/servicios/desarrollo-software-odoo` (High Ticket)
- `/servicios/automatizacion-ia`

**Legal (Footer):**
- `/politica-de-privacidad`
- `/aviso-legal`

## 3. Configuración de Estado (Redux Store)
Crea una estructura de carpetas `src/store`.
- **Slices necesarios:**
  - `authSlice`: Para manejar estados de `user`, `token`, `isAuthenticated`. (Prepara la lógica para recibir un JWT de Django).
  - `uiSlice`: Para manejar el tema (Dark/Light), modales y notificaciones globales.

## 4. Capa de Seguridad (Pre-Backend)
Crea un servicio de utilidad `src/api/axiosConfig.js`:
- Configura una instancia base de Axios.
- Añade interceptores para inyectar el Token Bearer en los headers automáticamente si existe en el estado.
- Prepara el manejo de errores 401 (No autorizado) para redirigir al login.

**Nota de Estilo:**
Mantén el código limpio, modular y tipado (o con PropTypes estrictos si usamos JS). No te preocupes aún por el diseño visual de cada página interna, céntrate en que la navegación y la estructura funcionen.