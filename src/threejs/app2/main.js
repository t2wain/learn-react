import * as scene1 from "./scene2";

let scene = null,
  animationId = null;

function bindEventListener() {
  window.addEventListener("resize", onResize, false);
}

function cleanUp() {
  window.removeEventListener("resize", onResize);
}

function onResize() {
  let { innerWidth: width, innerHeight: height } = window;
  scene.onWindowResize(width, height);
}

function render() {
  try {
    scene.update();
  } catch {
    cancelAnimationFrame(animationId);
    return;
  }
  animationId = requestAnimationFrame(render);
}

export function toggleAnimation() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  } else render();
}

export function init(mount) {
  scene = scene1;
  let { innerWidth: w, innerHeight: h } = window;
  let domEl = scene.buildScene(w, h);
  mount.appendChild(domEl);
  bindEventListener();
  render();
  return cleanUp;
}
