//import {Plot} from './palazzo1.js';
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/loaders/FBXLoader.js';

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});
  renderer.setClearColor(0xAAAAAA);
  renderer.shadowMap.enabled = true;

  const fov = 75;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 10000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(-200, 0 , 200);

  // MUOVI A PIACIMENTO
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();
  

  //degree to radians
  function radians(degrees) {
    return degrees * Math.PI / 180;
  }
  



  const scene = new THREE.Scene();

  {
    const light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add( light );
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    directionalLight.position.set(0,10,10);
    scene.add( directionalLight );
  }

  /*
  var grounddepth =1
  const groundGeometry = new THREE.BoxGeometry(500, 500,grounddepth);
  const groundMaterial = new THREE.MeshPhongMaterial({color: 0xCC8866});
  const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
  groundMesh.rotation.x = Math.PI * -.5;
  
  groundMesh.receiveShadow = true;
  scene.add(groundMesh); 

  

  //STREET

  //streetMesh.rotation.z =  Math.PI * -.5;


const loader = new FBXLoader();

loader.load( './models/Silo.fbx', function ( Object3D ) {

Plot.add( Object3D );

}, undefined, function ( error ) {

	console.error( error );

} );
*/

/*const loader = new FBXLoader();
      loader.setPath('./models/');
      loader.load('Silo.fbx', (fbx) => {
        fbx.scale.setScalar(0.1);
        fbx.rotation.x = Math.PI*.5;
        fbx.position.set(0,0,grounddepth);
        Plot.add(fbx);
      })
*/


//##############HUMAN##############HUMAN##############HUMAN##############HUMAN##############HUMAN##############HUMAN##############

const human = new THREE.Object3D();
  
scene.add(human);

//-----------------------------
//------------WAIST------------
//-----------------------------
const radius =  12;  
const waist = new THREE.DodecahedronGeometry(radius);
const waistMaterial = new THREE.MeshPhongMaterial({color: 0xCC8866});
const waistMesh = new THREE.Mesh(waist, waistMaterial);
human.add(waistMesh);


//-----------------------------
//------------PHIPS------------
//-----------------------------
const hipsRadius =  6; 
const widthSegments = 30;  
const heightSegments = 30;  

const hips = new THREE.SphereGeometry(hipsRadius, widthSegments, heightSegments);
const hipsMaterial = new THREE.MeshPhongMaterial({color: 0xCC8866});
const hipsMesh = new THREE.Mesh(hips, hipsMaterial);
const hipsMesh2 = new THREE.Mesh(hips, hipsMaterial);
hipsMesh.position.set(radius-2,-radius/2,0);
hipsMesh2.position.set(-radius+2,-radius/2,0);
waistMesh.add(hipsMesh);
waistMesh.add(hipsMesh2);


//-----------------------------
//------------LEGS-------------
//-----------------------------
const radiusTop = 6;  
const radiusBottom = 3;  
const height = 30.0;  
const radialSegments = 11;  
const leg= new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
const legMaterial = new THREE.MeshPhongMaterial({color: 0xCC8866});
const legMesh = new THREE.Mesh(leg, legMaterial);
const legMesh2 = new THREE.Mesh(leg, legMaterial);

legMesh.position.set(0,-hipsRadius-height/2,0)
legMesh2.position.set(0,-hipsRadius-height/2,0)
hipsMesh.add(legMesh);
hipsMesh2.add(legMesh2);


//-----------------------------
//------------PKNEE------------
//-----------------------------
const kneeRadius =  3; 
const wKneeSegments = 30;  
const hKneeSegments = 30;  

const knee = new THREE.SphereGeometry(kneeRadius, wKneeSegments, hKneeSegments);
const kneeMaterial = new THREE.MeshPhongMaterial({color: 0xCC8866});
const kneeMesh = new THREE.Mesh(knee, kneeMaterial);
const kneeMesh2 = new THREE.Mesh(knee, kneeMaterial);
kneeMesh.position.set(0,-height/2-kneeRadius/2,0);
kneeMesh2.position.set(0,-height/2-kneeRadius/2,0);
legMesh.add(kneeMesh);
legMesh2.add(kneeMesh2);


