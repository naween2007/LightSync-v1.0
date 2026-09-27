"use client";

import * as THREE from "three";
import { Html, RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { CONNECTOR_FINAL_X, CONNECTOR_START_X } from "./sceneConfig";

type Props = {
  connected: boolean;
  exploded: boolean;
  showLabels?: boolean;
};

export default function Connector3D({ connected, exploded, showLabels }: Props) {
  const ref = useRef<THREE.Group>(null);
  const snap = useRef(0);
  const { invalidate } = useThree();

  useFrame((state, delta) => {
    if (!ref.current) return;
    const x = connected ? CONNECTOR_FINAL_X : CONNECTOR_START_X;
    const target = new THREE.Vector3(x, exploded ? 2.1 : 0.73, exploded ? 0.9 : 0);
    ref.current.position.lerp(target, 1 - Math.exp(-delta * 4.8));

    if (connected && snap.current < 1) {
      snap.current = Math.min(1, snap.current + delta * 2.6);
      const pulse = Math.sin(snap.current * Math.PI) * 0.07;
      ref.current.rotation.z = pulse;
      invalidate();
    } else {
      ref.current.rotation.z *= 0.82;
    }

    if (!connected) snap.current = 0;
    if (ref.current.position.distanceTo(target) > 0.002) invalidate();
  });

  return (
    <group ref={ref} position={[CONNECTOR_START_X, 0.73, 0]}>
      <RoundedBox args={[0.52, 0.34, 0.92]} radius={0.07} smoothness={3} castShadow>
        <meshStandardMaterial color="#111827" roughness={0.72} metalness={0.02} />
      </RoundedBox>
      {[-0.25, 0, 0.25].map((z, index) => (
        <mesh key={z} position={[0.29, 0, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.045, 0.045, 0.22, 10]} />
          <meshStandardMaterial color={index === 0 ? "#f59e0b" : "#d1d5db"} metalness={0.72} roughness={0.28} />
        </mesh>
      ))}
      {showLabels && (
        <Html position={[0, 0.62, 0]} center distanceFactor={8} style={{ pointerEvents: "none" }}>
          <div className="whitespace-nowrap rounded-full border border-white/15 bg-black/70 px-3 py-1.5 text-[11px] font-semibold text-white shadow-lg">
            3-pin strip connector
          </div>
        </Html>
      )}
    </group>
  );
}
