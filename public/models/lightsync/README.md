# LightSync 3D model slot

The current website renders genuine procedural Three.js geometry for the controller, LED strip, 3-pin connector, cables, and enclosed low-voltage Power Adapter.

These components are intentionally isolated in `components/wiring3d/` so production Blender/GLB assets can replace the procedural meshes later without changing the tutorial state, camera, animation controls, or safety UI.

If GLB assets are added later, keep them optimized (roughly 1K textures or smaller where possible) and use Draco or Meshopt compression for delivery.
