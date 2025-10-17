export const DEFAULT_MONITOR_ID = 'standard-24';

export const PRESET_MONITORS = [
  {
    id: 'standard-24',
    name: 'Standard 24" 16:9',
    diagonal: 24,
    aspectRatio: '16:9',
  },
  {
    id: 'standard-27',
    name: 'Standard 27" 16:9',
    diagonal: 27,
    aspectRatio: '16:9',
  },
  {
    id: 'standard-32',
    name: 'Standard 32" 16:9',
    diagonal: 32,
    aspectRatio: '16:9',
  },
  {
    id: 'ultrawide-34',
    name: 'Ultrawide 34" 21:9',
    diagonal: 34,
    aspectRatio: '21:9',
  },
  {
    id: 'ultrawide-49',
    name: 'Ultrawide 49" 32:9',
    diagonal: 49,
    aspectRatio: '32:9',
  }
];

export const DEFAULT_MONITOR_CONFIG = {
    bezelThickness: 0.08,
    bottomBezelExtra: 0.25,
    depth: 0.25,
    position: { x: 0, y: 0, z: 0 },
    rotation: { y: 0 },
    screenRotation: 0,
    screenHeight: 0,
    selected: false,
    baseRadius: 1.0,
    baseHeight: 0.2,
    poleRadius: 0.15,
    armWidth: 0.18,
    armHeight: 2.2,
    armDepth: 0.15
};