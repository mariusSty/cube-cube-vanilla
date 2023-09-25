export const keysBinding = new Map([
  ["KeyU", "U"],
  ["KeyD", "D"],
  ["KeyR", "R"],
  ["KeyL", "L"],
  ["KeyF", "F"],
  ["KeyB", "B"],
  ["KeyM", "M"],
  ["KeyE", "E"],
  ["KeyS", "S"],
]);

export const shiftKeysBinding = new Map([
  ["KeyU", "U'"],
  ["KeyD", "D'"],
  ["KeyR", "R'"],
  ["KeyL", "L'"],
  ["KeyF", "F'"],
  ["KeyB", "B'"],
]);

export const ctrlKeysBinding = new Map([
  ["KeyU", "u"],
  ["KeyD", "d"],
  ["KeyR", "r"],
  ["KeyL", "l"],
  ["KeyF", "f"],
  ["KeyB", "b"],
]);

export const movements = new Map([
  [
    "U",
    {
      cubesNeedRotation: (position) => Math.round(position.y) == 1,
      rotation: (rotation) => ({ y: rotation.y - Math.PI * 0.5 }),
    },
  ],
  [
    "D",
    {
      cubesNeedRotation: (position) => Math.round(position.y) == -1,
      rotation: (rotation) => ({ y: rotation.y - Math.PI * 0.5 }),
    },
  ],
  [
    "R",
    {
      cubesNeedRotation: (position) => Math.round(position.x) == 1,
      rotation: (rotation) => ({ x: rotation.x - Math.PI * 0.5 }),
    },
  ],
  [
    "L",
    {
      cubesNeedRotation: (position) => Math.round(position.x) == -1,
      rotation: (rotation) => ({ x: rotation.x + Math.PI * 0.5 }),
    },
  ],
  [
    "F",
    {
      cubesNeedRotation: (position) => Math.round(position.z) == 1,
      rotation: (rotation) => ({ z: rotation.z - Math.PI * 0.5 }),
    },
  ],
  [
    "B",
    {
      cubesNeedRotation: (position) => Math.round(position.z) == -1,
      rotation: (rotation) => ({ z: rotation.z + Math.PI * 0.5 }),
    },
  ],
  [
    "M",
    {
      cubesNeedRotation: (position) => Math.round(position.x) == 0,
      rotation: (rotation) => ({ x: rotation.x - Math.PI * 0.5 }),
    },
  ],
  [
    "E",
    {
      cubesNeedRotation: (position) => Math.round(position.y) == 0,
      rotation: (rotation) => ({ y: rotation.y - Math.PI * 0.5 }),
    },
  ],
  [
    "S",
    {
      cubesNeedRotation: (position) => Math.round(position.z) == 0,
      rotation: (rotation) => ({ z: rotation.z - Math.PI * 0.5 }),
    },
  ],
  [
    "U'",
    {
      cubesNeedRotation: (position) => Math.round(position.y) == 1,
      rotation: (rotation) => ({ y: rotation.y + Math.PI * 0.5 }),
    },
  ],
  [
    "D'",
    {
      cubesNeedRotation: (position) => Math.round(position.y) == -1,
      rotation: (rotation) => ({ y: rotation.y + Math.PI * 0.5 }),
    },
  ],
  [
    "R'",
    {
      cubesNeedRotation: (position) => Math.round(position.x) == 1,
      rotation: (rotation) => ({ x: rotation.x + Math.PI * 0.5 }),
    },
  ],
  [
    "L'",
    {
      cubesNeedRotation: (position) => Math.round(position.x) == -1,
      rotation: (rotation) => ({ x: rotation.x + Math.PI * 0.5 }),
    },
  ],
  [
    "F'",
    {
      cubesNeedRotation: (position) => Math.round(position.z) == 1,
      rotation: (rotation) => ({ z: rotation.z + Math.PI * 0.5 }),
    },
  ],
  [
    "B'",
    {
      cubesNeedRotation: (position) => Math.round(position.z) == -1,
      rotation: (rotation) => ({ z: rotation.z - Math.PI * 0.5 }),
    },
  ],
  [
    "u",
    {
      cubesNeedRotation: (position) =>
        Math.round(position.y) == 0 || Math.round(position.y) == 1,
      rotation: (rotation) => ({ y: rotation.y - Math.PI * 0.5 }),
    },
  ],
  [
    "d",
    {
      cubesNeedRotation: (position) =>
        Math.round(position.y) == -1 || Math.round(position.y) == 0,
      rotation: (rotation) => ({ y: rotation.y + Math.PI * 0.5 }),
    },
  ],
  [
    "r",
    {
      cubesNeedRotation: (position) =>
        Math.round(position.x) == 0 || Math.round(position.x) == 1,
      rotation: (rotation) => ({ x: rotation.x - Math.PI * 0.5 }),
    },
  ],
  [
    "l",
    {
      cubesNeedRotation: (position) =>
        Math.round(position.x) == 0 || Math.round(position.x) == -1,
      rotation: (rotation) => ({ x: rotation.x + Math.PI * 0.5 }),
    },
  ],
  [
    "f",
    {
      cubesNeedRotation: (position) =>
        Math.round(position.z) == 0 || Math.round(position.z) == 1,
      rotation: (rotation) => ({ z: rotation.z - Math.PI * 0.5 }),
    },
  ],
  [
    "b",
    {
      cubesNeedRotation: (position) =>
        Math.round(position.z) == 0 || Math.round(position.z) == -1,
      rotation: (rotation) => ({ z: rotation.z + Math.PI * 0.5 }),
    },
  ],
]);
