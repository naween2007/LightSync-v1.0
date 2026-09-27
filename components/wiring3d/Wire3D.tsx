"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type { Vec3 } from "./sceneConfig";
import { createWireCurve } from "./curves";

type Props = {
  start: Vec3;
  end: Vec3;
  color: string;
  active: boolean;
  radius?: number;
  exploded?: boolean;
  explodeOffset?: Vec3;
};

export default function Wire3D({
  start,
  end,
  color,
  active,
  radius = 0.048,
  exploded = false,
  explodeOffset = [0, 0, 0],
}: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  const tipRef = useRef<THREE.Mesh>(null);
  const progress = useRef(active ? 1 : 0);
  const groupRef = useRef<THREE.Group>(null);
  const { invalidate } = useThree();

  const curve = useMemo(() => createWireCurve(start, end), [start, end]);

  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 56, radius, 10, false), [curve, radius]);
  const totalIndexCount = geometry.index?.count ?? 0;

  useFrame((_, delta) => {
    const target = active ? 1 : 0;
    const k = 1 - Math.exp(-delta * 3.8);
    progress.current += (target - progress.current) * k;
    if (Math.abs(target - progress.current) < 0.002) progress.current = target;

    if (meshRef.current) {
      const visible = Math.max(0, Math.min(totalIndexCount, Math.floor(totalIndexCount * progress.current)));
      meshRef.current.geometry.setDrawRange(0, visible);
    }

    if (tipRef.current) {
      const p = curve.getPoint(Math.max(0.001, progress.current));
      tipRef.current.position.copy(p);
      tipRef.current.visible = progress.current > 0.01 && progress.current < 0.995;
    }

    if (groupRef.current) {
      const targetPos = exploded ? new THREE.Vector3(...explodeOffset) : new THREE.Vector3(0, 0, 0);
      groupRef.current.position.lerp(targetPos, 1 - Math.exp(-delta * 4.2));
      if (groupRef.current.position.distanceTo(targetPos) > 0.002) invalidate();
    }

    if (Math.abs(target - progress.current) > 0.002) invalidate();
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} geometry={geometry} castShadow={false} receiveShadow={false}>
        <meshStandardMaterial color={color} roughness={0.48} metalness={0.02} />
      </mesh>
      <mesh ref={tipRef} visible={false}>
        <sphereGeometry args={[radius * 1.35, 12, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.3} roughness={0.3} />
      </mesh>
    </group>
  );
}
