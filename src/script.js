import gsap from "gsap";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import {
  ctrlKeysBinding,
  keysBinding,
  movements,
  shiftKeysBinding,
} from "./constants";

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Scene
const scene = new THREE.Scene();

// Geometries
const box = new RoundedBoxGeometry(1, 1, 1, 10, 0.1);
const colorFace = new THREE.PlaneGeometry(0.8, 0.8);
const mirrorFace = new THREE.PlaneGeometry(1, 1);

// Materials
const rightMaterial = new THREE.MeshBasicMaterial({ color: "red" });
const leftMaterial = new THREE.MeshBasicMaterial({ color: "orange" });
const upMaterial = new THREE.MeshBasicMaterial({ color: "white" });
const downMaterial = new THREE.MeshBasicMaterial({ color: "yellow" });
const frontMaterial = new THREE.MeshBasicMaterial({ color: "limegreen" });
const backMaterial = new THREE.MeshBasicMaterial({ color: "blue" });
const backGroundMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

const cubes = [];
for (let i = 0; i < 27; i++) {
  const cube = new THREE.Group();
  const mesh = new THREE.Mesh(box, backGroundMaterial);
  const rightMesh = new THREE.Mesh(colorFace, rightMaterial);
  const leftMesh = new THREE.Mesh(colorFace, leftMaterial);
  const upMesh = new THREE.Mesh(colorFace, upMaterial);
  const downMesh = new THREE.Mesh(colorFace, downMaterial);
  const backMesh = new THREE.Mesh(colorFace, backMaterial);
  const frontMesh = new THREE.Mesh(colorFace, frontMaterial);
  cube.position.set(...(i >>> 0).toString(3).padStart(3, "0"));
  cube.position.x -= 1;
  cube.position.y -= 1;
  cube.position.z -= 1;
  rightMesh.rotation.y += Math.PI * 0.5;
  rightMesh.position.x += 0.501;
  leftMesh.rotation.y -= Math.PI * 0.5;
  leftMesh.position.x -= 0.501;
  upMesh.rotation.x -= Math.PI * 0.5;
  upMesh.position.y += 0.501;
  downMesh.rotation.x += Math.PI * 0.5;
  downMesh.position.y -= 0.501;
  frontMesh.position.z += 0.501;
  backMesh.rotation.y += Math.PI;
  backMesh.position.z -= 0.501;
  cubes.push(cube);
  cube.add(mesh, rightMesh, leftMesh, upMesh, downMesh, backMesh, frontMesh);
  scene.add(cube);
}

const distance = 4;
const colorMaterials = [
  leftMaterial,
  rightMaterial,
  downMaterial,
  upMaterial,
  backMaterial,
  frontMaterial,
];

const mirrorPositions = [
  [-distance, 0, 0],
  [distance, 0, 0],
  [0, -distance, 0],
  [0, distance, 0],
  [0, 0, -distance],
  [0, 0, distance],
];

const mirrorFaces = [];
for (let i = 0; i < 6; i++) {
  const mirror = new THREE.Group();
  for (let j = 0; j < 9; j++) {
    const face = new THREE.Group();
    const bgMesh = new THREE.Mesh(mirrorFace, backGroundMaterial);
    const colorMesh = new THREE.Mesh(colorFace, colorMaterials[i]);
    face.position.x = (j % 3) - 1;
    face.position.y = (j - (j % 3)) / 3 - 1;
    colorMesh.position.z += 0.01;
    face.add(bgMesh, colorMesh);
    mirror.add(face);
    mirrorFaces.push(face);
  }
  mirror.position.set(...mirrorPositions[i]);
  mirror.lookAt(0, 0, 0);
  scene.add(mirror);
}

mirrorFaces.map((m) => scene.attach(m));

let isAnimate = false;
let general = { animationDuration: 0.3 };
window.addEventListener("keydown", (e) => {
  if (isAnimate) return;

  let key;
  if (e.shiftKey) {
    key = shiftKeysBinding.get(e.code);
  } else if (e.ctrlKey) {
    key = ctrlKeysBinding.get(e.code);
  } else {
    key = keysBinding.get(e.code);
  }

  if (!key) return;

  const group = new THREE.Group();
  scene.add(group);
  const movement = movements.get(key);
  const haveToRotate = [...cubes, ...mirrorFaces].filter((cube) =>
    movement.cubesNeedRotation(cube.position, distance)
  );

  haveToRotate.map((cube) => group.attach(cube));

  gsap.to(group.rotation, {
    duration: general.animationDuration,
    ...movement.rotation(group.rotation),
    onStart: () => {
      isAnimate = true;
    },
    onComplete: () => {
      haveToRotate.map((cube) => scene.attach(cube));
      isAnimate = false;
    },
  });
});

// Camera
const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height);
camera.position.set(5, 5, 5);
scene.add(camera);

// Controls
const canvas = document.querySelector("canvas.webgl");
const controls = new OrbitControls(camera, canvas);

controls.enablePan = false;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0xffffff);

// Animations
function tick() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

tick();
