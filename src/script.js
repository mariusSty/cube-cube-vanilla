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
const rightMaterial = new THREE.MeshBasicMaterial({ color: "red" });
const leftMaterial = new THREE.MeshBasicMaterial({ color: "orange" });
const upMaterial = new THREE.MeshBasicMaterial({ color: "white" });
const downMaterial = new THREE.MeshBasicMaterial({ color: "yellow" });
const frontMaterial = new THREE.MeshBasicMaterial({ color: "limegreen" });
const backMaterial = new THREE.MeshBasicMaterial({ color: "blue" });
const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
const face = new THREE.PlaneGeometry(0.8, 0.8);
const mirrorFace = new THREE.PlaneGeometry(1, 1);
const cubes = [];

for (let i = 0; i < 27; i++) {
  const cube = new THREE.Group();
  const mesh = new THREE.Mesh(box, material);
  const rightMesh = new THREE.Mesh(face, rightMaterial);
  const leftMesh = new THREE.Mesh(face, leftMaterial);
  const upMesh = new THREE.Mesh(face, upMaterial);
  const downMesh = new THREE.Mesh(face, downMaterial);
  const backMesh = new THREE.Mesh(face, backMaterial);
  const frontMesh = new THREE.Mesh(face, frontMaterial);
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

const rightMirror = new THREE.Group();
for (let i = 0; i < 9; i++) {
  const mirror = new THREE.Group();
  const mesh = new THREE.Mesh(mirrorFace, material);
  const rightMesh = new THREE.Mesh(face, rightMaterial);
  mirror.position.x = (i % 3) - 1;
  mirror.position.y = (i - (i % 3)) / 3 - 1;
  rightMesh.position.z += 0.01;
  mirror.add(mesh, rightMesh);
  rightMirror.add(mirror);
}
rightMirror.rotation.y -= Math.PI * 0.5;
rightMirror.position.x += 4;
scene.add(rightMirror);

const leftMirror = new THREE.Group();
for (let i = 0; i < 9; i++) {
  const mirror = new THREE.Group();
  const mesh = new THREE.Mesh(mirrorFace, material);
  const leftMesh = new THREE.Mesh(face, leftMaterial);
  mirror.position.x = (i % 3) - 1;
  mirror.position.y = (i - (i % 3)) / 3 - 1;
  leftMesh.position.z += 0.01;
  mirror.add(mesh, leftMesh);
  leftMirror.add(mirror);
}
leftMirror.rotation.y += Math.PI * 0.5;
leftMirror.position.x -= 4;
scene.add(leftMirror);

const frontMirror = new THREE.Group();
for (let i = 0; i < 9; i++) {
  const mirror = new THREE.Group();
  const mesh = new THREE.Mesh(mirrorFace, material);
  const frontMesh = new THREE.Mesh(face, frontMaterial);
  mirror.position.x = i % 3;
  mirror.position.y = (i - (i % 3)) / 3;
  frontMesh.position.z += 0.01;
  mirror.add(mesh, frontMesh);
  frontMirror.add(mirror);
}
frontMirror.rotation.x += Math.PI;
frontMirror.position.x -= 1;
frontMirror.position.y += 1;
frontMirror.position.z += 4;
scene.add(frontMirror);

const backMirror = new THREE.Group();
for (let i = 0; i < 9; i++) {
  const mirror = new THREE.Group();
  const mesh = new THREE.Mesh(mirrorFace, material);
  const backMesh = new THREE.Mesh(face, backMaterial);
  mirror.position.x = i % 3;
  mirror.position.y = (i - (i % 3)) / 3;
  backMesh.position.z += 0.01;
  mirror.add(mesh, backMesh);
  backMirror.add(mirror);
}

backMirror.position.x -= 1;
backMirror.position.y -= 1;
backMirror.position.z -= 4;
scene.add(backMirror);

const upMirror = new THREE.Group();
for (let i = 0; i < 9; i++) {
  const mirror = new THREE.Group();
  const mesh = new THREE.Mesh(mirrorFace, material);
  const upMesh = new THREE.Mesh(face, upMaterial);
  mirror.position.x = i % 3;
  mirror.position.y = (i - (i % 3)) / 3;
  upMesh.position.z += 0.01;
  mirror.add(mesh, upMesh);
  upMirror.add(mirror);
}

upMirror.rotation.x += Math.PI * 0.5;
upMirror.position.x -= 1;
upMirror.position.y += 4;
upMirror.position.z -= 1;
scene.add(upMirror);

const downMirror = new THREE.Group();
for (let i = 0; i < 9; i++) {
  const mirror = new THREE.Group();
  const mesh = new THREE.Mesh(mirrorFace, material);
  const downMesh = new THREE.Mesh(face, downMaterial);
  mirror.position.x = i % 3;
  mirror.position.y = (i - (i % 3)) / 3;
  downMesh.position.z += 0.01;
  mirror.add(mesh, downMesh);
  downMirror.add(mirror);
}

downMirror.rotation.x -= Math.PI * 0.5;
downMirror.position.x -= 1;
downMirror.position.y -= 4;
downMirror.position.z += 1;
scene.add(downMirror);

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
