import {OrbitControls} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const textureLoader = new THREE.TextureLoader()
const myTexture = textureLoader.load('image.png')

// Sizes
const sizes = {
    width:window.innerWidth,
    height:window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,100)

// Render
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
})
renderer.setPixelRatio(Math.min(window.devicePixelRatio))
renderer.setSize(sizes.width,sizes.height)
camera.position.setZ(30);

// Test Object
const myGeometry = new THREE.TorusGeometry(10,3,16,100);
//const myMaterial = new THREE.MeshBasicMaterial({color:0xFF6347, wireframe: true});
const myMaterial = new THREE.MeshStandardMaterial({color:0x77B900});
const myTorus = new THREE.Mesh(myGeometry, myMaterial);
scene.add(myTorus)

// 점 광원
const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(5,5,5);
scene.add(pointLight);

// 주변 광원
const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper, gridHelper);


function animate(){
    requestAnimationFrame( animate );

    myTorus.rotation.x += 0.01;
    myTorus.rotation.y += 0.005;
    myTorus.rotation.z += 0.01;

    renderer.render(scene, camera);
}

animate();


/*
// Object
const geometry = new THREE.BoxGeometry(1,1,1)
const geometry2 = new THREE.DodecahedronGeometry(0.5,3)
const material = new THREE.MeshBasicMaterial({
    map: myTexture
})
const boxMesh = new THREE.Mesh(geometry,material)
const sphereMesh = new THREE.Mesh(geometry2,material)
scene.add(boxMesh)
// scene.add(sphereMesh)
boxMesh.position.x = 0
boxMesh.position.y = 0.8
sphereMesh.position.x = -1.6
sphereMesh.position.y = 0.5
geometry.center()
// Sizes
const sizes = {
    width:window.innerWidth,
    height:window.innerHeight
}

// Renderer gets updated each time window is resized
window.addEventListener('resize',()=>{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width,sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
    
})

// Camera
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)

controls.enableZoom = false;
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
})
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    boxMesh.rotateX(30*0.0003)
    boxMesh.rotateY(30*0.0003)
    sphereMesh.rotateY(30*0.0003)
    // mesh.position.y = Math.sin(elapsedTime) *0.1
    boxMesh.position.z = Math.sin(elapsedTime) * 1

    controls.update()
    controls.enableDamping = true
    renderer.render(scene,camera)
    window.requestAnimationFrame(tick)
};

tick();
*/