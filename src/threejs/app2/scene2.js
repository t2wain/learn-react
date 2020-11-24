import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";

let isInit = false,
  scene = null,
  renderer = null,
  camera = null,
  orbitControls = null,
  sceneSubjects = [],
  width = 0,
  height = 0;

function buildRender() {
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x202020);
  renderer.setSize(width, height);
}

function buildCamera() {
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 0;
}

function createSceneSubjects() {
  createAmbientLight(scene);
  loadObject(scene);
  createOrbitalControl();
}

//#region subjects

function createAmbientLight(scene) {
  var ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);
}

function createOrbitalControl() {
  orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.autoRotate = false;
}

function loadObject(scene) {
  const mtlLoader = new MTLLoader();
  mtlLoader.setPath("data/assets/models/");
  const url = "CARDS-ALL-LV-RACK2.obj.mtl";
  mtlLoader.load(url, function (materials) {
    materials.preload();
    materials.getAsArray().forEach((m) => {
      m.transparent = true;
      m.opacity = 0.3;
    });
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath("data/assets/models/");
    objLoader.load("CARDS-ALL-LV-RACK2.obj", function (object) {
      scene.add(object);
      let m1 = object.children[1];
      zoomExtent(m1);
    });
  });
}

function zoomExtent(mesh) {
  let g1 = mesh.geometry;
  g1.computeBoundingBox();
  let b = g1.boundingBox;
  let min = b.min;
  let max = b.max;
  let c = b.getCenter();
  camera.position.x = c.x;
  camera.position.y = c.y;
  camera.position.z = c.z + 100;
  camera.lookAt(c);
  orbitControls.target = c;
  orbitControls.update();
}

//#endregion

//#region export

export function buildScene(w, h) {
  width = w;
  height = h;
  if (!isInit) {
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
