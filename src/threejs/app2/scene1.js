import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let isInit = false,
  enableShadow = true,
  scene = null,
  renderer = null,
  camera = null,
  sceneSubjects = null,
  clock = null,
  width = 0,
  height = 0;

function buildRender() {
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xeeeeee);
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = enableShadow;
}

function buildCamera() {
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
}

function createSceneSubjects() {
  sceneSubjects = [
    createSpotLight(scene),
    createPlane(scene),
    createBall(scene),
    createBox(scene),
    createOrbitalControl(),
  ];
}

//#region subjects

function createSpotLight(scene) {
  let spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = enableShadow;
  spotLight.shadow.mapSize.width = 2048;
  spotLight.shadow.mapSize.height = 2048;
  scene.add(spotLight);

  return {
    update: () => {},
  };
}

function createPlane(scene) {
  let planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
  let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
  let plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = enableShadow;
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;
  scene.add(plane);

  return {
    update: () => {},
  };
}

function createBall(scene) {
  let sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  let sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
  let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.castShadow = enableShadow;
  sphere.position.x = 20;
  sphere.position.y = 4;
  sphere.position.z = 2;
  scene.add(sphere);

  let step = 0;
  function update() {
    step += 0.04;
    sphere.position.x = 20 + 10 * Math.cos(step);
    sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));
  }
  return {
    update,
  };
}

function createBox(scene) {
  let cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
  let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = enableShadow;
  cube.position.x = -4;
  cube.position.y = 3;
  cube.position.z = 0;
  scene.add(cube);

  function update() {
    cube.rotation.x += 0.02;
    cube.rotation.y += 0.02;
    cube.rotation.z += 0.02;
  }
  return {
    update,
  };
}

function createOrbitalControl() {
  let orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.autoRotate = true;

  function update() {
    let delta = clock.getDelta();
    orbitControls.update(delta);
  }
  return {
    update,
  };
}

//#endregion

//#region export

export function buildScene(w, h) {
  width = w;
  height = h;
  if (!isInit) {
    clock = new THREE.Clock();
    scene = new THREE.Scene();
    buildRender();
    buildCamera();
    createSceneSubjects();
    camera.lookAt(scene.position);
    isInit = true;
  } else {
    onWindowResize(w, h);
  }
  return renderer.domElement;
}

export function update() {
  for (let i = 0; i < sceneSubjects.length; i++) {
    sceneSubjects[i].update();
  }
  renderer.render(scene, camera);
}

export function onWindowResize(w, h) {
  width = w;
  height = h;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

//#endregion
