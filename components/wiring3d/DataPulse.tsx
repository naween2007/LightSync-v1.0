"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { CONNECTOR_REAR, STRIP_LENGTH, STRIP_POSITION, TERMINAL_WORLD } from "./sceneConfig";
import { createWireCurve } from "./curves";

type Props = { active: boolean; animate: boolean };

export default function DataPulse({ active, animate }: Props) {
  const ref = useRef<THREE.Mesh>(null);
  const { invalidate } = useThree();

  const path = useMemo(() => {
    const exactDataWire = createWireCurve(CONNECTOR_REAR.data, TERMINAL_WORLD.data).getPoints(14).reverse();
    const stripStart = new THREE.Vector3(STRIP_POSITION[0] - 0.34, STRIP_POSITION[1] + 0.18, 0.25);
    const stripMid = new THREE.Vector3(STRIP_POSITION[0] + STRIP_LENGTH * 0.48, STRIP_POSITION[1] + 0.25, 0.2);
    const stripEnd = new THREE.Vector3(STRIP_POSITION[0] + STRIP_LENGTH, STRIP_POSITION[1] + 0.18, 0.08);
    return new THREE.CatmullRomCurve3([...exactDataWire, stripStart, stripMid, stripEnd], false, "catmullrom", 0.28);
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.visible = active;
    if (!active) return;
    const t = animate ? (state.clock.elapsedTime * 0.26) % 1 : 0.82;
    ref.current.position.copy(path.getPoint(t));
    if (animate) invalidate();
  });

  return (
    <mesh ref={ref} visible={false}>
      <sphereGeometry args={[0.095, 16, 16]} />
      <meshStandardMaterial color="#67e8f9" emissive="#22d3ee" emissiveIntensity={3.3} roughness={0.18} toneMapped={false} />
      <pointLight color="#22d3ee" intensity={1.2} distance={1.8} decay={2} />
    </mesh>
  );
}
