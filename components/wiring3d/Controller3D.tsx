"use client";

import * as THREE from "three";
import { Html, RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { CONTROLLER_POSITION } from "./sceneConfig";

type Props = {
  stage: number;
  exploded: boolean;
  showLabels?: boolean;
};

type TerminalProps = {
  y: number;
  label: string;
  detail: string;
  color: string;
  connected: boolean;
  highlighted: boolean;
};

function Terminal({ y, label, detail, color, connected, highlighted }: TerminalProps) {
  const leverRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.MeshStandardMaterial>(null);
  const progress = useRef(connected ? 1 : 0);
  const { invalidate } = useThree();

  useFrame((_, delta) => {
    const target = connected ? 1 : 0;
    progress.current += (target - progress.current) * (1 - Math.exp(-delta * 3.6));
    if (Math.abs(target - progress.current) < 0.002) progress.current = target;

    if (leverRef.current) {
      const p = progress.current;
      let open = 0;
      if (p > 0.02 && p < 0.32) open = p / 0.32;
      else if (p >= 0.32 && p < 0.8) open = 1;
      else if (p >= 0.8 && p < 1) open = 1 - (p - 0.8) / 0.2;
      leverRef.current.rotation.z = -open * 0.48;
    }

    if (glowRef.current) {
      const pulse = progress.current > 0.86 ? 0.45 + Math.sin(performance.now() * 0.012) * 0.18 : 0.05;
      glowRef.current.emissiveIntensity = highlighted ? Math.max(0.12, pulse) : 0.02;
    }

    if (Math.abs(target - progress.current) > 0.002) invalidate();
  });

  return (
    <group position={[1.62, y, 0.48]}>
      <RoundedBox args={[0.34, 0.33, 0.34]} radius={0.045} smoothness={2} castShadow>
        <meshStandardMaterial
          ref={glowRef}
          color="#111827"
          emissive={highlighted ? color : "#000000"}
          emissiveIntensity={highlighted ? 0.12 : 0}
          roughness={0.62}
        />
      </RoundedBox>
      <mesh ref={leverRef} position={[0.02, 0.19, 0.04]}>
        <boxGeometry args={[0.27, 0.08, 0.25]} />
        <meshStandardMaterial color={color} roughness={0.52} metalness={0.02} />
      </mesh>
      <Html position={[0.54, 0, 0]} center distanceFactor={7.5} style={{ pointerEvents: "none" }}>
        <div className={`whitespace-nowrap rounded-lg border px-2 py-1 text-[10px] font-semibold shadow-lg ${highlighted ? "border-cyan-300/30 bg-[#07101e]/90 text-white" : "border-white/10 bg-black/60 text-slate-400"}`}>
          <span className="mr-1 text-cyan-300">{label}</span>{detail}
        </div>
      </Html>
    </group>
  );
}

export default function Controller3D({ stage, exploded, showLabels }: Props) {
  const ref = useRef<THREE.Group>(null);
  const indicatorRef = useRef<THREE.MeshStandardMaterial>(null);
  const { invalidate } = useThree();

  useFrame((state, delta) => {
    if (ref.current) {
      const target = exploded
        ? new THREE.Vector3(CONTROLLER_POSITION[0] - 0.7, CONTROLLER_POSITION[1] + 0.9, CONTROLLER_POSITION[2] - 0.5)
        : new THREE.Vector3(...CONTROLLER_POSITION);
      ref.current.position.lerp(target, 1 - Math.exp(-delta * 4.2));
      ref.current.rotation.y += ((exploded ? -0.2 : 0) - ref.current.rotation.y) * (1 - Math.exp(-delta * 4.2));
      if (ref.current.position.distanceTo(target) > 0.002) invalidate();
    }
    if (indicatorRef.current) {
      const powered = stage >= 5;
      indicatorRef.current.color.set(powered ? "#34d399" : "#334155");
      indicatorRef.current.emissive.set(powered ? "#34d399" : "#000000");
      indicatorRef.current.emissiveIntensity = powered ? 1.8 + Math.sin(state.clock.elapsedTime * 3) * 0.15 : 0;
    }
  });

  return (
    <group ref={ref} position={CONTROLLER_POSITION}>
      <RoundedBox args={[3.0, 1.82, 0.9]} radius={0.16} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color="#f7f7f4" roughness={0.58} metalness={0.01} />
      </RoundedBox>

      <RoundedBox args={[2.42, 1.18, 0.055]} radius={0.05} smoothness={2} position={[-0.15, 0.08, 0.478]}>
        <meshStandardMaterial color="#e9edf2" roughness={0.78} />
      </RoundedBox>

      <Html position={[-0.45, 0.46, 0.53]} transform distanceFactor={5.5} style={{ pointerEvents: "none" }}>
        <div className="w-[220px] text-left text-slate-800">
          <div className="text-[14px] font-black tracking-tight">ESP32 WLED DIGITAL LED CONTROLLER</div>
          <div className="mt-1 text-[10px] font-semibold text-slate-500">WITH MIC · EXAMPLE WLED HARDWARE</div>
        </div>
      </Html>

      <mesh position={[-0.65, -0.42, 0.52]}>
        <circleGeometry args={[0.07, 18]} />
        <meshStandardMaterial ref={indicatorRef} color="#334155" roughness={0.38} />
      </mesh>

      <mesh position={[0.2, -0.35, 0.52]}>
        <circleGeometry args={[0.12, 24]} />
        <meshStandardMaterial color="#d8dee8" roughness={0.68} />
      </mesh>
      <mesh position={[0.2, -0.35, 0.545]}>
        <circleGeometry args={[0.044, 18]} />
        <meshStandardMaterial color="#475569" roughness={0.8} />
      </mesh>

      <mesh position={[-1.54, -0.18, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.15, 0.15, 0.15, 22]} />
        <meshStandardMaterial color="#202630" roughness={0.58} />
      </mesh>

      <Terminal y={0.5} label="V" detail="+5V" color="#ef4444" connected={stage >= 1} highlighted={stage >= 1} />
      <Terminal y={0.03} label="D" detail="GPIO16 / DATA" color="#1f2937" connected={stage >= 3} highlighted={stage >= 3} />
      <Terminal y={-0.44} label="G" detail="GND" color="#111827" connected={stage >= 2} highlighted={stage >= 2} />

      <group position={[1.58, -0.55, -0.27]}>
        {[-0.2, 0.1, 0.4].map((y, i) => (
          <mesh key={y} position={[0, y, 0]}>
            <boxGeometry args={[0.28, 0.22, 0.28]} />
            <meshStandardMaterial color={i === 0 ? "#7f1d1d" : "#111827"} roughness={0.7} transparent opacity={0.38} />
          </mesh>
        ))}
      </group>

      <Html position={[0, 1.35, 0]} center distanceFactor={8.5} style={{ pointerEvents: "none" }}>
        <div className="whitespace-nowrap rounded-full border border-cyan-300/20 bg-[#07101e]/85 px-3 py-1.5 text-[11px] font-semibold text-white shadow-lg">
          Example setup — always follow the labels printed on your controller.
        </div>
      </Html>

      {showLabels && (
        <Html position={[0, -1.25, 0]} center distanceFactor={9} style={{ pointerEvents: "none" }}>
          <div className="rounded-full border border-white/15 bg-black/70 px-3 py-1 text-[10px] font-semibold text-white">WLED ESP32 controller</div>
        </Html>
      )}
    </group>
  );
}
