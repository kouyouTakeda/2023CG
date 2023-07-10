import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  1,
  1000000
);
camera.position.set(5, 10, 15);

const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const animate = () => {
  rotationPlanet();

  renderer.render(scene, camera);
  mixer.update(0.01);
  // controls.update();
  requestAnimationFrame(animate);
};

const rotationPlanet = () => {
  mercury.rotation.y += 0.001;
  venus.rotation.y += 0.001;
  earth.rotation.y += 0.01;
  mars.rotation.y += 0.001;
  jupiter.rotation.y += 0.001;
  saturnGroup.rotation.y += 0.001;
  uranus.rotation.y += 0.001;
  neptune.rotation.y += 0.001;
  sun.rotation.y += 0.001;
  moon.rotation.y += 0.001;

  theta.mercury += 0.1;
  theta.venus += 0.2;
  theta.earth += 0.3;
  theta.mars += 0.4;
  theta.jupiter += 0.5;
  theta.saturn += 0.6;
  theta.uranus += 0.7;
  theta.neptune += 0.9;
  theta.moon + 0.31;

  mercury.position.x =
    Math.cos(THREE.MathUtils.degToRad(theta.mercury)) * (100 + sunSize);
  mercury.position.z =
    Math.sin(THREE.MathUtils.degToRad(theta.mercury)) * (100 + sunSize);

  venus.position.x =
    Math.cos(THREE.MathUtils.degToRad(theta.venus)) * (200 + sunSize);
  venus.position.z =
    Math.sin(THREE.MathUtils.degToRad(theta.venus)) * (200 + sunSize);

  earth.position.x =
    Math.cos(THREE.MathUtils.degToRad(theta.earth)) * (300 + sunSize);
  earth.position.z =
    Math.sin(THREE.MathUtils.degToRad(theta.earth)) * (300 + sunSize);

  mars.position.x =
    Math.cos(THREE.MathUtils.degToRad(theta.mars)) * (400 + sunSize);
  mars.position.z =
    Math.sin(THREE.MathUtils.degToRad(theta.mars)) * (400 + sunSize);

  jupiter.position.x =
    Math.cos(THREE.MathUtils.degToRad(theta.jupiter)) * (500 + sunSize);
  jupiter.position.z =
    Math.sin(THREE.MathUtils.degToRad(theta.jupiter)) * (500 + sunSize);

  saturnGroup.position.x =
    Math.cos(THREE.MathUtils.degToRad(theta.saturn)) * (600 + sunSize);
  saturnGroup.position.z =
    Math.sin(THREE.MathUtils.degToRad(theta.saturn)) * (600 + sunSize);

  uranus.position.x =
    Math.cos(THREE.MathUtils.degToRad(theta.uranus)) * (700 + sunSize);
  uranus.position.z =
    Math.sin(THREE.MathUtils.degToRad(theta.uranus)) * (700 + sunSize);

  neptune.position.x =
    Math.cos(THREE.MathUtils.degToRad(theta.neptune)) * (800 + sunSize);
  neptune.position.z =
    Math.sin(THREE.MathUtils.degToRad(theta.neptune)) * (800 + sunSize);

  moon.position.x =
    earth.position.x + Math.cos(THREE.MathUtils.degToRad(theta.moon)) * 10;
  moon.position.z =
    earth.position.z + Math.sin(THREE.MathUtils.degToRad(theta.moon)) * 10;
};
const theta = {
  mercury: 0,
  venus: 0,
  earth: 0,
  mars: 0,
  jupiter: 0,
  saturn: 0,
  uranus: 0,
  neptune: 0,
  sun: 0,
  moon: 0,
};

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

// const controls = new OrbitControls(camera, renderer.domElement);

// 起動時処理
window.addEventListener("DOMContentLoaded", animate);
window.addEventListener("resize", onWindowResize);

// ライト
// const ambientLight = new THREE.AmbientLight(0xffffff);
// scene.add(ambientLight);
const spotLight = new THREE.PointLight(0xffffff, 2, 1000, 1.0);
scene.add(spotLight);

const loader = new THREE.TextureLoader();

// 地球を基準にサイズを決める
// 水星1/3, 金星1/3, 地球1, 火星1/2, 木星11, 土星9, 天王星4, 海王星3.9, 太陽109, 月1/4
// 天文単位 earhSize * 11759
// 水星0.387, 金星0.723, 地球1, 火星1.52, 木星5.20, 土星9.55, 天王星19.2, 海王星30, 太陽1, 月0.00256954
const earthSize = 5;
const sunSize = earthSize * 30;
const astronomicalUnit = (earthSize * 11759) / 100;
const textureUrlMercury = new URL(
  "/images/solarSystem/2k_mercury.jpg",
  import.meta.url
).href;
const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(earthSize / 3),
  new THREE.MeshStandardMaterial({ map: loader.load(textureUrlMercury) })
);
mercury.position.set(0, 0, 100 + sunSize);
scene.add(mercury);

