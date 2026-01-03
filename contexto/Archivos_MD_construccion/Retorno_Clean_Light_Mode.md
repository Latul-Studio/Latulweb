# CORRECCIÓN VISUAL: "Clean White & Cyan Lighting"

**Problema:** El objeto 3D actual se ve como plástico azul sólido.
**Objetivo:** Lograr el acabado "Cerámica High-Tech" o "Cristal Satinado" donde el objeto es **BLANCO**, pero las sombras y curvas se tiñen de cian por la iluminación.

## 1. Ajuste del Material (Volver al Blanco)
Cambia las propiedades del `<MeshPhysicalMaterial />` para que el pigmento sea blanco, pero reaccione a la luz:

```jsx
<meshPhysicalMaterial
  color="#ffffff"        // BASE BLANCA (Crucial)
  roughness={0.4}        // Acabado satinado/suave
  metalness={0.1}        // Poco metálico
  clearcoat={0.8}        // Barniz brillante encima
  clearcoatRoughness={0.2}
  transmission={0}       // Quitamos transmisión para evitar complicaciones de render
  emissive="#000000"     // Sin emisión propia, dependerá de la luz
/>