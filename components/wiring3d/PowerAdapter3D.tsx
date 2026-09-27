"use client";

import * as THREE from "three";
import { Html, RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { CONTROLLER_POSITION, POWER_ADAPTER_POSITION } from "./sceneConfig";

type Props = {
  plugged: boolean;
  exploded: boolean;
  showLabels?: boolean;
};

export default function PowerAdapter3D({ plugged, exploded, showLabels }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const plugRef = useRef<THREE.Group>(null);
  const cableGroupRef = useRef<THREE.Group>(null);
  const { invalidate } = useThree();

  const cableCurve = useMemo(() => {
    const start = new THREE.Vector3(POWER_ADAPTER_POSITION[0] + 0.86, POWER_ADAPTER_POSITION[1] + 0.08, POWER_ADAPTER_POSITION[2]);
    const end = new THREE.Vector3(CONTROLLER_POSITION[0] - 1.78, CONTROLLER_POSITION[1] - 0.18, 0.02);
    return new THREE.CatmullRomCurve3([
      start,
      start.clone().add(new THREE.Vector3(0.4, -0.35, 0.35)),
      end.clone().add(new THREE.Vector3(-0.35, -0.32, 0.25)),
      end,
    ]);
  }, []);
  const cableGeometry = useMemo(() => new THREE.TubeGeometry(cableCurve, 48, 0.055, 10, false), [cableCurve]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      const target = exploded
        ? new THREE.Vector3(POWER_ADAPTER_POSITION[0] - 1.3, POWER_ADAPTER_POSITION[1] + 0.7, POWER_ADAPTER_POSITION[2] - 1.0)
        : new THREE.Vector3(...POWER_ADAPTER_POSITION);
      groupRef.current.position.lerp(target, 1 - Math.exp(-delta * 4.2));
      if (groupRef.current.position.distanceTo(target) > 0.002) invalidate();
    }
    if (cableGroupRef.current) {
      const cableTarget = exploded ? new THREE.Vector3(-0.65, 1.0, -0.75) : new THREE.Vector3(0, 0, 0);
      cableGroupRef.current.position.lerp(cableTarget, 1 - Math.exp(-delta * 4.2));
      if (cableGroupRef.current.position.distanceTo(cableTarget) > 0.002) invalidate();
    }
    if (plugRef.current) {
      const from = new THREE.Vector3(CONTROLLER_POSITION[0] - 2.05, CONTROLLER_POSITION[1] - 0.18, 0.02);
      const to = new THREE.Vector3(CONTROLLER_POSITION[0] - 1.62, CONTROLLER_POSITION[1] - 0.18, 0.02);
      const target = plugged ? to : from;
      plugRef.current.position.lerp(target, 1 - Math.exp(-delta * 4.8));
      if (plugRef.current.position.distanceTo(target) > 0.002) invalidate();
    }
  });

  return (
    <>
      <group ref={groupRef} position={POWER_ADAPTER_POSITION}>
        <RoundedBox args={[1.7, 1.08, 0.82]} radius={0.14} smoothness={4} castShadow>
          <meshStandardMaterial color="#232936" roughness={0.66} metalness={0.03} />
        </RoundedBox>
        <mesh position={[0.35, 0.12, 0.43]}>
          <planeGeometry args={[0.72, 0.3]} />
          <meshStandardMaterial color="#111827" roughness={0.8} />
        </mesh>
        <Html position={[0, 0.8, 0]} center distanceFactor={9} style={{ pointerEvents: "none" }}>
          <div className="whitespace-nowrap rounded-full border border-white/15 bg-black/70 px-3 py-1.5 text-[11px] font-semibold text-white shadow-lg">
            5V enclosed Power Adapter · DC side only
          </div>
        </Html>
        {showLabels && (
          <Html position={[0, -0.82, 0]} center distanceFactor={9} style={{ pointerEvents: "none" }}>
            <div className="whitespace-nowrap rounded-full border border-white/15 bg-black/70 px-3 py-1 text-[10px] font-semibold text-white">Power Adapter</div>
          </Html>
        )}
      </group>

      <group ref={cableGroupRef}>
        <mesh geometry={cableGeometry}>
          <meshStandardMaterial color="#171717" roughness={0.7} metalness={0.01} />
        </mesh>

        <group ref={plugRef} position={[CONTROLLER_POSITION[0] - 2.05, CONTROLLER_POSITION[1] - 0.18, 0.02]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.105, 0.105, 0.42, 16]} />
            <meshStandardMaterial color="#111827" roughness={0.58} />
          </mesh>
          <mesh position={[0.22, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.064, 0.064, 0.16, 16]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.72} roughness={0.24} />
          </mesh>
        </group>
      </group>
    </>
  );
}
