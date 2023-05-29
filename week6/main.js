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
document.body.appendChild(renderer.domElement);

// カメラのコントロール
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// ライト
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(5, 100, 100);
scene.add(directionalLight);
// const helper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(helper);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// 球体
const sphereGeometry = new THREE.SphereGeometry(5, 32, 16);
const textureUrl = new URL(
  "./texture/brick_wall_001_4k.blend/textures/brick_wall_001_diffuse_4k.jpg",
  import.meta.url
).href;
const texture = new THREE.TextureLoader().load(
  "/texture/brick_wall_001_4k.blend/textures/brick_wall_001_diffuse_4k.jpg"
);
const sphereMaterial = new THREE.MeshBasicMaterial({ map: texture });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, 10, -5);
scene.add(sphere);

const sphereMaterial2 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const sphere2 = new THREE.Mesh(sphereGeometry, sphereMaterial2);
sphere2.position.set(10, 10, -5);
scene.add(sphere2);

const sphere3 = new THREE.Mesh(sphereGeometry, sphereMaterial2);
sphere3.position.set(-10, -10, -5);
scene.add(sphere3);

// 3DModel
const loader = new FBXLoader();
loader.load(
  "/3dModel/Jeep_Renegade_2016_fbx/Jeep_Renegade_2016.fbx",
  function (object) {
    object.traverse(function (child) {
      if (child.isMesh) {
        new THREE.TextureLoader().load(
          "/3dModel/Jeep_Renegade_2016_fbx/Jeep_Renegade_2016/car_jeep_ren.jpg",
          (texture) => {
            child.material.map = texture;
            child.material.needsupdate = true;
          }
        );
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    object.scale.set(2, 2, 2);
    scene.add(object);
  }
);

// アニメーション
const animate = () => {
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
