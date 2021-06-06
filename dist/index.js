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

// Test Object1
const myGeometry = new THREE.TorusGeometry(5,0.5,5,5);
//const myMaterial = new THREE.MeshBasicMaterial({color:0xFF6347, wireframe: true});
const myMaterial = new THREE.MeshStandardMaterial({color:0x77B900});
const myPenta = new THREE.Mesh(myGeometry, myMaterial);
scene.add(myPenta)
myPenta.rotation.y = -1.3;
myPenta.position.z = -30;
myPenta.position.x = -15;

// Test Object2
const myMaterial2 = new THREE.MeshStandardMaterial({color:0x9957ff});
const myPenta2 = new THREE.Mesh(myGeometry, myMaterial2);
scene.add(myPenta2)
myPenta2.rotation.y = -1.3;
myPenta2.position.z = -30;
myPenta2.position.x = -15;


// 점 광원
const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(5,5,5);
scene.add(pointLight);

// 주변 광원
const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(ambientLight);

// 헬퍼
/*
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper, gridHelper);
*/

// 컨트롤
const controls = new OrbitControls(camera, renderer.domElement);

// 별 추가
function addStar(){
    const geometry = new THREE.SphereGeometry(0.3, 25,25);

    let tempRandVal = 1;
    tempRandVal = Math.floor(Math.random() * 9); 
    let tempColorVal = 0xffffff;
    
    switch(tempRandVal) {
        case 0:
            tempColorVal = 0xCDDAEF;
            break;
        case 1:
            tempColorVal = 0xD39E6F;
            break;
        case 2:
            tempColorVal = 0xCDBFA8;
            break;
        case 3:
            tempColorVal = 0xFFFDF3;
            break;
        case 4:
            tempColorVal = 0xE6AF39;
            break;
        case 5:
            tempColorVal = 0xC23B47;
            break;

        default:
          // code block
      }
    const material = new THREE.MeshStandardMaterial( {color: tempColorVal} )
    const star = new THREE.Mesh( geometry, material );

    const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));
    star.position.set(x,y,z);
    scene.add(star)
}

Array(400).fill().forEach(addStar)

// 배경 
const spaceTexture = new THREE.TextureLoader().load('images/galaxy/galaxy4.jpg');
scene.background = spaceTexture;

// 박스
const songKimTexture = new THREE.TextureLoader().load('images/image.png');
const songKim = new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial({ map: songKimTexture})
);
scene.add(songKim);

// 행성 추가
const earthTexture = new THREE.TextureLoader().load('images/planets/earth.jpg')
const normalTexture = new THREE.TextureLoader().load('images/planets/earth.jpg')

const earth = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial(
        {
            map: earthTexture,
            normalMap: normalTexture
        }
    )
);
scene.add(earth);

// 한국 국기 별
const koreaTexture = new THREE.TextureLoader().load('images/flag/korea.jpg')
const koreaSurfaceTexture = new THREE.TextureLoader().load('images/flag/korea.jpg')

const korea = new THREE.Mesh(
    new THREE.SphereGeometry(4, 32, 32),
    new THREE.MeshStandardMaterial(
        {
            map: koreaTexture,
            normalMap: koreaSurfaceTexture
        }
    )
);
scene.add(korea);
korea.rotation.y = -1.3;
korea.position.z = -30;
korea.position.x = -15;

// 애니메이션
let degreeVal = 0;
function animate(){
    requestAnimationFrame( animate );

    myPenta.rotation.x += 0.01;
    myPenta.rotation.y += 0.005;
    myPenta.rotation.z += 0.01;

    myPenta2.rotation.x -= 0.01;
    myPenta2.rotation.y -= 0.005;
    myPenta2.rotation.z -= 0.01;

    earth.rotation.x += 0;
    earth.rotation.y += 0.01;
    earth.rotation.z += 0;

    if(degreeVal > 6.28318)
    {
        degreeVal = 0;
    }
    korea.position.x = 30 * Math.sin(degreeVal);
    korea.position.y = 30 * Math.cos(degreeVal);

    myPenta.position.x = 30 * Math.sin(degreeVal* 1.5);
    myPenta.position.y = 30 * Math.cos(degreeVal* 1.5);

    myPenta2.position.x = -30 * Math.sin(degreeVal);
    myPenta2.position.y = -30 * Math.cos(degreeVal);

    degreeVal += 0.01;

    controls.update();

    renderer.render(scene, camera);
}

animate();

// 초기 카메라 위치
let camPosX = camera.position.x
let camPosY = camera.position.y
let camPosZ = camera.position.z

let cnt = 0;
function moveCamera(){
    const t = document.body.getBoundingClientRect().top;
    korea.rotation.x += 0.01;
    korea.rotation.y += 0.1;
    korea.rotation.z += 0.01;

    ++cnt;
    console.log(cnt);
    songKim.position.y += 0.001 * cnt;

    camera.position.x = camPosX + t * -0.01;
    camera.position.y = camPosY + t * -0.0001;
    camera.position.z = camPosZ + t * -0.0001;

    // 배경 변화
    setBgbyNo(cnt);
    
    if(cnt == 1000)
    {
        cnt = 0;
    }
}

document.body.onscroll = moveCamera;


function setBgbyNo(cnt)
{
    if(cnt == 700)
    {
        setBg(4);
    }
    else if(cnt == 600)
    {
        setBg(6);
    }
    else if(cnt == 500)
    {
        setBg(5);
    }
    else if(cnt == 400)
    {
        setBg(4);
    }
    else if(cnt == 300)
    {
        setBg(3);
    }
    else if(cnt == 200)
    {
        setBg(2);
    }
    else if(cnt == 100)
    {
        setBg(1);
    }
    else{

    }
}

function setBg(myBgNo)
{
    const newSpaceTexture = new THREE.TextureLoader().load('images/galaxy/galaxy'+myBgNo+'.jpg');
    scene.background = newSpaceTexture;
}


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