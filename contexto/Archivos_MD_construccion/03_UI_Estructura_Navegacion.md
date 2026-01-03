# Instrucciones de Arquitectura UI - Fase 2: Sistema de Navegación y Layout

**Rol:** Senior Frontend Developer / UI Specialist.
**Contexto:** Ya tenemos las rutas lógicas (Fase 1). Ahora necesitamos construir la "cáscara" visual (Layout) para que el usuario pueda navegar.
**Estilo:** Minimalista, Glassmorphism (Vidrio), Tipografía Montserrat.
**Referencias:** `2.4 Sugerencia Sitemap.docx`, `anterior_home.txt`.

## Objetivos
1.  Crear el componente `Layout` persistente.
2.  Implementar la `Navbar` con menú responsivo y Dropdown de Servicios categorizado.
3.  Implementar un `Footer` minimalista.
4.  Conectar todo en el `App.jsx` mediante `<Outlet />`.

---

## 1. Componente Navbar (`src/components/layout/Navbar.jsx`)

Crea este componente. Debe ser fijo (`fixed top-0`) con efecto `backdrop-blur-md` (Glassmorphism).

**Requisitos Funcionales:**
* **Logo:** Texto "LATUL" + Ícono `Triangle` (de `lucide-react`) rotado 180°.
* **Links Desktop:**
    * `Nosotros` -> `/nosotros`
    * `Servicios` -> **Dropdown** (ver estructura abajo).
    * `Casos de Éxito` -> `/casos-de-exito`
    * **CTA Botón:** "Hablemos" -> `/contacto` (Estilo: Negro sólido, redondeado, hover cian).
* **Mobile:** Botón hamburguesa (`Menu` / `X` de `lucide-react`) que despliega un menú lateral o full-screen.

**Estructura del Dropdown "Servicios" (Basado en Sitemap):**
El menú desplegable debe organizar los servicios en estas categorías visuales:

1.  **Estrategia & Crecimiento**
    * `/servicios/consultoria-estrategica`
    * `/servicios/branding-identidad`
    * `/servicios/consultoria-ventas`
2.  **Marketing & Conversión**
    * `/servicios/desarrollo-web`
    * `/servicios/ecommerce`
    * `/servicios/publicidad-paid-media`
    * `/servicios/comunicacion-social-media`
3.  **Tecnología & Desarrollo (High Ticket)**
    * `/servicios/desarrollo-software-odoo` (Destacar visualmente si es posible)
4.  **Automatización**
    * `/servicios/automatizacion-ia`

## 2. Componente Footer (`src/components/layout/Footer.jsx`)

Diseño limpio y técnico.
* **Izquierda:** Logo LATUL simplificado.
* **Centro:** Copyright "© 2025 Latul Studio. Ingeniería de Negocio."
* **Derecha (Legales):** Links pequeños a:
    * `/politica-de-privacidad`
    * `/aviso-legal`

## 3. Componente Layout (`src/components/layout/Layout.jsx`)

Este componente actúa como envoltura principal.
* Debe importar `Navbar` y `Footer`.
* Debe usar `<Outlet />` de `react-router-dom` para renderizar el contenido de la página actual.
* **Importante:** Añadir `pt-20` (padding-top) al contenedor del `<Outlet />` para compensar la altura de la Navbar fija y evitar que el contenido quede oculto detrás.

## 4. Integración en Router (`src/App.jsx` o `src/Router.jsx`)

Modifica la definición de rutas para implementar el Layout:

```jsx
// Ejemplo de estructura esperada
<Routes>
  {/* Rutas con Layout (Públicas) */}
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="/nosotros" element={<Nosotros />} />
    <Route path="/contacto" element={<Contacto />} />
    <Route path="/casos-de-exito" element={<CasosExito />} />
    
    {/* Rutas de Servicios (Ejemplos) */}
    <Route path="/servicios/consultoria-estrategica" element={<ServicioEstrategia />} />
    <Route path="/servicios/desarrollo-software-odoo" element={<ServicioOdoo />} />
    {/* ... resto de servicios */}
  </Route>

  {/* Rutas Sin Layout (Opcional, ej: Landing pages de campañas específicas o 404) */}
</Routes>