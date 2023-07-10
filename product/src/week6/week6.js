import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

// シーンの作成
const scene = new THREE.Scene();

// カメラの作成
const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(2, 5, 15);

// レンダラー
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// 影づけ
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// カメラのコントロール
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// ライト
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(100, 100, 100);
// 影を有効
directionalLight.castShadow = true;
scene.add(directionalLight);
// const helper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(helper);

// const ambientLight = new THREE.AmbientLight(0xffffff);
// scene.add(ambientLight);

// 球体
const sphereGeometry = new THREE.SphereGeometry(5, 32, 16);
const textureUrl = new URL(
  "/texture/brick_wall_001_4k.blend/textures/brick_wall_001_diffuse_4k.jpg",
  import.meta.url
).href;
const texture = new THREE.TextureLoader().load(textureUrl);
const sphereMaterial = new THREE.MeshStandardMaterial({ map: texture });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true;
sphere.position.set(0, 10, -5);
scene.add(sphere);

// 床
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1000, 1000),
  new THREE.MeshStandardMaterial({ color: 0x000000 })
);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;
scene.add(plane);

// パーティクル（星）
// 頂点座標
const vertices = [];
const colors = [];
for (let i = 0; i < 3000; i++) {
  const x = 1000 * (Math.random() - 0.5);
  const y = 500 * Math.random();
  const z = 1000 * (Math.random() - 0.5);

  // color 0〜1
  colors.push(Math.random(), Math.random(), Math.random());
  vertices.push(x, y, z);
}
const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(vertices, 3)
);
particlesGeometry.setAttribute(
  "color",
  new THREE.Float32BufferAttribute(colors, 3)
);
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.5,
  vertexColors: true,
});
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// 3DModel
const loader = new FBXLoader();
const carUrl = new URL(
  "/3dModel/Jeep_Renegade_2016_fbx/Jeep_Renegade_2016.fbx",
  import.meta.url
).href;
loader.load(carUrl, function (object) {
  object.traverse(function (child) {
    if (child.isMesh) {
      const carTexture = new URL(
        "/3dModel/Jeep_Renegade_2016_fbx/Jeep_Renegade_2016/car_jeep_ren.jpg",
        import.meta.url
      ).href;
      new THREE.TextureLoader().load(carTexture, (texture) => {
        child.material.map = texture;
        child.material.needsupdate = true;
      });
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  object.scale.set(2, 2, 2);
  scene.add(object);
});

// アニメーション
const animate = () => {
  // 回転
  sphere.rotation.y += 0.005;

  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};

// サイズの変更
const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener("DOMContentLoaded", animate);
window.addEventListener("resize", onWindowResize);

// helper
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);
