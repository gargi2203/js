import * as THREE from 'three';
import './style.css'
import bg from './bg.jpg'

const container = document.querySelector('.three_bg')
const loader = new THREE.TextureLoader();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70,window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const geometry = new THREE.PlaneGeometry(14, 8, 15, 9);
const material = new THREE.MeshBasicMaterial({
    map: loader.load(bg),
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
camera.position.z = 5;

const count = geometry.attributes.position.count;
const clock = new THREE.Clock();

let mouseX = 0;
let mouseY = 0;

function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 0.5;
    mouseY = (event.clientY / window.innerHeight) * 2 - 0.5;
}

function onTouchMove(event) {
    mouseX = (event.touches[0].clientX / window.innerWidth) * 2 - 0.5;
    mouseY = (event.touches[0].clientY / window.innerHeight) * 2 - 0.5;
}

window.addEventListener('mousemove', onMouseMove);
window.addEventListener('touchmove', onTouchMove);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);


function animate(){
    const time = clock.getElapsedTime();
    for(let i=0; i < count; i++){
        const x = geometry.attributes.position.getX(i);
        const y = geometry.attributes.position.getY(i);

        if (x <= -7 || x >= 7 || y <= -4 || y >= 4) {
            continue; 
        }

        const mouseEffect = 0.1 * Math.sin((x - mouseX * 10) * 1 + (y - mouseY * 10) * 1);

        geometry.attributes.position.setZ(i,mouseEffect);
        
    }
    geometry.computeVertexNormals();
    geometry.attributes.position.needsUpdate = true;

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();