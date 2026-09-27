export type Vec3 = [number, number, number];

export const CONTROLLER_POSITION: Vec3 = [-2.1, 0.75, 0];
export const STRIP_POSITION: Vec3 = [3.05, 0.34, 0];
export const POWER_ADAPTER_POSITION: Vec3 = [-5.15, 0.28, -0.35];

export const TERMINAL_WORLD = {
  power: [-0.48, 1.25, 0.48] as Vec3,
  ground: [-0.48, 0.78, 0.48] as Vec3,
  data: [-0.48, 0.31, 0.48] as Vec3,
};

export const CONNECTOR_REAR = {
  power: [2.18, 0.73, -0.25] as Vec3,
  ground: [2.18, 0.73, 0] as Vec3,
  data: [2.18, 0.73, 0.25] as Vec3,
};

export const CONNECTOR_FINAL_X = 2.68;
export const CONNECTOR_START_X = 2.28;
export const STRIP_INPUT_X = 3.02;

export const STRIP_LENGTH = 5.4;
export const STRIP_LED_COUNT = 24;

export const STAGE_CAMERA: Array<{ position: Vec3; target: Vec3 }> = [
  { position: [10.4, 6.7, 12.2], target: [0.6, 0.5, 0] },
  { position: [4.9, 3.35, 6.65], target: [-0.35, 0.9, 0.25] },
  { position: [4.8, 3.15, 6.25], target: [-0.25, 0.75, 0.2] },
  { position: [4.65, 2.95, 5.8], target: [-0.1, 0.55, 0.2] },
  { position: [7.5, 3.5, 6.9], target: [3.0, 0.65, 0] },
  { position: [-7.7, 4.35, 6.7], target: [-3.0, 0.55, 0] },
  { position: [7.8, 4.45, 8.4], target: [1.6, 0.55, 0] },
  { position: [10.7, 6.9, 12.8], target: [0.8, 0.55, 0] },
];

export const STAGE_LABELS = [
  "Hardware",
  "Power",
  "Ground",
  "Data",
  "Strip",
  "Power Adapter",
  "WLED",
  "Complete",
] as const;