//-----------------------------
//------------CALF------------
//-----------------------------
function klein(v, u, target) {
  u *= Math.PI;
  v *= 2 * Math.PI;
  u = u * 2;

  let x;
  let z;

  if (u < Math.PI) {
      x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(u) * Math.cos(v);
      z = -8 * Math.sin(u) - 2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v);
  } else {
      x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(v + Math.PI);
      z = -8 * Math.sin(u);
  }

  const y = -2 * (1 - Math.cos(u) / 2) * Math.sin(v);

  target.set(x, y, z).multiplyScalar(0.75);
}
const slices = 25;  
const stacks = 26;  
const calf = new THREE.ParametricGeometry(klein, slices, stacks);
const calfMaterial = new THREE.MeshPhongMaterial({color: 0xCC8866});
const calfMesh = new THREE.Mesh(calf, calfMaterial);
const calfMesh2 = new THREE.Mesh(calf, calfMaterial);
calfMesh.rotation.x = radians(90);
calfMesh.rotation.z = radians(90);
calfMesh2.rotation.x = radians(90);
calfMesh2.rotation.z = radians(90);
calfMesh.position.set(0,-kneeRadius-10,0)
calfMesh2.position.set(0,-kneeRadius-10,0)
kneeMesh.add(calfMesh);
kneeMesh2.add(calfMesh2);





//-----------------------------
//------------TIBIA------------
//-----------------------------
const radiusTopTibia = 3;  
const radiusBottomTibia = 2;  
const heightTibia = 20.0;  
const radialSegmentsTibia = 11;  
const Tibia= new THREE.CylinderGeometry(radiusTopTibia, radiusBottomTibia, heightTibia, radialSegmentsTibia);
const TibiaMaterial = new THREE.MeshPhongMaterial({color: 0xCC8866});
const TibiaMesh = new THREE.Mesh(Tibia, TibiaMaterial);
const TibiaMesh2 = new THREE.Mesh(Tibia, TibiaMaterial);

TibiaMesh.position.set(0,-heightTibia/2-kneeRadius/2,0)
TibiaMesh2.position.set(0,-heightTibia/2-kneeRadius/2,0)
//const TibiaMesh2 = new THREE.Mesh(Tibia, TibiaMaterial);
kneeMesh.add(TibiaMesh);
kneeMesh2.add(TibiaMesh2);



//-----------------------------
//-----------PANKLE------------
//-----------------------------
const ankleRadius =  2; 
const wankleSegments = 30;  
const hankleSegments = 30;  

const ankle = new THREE.SphereGeometry(ankleRadius, wankleSegments, hankleSegments);
const ankleMaterial = new THREE.MeshPhongMaterial({color: 0xCC8866});
const ankleMesh = new THREE.Mesh(ankle, ankleMaterial);
const ankleMesh2 = new THREE.Mesh(ankle, ankleMaterial);
ankleMesh.position.set(0,-heightTibia/2-ankleRadius/2,0);
ankleMesh2.position.set(0,-heightTibia/2-ankleRadius/2,0);
TibiaMesh.add(ankleMesh);
TibiaMesh2.add(ankleMesh2);


//-----------------------------
//------------FOOT------------
//-----------------------------
const widthFoot1 =  5;  
const heightFoot1 = 4;  
const depthFoot1 = 5;  

const foot1 = new THREE.BoxGeometry(widthFoot1, heightFoot1, depthFoot1)
const footMaterial = new THREE.MeshPhongMaterial({color: 0xCC8866});
const footMesh = new THREE.Mesh(foot1, footMaterial);
const footMesh2 = new THREE.Mesh(foot1, footMaterial);
footMesh.position.set(0,-heightFoot1/2-ankleRadius/2,0);
footMesh2.position.set(0,-heightFoot1/2-ankleRadius/2,0);
ankleMesh.add(footMesh)
ankleMesh2.add(footMesh2);
//FOOT (QUADRATO2)
const widthFoot2 =  5;  
const heightFoot2 = 2;  
const depthFoot2 = 15;  

const foot2 = new THREE.BoxGeometry(widthFoot2, heightFoot2, depthFoot2)
const footMaterial2 = new THREE.MeshPhongMaterial({color: 0xCC8866});
const footMeshFront = new THREE.Mesh(foot2, footMaterial2);
const footMeshFront2 = new THREE.Mesh(foot2, footMaterial2);
footMeshFront.position.set(0,-heightFoot2/2,widthFoot1);
footMeshFront2.position.set(0,-heightFoot2/2,widthFoot1);
footMesh.add(footMeshFront);
footMesh2.add(footMeshFront2);




//-----------------------------
//------------TORSO------------
//-----------------------------
const torso = new THREE.Object3D();
waistMesh.add(torso);



