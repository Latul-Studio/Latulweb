# Instrucciones de Diseño e Identidad - Fase 2: La Home Escultural

**Rol:** Creative Developer & UI/UX Lead.
**Objetivo:** Implementar la identidad visual definitiva de Latul Studio, recuperando la esencia "escultural" y aplicándola sobre el stack moderno de Vite.

## 1. Definición del Sistema de Diseño (Design Tokens)
Debemos migrar a una estética "Material Design Técnico / Dark Mode".
En el archivo `index.css` (o `tailwind.config.js`), define las siguientes variables CSS basándote en una paleta sobria y utilitaria:

- **Superficies:**
  - `--surface-dark`: #121317 (Fondo principal)
  - `--surface-panel`: #212226 (Tarjetas y paneles)
  - `--surface-glass`: rgba(33, 34, 38, 0.7) (Para efectos Glassmorphism)
- **Acentos (Solo para interacción/Hover):**
  - `--cyan-neon`: #0f97bd (Tecnología/Futuro)
  - `--violet-neon`: #bc1296 (Creatividad/Estrategia)
- **Tipografía:**
  - Usa 'Nunito Sans' para un look técnico y limpio. que encuentras en la carpeta C:\Users\agust\Desktop\latul-web\Nunito_Sans

**Regla de Oro:** La web debe ser predominantemente oscura (Dark Mode). Los colores Cyan y Violeta SOLO deben aparecer en estados `:hover`, bordes sutiles o luces volumétricas, nunca como fondos sólidos grandes. Queremos transmitir "Ingeniería", no "Carnaval".

## 2. Implementación de la "Hero Section" (La Turbina)
Necesito que reconstruyas el componente `Hero` recuperando la implementación de Three.js del archivo original, pero adaptada a React funcional moderno.

**Requerimientos del componente 3D:**
1.  **Geometría:** Usa `TorusKnotGeometry(3.5, 1.2, 150, 20, 2, 3)` para crear la turbina abstracta.
2.  **Material:** Debe ser `MeshPhysicalMaterial` con `roughness: 0.6`, `metalness: 0.1` y `clearcoat: 0.1`. Queremos que parezca cerámica técnica o polímero avanzado, no plástico barato.
3.  **Iluminación:** Clave para el realismo. Usa una `DirectionalLight` fuerte y un `SpotLight` cian (`0x0f97bd`) lateral para dar volumen.
4.  **Optimización:** Asegúrate de que el renderizado se limpie (`dispose`) al desmontar el componente para evitar fugas de memoria (Memory Leaks).

## 3. Integración de Componentes Existentes
Mantén los componentes que ya desarrollamos, pero ajusta sus estilos al nuevo modo oscuro:
- **Navbar:** Hazla `fixed`, con fondo `backdrop-filter: blur(12px)` y bordes muy sutiles (`border-white/5`).
- **AILab Component:** Asegúrate de que el panel de IA tenga ese estilo "Glassmorphism" oscuro, con bordes que brillen levemente al foco.
- **TechStack:** Los iconos deben ser gris oscuro o blanco tenue por defecto, y encenderse con sus colores oficiales solo al pasar el mouse (Hover).

## 4. Efectos de Interacción (Micro-interacciones)
- Implementa transiciones suaves (`duration-500`) en todos los elementos interactivos.
- Los botones deben tener un comportamiento "píldora" que cambia de forma o color sutilmente.

**Resultado Esperado:**
Una Home que se sienta como un panel de control de ingeniería avanzada: oscura, elegante, con una pieza 3D central girando suavemente que denote "estructura y complejidad bajo control".