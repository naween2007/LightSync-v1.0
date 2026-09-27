"use client";

import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { STAGE_CAMERA } from "./sceneConfig";

type Props = {
  stage: number;
  exploded: boolean;
  reducedMotion: boolean;
  resetViewToken: number;
};

export default function WiringCamera({ stage, exploded, reducedMotion, resetViewToken }: Props) {
  const controlsRef = useRef<any>(null);
  const [manual, setManual] = useState(false);
  const { camera, invalidate } = useThree();

  useEffect(() => {
    setManual(false);
    invalidate();
  }, [resetViewToken, invalidate]);

  useEffect(() => {
    if (!manual) invalidate();
  }, [stage, exploded, manual, invalidate]);

  useFrame((_, delta) => {
    if (!controlsRef.current || manual || reducedMotion) return;
    const base = STAGE_CAMERA[Math.min(STAGE_CAMERA.length - 1, Math.max(0, stage))];
    const desiredPosition = exploded ? new THREE.Vector3(12.5, 8.2, 14.5) : new THREE.Vector3(...base.position);
    const desiredTarget = exploded ? new THREE.Vector3(0.3, 0.8, 0) : new THREE.Vector3(...base.target);
    const ease = 1 - Math.exp(-delta * 2.35);
    camera.position.lerp(desiredPosition, ease);
    controlsRef.current.target.lerp(desiredTarget, ease);
    controlsRef.current.update();
    if (camera.position.distanceTo(desiredPosition) > 0.01 || controlsRef.current.target.distanceTo(desiredTarget) > 0.01) invalidate();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      minDistance={4.2}
      maxDistance={18}
      minPolarAngle={0.28}
      maxPolarAngle={Math.PI * 0.48}
      onStart={() => setManual(true)}
      onChange={() => invalidate()}
    />
  );
}