const bottomtorsoradiusTop =  22.0; 
const bottomtorsoradiusBottom =  10;  
const bottomtorsoheight = 40;  
const bottomtorsoradialSegments =  4;  
const bottomtorso = new THREE.CylinderGeometry(bottomtorsoradiusTop, bottomtorsoradiusBottom, bottomtorsoheight, bottomtorsoradialSegments);
const bottomtorsoMaterial = new THREE.MeshPhongMaterial({color: 0xCC8866});
const bottomtorsoMesh = new THREE.Mesh(bottomtorso, bottomtorsoMaterial);
bottomtorsoMesh.position.set(0,radius+8,0);
bottomtorsoMesh.rotation.y=radians(45);
torso.add(bottomtorsoMesh);


//-----------------------------
//------------TOPTORSO---------
//-----------------------------
const toptorsoradiusTop =  12;  
const toptorsoradiusBottom =  22  
const toptorsoheight = 10;  
const toptorsoradialSegments =  4;  
const toptorso = new THREE.CylinderGeometry(toptorsoradiusTop, toptorsoradiusBottom, toptorsoheight, toptorsoradialSegments);
const toptorsoMaterial = new THREE.MeshPhongMaterial({color: 0xCC8866});
const toptorsoMesh = new THREE.Mesh(toptorso, toptorsoMaterial);
toptorsoMesh.position.set(0,bottomtorsoheight+toptorsoheight/2,0);
toptorsoMesh.rotation.y=radians(45);
torso.add(toptorsoMesh);



//-----------------------------
//------------SHOULDER---------
//-----------------------------



const shoulderRadius =  8; 
const shoulderwidthSegments = 30;  
const shoulderheightSegments = 30;  

const shoulder = new THREE.SphereGeometry(shoulderRadius, shoulderwidthSegments, shoulderheightSegments);
const shoulderMaterial = new THREE.MeshPhongMaterial({color: 0xCC8866});
const shoulderMesh = new THREE.Mesh(shoulder, shoulderMaterial);
const shoulderMesh2 = new THREE.Mesh(shoulder, shoulderMaterial);
shoulderMesh.position.set(toptorsoradiusTop+shoulderRadius/2,bottomtorsoheight+toptorsoheight-10,0);
shoulderMesh2.position.set(-toptorsoradiusTop-shoulderRadius/2,bottomtorsoheight+toptorsoheight-10,0);
torso.add(shoulderMesh);
torso.add(shoulderMesh2);





//-----------------------------
//------------UPPER ARMS---------
//-----------------------------
const upperArmradiusTop = 3;  
const upperArmradiusBottom =3;  
const upperArmheight = 25;  
const upperArmradialSegments = 50;  
const upperArm = new THREE.CylinderGeometry(upperArmradiusTop, upperArmradiusBottom, upperArmheight, upperArmradialSegments);
const upperArmMaterial = new THREE.MeshPhongMaterial({color: 0xCC8866});
const upperArmMesh = new THREE.Mesh(upperArm, upperArmMaterial);
upperArmMesh.position.set(4,-shoulderRadius/2-upperArmheight/2,0);

const upperArmMesh2 = new THREE.Mesh(upperArm, upperArmMaterial);
upperArmMesh2.position.set(-4,-shoulderRadius/2-upperArmheight/2,0);
shoulderMesh.add(upperArmMesh);
shoulderMesh2.add(upperArmMesh2);

//-----------------------------
//------------ELBOW---------
//-----------------------------

const elbowRadius =  4; 
const elbowwidthSegments = 30;  
const elbowheightSegments = 30;  

const elbow = new THREE.SphereGeometry(elbowRadius, elbowwidthSegments, elbowheightSegments);
const elbowMaterial = new THREE.MeshPhongMaterial({color: 0xCC8866});
const elbowMesh = new THREE.Mesh(elbow, elbowMaterial);
const elbowMesh2 = new THREE.Mesh(elbow, elbowMaterial);
elbowMesh.position.set(0,-upperArmheight/2-elbowRadius/2,0);
elbowMesh2.position.set(0,-upperArmheight/2-elbowRadius/2,0);
elbowMesh.rotation.x = radians(-90);
elbowMesh2.rotation.x = radians(-90);

upperArmMesh.add(elbowMesh);
upperArmMesh2.add(elbowMesh2);

