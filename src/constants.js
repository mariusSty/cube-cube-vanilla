export const keysBinding = new Map([
  ["u", "U"],
  ["d", "D"],
  ["r", "R"],
  ["l", "L"],
  ["f", "F"],
  ["b", "B"],
  ["m", "M"],
  ["e", "E"],
  ["s", "S"],
]);

export const shiftKeysBinding = new Map([
  ["U", "U'"],
  ["D", "D'"],
  ["R", "R'"],
  ["L", "L'"],
  ["F", "F'"],
  ["B", "B'"],
]);

export const ctrlKeysBinding = new Map([
  ["u", "u"],
  ["d", "d"],
  ["r", "r"],
  ["l", "l"],
  ["f", "f"],
  ["b", "b"],
]);

export const movements = new Map([
  [
    "U",
    {
      cubesNeedRotation: (position, distance) =>
        Math.round(position.y) == 1 || Math.round(position.y) == distance,
      rotation: (rotation) => ({ y: rotation.y - Math.PI * 0.5 }),
    },
  ],
  [
    "D",
    {
      cubesNeedRotation: (position, distance) =>
        Math.round(position.y) == -1 || Math.round(position.y) == -distance,
      rotation: (rotation) => ({ y: rotation.y - Math.PI * 0.5 }),
    },
  ],
  [
    "R",
    {
      cubesNeedRotation: (position, distance) =>
        Math.round(position.x) == 1 || Math.round(position.x) == distance,
      rotation: (rotation) => ({ x: rotation.x - Math.PI * 0.5 }),
    },
  ],
  [
    "L",
    {
      cubesNeedRotation: (position, distance) =>
        Math.round(position.x) == -1 || Math.round(position.x) == -distance,
      rotation: (rotation) => ({ x: rotation.x + Math.PI * 0.5 }),
    },
  ],
  [
    "F",
    {
      cubesNeedRotation: (position, distance) =>
        Math.round(position.z) == 1 || Math.round(position.z) == distance,
      rotation: (rotation) => ({ z: rotation.z - Math.PI * 0.5 }),
    },
  ],
  [
    "B",
    {
      cubesNeedRotation: (position, distance) =>
        Math.round(position.z) == -1 || Math.round(position.z) == -distance,
      rotation: (rotation) => ({ z: rotation.z + Math.PI * 0.5 }),
    },
  ],
  [
    "M",
    {
      cubesNeedRotation: (position, distance) => Math.round(position.x) == 0,
      rotation: (rotation) => ({ x: rotation.x - Math.PI * 0.5 }),
    },
  ],
  [
    "E",
    {
      cubesNeedRotation: (position, distance) => Math.round(position.y) == 0,
      rotation: (rotation) => ({ y: rotation.y - Math.PI * 0.5 }),
    },
  ],
  [
    "S",
    {
      cubesNeedRotation: (position, distance) => Math.round(position.z) == 0,
      rotation: (rotation) => ({ z: rotation.z - Math.PI * 0.5 }),
    },
  ],
  [
    "U'",
    {
      cubesNeedRotation: (position, distance) =>
        Math.round(position.y) == 1 || Math.round(position.y) == distance,
      rotation: (rotation) => ({ y: rotation.y + Math.PI * 0.5 }),
    },
  ],
  [
    "D'",
    {
      cubesNeedRotation: (position, distance) =>
        Math.round(position.y) == -1 || Math.round(position.y) == -distance,
      rotation: (rotation) => ({ y: rotation.y + Math.PI * 0.5 }),
    },
  ],
  [
    "R'",
    {
      cubesNeedRotation: (position, distance) =>
        Math.round(position.x) == 1 || Math.round(position.x) == distance,
      rotation: (rotation) => ({ x: rotation.x + Math.PI * 0.5 }),
    },
  ],
  [
    "L'",
    {
      cubesNeedRotation: (position, distance) =>
        Math.round(position.x) == -1 || Math.round(position.x) == -distance,
      rotation: (rotation) => ({ x: rotation.x - Math.PI * 0.5 }),
    },
  ],
  [
    "F'",
    {
      cubesNeedRotation: (position, distance) =>
        Math.round(position.z) == 1 || Math.round(position.z) == distance,
      rotation: (rotation) => ({ z: rotation.z + Math.PI * 0.5 }),
    },
  ],
  [
    "B'",
    {
      cubesNeedRotation: (position, distance) =>
        Math.round(position.z) == -1 || Math.round(position.z) == -distance,
      rotation: (rotation) => ({ z: rotation.z - Math.PI * 0.5 }),
    },
  ],
  [
    "u",
    {
      cubesNeedRotation: (position, distance) =>
        Math.round(position.y) == 0 ||
        Math.round(position.y) == 1 ||
        Math.round(position.y) == distance,
      rotation: (rotation) => ({ y: rotation.y - Math.PI * 0.5 }),
    },
  ],
  [
    "d",
    {
      cubesNeedRotation: (position, distance) =>
        Math.round(position.y) == -1 ||
        Math.round(position.y) == 0 ||
        Math.round(position.y) == -distance,
      rotation: (rotation) => ({ y: rotation.y + Math.PI * 0.5 }),
    },
  ],
  [
    "r",
    {
      cubesNeedRotation: (position, distance) =>
        Math.round(position.x) == 0 ||
        Math.round(position.x) == 1 ||
        Math.round(position.x) == distance,
      rotation: (rotation) => ({ x: rotation.x - Math.PI * 0.5 }),
    },
  ],
  [
    "l",
    {
      cubesNeedRotation: (position, distance) =>
        Math.round(position.x) == 0 ||
        Math.round(position.x) == -1 ||
        Math.round(position.x) == -distance,
      rotation: (rotation) => ({ x: rotation.x + Math.PI * 0.5 }),
    },
  ],
  [
    "f",
    {
      cubesNeedRotation: (position, distance) =>
        Math.round(position.z) == 0 ||
        Math.round(position.z) == 1 ||
        Math.round(position.z) == distance,
      rotation: (rotation) => ({ z: rotation.z - Math.PI * 0.5 }),
    },
  ],
  [
    "b",
    {
      cubesNeedRotation: (position, distance) =>
        Math.round(position.z) == 0 ||
        Math.round(position.z) == -1 ||
        Math.round(position.z) == -distance,
      rotation: (rotation) => ({ z: rotation.z + Math.PI * 0.5 }),
    },
  ],
]);
