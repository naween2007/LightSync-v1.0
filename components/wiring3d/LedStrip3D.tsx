"use client";

import * as THREE from "three";
import { Html } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { STRIP_LED_COUNT, STRIP_LENGTH, STRIP_POSITION } from "./sceneConfig";

type Props = {
  stage: number;
  exploded: boolean;
  lowEnd: boolean;
  animate: boolean;
  showLabels?: boolean;
};

function setInstanceMatrix(mesh: THREE.InstancedMesh, index: number, position: THREE.Vector3, rotationY: number, scale: THREE.Vector3) {
  const temp = new THREE.Object3D();
  temp.position.copy(position);
  temp.rotation.y = rotationY;
  temp.scale.copy(scale);
  temp.updateMatrix();
  mesh.setMatrixAt(index, temp.matrix);
}

export default function LedStrip3D({ stage, exploded, lowEnd, animate, showLabels }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const pcbRef = useRef<THREE.InstancedMesh>(null);
  const bodyRef = useRef<THREE.InstancedMesh>(null);
  const lightRef = useRef<THREE.InstancedMesh>(null);
  const { invalidate } = useThree();
  const count = lowEnd ? 18 : STRIP_LED_COUNT;

  const layout = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const t = i / Math.max(1, count - 1);
      const x = t * STRIP_LENGTH;
      const y = Math.sin(t * Math.PI * 1.05) * 0.085;
      const z = Math.sin(t * Math.PI * 1.35) * 0.22;
      const nextT = Math.min(1, t + 0.01);
      const nextZ = Math.sin(nextT * Math.PI * 1.35) * 0.22;
      const rotationY = -Math.atan2(nextZ - z, STRIP_LENGTH * 0.01);
      return { t, x, y, z, rotationY };
    });
  }, [count]);

  useEffect(() => {
    if (!pcbRef.current || !bodyRef.current || !lightRef.current) return;
    const segmentLength = STRIP_LENGTH / count + 0.035;
    layout.forEach((item, i) => {
      setInstanceMatrix(pcbRef.current!, i, new THREE.Vector3(item.x, item.y, item.z), item.rotationY, new THREE.Vector3(segmentLength, 0.055, 0.74));
      setInstanceMatrix(bodyRef.current!, i, new THREE.Vector3(item.x, item.y + 0.074, item.z), item.rotationY, new THREE.Vector3(0.13, 0.055, 0.13));
      setInstanceMatrix(lightRef.current!, i, new THREE.Vector3(item.x, item.y + 0.107, item.z), item.rotationY, new THREE.Vector3(0.072, 0.018, 0.072));
    });
    pcbRef.current.instanceMatrix.needsUpdate = true;
    bodyRef.current.instanceMatrix.needsUpdate = true;
    lightRef.current.instanceMatrix.needsUpdate = true;
  }, [layout]);

  useFrame((state, delta) => {
    let moving = false;
    if (groupRef.current) {
      const target = exploded
        ? new THREE.Vector3(STRIP_POSITION[0] + 1.15, STRIP_POSITION[1] + 1.45, STRIP_POSITION[2] - 0.9)
        : new THREE.Vector3(...STRIP_POSITION);
      groupRef.current.position.lerp(target, 1 - Math.exp(-delta * 4.2));
      groupRef.current.rotation.y += ((exploded ? 0.2 : 0) - groupRef.current.rotation.y) * (1 - Math.exp(-delta * 4.2));
      moving = groupRef.current.position.distanceTo(target) > 0.002;
      if (moving) invalidate();
    }

    if (!lightRef.current) return;
    const now = state.clock.elapsedTime;
    const signalProgress = stage >= 6 ? (animate ? (now * 0.38) % 1 : 0.88) : -1;

    for (let i = 0; i < count; i += 1) {
      const t = i / Math.max(1, count - 1);
      let color = new THREE.Color("#07101f");
      if (stage === 6) {
        const distance = Math.abs(t - signalProgress);
        if (distance < 0.08) color = new THREE.Color("#22d3ee").multiplyScalar(1.8 - distance * 8);
        else if (t < signalProgress) color = new THREE.Color("#164e63");
      } else if (stage >= 7) {
        const hueWave = animate ? (now * 0.12 + t * 0.52) % 1 : (0.52 + t * 0.18) % 1;
        if (hueWave < 0.33) color = new THREE.Color("#22d3ee");
        else if (hueWave < 0.66) color = new THREE.Color("#8b5cf6");
        else color = new THREE.Color("#3b82f6");
      } else if (stage >= 4) {
        color = new THREE.Color("#0f172a");
      }
      lightRef.current.setColorAt(i, color);
    }
    if (lightRef.current.instanceColor) lightRef.current.instanceColor.needsUpdate = true;
    if ((stage >= 6 && animate) || moving) invalidate();
  });

  const arrowPositions = [1.0, 2.35, 3.7, 4.85];

  return (
    <group ref={groupRef} position={STRIP_POSITION}>
      <instancedMesh ref={pcbRef} args={[undefined, undefined, count]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#080b0f" roughness={0.68} metalness={0.06} />
      </instancedMesh>

      <instancedMesh ref={bodyRef} args={[undefined, undefined, count]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#eef2f7" roughness={0.52} metalness={0.02} />
      </instancedMesh>

      <instancedMesh ref={lightRef} args={[undefined, undefined, count]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial vertexColors toneMapped={false} color="#111827" />
      </instancedMesh>

      {[-0.3, 0, 0.3].map((z, i) => (
        <mesh key={`in-${z}`} position={[-0.19, 0.066, z]}>
          <boxGeometry args={[0.24, 0.025, 0.13]} />
          <meshStandardMaterial color={i === 0 ? "#d97706" : "#c28136"} metalness={0.76} roughness={0.27} />
        </mesh>
      ))}
      {[-0.3, 0, 0.3].map((z) => (
        <mesh key={`out-${z}`} position={[STRIP_LENGTH + 0.16, 0.066, z]}>
          <boxGeometry args={[0.24, 0.025, 0.13]} />
          <meshStandardMaterial color="#c28136" metalness={0.76} roughness={0.27} />
        </mesh>
      ))}

      {arrowPositions.map((x) => (
        <mesh key={x} position={[x, 0.106, -0.25]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.07, 0.18, 3]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.7} />
        </mesh>
      ))}

      <mesh position={[-0.36, 0.18, 0]} castShadow>
        <boxGeometry args={[0.28, 0.26, 0.92]} />
        <meshStandardMaterial color="#111827" roughness={0.7} />
      </mesh>
      {[-0.25, 0, 0.25].map((z) => (
        <mesh key={z} position={[-0.51, 0.18, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.055, 0.055, 0.16, 12]} />
          <meshStandardMaterial color="#030712" roughness={0.78} />
        </mesh>
      ))}

      <Html position={[-0.45, 0.8, 0]} center distanceFactor={8} style={{ pointerEvents: "none" }}>
        <div className="whitespace-nowrap rounded-xl border border-emerald-300/20 bg-[#07101e]/90 px-3 py-2 text-[10px] font-semibold text-white shadow-lg">
          <div className="text-emerald-300">INPUT</div>
          <div className="mt-1 flex gap-2 text-[9px] text-slate-200"><span>5V</span><span>DIN</span><span>GND</span></div>
        </div>
      </Html>
      <Html position={[1.55, 0.72, -0.3]} center distanceFactor={8.5} style={{ pointerEvents: "none" }}>
        <div className="whitespace-nowrap rounded-full border border-cyan-300/20 bg-[#07101e]/85 px-3 py-1.5 text-[10px] font-semibold text-cyan-100 shadow-lg">
          DATA DIRECTION →
        </div>
      </Html>
      {showLabels && (
        <Html position={[2.4, -0.7, 0]} center distanceFactor={9} style={{ pointerEvents: "none" }}>
          <div className="rounded-full border border-white/15 bg-black/70 px-3 py-1 text-[10px] font-semibold text-white">WS2812B / WS2812B ECO strip</div>
        </Html>
      )}
    </group>
  );
}