//-----------------------------
//------------LOVER ARMS---------
//-----------------------------
const lowerArmradiusTop = 2.5;  
const lowerArmradiusBottom =2;  
const lowerArmheight = 20;  
const lowerArmradialSegments = 50;  
const lowerArm = new THREE.CylinderGeometry(lowerArmradiusTop, lowerArmradiusBottom, lowerArmheight, lowerArmradialSegments);
const lowerArmMaterial = new THREE.MeshPhongMaterial({color: 0xCC8866});
const lowerArmMesh = new THREE.Mesh(lowerArm, lowerArmMaterial);
lowerArmMesh.position.set(0,-lowerArmheight/2-elbowRadius/2,0);

const lowerArmMesh2 = new THREE.Mesh(lowerArm, lowerArmMaterial);
lowerArmMesh2.position.set(0,-lowerArmheight/2-elbowRadius/2,0);
elbowMesh.add(lowerArmMesh);
elbowMesh2.add(lowerArmMesh2);

//-----------------------------
//------------POLSO-------------
//-----------------------------

const polsoRadius =  2; 
const polsowidthSegments = 30;  
const polsoheightSegments = 30;  

const polso = new THREE.SphereGeometry(polsoRadius, polsowidthSegments, polsoheightSegments);
const polsoMaterial = new THREE.MeshPhongMaterial({color: 0xCC8866});
const polsoMesh = new THREE.Mesh(polso, polsoMaterial);
const polsoMesh2 = new THREE.Mesh(polso, polsoMaterial);
polsoMesh.position.set(0,-lowerArmheight/2-polsoRadius/2,0);
polsoMesh2.position.set(0,-lowerArmheight/2-polsoRadius/2,0);
lowerArmMesh.add(polsoMesh);
lowerArmMesh2.add(polsoMesh2);

//-----------------------------
//------------HAND-------------
//-----------------------------


const widthHand =  2;  
const heightHand = 10;  
const depthHand = 5;  

const hand = new THREE.BoxGeometry(widthHand, heightHand, depthHand)
const handMaterial = new THREE.MeshPhongMaterial({color: 0xCC8866});
const handMeshFront = new THREE.Mesh(hand, handMaterial);
const handMeshFront2 = new THREE.Mesh(hand, handMaterial);
handMeshFront.position.set(0,-heightHand/2-polsoRadius/2,0);
handMeshFront2.position.set(0,-heightHand/2-polsoRadius/2,0);
polsoMesh.add(handMeshFront);
polsoMesh2.add(handMeshFront2);


//-----------------------------
//------------NECK-------------
//-----------------------------
const neckradiusTop = 2;  
const neckradiusBottom = 4;  
const neckheight = 8;  
const neckradialSegments = 50;  
const neck = new THREE.CylinderGeometry(neckradiusTop, neckradiusBottom, neckheight, neckradialSegments);
const neckMaterial = new THREE.MeshPhongMaterial({color: 0xCC8866});
const neckMesh= new THREE.Mesh(neck, neckMaterial);
neckMesh.position.set(0,neckheight/2+toptorsoheight/2,0)
toptorsoMesh.add(neckMesh);


//-----------------------------
//------------HEAD-------------
//-----------------------------

const headRadius =  10; 
const headwidthSegments = 4;  
const headheightSegments = 4;  

const head = new THREE.SphereGeometry(headRadius, headwidthSegments, headheightSegments);
const headMaterial = new THREE.MeshPhongMaterial({color: 0xCC8866});
const headMesh = new THREE.Mesh(head, headMaterial);
const headMesh2 = new THREE.Mesh(head, headMaterial);
headMesh.position.set(0,neckheight/2+headRadius/2,0);
neckMesh.add(headMesh);


//###################################################### E V E N T - L I S T E N E R ##################################################
var jumping = false;


document.addEventListener('keydown', function(event) {
  if(event.keyCode == 32) {
      if (jumping==false){
        jumping = true;
        jump();
      }
      
  }
});
//###################################################### A N I M A T I O N S ##################################################

//-----------------------------
//----------------RUN----------
//-----------------------------

