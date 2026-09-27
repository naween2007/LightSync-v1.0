import * as THREE from "three";
import type { Vec3 } from "./sceneConfig";

export function createWireCurve(start: Vec3, end: Vec3) {
  const a = new THREE.Vector3(...start);
  const d = new THREE.Vector3(...end);
  const b = a.clone().lerp(d, 0.34).add(new THREE.Vector3(-0.05, 0.22, 0.55));
  const c = a.clone().lerp(d, 0.7).add(new THREE.Vector3(0.02, -0.12, 0.45));
  return new THREE.CatmullRomCurve3([a, b, c, d], false, "catmullrom", 0.35);
}
