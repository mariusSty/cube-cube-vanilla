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

// Objects
const box = new RoundedBoxGeometry(1, 1, 1, 10, 0.1);
const rightMaterial = new THREE.MeshStandardMaterial({ color: "red" });
const leftMaterial = new THREE.MeshStandardMaterial({ color: "orange" });
const upMaterial = new THREE.MeshStandardMaterial({ color: "white" });
const downMaterial = new THREE.MeshStandardMaterial({ color: "yellow" });
const frontMaterial = new THREE.MeshStandardMaterial({ color: "limegreen" });
const backMaterial = new THREE.MeshStandardMaterial({ color: "blue" });

const cubes = [];
for (let i = 0; i < 27; i++) {
  const mesh = new THREE.Mesh(box, [
    rightMaterial,
    leftMaterial,
    upMaterial,
    downMaterial,
    frontMaterial,
    backMaterial,
  ]);
  mesh.position.set(...(i >>> 0).toString(3).padStart(3, "0"));
  mesh.position.x -= 1;
  mesh.position.y -= 1;
  mesh.position.z -= 1;
  cubes.push(mesh);
  scene.add(mesh);
}

let isAnimate = false;
let general = { animationDuration: 0.3 };
window.addEventListener("keydown", (e) => {
  if (isAnimate) return;

  const group = new THREE.Group();
  scene.add(group);

  let key;
  if (e.shiftKey) {
    key = shiftKeysBinding.get(e.code);
  } else if (e.ctrlKey) {
    key = ctrlKeysBinding.get(e.code);
  } else {
    key = keysBinding.get(e.code);
  }

  if (!key) return;
  const movement = movements.get(key);
  const haveToRotate = cubes.filter((cube) =>
    movement.cubesNeedRotation(cube.position)
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

// Lights
const ambientLight = new THREE.AmbientLight("white", 0.5);
scene.add(ambientLight);

const directionLight = new THREE.DirectionalLight("white", 0.7);
directionLight.position.set(0.5, 1, 1);
scene.add(directionLight);

// Camera
const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height);
camera.position.set(5, 5, 5);
scene.add(camera);

// Controls
const canvas = document.querySelector("canvas.webgl");
const controls = new OrbitControls(camera, canvas);

controls.enablePan = false;
controls.enableZoom = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x00002b);

// Animations
function tick() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

tick();