function run(){
    var interval = 500
    createjs.Tween.get(hipsMesh.rotation, {loop:-1}).to({x:radians(-75)}, interval/2).to({x:radians(75)}, interval).to({x:radians(0)}, interval/2);
    createjs.Tween.get(hipsMesh2.rotation, {loop:-1}).to({x:radians(75)}, interval/2).to({x:radians(-75)},interval).to({x:radians(0)}, interval/2);
    createjs.Tween.get(waistMesh.position, {loop:-1}).to({y:5}, interval/2).to({y:0},interval/2);
    createjs.Tween.get(kneeMesh.rotation, {loop:-1}).to({x:radians(75)}, interval).to({x:radians(0)}, interval);
    createjs.Tween.get(kneeMesh2.rotation, {loop:-1}).to({x:radians(75)}, interval).to({x:radians(0)}, interval);
    createjs.Tween.get(ankleMesh.rotation, {loop:-1}).to({x:radians(-15)}, interval).to({x:radians(0)}, interval/2);
    createjs.Tween.get(ankleMesh2.rotation, {loop:-1}).to({x:radians(-15)}, interval).to({x:radians(0)}, interval/2);
    createjs.Tween.get(torso.rotation, {loop:-1}).to({y:radians(10)},interval/2).to({y:radians(-10)},interval).to({y:radians(0)},interval/2);
    createjs.Tween.get(shoulderMesh.rotation, {loop:-1}).to({x:radians(75)}, interval/2).to({x:radians(-75)}, interval).to({x:radians(0)}, interval/2);
    createjs.Tween.get(shoulderMesh2.rotation, {loop:-1}).to({x:radians(-75)}, interval/2).to({x:radians(75)}, interval).to({x:radians(0)}, interval/2);
    createjs.Tween.get(elbowMesh.rotation, {loop:-1}).to({x:radians(-120)}, interval).to({x:radians(-90)}, interval);
    createjs.Tween.get(elbowMesh2.rotation, {loop:-1}).to({x:radians(-120)}, interval).to({x:radians(-90)}, interval);
    //controls
}




run()


//-----------------------------
//------------JUMP-------------
//-----------------------------


function jump(){
    var jinterval = 1000;
    createjs.Tween.get(hipsMesh.rotation).to({x:radians(-90)}, jinterval/2).to({x:radians(0)},jinterval/2);
    createjs.Tween.get(waistMesh.position).to({y:100}, jinterval/2).to({y:0},jinterval/2);
    createjs.Tween.get(kneeMesh2.rotation).to({x:radians(120)}, jinterval/2).to({x:radians(0)},jinterval/2);
    createjs.Tween.get(torso.rotation).to({x:radians(45)}, jinterval/2).to({x:radians(0)},jinterval/2);
    createjs.Tween.get(shoulderMesh.rotation).to({x:radians(90)}, jinterval/2).to({x:radians(0)},jinterval/2);
    createjs.Tween.get(shoulderMesh2.rotation).to({x:radians(-90)}, jinterval/2).to({x:radians(0)},jinterval/2).call(function(){jumping=false});

}


function dead(){
  var interval = 500;
  createjs.Tween.get(hipsMesh.rotation,{override:true}).to({x:radians(0)}, interval/2);
  createjs.Tween.get(hipsMesh2.rotation,{override:true}).to({x:radians(0)}, interval/2);
  createjs.Tween.get(waistMesh.position,{override:true}).to({y:0}, interval/2);
  createjs.Tween.get(kneeMesh.rotation,{override:true}).to({x:radians(0)}, interval/2);
  createjs.Tween.get(kneeMesh2.rotation,{override:true}).to({x:radians(0)}, interval/2);
  createjs.Tween.get(ankleMesh.rotation,{override:true}).to({x:radians(0)}, interval/2);
  createjs.Tween.get(ankleMesh2.rotation,{override:true}).to({x:radians(0)}, interval/2);
  createjs.Tween.get(torso.rotation,{override:true}).to({x:radians(0)}, interval/2);
  createjs.Tween.get(shoulderMesh.rotation,{override:true}).to({x:radians(0)}, interval/2);
  createjs.Tween.get(shoulderMesh2.rotation,{override:true}).to({x:radians(0)}, interval/2);
  createjs.Tween.get(elbowMesh.rotation,{override:true}).to({x:radians(0)}, interval/2);
  createjs.Tween.get(elbowMesh2.rotation,{override:true}).to({x:radians(0)}, interval/2);

  interval = 1000;

  createjs.Tween.get(waistMesh.position,{override:true}).to({y:-28}, interval/2);
  createjs.Tween.get(kneeMesh.rotation,{override:true}).to({x:radians(120)}, interval/2);
  createjs.Tween.get(kneeMesh2.rotation,{override:true}).to({x:radians(120)}, interval/2);

  

  
}

//dead()

























//################################################## FINE A N I M A T I O N S ##################################################
  //##############################################
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;

   
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
 //##############################################
   


  //##############################################
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();