const textureUrlVenus = new URL(
  "/images/solarSystem/2k_venus_surface.jpg",
  import.meta.url
);
const venus = new THREE.Mesh(
  new THREE.SphereGeometry(earthSize / 3),
  new THREE.MeshStandardMaterial({ map: loader.load(textureUrlVenus) })
);
venus.position.set(0, 0, 200 + sunSize);
scene.add(venus);

const textureUrlEarth = new URL(
  "/images/solarSystem/2k_earth_daymap.jpg",
  import.meta.url
);
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(earthSize),
  new THREE.MeshStandardMaterial({ map: loader.load(textureUrlEarth) })
);
earth.position.set(0, 0, 300 + sunSize);
scene.add(earth);

const textureUrlMars = new URL(
  "/images/solarSystem/2k_mars.jpg",
  import.meta.url
);
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(earthSize / 2),
  new THREE.MeshStandardMaterial({ map: loader.load(textureUrlMars) })
);
mars.position.set(0, 0, 400 + sunSize);
scene.add(mars);

const textureUrlJupiter = new URL(
  "/images/solarSystem/2k_jupiter.jpg",
  import.meta.url
);
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(earthSize * 11),
  new THREE.MeshStandardMaterial({ map: loader.load(textureUrlJupiter) })
);
jupiter.position.set(0, 0, 500 + sunSize);
scene.add(jupiter);

const textureUrlSaturn = new URL(
  "/images/solarSystem/2k_saturn.jpg",
  import.meta.url
);
const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(earthSize * 9),
  new THREE.MeshStandardMaterial({ map: loader.load(textureUrlSaturn) })
);
saturn.position.set(0, 0, 0);
// 土星リング
const textureUrlSaturnRing = new URL(
  "/images/solarSystem/2k_saturn_ring_alpha.png",
  import.meta.url
);
const saturnRing = new THREE.Mesh(
  new THREE.RingGeometry(earthSize * 10, earthSize * 13, 32), // earthseize * 9 * 1.5
  new THREE.MeshStandardMaterial({ map: loader.load(textureUrlSaturnRing) })
);
saturnRing.position.set(0, 0, 0);
saturnRing.rotation.x = -Math.PI / 2;
const saturnGroup = new THREE.Group();
saturnGroup.add(saturn, saturnRing);
saturnGroup.position.set(0, 0, 600 + sunSize); // astronomicalUnit * 9.55);
scene.add(saturnGroup);

const textureUrlUranus = new URL(
  "/images/solarSystem/2k_uranus.jpg",
  import.meta.url
);
const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(earthSize * 4),
  new THREE.MeshStandardMaterial({ map: loader.load(textureUrlUranus) })
);
uranus.position.set(0, 0, 700 + sunSize);
scene.add(uranus);

const textureUrlNeptune = new URL(
  "/images/solarSystem/2k_neptune.jpg",
  import.meta.url
);
const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(earthSize * 3.9),
  new THREE.MeshStandardMaterial({ map: loader.load(textureUrlNeptune) })
);
neptune.position.set(0, 0, 800 + sunSize);
scene.add(neptune);

const textureUrlSun = new URL(
  "/images/solarSystem/2k_sun.jpg",
  import.meta.url
);
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(sunSize),
  new THREE.MeshBasicMaterial({ map: loader.load(textureUrlSun) })
);
sun.position.set(0, 0, 0);
scene.add(sun);

const textureUrlMoon = new URL(
  "/images/solarSystem/2k_moon.jpg",
  import.meta.url
);
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(earthSize / 4),
  new THREE.MeshStandardMaterial({ map: loader.load(textureUrlMoon) })
);
moon.position.set(0, 0, 310 + sunSize);
scene.add(moon);

// パーティクル（星）
// 頂点座標
const vertices = [];
const colors = [];
for (let i = 0; i < 3000; i++) {
  const x = 2000 * (Math.random() - 0.5);
  const y = 2000 * (Math.random() - 0.5);
  const z = 2000 * (Math.random() - 0.5);

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

// アニメーション(key frame)
const positionKeyframe = {
  name: ".position",
  type: "vector",
  times: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 19],
  values: [
    30, 250, 200, 50, 200, 300, 30, 200, 400, 0, 200, 500, -30, 200, 600, -50,
    200, 700, -30, 200, 800, 0, 200, 900, 30, 250, 200, 30, 250, -200, 50, 200,
    -300, 30, 200, -400, 0, 200, -500, -30, 200, -600, -50, 200, -700, -30, 200,
    -800, 0, 200, -900, 30, 250, -200,
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

// helper
// const axesHelper = new THREE.AxesHelper(100, 100, 900);
// scene.add(axesHelper);
