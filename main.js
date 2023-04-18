import * as THREE from 'three';
import {TextGeometry} from 'three/addons/geometries/TextGeometry.js';
import {FontLoader} from "three/addons/loaders/FontLoader.js";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

// scene, camera, renderer
const scene = new THREE.Scene();
const url = 'https://source.unsplash.com/1080x1080/?{night sky texture}';
scene.background = new THREE.CubeTextureLoader().load([url, url, url, url, url, url]);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// cube
// const controls = new OrbitControls(camera, renderer.domElement);
const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: new THREE.TextureLoader().load('https://source.unsplash.com/1080x1080/?{metal texture}')
}));
cube.position.x = -5;
;
const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: new THREE.TextureLoader().load('https://source.unsplash.com/1080x1080/?{wood texture}')
}));
cube1.position.x = 5;
scene.add(cube, cube1);

// light
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, 10, 5);
scene.add(pointLight);
camera.position.z = 5;

document.querySelector('#cubeMuter').addEventListener('click', cubeMuterMuter);

function cubeMuterMuter() {
    camera.position.z += 2;
    setInterval(() => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cube1.rotation.x += 0.01;
        cube1.rotation.y += 0.01;
    }, 1);
}

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    cube.rotation.y = t * -0.001;
    cube.rotation.x = t * -0.001;

    cube1.rotation.y = t * 0.001;
    cube1.rotation.x = t * 0.001;

    // camera.position.z = t * -0.01;
    // camera.position.x = t * -0.0002;
    // camera.position.y = t * -0.0002;
    if (t < 2 * -window.innerHeight) {
        camera.rotation.z += 0.01;
    }
}

document.body.onscroll = moveCamera;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();