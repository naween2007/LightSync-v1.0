"use client";

import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Html, Lightformer } from "@react-three/drei";
import { Suspense, useRef } from "react";
import Controller3D from "./Controller3D";
import LedStrip3D from "./LedStrip3D";
import Wire3D from "./Wire3D";
import Connector3D from "./Connector3D";
import PowerAdapter3D from "./PowerAdapter3D";
import DataPulse from "./DataPulse";
import WiringCamera from "./WiringCamera";
import { CONNECTOR_REAR, TERMINAL_WORLD } from "./sceneConfig";

type Props = {
  stage: number;
  animate: boolean;
  exploded: boolean;
  resetViewToken: number;
  reducedMotion: boolean;
  lowEnd: boolean;
};

function WifiWaves({ active, animate }: { active: boolean; animate: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const { invalidate } = useThree();

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.visible = active;
    if (!active) return;
    const pulse = animate ? 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.06 : 1;
    groupRef.current.scale.setScalar(pulse);
    if (animate) invalidate();
  });

  return (
    <group ref={groupRef} position={[-2.1, 2.55, 0]} visible={false} rotation={[Math.PI / 2, 0, 0]}>
      {[0.38, 0.62, 0.88].map((r, i) => (
        <mesh key={r} scale={[1, 0.48, 1]}>
          <torusGeometry args={[r, 0.018 + i * 0.005, 8, 42, Math.PI]} />
          <meshBasicMaterial color="#67e8f9" transparent opacity={0.55 - i * 0.1} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function SceneContent({ stage, animate, exploded, resetViewToken, reducedMotion, lowEnd }: Props) {
  const showLabels = exploded;

  return (
    <>
      <WiringCamera stage={stage} exploded={exploded} reducedMotion={reducedMotion} resetViewToken={resetViewToken} />

      <ambientLight intensity={0.45} />
      <directionalLight
        position={[5, 9, 7]}
        intensity={2.0}
        color="#ffffff"
        castShadow={!lowEnd}
        shadow-mapSize-width={lowEnd ? 512 : 1024}
        shadow-mapSize-height={lowEnd ? 512 : 1024}
      />
      <pointLight position={[5, 4, 5]} intensity={17} distance={15} decay={2} color="#22d3ee" />
      <pointLight position={[-5, 3, -4]} intensity={13} distance={14} decay={2} color="#8b5cf6" />

      <Environment resolution={lowEnd ? 32 : 64} frames={1}>
        <Lightformer form="rect" intensity={2.2} position={[0, 6, 6]} scale={[8, 3, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={1.8} position={[6, 2, 1]} scale={[3, 5, 1]} color="#67e8f9" />
        <Lightformer form="rect" intensity={1.2} position={[-6, 2, -2]} scale={[3, 4, 1]} color="#8b5cf6" />
      </Environment>

      <Controller3D stage={stage} exploded={exploded} showLabels={showLabels} />
      <PowerAdapter3D plugged={stage >= 5} exploded={exploded} showLabels={showLabels} />
      <Connector3D connected={stage >= 4} exploded={exploded} showLabels={showLabels} />
      <LedStrip3D stage={stage} exploded={exploded} lowEnd={lowEnd} animate={animate} showLabels={showLabels} />

      <Wire3D
        start={CONNECTOR_REAR.power}
        end={TERMINAL_WORLD.power}
        color="#ef4444"
        active={stage >= 1}
        exploded={exploded}
        explodeOffset={[0.25, 2.7, -1.15]}
      />
      <Wire3D
        start={CONNECTOR_REAR.ground}
        end={TERMINAL_WORLD.ground}
        color="#e2e8f0"
        active={stage >= 2}
        exploded={exploded}
        explodeOffset={[0.1, 2.45, 0]}
      />
      <Wire3D
        start={CONNECTOR_REAR.data}
        end={TERMINAL_WORLD.data}
        color="#22c55e"
        active={stage >= 3}
        exploded={exploded}
        explodeOffset={[-0.15, 2.2, 1.1]}
      />

      <WifiWaves active={stage >= 6} animate={animate} />
      <DataPulse active={stage >= 6} animate={animate} />

      {stage >= 6 && (
        <Html position={[-2.1, 3.35, 0]} center distanceFactor={8} style={{ pointerEvents: "none" }}>
          <div className="rounded-full border border-emerald-300/25 bg-emerald-400/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[.18em] text-emerald-200 shadow-[0_0_30px_rgba(52,211,153,.16)]">
            WLED READY
          </div>
        </Html>
      )}

      <mesh position={[0, -0.56, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 16]} />
        <meshStandardMaterial color="#050816" roughness={0.9} metalness={0.02} />
      </mesh>
      <ContactShadows
        position={[0, -0.54, 0]}
        opacity={0.34}
        scale={18}
        blur={2.7}
        far={8}
        resolution={lowEnd ? 128 : 256}
        frames={lowEnd ? 1 : 12}
        color="#02040a"
      />
    </>
  );
}

export default function Wiring3DScene(props: Props) {
  const frameloop = props.animate ? "always" : "demand";

  return (
    <Canvas
      className="h-full w-full"
      dpr={props.lowEnd ? 1 : [1, 1.5]}
      frameloop={frameloop}
      shadows={!props.lowEnd}
      camera={{ position: [12.6, 7.6, 15.5], fov: 42, near: 0.1, far: 80 }}
      gl={{ antialias: !props.lowEnd, powerPreference: "high-performance", alpha: false }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.08;
      }}
    >
      <color attach="background" args={["#050816"]} />
      <fog attach="fog" args={["#050816", 15, 30]} />
      <Suspense fallback={null}>
        <SceneContent {...props} />
      </Suspense>
    </Canvas>
  );
}
