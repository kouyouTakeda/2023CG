import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(5, 10, 15);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
// renderer.setClearColor(0xeeeeff);
document.body.appendChild(renderer.domElement);

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.update();

// let rot = 0; // 角度
// let rotY = 0; // 0 < rotY < 180

const animate = () => {
  boyGroup.rotation.y += 0.005;
  // rot += 0.2;
  // rotY = rot % 180;

  // // ラジアンに変換する
  // const radian = (rot * Math.PI) / 180;
  // const radianY = (rotY * Math.PI) / 180;
  // camera.position.x = 10 * Math.sin(radian);
  // camera.position.z = 10 * Math.cos(radian);
  // camera.position.y = 15 * Math.sin(radianY);

  // 原点方向を見つめる
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // アニメーション
  mixer.update(0.01);

  requestAnimationFrame(animate);
  // controls.update();
  renderer.render(scene, camera);
};

// サイズの可変
const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

// 起動時処理
window.addEventListener("DOMContentLoaded", animate);
window.addEventListener("resize", onWindowResize);

// 主な処理
const textureLoader = new THREE.TextureLoader();

// ライト
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// ひまわりの作成 billboard
const urlSunflower = new URL("/images/ひまわり.png", import.meta.url).href;
const textureSunflower = textureLoader.load(urlSunflower);
const materialSunflower = new THREE.SpriteMaterial({ map: textureSunflower });

// -15 < r < 15
for (let i = 0; i < 300; i++) {
  const sunflower = new THREE.Sprite(materialSunflower);
  const r = (Math.random() - 0.5) * 30;
  const sita = Math.random() * 360;
  sunflower.position.x = r * Math.cos(sita);
  sunflower.position.z = r * Math.sin(sita);
  sunflower.position.y = 0.5;
  sunflower.scale.set(1.5, 1.5, 1.5);
  scene.add(sunflower);
}

// -75 < r < -25, 25 < r < 75
for (let i = 0; i < 1000; i++) {
  const sunflower = new THREE.Sprite(materialSunflower);
  let r = (Math.random() - 0.5) * 100;
  r > 0 ? (r += 25) : (r -= 25);
  const sita = Math.random() * 360;
  sunflower.position.x = r * Math.cos(sita);
  sunflower.position.z = r * Math.sin(sita);
  sunflower.position.y = 4; //1
  sunflower.scale.set(10, 10, 10); //3
  scene.add(sunflower);
}

// 人間
const boyGroup = new THREE.Group();

const urlBoy = new URL("/images/男の子.png", import.meta.url).href;
const textureBoy = textureLoader.load(urlBoy);
const materialBoy = new THREE.SpriteMaterial({ map: textureBoy });
// -22.5 < r < -15, 15 < r < 22.5
for (let i = 0; i < 10; i++) {
  const boy = new THREE.Sprite(materialBoy);
  let r = (Math.random() - 0.5) * 15;
  r > 0 ? (r += 15) : (r -= 15);
  const sita = Math.random() * 360;
  boy.position.x = r * Math.cos(sita);
  boy.position.z = r * Math.sin(sita);
  boy.position.y = 2;
  boy.scale.set(5, 5, 5);

  boyGroup.add(boy);
  // scene.add(boy);
}
scene.add(boyGroup);

// アニメーション(key frame)
const positionKeyframe = {
  name: ".position",
  type: "vector",
  times: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  values: [
    15, 5, 15, 0, 10, 20, -15, 20, 15, -20, 30, 0, -15, 60, -15, 0, 30, -20, 15,
    20, -15, 20, 10, 0, 15, 5, 15,
  ],
};
const cilpJson = {
  duration: 8,
  tracks: [positionKeyframe],
};
const clip = THREE.AnimationClip.parse(cilpJson);
// アニメーションさせたいメッシュをミキサーに入れる
const mixer = new THREE.AnimationMixer(camera);
const action = mixer.clipAction(clip);
action.play();

//helper
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);
// const axesHelper = new THREE.AxesHelper(200, 50);
// scene.add(axesHelper);
