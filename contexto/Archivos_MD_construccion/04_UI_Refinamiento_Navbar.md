# Instrucciones de UI - Fase 3 (Revisión V2): Corrección Técnica y Navegación Móvil "Drill-Down"

**Rol:** Senior Frontend Developer / UI UX Specialist.
**Estado Actual:** CRÍTICO. El intento anterior rompió el renderizado 3D (Three.js conflict) y la UI general.
**Objetivos Inmediatos:**
1.  **PRIORIDAD 0:** Resolver el conflicto de dependencias de Three.js para restaurar el Hero.
2.  Refinar la UI Desktop (Logo, Tipografía, Glassmorphism).
3.  Implementar el patrón de navegación móvil de "Pantallas Anidadas" (Drill-down) con botón de "Volver".

---

## SECCIÓN 0: FIX CRÍTICO (Hacer esto antes que nada)

**Problema:** Error "WARNING: Multiple instances of Three.js being imported". Esto ocurre porque alguna nueva librería de UI instalada para el menú está trayendo su propia versión de Three.js, entrando en conflicto con `@react-three/fiber` del Hero.

**Acción Correctiva:**
1.  **Detener desarrollo de UI.**
2.  Auditar dependencias: Ejecuta `npm ls three` en la terminal. Debes ver que solo UNA versión de `three` está siendo utilizada por todo el proyecto.
3.  Si hay duplicados, fuerza la resolución en `package.json` (usando `resolutions` si usas yarn, o `overrides` si usas npm > 8) para asegurar que todo el proyecto use la misma versión.
4.  **Verificación:** El Hero 3D (la turbina de cerámica) DEBE verse correctamente antes de seguir con el menú.

---

## SECCIÓN 1: Refinamiento Visual Desktop (Sobre una base estable)

Una vez estable el sistema, aplica los estilos de "Alto Nivel":

### 1.1 Logotipo
Reemplaza el texto/icono actual por la imagen oficial.
* **Ruta:** `/src/assets/Logo_icon/Logo Horizontal 1_1.png`.
* **Link:** Debe envolver la imagen y dirigir a `/`.
* **Estilo:** Ajusta la altura (`h-10` aprox) para que se vea nítido dentro del navbar.

### 1.2 Tipografía y Colores (Desktop y Dropdown)
Para TODOS los enlaces del menú principal y los ítems del dropdown "Servicios":
* **Fuente:** Nunito Sans (Asegurar importación en CSS global).
* **Peso:** Light (300) o Regular (400). No bold.
* **Transformación:** UPPERCASE (Mayúsculas).
* **Spacing:** `tracking-widest` (Espaciado amplio entre letras).
* **Estado Normal:** Color negro o gris muy oscuro.
* **Estado Hover/Active:** Color **Cyan** (`#0f97bd`).

### 1.3 Glassmorphism (Efecto Vidrio)
Aplica este efecto tanto a la barra de navegación principal (sticky) como al contenedor del dropdown de Servicios.
* **Fondo:** Blanco translúcido alto (`bg-white/80` o `/90`).
* **Blur:** Desenfoque fuerte (`backdrop-blur-lg` o `xl`).
* **Borde:** Borde sutil blanco/gris claro para definir los límites (`border-b border-white/20`).

---

## SECCIÓN 2: Navegación Móvil "Drill-Down" (Nivel Avanzado)

**Concepto:** No es un acordeón que se expande hacia abajo. Es una navegación por **niveles de pantalla** dentro del menú.

**Requisito de Estado:** El componente Navbar necesitará un estado para controlar qué "pantalla" del menú se muestra. Ej: `const [mobileView, setMobileView] = useState('main'); // 'main' | 'services'`

### Nivel 1: Pantalla Principal del Menú
Al abrir el menú hamburguesa, se muestra un panel full-screen (glassmorphism) con:
* Nosotros
* **Servicios >** (Al hacer click AQUI, NO se expande. Se navega a la Pantalla de Nivel 2). Icono de flecha derecha obligatorio.
* Casos de Éxito
* Contacto (Botón destacado)

### Nivel 2: Pantalla de Submenú "Servicios"
Al entrar aquí, la pantalla principal desaparece y se desliza esta nueva pantalla:

**Elemento Superior (Header del Nivel 2):**
* Un botón prominente de **"< VOLVER"**. Al hacer click, regresa el estado a la Pantalla Principal (Nivel 1).

**Cuerpo del Nivel 2 (Lista de Servicios Enriquecida):**
Lista vertical de todos los servicios. Cada ítem debe ser rico visualmente para ayudar a la navegación:
* **Contenedor del Ítem:** Padding generoso, borde inferior sutil.
* **Icono:** Icono temático a la izquierda (ej: `lucide-react` Brain, Cpu, ShoppingCart) en color Cyan.
* **Título:** Nombre del servicio (Nunito, Uppercase, Bold).
* **Descripción (Preview Text):** Debajo del título, una frase corta y descriptiva en gris claro y minúsculas (font normal). *Usar los textos de "vista previa" de los documentos de Word.*

**Ejemplo de Ítem en Nivel 2 (Móvil):**
```jsx
// Concepto visual
[ICONO_IA_CYAN] | **AUTOMATIZACIÓN & IA**
                 | Elimina tareas manuales y escala tu operativa.
----------------------------------------------------------------
[ICONO_WEB_CYAN]| **DESARROLLO WEB**
                 | Sitios de alto rendimiento enfocados en conversión.