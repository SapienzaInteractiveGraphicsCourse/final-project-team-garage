//import {Plot} from './palazzo1.js';
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/loaders/FBXLoader.js';

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});
  renderer.setClearColor(0x87ceeb);
  renderer.shadowMap.enabled = true;

  const fov = 75;
  const aspect = 2;  // the canvas default
  const near = 1;
  const far = 10000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 200, -400);

  // MUOVI A PIACIMENTO
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();
  

  //degree to radians
  function radians(degrees) {
    return degrees * Math.PI / 180;
  }
  

//###################################################### S C E N E ##################################################

  const scene = new THREE.Scene();
  
  

  {
    const light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add( light );
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.35 );
    directionalLight.position.set(-500,1000,0);
    scene.add( directionalLight );
    const directionalLight2 = new THREE.DirectionalLight( 0xffffff, 0.35);
    directionalLight2.position.set(+500,1000,0);
    scene.add( directionalLight2 );
    const directionalLight3 = new THREE.DirectionalLight( 0xffffff, 0.35);
    directionalLight3.position.set(0,1000,-1000);
    scene.add( directionalLight3 );
    
  }

//###################################################### F I E L D ##################################################



const groundwidth = 10000;  
const groundheight = 10000;  
const grounddepth = 1;
const ground = new THREE.BoxGeometry(groundwidth,groundheight,grounddepth);
const groundtexture = new THREE.TextureLoader().load( './textures/grass.png' );

groundtexture.wrapS = THREE.RepeatWrapping;
groundtexture.wrapT = THREE.RepeatWrapping;
groundtexture.repeat.set( 100, 100);
groundtexture.anisotropy=24;

const groundMaterial = new THREE.MeshPhongMaterial({map: groundtexture});
const groundMesh = new THREE.Mesh(ground,groundMaterial);
groundMesh.position.set(0,0,groundheight*2/4.5);
groundMesh.rotation.x = radians(-90);
scene.add(groundMesh);


createjs.Tween.get(groundtexture.offset,{loop:-1}).to({y:groundtexture.offset.y-20}, 50).to({y:groundtexture.offset.y+20}, 50);




//###################################################### T R A C K ##################################################
const trackwidth=  100;  
const trackheight = 10000; 
const trackdepth =  1.0; 

const track= new THREE.BoxGeometry(trackwidth, trackheight, trackdepth);
const texture = new THREE.TextureLoader().load( './textures/track2.png' );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 1, 60);
texture.anisotropy=24;


const texture1 = new THREE.TextureLoader().load( './textures/track2.png' );
texture1.wrapS = THREE.RepeatWrapping;
texture1.wrapT = THREE.RepeatWrapping;
texture1.repeat.set( 1, 60);
texture1.anisotropy=24;

const texture2 = new THREE.TextureLoader().load( './textures/track2.png' );
texture2.wrapS = THREE.RepeatWrapping;
texture2.wrapT = THREE.RepeatWrapping;
texture2.repeat.set( 1, 60);
texture2.anisotropy=24;

createjs.Tween.get(texture.offset,{loop:-1}).to({y:texture.offset.y-20}, 50).to({y:texture.offset.y+20}, 50);
createjs.Tween.get(texture1.offset,{loop:-1}).to({y:texture1.offset.y-20}, 50).to({y:texture1.offset.y+20}, 50);
createjs.Tween.get(texture2.offset,{loop:-1}).to({y:texture2.offset.y-20}, 50).to({y:texture2.offset.y+10}, 50);






const trackMaterial = new THREE.MeshPhongMaterial({map: texture1});
const trackMaterial2 = new THREE.MeshPhongMaterial({map: texture});
const trackMaterial3 = new THREE.MeshPhongMaterial({map: texture2});
trackMaterial.shininess = 10;
trackMaterial2.shininess = 10;
trackMaterial3.shininess = 10;

const trackMesh = new THREE.Mesh(track,trackMaterial);
const trackMesh2 = new THREE.Mesh(track,trackMaterial2);
const trackMesh3 = new THREE.Mesh(track,trackMaterial3);
trackMesh.position.set(0,grounddepth+trackdepth,groundheight*2/4.5);
trackMesh2.position.set(trackwidth,grounddepth+trackdepth,groundheight*2/4.5);
trackMesh3.position.set(-trackwidth,grounddepth+trackdepth,groundheight*2/4.5);
trackMesh.rotation.x = radians(-90);
trackMesh2.rotation.x = radians(-90);
trackMesh3.rotation.x = radians(-90);
scene.add(trackMesh2);
scene.add(trackMesh);
scene.add(trackMesh3)


  
 //#FFFF00
//#################################################### O B S T A C L E ########################################################

var obstacles = []
var highobstacles = []

const railtexture = new THREE.TextureLoader().load( './textures/rails.png' );
railtexture.wrapS = THREE.RepeatWrapping;
railtexture.wrapT = THREE.RepeatWrapping;
railtexture.repeat.set( 2, 1);
railtexture.anisotropy=24;


function createObject(interval,pos){
  var obstacle = new THREE.Object3D();
  var ntrack = Math.floor(Math.random() * (3));
  scene.add(obstacle);
  obstacles.push(obstacle);
  
 if (ntrack==0){
    obstacle.position.x = -100;
  }
  if (ntrack==1){
    obstacle.position.x = 0;
  }
  if (ntrack==2){
    obstacle.position.x= 100;
  }
  if (pos!=0){
    if (pos==1){
      obstacle.position.x = -100;
    }
    if (pos==2){
      obstacle.position.x = 0;
    }
    if (pos==3){
      obstacle.position.x= 100;
    }
  }
  obstacle.position.z = 10000;
  
  const railwidth =  110;  
  const railheight =  10;  
  const raildepth = 2;  

  const rail= new THREE.BoxGeometry(railwidth, railheight, raildepth);
  const railMaterial = new THREE.MeshPhongMaterial({map: railtexture});
  const railMesh = new THREE.Mesh(rail, railMaterial);

  railMesh.position.set(0,railwidth/2-10,0);
  obstacle.add(railMesh);

  const postwidth =  10;  
  const postheight =  50;  
  const postdepth = 2;  

  const post= new THREE.BoxGeometry(postwidth, postheight, postdepth);
  const postMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
  const postMesh = new THREE.Mesh(post, postMaterial);
  const postMesh2 = new THREE.Mesh(post, postMaterial);
  postMesh.position.set(-railwidth/2+10,-postheight/2+railheight/2,-postdepth);
  postMesh2.position.set(railwidth/2-10,-postheight/2+railheight/2,-postdepth);
  railMesh.add(postMesh);
  railMesh.add(postMesh2);


  const brailwidth =  100;  
  const brailheight =  2;  
  const braildepth = 10;  

  const brail= new THREE.BoxGeometry(brailwidth, brailheight, braildepth);
  const brailMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
  const brailMesh = new THREE.Mesh(brail, brailMaterial);
  const brailMesh2 = new THREE.Mesh(brail, brailMaterial);
  brailMesh.position.set(0,-railwidth/2+braildepth+railheight/2+railwidth/2-10,-braildepth/2);
  obstacle.add(brailMesh);

  const bpostwidth =  10;  
  const bpostheight =  2;  
  const bpostdepth = 50;  

  const bpost= new THREE.BoxGeometry(bpostwidth, bpostheight, bpostdepth);
  const bpostMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
  const bpostMesh = new THREE.Mesh(bpost, bpostMaterial);
  const bpostMesh2 = new THREE.Mesh(bpost, bpostMaterial);
  bpostMesh.position.set(bpostdepth*2/2-bpostwidth/2,0,-bpostdepth/2);
  bpostMesh2.position.set(-bpostdepth*2/2+bpostwidth/2,0,-bpostdepth/2);
  brailMesh.add(bpostMesh);
  brailMesh.add(bpostMesh2);
  obstacle.rotation.y = radians(180);

  
  createjs.Tween.get(obstacle.position).to({z:-500}, interval).call(function(){scene.remove(obstacle);});
}



//------------------------------------
//--------O B S T A C L E 2-----------
//------------------------------------

function createObject1(interval,pos){
  var obstacle = new THREE.Object3D();
  var ntrack = Math.floor(Math.random() * (3));
  

  scene.add(obstacle);
  highobstacles.push(obstacle);

  if (ntrack==0){
    obstacle.position.x = -100;
  }
  if (ntrack==1){
    obstacle.position.x = 0;
  }
  if (ntrack==2){
    obstacle.position.x= 100;
  }

  if (pos!=0){
    if (pos==1){
      obstacle.position.x = -100;
    }
    if (pos==2){
      obstacle.position.x = 0;
    }
    if (pos==3){
      obstacle.position.x= 100;
    }
}
  obstacle.position.z = 10000;
  const postheight =  200;
  const railwidth =  110;  
  const railheight =  10;  
  const raildepth = 2;  

  const rail= new THREE.BoxGeometry(railwidth, railheight, raildepth);
  const railMaterial = new THREE.MeshPhongMaterial({map: railtexture});
  const railMesh = new THREE.Mesh(rail, railMaterial);
  const railMesh2 = new THREE.Mesh(rail, railMaterial);
  railMesh.position.set(0,postheight-railheight,0);
  obstacle.add(railMesh);

  const postwidth =  10;    
  const postdepth = 2;  

  const post= new THREE.BoxGeometry(postwidth, postheight, postdepth);
  const postMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
  const postMesh = new THREE.Mesh(post, postMaterial);
  const postMesh2 = new THREE.Mesh(post, postMaterial);
  postMesh.position.set(-railwidth/2+10,-postheight/2+railheight/2-railheight,-postdepth);
  postMesh2.position.set(railwidth/2-10,-postheight/2+railheight/2-railheight,-postdepth);
  railMesh.add(postMesh);
  railMesh.add(postMesh2);

  const brailwidth =  100;  
  const brailheight =  20;  
  const braildepth = 10;  

  const brail= new THREE.BoxGeometry(brailwidth, brailheight, braildepth);
  const brailMaterial = new THREE.MeshPhongMaterial({map: railtexture});
  const brailMesh = new THREE.Mesh(brail, brailMaterial);
  const brailMesh2 = new THREE.Mesh(brail, brailMaterial);
  brailMesh.position.set(0,postheight/1.5,-braildepth/2);
  obstacle.add(brailMesh);

  createjs.Tween.get(obstacle.position).to({z:-500}, interval).call(function(){scene.remove(obstacle);});
}

function stopObstacles(){
 var interval = 0;
 for(var i=0; i<obstacles.length; i++) {
  createjs.Tween.get(obstacles[i].position, {override:true}).to(obstacles[i].position.z,interval);
 }
 for(var i=0; i<highobstacles.length; i++) {
  createjs.Tween.get(highobstacles[i].position, {override:true}).to(highobstacles[i].position.z,interval);
}
}
//#################################################### OBJECT CREATE ########################################################

var banners = [];



const bannerwidth = 20000;  
const bannerheight = 70;  
const bannerdepth = 10;
const banner = new THREE.BoxGeometry(bannerwidth, bannerheight, bannerdepth);


const sapientiatexture = new THREE.TextureLoader().load( './textures/sapientia.jpeg' );
sapientiatexture.wrapS = THREE.RepeatWrapping;
sapientiatexture.wrapT = THREE.RepeatWrapping;
sapientiatexture.repeat.set( 100, 1);
sapientiatexture.anisotropy=24;


const bannerMaterials =[ 
  new THREE.MeshPhongMaterial({color: 0xFFFFFF}),
  new THREE.MeshPhongMaterial({color: 0xFFFFFF}),
  new THREE.MeshPhongMaterial({color: 0xFFFFFF}),
  new THREE.MeshPhongMaterial({color: 0xFFFFFF}),
  new THREE.MeshPhongMaterial({map: sapientiatexture}),
  new THREE.MeshPhongMaterial({color: 0xFFFFFF})
];
const bannerMesh = new THREE.Mesh(banner,bannerMaterials);
const bannerMesh2 = new THREE.Mesh(banner,bannerMaterials);

bannerMesh.position.set(-500,bannerheight/2,3500);
bannerMesh2.position.set(500,bannerheight/2,3500);
bannerMesh.rotation.y = radians(90);
bannerMesh2.rotation.y = radians(-90);
scene.add(bannerMesh);
scene.add(bannerMesh2);
//createjs.Tween.get(sapientiatexture.offset,{loop:-1}).to({x:sapientiatexture.offset.x-10000},10000);
createjs.Tween.get(bannerMesh.position,{loop:-1}).to({z:bannerMesh.position.z-5000},5000);
createjs.Tween.get(bannerMesh2.position,{loop:-1}).to({z:bannerMesh2.position.z-5000},5000);



function dist3d (v1, v2 )
{
    var dx = v1.x - v2.x;
    var dy = v1.y - v2.y;
    var dz = v1.z - v2.z;
    return Math.sqrt( dx * dx + dy * dy + dz * dz );
}


function checkCollisions(){
  var dist = 150;
  if (dead1){return}
  for (var i = 0; i < obstacles.length ; i++){
      if ( Math.abs(obstacles[i].position.x - waistMesh.position.x )<50 && jumping == false && Math.abs(obstacles[i].position.z)<dist){
          console.log("hit");
          stopspawn();
          dead();
          stopObstacles();
          dead1=true;
      }
  }
  for (var i = 0; i < highobstacles.length ; i++){
    if ( Math.abs(highobstacles[i].position.x - waistMesh.position.x )<50 && slipping == false && Math.abs(highobstacles[i].position.z)<dist){
        console.log("hit");
        stopspawn();
        dead();
        stopObstacles();
        dead1=true;
    }
}
}






//###################################################### H U M A N ###########################################################

const human = new THREE.Object3D();

  
scene.add(human);

//-----------------------------
//------------WAIST------------
//-----------------------------
const radius =  12;  
const waist = new THREE.DodecahedronGeometry(radius);
const waistMaterial = new THREE.MeshPhongMaterial({color: 0x6495ED});
waistMaterial.shininess=10;
const waistMesh = new THREE.Mesh(waist, waistMaterial);
human.add(waistMesh);


//-----------------------------
//-------------HIPS------------
//-----------------------------
const hipsRadius =  6; 
const widthSegments = 30;  
const heightSegments = 30;  

const hips = new THREE.SphereGeometry(hipsRadius, widthSegments, heightSegments);
const hipsMaterial = new THREE.MeshPhongMaterial({color: 0x6495ED});
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
//------------ANKLE------------
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
const footMaterial = new THREE.MeshPhongMaterial({color: 0xDFFF00});
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
const footMaterial2 = new THREE.MeshPhongMaterial({color: 0xDFFF00});
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
const bottomtorsoMaterial = new THREE.MeshPhongMaterial({color: 0x6495ED});
bottomtorsoMaterial.shininess=0;
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
const toptorsoMaterial = new THREE.MeshPhongMaterial({color: 0x6495ED});
toptorsoMaterial.shininess=0;
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

human.position.set(0,radius+height+heightTibia+heightFoot1+2.5+grounddepth+trackdepth+10,0);





//###################################################### E V E N T - L I S T E N E R ##################################################
//======= HUMAN POS =======//
var pos = 0;
var jumping = false;
var moving = false;
var slipping = false;
var dead1 = false;



document.addEventListener('keydown', function(event) {
  if (dead1){return};
  if(event.keyCode == 32 || event.keyCode == 87) {
      if (jumping==false && slipping==false){
        var ranjump = Math.floor(Math.random() * (2));
        jumping = true;
        if (ranjump==1){
          jump()
        }
        else{jump2();}
      }
  
  }

  if(event.keyCode == 65) {
    if (pos > -1 && moving == false){
      var ran = Math.floor(Math.random() * (4));
      moving = true;
      pos-=1;
      if (ran==1){
        left1();
      }
      else{
        left()
      }

    }
  }
  if(event.keyCode == 68 && moving == false ) {
      if (pos < 1 && moving == false){
        var ran = Math.floor(Math.random() * (4));
        moving = true;
        pos+=1;
        if (ran==1){
          right1();
        }
        else{
          right()
        }

      }
  
  }
  if(event.keyCode == 83) {
    var ran = Math.floor(Math.random() * (2));
    if (slipping == false && jumping==false){
      slipping = true;
      if (ran==1){
        slip1();
      }
      else{
        slip()
      }

    }

}
});



//###################################################### SPECTATORS ###############################################
var labelwidth=  100;  
var labelheight = 50; 
var labeldepth =  1.0; 

var label= new THREE.BoxGeometry(labelwidth, labelheight, labeldepth);
var labeltexture = new THREE.TextureLoader().load( './textures/sign.png' );
labeltexture.anisotropy=24;

var labelMaterial = new THREE.MeshPhongMaterial({map: labeltexture})

var spectators = [];
function createSpectator(x,z,maglietta_color,mutande_color,scarpe_color, type,pos){
  var maglietta = new THREE.MeshPhongMaterial({color: maglietta_color});
  var mutande =  new THREE.MeshPhongMaterial({color: mutande_color});
  var scarpe = new THREE.MeshPhongMaterial({color: scarpe_color});
  var spectator = new THREE.Object3D();
  spectators.push(spectator);
  scene.add(spectator);

  var swaistMesh = new THREE.Mesh(waist, mutande);
  spectator.add(swaistMesh);
  var shipsMesh = new THREE.Mesh(hips, mutande);
  swaistMesh.add(shipsMesh);
  var shipsMesh2 = new THREE.Mesh(hips, mutande);
  swaistMesh.add(shipsMesh2);

  shipsMesh.position.set(radius-2,-radius/2,0);
  shipsMesh2.position.set(-radius+2,-radius/2,0);

  var slegMesh = new THREE.Mesh(leg, mutande);
  var slegMesh2 = new THREE.Mesh(leg, mutande);
  shipsMesh.add(slegMesh);
  shipsMesh2.add(slegMesh2);
  slegMesh.position.set(0,-hipsRadius-height/2,0)
  slegMesh2.position.set(0,-hipsRadius-height/2,0)

  var skneeMesh = new THREE.Mesh(knee, mutande);
  var skneeMesh2 = new THREE.Mesh(knee, mutande);
  slegMesh.add(skneeMesh);
  slegMesh2.add(skneeMesh2);
  skneeMesh.position.set(0,-height/2-kneeRadius/2,0);
  skneeMesh2.position.set(0,-height/2-kneeRadius/2,0); 

  var scalfMesh = new THREE.Mesh(calf, mutande);
  var scalfMesh2 = new THREE.Mesh(calf, mutande);
  skneeMesh.add(scalfMesh);
  skneeMesh2.add(scalfMesh2);
  scalfMesh.rotation.x = radians(90);
  scalfMesh.rotation.z = radians(90);
  scalfMesh2.rotation.x = radians(90);
  scalfMesh2.rotation.z = radians(90);
  scalfMesh.position.set(0,-kneeRadius-10,0)
  scalfMesh2.position.set(0,-kneeRadius-10,0)


  var sTibiaMesh = new THREE.Mesh(Tibia, mutande);
  var sTibiaMesh2 = new THREE.Mesh(Tibia, mutande);
  skneeMesh.add(sTibiaMesh);
  skneeMesh2.add(sTibiaMesh2);
  sTibiaMesh.position.set(0,-heightTibia/2-kneeRadius/2,0)
  sTibiaMesh2.position.set(0,-heightTibia/2-kneeRadius/2,0)

  var sankleMesh = new THREE.Mesh(ankle, ankleMaterial);
  var sankleMesh2 = new THREE.Mesh(ankle, ankleMaterial);
  sTibiaMesh.add(sankleMesh);
  sTibiaMesh2.add(sankleMesh2);
  sankleMesh.position.set(0,-heightTibia/2-ankleRadius/2,0);
  sankleMesh2.position.set(0,-heightTibia/2-ankleRadius/2,0);



  var sfootMeshFront = new THREE.Mesh(foot2, scarpe);
  var sfootMeshFront2 = new THREE.Mesh(foot2, scarpe);
  var sfootMesh = new THREE.Mesh(foot1, scarpe);
  var sfootMesh2 = new THREE.Mesh(foot1, scarpe);
  sfootMesh.add(sfootMeshFront)
  sfootMesh2.add(sfootMeshFront2)
  sankleMesh.add(sfootMesh);
  sankleMesh2.add(sfootMesh2);
  sfootMesh.position.set(0,-heightFoot1/2-ankleRadius/2,0);
  sfootMesh2.position.set(0,-heightFoot1/2-ankleRadius/2,0);
  sfootMeshFront.position.set(0,-heightFoot2/2,widthFoot1);
  sfootMeshFront2.position.set(0,-heightFoot2/2,widthFoot1);

  
  var storso = new THREE.Object3D();
  swaistMesh.add(storso);

  var sbottomtorsoMesh = new THREE.Mesh(bottomtorso, maglietta);
  storso.add(sbottomtorsoMesh);
  sbottomtorsoMesh.position.set(0,radius+8,0);
  sbottomtorsoMesh.rotation.y=radians(45);

  var stoptorsoMesh = new THREE.Mesh(toptorso, maglietta);
  storso.add(stoptorsoMesh);
  stoptorsoMesh.position.set(0,bottomtorsoheight+toptorsoheight/2,0);
  stoptorsoMesh.rotation.y=radians(45);

  var sshoulderMesh = new THREE.Mesh(shoulder, maglietta);
  sshoulderMesh.position.set(toptorsoradiusTop+shoulderRadius/2,bottomtorsoheight+toptorsoheight-10,0);
  storso.add(sshoulderMesh);

  var sshoulderMesh2 = new THREE.Mesh(shoulder, maglietta);
  sshoulderMesh2.position.set(-toptorsoradiusTop-shoulderRadius/2,bottomtorsoheight+toptorsoheight-10,0);
  storso.add(sshoulderMesh2);

  var supperArmMesh = new THREE.Mesh(upperArm, maglietta);
  supperArmMesh.position.set(4,-shoulderRadius/2-upperArmheight/2,0);
  sshoulderMesh.add(supperArmMesh);
  
  var supperArmMesh2 = new THREE.Mesh(upperArm, maglietta);
  supperArmMesh2.position.set(-4,-shoulderRadius/2-upperArmheight/2,0);
  sshoulderMesh2.add(supperArmMesh2);
 
  var selbowMesh = new THREE.Mesh(elbow, elbowMaterial);
  selbowMesh.position.set(0,-upperArmheight/2-elbowRadius/2,0);
  supperArmMesh.add(selbowMesh);


  var selbowMesh2 = new THREE.Mesh(elbow, elbowMaterial);
  selbowMesh2.position.set(0,-upperArmheight/2-elbowRadius/2,0);
  supperArmMesh2.add(selbowMesh2);
  
  var slowerArmMesh = new THREE.Mesh(lowerArm, lowerArmMaterial);
  slowerArmMesh.position.set(0,-lowerArmheight/2-elbowRadius/2,0);
  selbowMesh.add(slowerArmMesh)

  var slowerArmMesh2 = new THREE.Mesh(lowerArm, lowerArmMaterial);
  slowerArmMesh2.position.set(0,-lowerArmheight/2-elbowRadius/2,0);
  selbowMesh2.add(slowerArmMesh2)
  
  var spolsoMesh = new THREE.Mesh(polso, polsoMaterial);
  spolsoMesh.position.set(0,-lowerArmheight/2-polsoRadius/2,0);
  slowerArmMesh.add(spolsoMesh)
  
  var spolsoMesh2 = new THREE.Mesh(polso, polsoMaterial);
  spolsoMesh2.position.set(0,-lowerArmheight/2-polsoRadius/2,0);
  slowerArmMesh2.add(spolsoMesh2)


  var shandMeshFront = new THREE.Mesh(hand, handMaterial);
  shandMeshFront.position.set(0,-heightHand/2-polsoRadius/2,0);
  spolsoMesh.add(shandMeshFront)

  var shandMeshFront2 = new THREE.Mesh(hand, handMaterial);
  shandMeshFront2.position.set(0,-heightHand/2-polsoRadius/2,0);
  spolsoMesh2.add(shandMeshFront2)


  var sneckMesh= new THREE.Mesh(neck, neckMaterial);
  sneckMesh.position.set(0,neckheight/2+toptorsoheight/2,0)
  stoptorsoMesh.add(sneckMesh);

  var sheadMesh = new THREE.Mesh(head, headMaterial);
  sheadMesh.position.set(0,neckheight/2+headRadius/2,0);
  sneckMesh.add(sheadMesh);
  spectator.position.set(-100,radius+height+heightTibia+heightFoot1+2.5+grounddepth+trackdepth+10,0);
  spectator.position.x = x;
  spectator.position.z = z;
  
  var interval = 300;
  if (type == 0){

    createjs.Tween.get(selbowMesh.rotation ).to({x:radians(-100)}, 0);
    createjs.Tween.get(selbowMesh2.rotation ).to({x:radians(-100)},0);
    createjs.Tween.get(sshoulderMesh.rotation ).to({x:radians(-45)}, 0);
    createjs.Tween.get(sshoulderMesh2.rotation ).to({x:radians(-45)},0);
    createjs.Tween.get(selbowMesh.rotation, {loop:-1} ).to({z:radians(-45)}, interval/2).to({z:radians(0)}, interval/2);
    createjs.Tween.get(selbowMesh2.rotation , {loop:-1}).to({z:radians(45)},interval/2).to({z:radians(0)}, interval/2);
  }
  if (type==1){
    var interval = 600;
    createjs.Tween.get(swaistMesh.position, {loop:-1}).to({y:30}, interval/2).to({y:0},interval/2);


    createjs.Tween.get(sshoulderMesh.rotation).to({x:radians(-150)},0)
    createjs.Tween.get(sshoulderMesh2.rotation).to({x:radians(-150)},0)
    //createjs.Tween.get(sshoulderMesh.rotation, {loop:-1} ).to({x:radians(-180)}, interval/2).to({x:radians(-180)}, interval/2);
    //createjs.Tween.get(sshoulderMesh2.rotation, {loop:-1} ).to({x:radians(-180)},interval/2).to({x:radians(-180)}, interval/2);;
    createjs.Tween.get(selbowMesh.rotation,{loop:-1} ).to({z:radians(-25)}, 0);
    createjs.Tween.get(selbowMesh2.rotation,{loop:-1} ).to({z:radians(25)},0);
    createjs.Tween.get(sshoulderMesh.rotation,{loop:-1} ).to({z:radians(75)}, interval/2).to({z:radians(0)}, interval/2);
    createjs.Tween.get(sshoulderMesh2.rotation,{loop:-1} ).to({z:radians(-75)},interval/2).to({z:radians(0)}, interval/2);


    createjs.Tween.get(sankleMesh.rotation ).to({x:radians(-180)}, interval/2).to({x:0},interval/2);
    createjs.Tween.get(sankleMesh2.rotation ).to({x:radians(-180)},interval/2).to({x:0},interval/2);
    createjs.Tween.get(skneeMesh.rotation, {loop:-1}).to({x:radians(45)}, interval/2).to({x:radians(0)}, interval/2);
    createjs.Tween.get(skneeMesh2.rotation, {loop:-1}).to({x:radians(45)}, interval/2).to({x:radians(0)}, interval/2);
    createjs.Tween.get(shipsMesh.rotation, {loop:-1}).to({x:radians(-25)}, interval/2).to({x:radians(0)}, interval/2)
    createjs.Tween.get(shipsMesh2.rotation, {loop:-1}).to({x:radians(-25)}, interval/2).to({x:radians(0)},interval/2)
  }
  if (type == 2){
    
    var labelMesh = new THREE.Mesh(label, labelMaterial);
    labelMesh.rotation.z = radians(180)
    labelMesh.position.x = -25
    labelMesh.position.y = -25
    shandMeshFront.add(labelMesh);
    createjs.Tween.get(selbowMesh.rotation ).to({x:radians(-100)}, 0);
    createjs.Tween.get(selbowMesh2.rotation ).to({x:radians(-100)},0);
    createjs.Tween.get(sshoulderMesh.rotation ).to({x:radians(-120)}, 0);
    createjs.Tween.get(sshoulderMesh2.rotation ).to({x:radians(-120)},0);

    
  }
  if (type==3){
    var interval = 600;
    var labelMesh = new THREE.Mesh(label, labelMaterial);
    labelMesh.rotation.x = radians(-75);
    shandMeshFront.add(labelMesh);
    createjs.Tween.get(swaistMesh.position, {loop:-1}).to({y:30}, interval/2).to({y:0},interval/2);
    createjs.Tween.get(sshoulderMesh.rotation).to({x:radians(-150)},0)
    createjs.Tween.get(sshoulderMesh2.rotation).to({x:radians(-150)},0)
    //createjs.Tween.get(sshoulderMesh.rotation, {loop:-1} ).to({x:radians(-180)}, interval/2).to({x:radians(-180)}, interval/2);
    //createjs.Tween.get(sshoulderMesh2.rotation, {loop:-1} ).to({x:radians(-180)},interval/2).to({x:radians(-180)}, interval/2);;
    createjs.Tween.get(selbowMesh.rotation,{loop:-1} ).to({z:radians(-25)}, 0);
    createjs.Tween.get(selbowMesh2.rotation,{loop:-1} ).to({z:radians(25)},0);
    createjs.Tween.get(sshoulderMesh.rotation,{loop:-1} ).to({z:radians(75)}, interval/2).to({z:radians(0)}, interval/2);
    createjs.Tween.get(sshoulderMesh2.rotation,{loop:-1} ).to({z:radians(-75)},interval/2).to({z:radians(0)}, interval/2);


    createjs.Tween.get(sankleMesh.rotation ).to({x:radians(-180)}, interval/2).to({x:0},interval/2);
    createjs.Tween.get(sankleMesh2.rotation ).to({x:radians(-180)},interval/2).to({x:0},interval/2);
    createjs.Tween.get(skneeMesh.rotation, {loop:-1}).to({x:radians(45)}, interval/2).to({x:radians(0)}, interval/2);
    createjs.Tween.get(skneeMesh2.rotation, {loop:-1}).to({x:radians(45)}, interval/2).to({x:radians(0)}, interval/2);
    createjs.Tween.get(shipsMesh.rotation, {loop:-1}).to({x:radians(-25)}, interval/2).to({x:radians(0)}, interval/2)
    createjs.Tween.get(shipsMesh2.rotation, {loop:-1}).to({x:radians(-25)}, interval/2).to({x:radians(0)},interval/2)
  }
  if (pos==0){
    swaistMesh.rotation.y = radians(-135);
    spectator.position.x = 600;
  }
  else{
    swaistMesh.rotation.y = radians(-225);
    spectator.position.x = -600;
  }
  createjs.Tween.get(spectator.position).to({z:-500},5000).call(function(){scene.remove(spectator)});

}








//###################################################### A N I M A T I O N S ##################################################





//-----------------------------
//----------------RUN----------
//-----------------------------

function run(){
    //var interval = 500
    var interval = 300
    //camera movement
    createjs.Tween.get(camera.position, {loop:-1}).to({y:camera.position.y + 5}, interval/2).to({y:camera.position.y}, interval/2);
    createjs.Tween.get(camera.rotation, {loop:-1}).to({y: radians(0.1)}, interval).to({y:radians(-0.1)}, interval);
  
    
    createjs.Tween.get(hipsMesh.rotation, {loop:-1}).to({x:radians(-75)}, interval/2).to({x:radians(75)}, interval).to({x:radians(0)}, interval/2);
    createjs.Tween.get(hipsMesh2.rotation, {loop:-1}).to({x:radians(75)}, interval/2).to({x:radians(-75)},interval).to({x:radians(0)}, interval/2);
    createjs.Tween.get(waistMesh.position, {loop:-1}).to({y:5}, interval/2).to({y:0},interval/2);
    createjs.Tween.get(kneeMesh.rotation, {loop:-1}).to({x:radians(75)}, interval).to({x:radians(0)}, interval);
    createjs.Tween.get(kneeMesh2.rotation, {loop:-1}).to({x:radians(75)}, interval).to({x:radians(0)}, interval);
    createjs.Tween.get(ankleMesh.rotation, {loop:-1}).to({x:radians(-15)}, interval).to({x:radians(0)}, interval/2);
    createjs.Tween.get(ankleMesh2.rotation, {loop:-1}).to({x:radians(-15)}, interval).to({x:radians(0)}, interval/2);
    createjs.Tween.get(torso.rotation, {loop:-1}).to({y:radians(20)},interval/2).to({y:radians(-20)},interval).to({y:radians(0)},interval/2);
  
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
    var jinterval = 600
  
    createjs.Tween.get(camera.position).to({y:camera.position.y + 100}, jinterval/2).to({y:camera.position.y}, jinterval/2);

    createjs.Tween.get(hipsMesh.rotation).to({x:radians(-120)}, jinterval/2).to({x:radians(0)},jinterval/2);
    createjs.Tween.get(hipsMesh2.rotation).to({x:radians(90)}, jinterval/2).to({x:radians(0)},jinterval/2);
    createjs.Tween.get(waistMesh.position).to({y:100}, jinterval/2).to({y:0},jinterval/2);
    createjs.Tween.get(kneeMesh2.rotation).to({x:radians(120)}, jinterval/2).to({x:radians(0)},jinterval/2);
    createjs.Tween.get(torso.rotation).to({x:radians(45)}, jinterval/2).to({x:radians(0)},jinterval/2);
    createjs.Tween.get(shoulderMesh.rotation).to({x:radians(90)}, jinterval/2).to({x:radians(0)},jinterval/2);
    createjs.Tween.get(shoulderMesh2.rotation).to({x:radians(-90)}, jinterval/2).to({x:radians(0)},jinterval/2).call(function(){jumping=false});

}


function jump2(){
  var jinterval = 600
    createjs.Tween.get(camera.position).to({y:camera.position.y + 100}, jinterval/2).to({y:camera.position.y}, jinterval/2);

    createjs.Tween.get(hipsMesh.rotation).to({x:radians(-120)}, jinterval/2).to({x:radians(0)},jinterval/2);
    createjs.Tween.get(hipsMesh2.rotation).to({x:radians(90)}, jinterval/2).to({x:radians(0)},jinterval/2);
    createjs.Tween.get(waistMesh.position).to({y:100}, jinterval/2).to({y:0},jinterval/2);
    createjs.Tween.get(kneeMesh2.rotation).to({x:radians(120)}, jinterval/2).to({x:radians(0)},jinterval/2);
    createjs.Tween.get(waistMesh.rotation).to({x:radians(360)}, jinterval).to({x:radians(0)}, 0);
    createjs.Tween.get(shoulderMesh.rotation).to({x:radians(90)}, jinterval/2).to({x:radians(0)},jinterval/2);
    createjs.Tween.get(shoulderMesh2.rotation).to({x:radians(-90)}, jinterval/2).to({x:radians(0)},jinterval/2).call(function(){jumping=false});

}

//-----------------------------
//------------SLIP-------------
//-----------------------------

function slip(){
    var interval = 600
    createjs.Tween.get(camera.position).to({y:camera.position.y - 100}, interval/2).to({y:camera.position.y}, interval/2);
    createjs.Tween.get(waistMesh.position).to({y:-60}, interval/2).to({y:0},interval/4);
    createjs.Tween.get(waistMesh.rotation).to({x:radians(-90)}, interval/2).to({x:radians(0)},interval/2);
    createjs.Tween.get(torso.rotation).to({x:radians(30)}, interval/2).to({x:radians(0)},interval/2);
    createjs.Tween.get(hipsMesh.rotation).to({x:radians(-80)}, interval/2).to({x:radians(0)},interval/2);
    createjs.Tween.get(hipsMesh2.rotation).to({x:radians(-80)}, interval/2).to({x:radians(0)},interval/2);
    createjs.Tween.get(kneeMesh.rotation).to({x:radians(90)}, interval/2).to({x:radians(0)}, interval/2)
    createjs.Tween.get(kneeMesh2.rotation).to({x:radians(90)}, interval/2).to({x:radians(0)}, interval/2).call(function(){slipping=false;})
    
  
}


function slip1(){
  var interval = 600
  createjs.Tween.get(camera.position).to({y:camera.position.y - 100}, interval/2).to({y:camera.position.y}, interval/2);

  createjs.Tween.get(waistMesh.rotation).to({x:radians(360)}, interval).to({x:radians(0)}, 0);

  createjs.Tween.get(waistMesh.position).to({y:-10}, interval/2).to({y:0},interval/4);
  //createjs.Tween.get(waistMesh.rotation).to({x:radians(-90)}, interval/2).to({x:radians(0)},interval/2);
  createjs.Tween.get(torso.rotation).to({x:radians(30)}, interval/2).to({x:radians(0)},interval/2);
  createjs.Tween.get(hipsMesh.rotation).to({x:radians(-80)}, interval/2).to({x:radians(0)},interval/2);
  createjs.Tween.get(hipsMesh2.rotation).to({x:radians(-80)}, interval/2).to({x:radians(0)},interval/2);
  createjs.Tween.get(kneeMesh.rotation).to({x:radians(90)}, interval/2).to({x:radians(0)}, interval/2)
  createjs.Tween.get(kneeMesh2.rotation).to({x:radians(90)}, interval/2).to({x:radians(0)}, interval/2).call(function(){slipping=false;})
  

}



//-----------------------------
//------------LEFT-------------
//-----------------------------

function left(){
  var interval = 200;
  createjs.Tween.get(waistMesh.position).to({x:waistMesh.position.x + 100}, interval).call(function(){moving=false;});
  createjs.Tween.get(camera.position).to({x:camera.position.x + 100}, interval);
  createjs.Tween.get(waistMesh.rotation).to({y:radians(45)}, interval/2).to({y:radians(0)},interval/2);
  createjs.Tween.get(torso.rotation).to({z:radians(45)}, interval/2).to({z:radians(0)},interval/2);
  
  createjs.Tween.get(waistMesh.position).to({x:waistMesh.position.x + 100}, interval).call(function(){moving=false;});
  createjs.Tween.get(camera.position).to({x:camera.position.x + 100}, interval);
}

function left1(){
  var interval = 200;
  createjs.Tween.get(waistMesh.position).to({x:waistMesh.position.x + 100}, interval).call(function(){moving=false;});
  createjs.Tween.get(camera.position).to({x:camera.position.x + 100}, interval);
  createjs.Tween.get(waistMesh.rotation).to({y:radians(45)}, interval/2).to({y:radians(0)},interval/2);
  createjs.Tween.get(torso.rotation).to({z:radians(45)}, interval/2).to({z:radians(0)},interval/2);
  
  createjs.Tween.get(waistMesh.position).to({x:waistMesh.position.x + 100}, interval).call(function(){moving=false;});
  createjs.Tween.get(camera.position).to({x:camera.position.x + 100}, interval);

  createjs.Tween.get(shoulderMesh.rotation).to({z:radians(75)}, interval).to({z:radians(0)},interval);
  createjs.Tween.get(shoulderMesh2.rotation).to({z:radians(-75)}, interval).to({z:radians(0)},interval);
}



//-----------------------------
//------------RIGHT-------------
//-----------------------------

function right1(){
  var interval = 200;
  createjs.Tween.get(waistMesh.position).to({x:waistMesh.position.x - 100}, interval).call(function(){moving=false;});

  createjs.Tween.get(camera.position).to({x:camera.position.x - 100}, interval)

  createjs.Tween.get(waistMesh.rotation).to({y:radians(-45)}, interval/2).to({y:radians(0)},interval/2);
  createjs.Tween.get(torso.rotation).to({z:radians(-45)}, interval/2).to({z:radians(0)},interval/2);

  createjs.Tween.get(shoulderMesh.rotation).to({z:radians(75)}, interval).to({z:radians(0)},interval);
  createjs.Tween.get(shoulderMesh2.rotation).to({z:radians(-75)}, interval).to({z:radians(0)},interval);
}


function right(){
  var interval = 200;
  createjs.Tween.get(waistMesh.position).to({x:waistMesh.position.x - 100}, interval).call(function(){moving=false;});

  createjs.Tween.get(camera.position).to({x:camera.position.x - 100}, interval)

  createjs.Tween.get(waistMesh.rotation).to({y:radians(-45)}, interval/2).to({y:radians(0)},interval/2);
  createjs.Tween.get(torso.rotation).to({z:radians(-45)}, interval/2).to({z:radians(0)},interval/2);
}
//-----------------------------
//------------DEAD-------------
//-----------------------------

function dead(){
  var interval = 0;


  createjs.Tween.get(camera.position,{override:true}).to({y:camera.position.y});
  createjs.Tween.get(camera.rotation,{override:true}).to({y: radians(0)});

  createjs.Tween.get(texture.offset,{override:true}).to({y:texture.offset.y-10}, 0).to({y:texture.offset.y+10}, 0);
  createjs.Tween.get(texture1.offset,{override:true}).to({y:texture1.offset.y-10}, 0).to({y:texture1.offset.y+10}, 0);
  createjs.Tween.get(texture2.offset,{override:true}).to({y:texture2.offset.y-10}, 0).to({y:texture2.offset.y+10}, 0);


  createjs.Tween.get(hipsMesh.rotation,{override:true}).to({x:radians(0)}, interval/2);
  createjs.Tween.get(hipsMesh2.rotation,{override:true}).to({x:radians(0)}, interval/2);
  createjs.Tween.get(waistMesh.position,{override:true}).to({y:0}, interval/2);
  createjs.Tween.get(kneeMesh.rotation,{override:true}).to({x:radians(0)}, interval/2);
  createjs.Tween.get(kneeMesh2.rotation,{override:true}).to({x:radians(0)}, interval/2);
  createjs.Tween.get(ankleMesh.rotation,{override:true}).to({x:radians(0)}, interval/2);
  createjs.Tween.get(ankleMesh2.rotation,{override:true}).to({x:radians(0)}, interval/2);
  createjs.Tween.get(torso.rotation,{override:true}).to({x:radians(60)}, interval);
  createjs.Tween.get(shoulderMesh.rotation,{override:true}).to({x:radians(-75)}, interval);
  createjs.Tween.get(shoulderMesh2.rotation,{override:true}).to({x:radians(-75)}, interval);
  createjs.Tween.get(elbowMesh.rotation,{override:true}).to({x:radians(0)}, interval/2);
  createjs.Tween.get(elbowMesh2.rotation,{override:true}).to({x:radians(0)}, interval/2);
  

  interval = 1000;



  createjs.Tween.get(waistMesh.position,{override:true}).to({y:-28}, interval/2);
  createjs.Tween.get(kneeMesh.rotation,{override:true}).to({x:radians(120)}, interval/2);
  createjs.Tween.get(kneeMesh2.rotation,{override:true}).to({x:radians(120)}, interval/2);


}

//################################################## FINE A N I M A T I O N S ##################################################
//####### TIMERS #############//////

var velocity = 4000;
//1 left, 2 center, 3 right
var callSpawn = setInterval(function(){
  var val =  Math.floor(Math.random() * (10));
  //low
  if ( val ==0){ //3
    createObject(velocity,1);
    createObject(velocity,2);
    createObject(velocity,3);
  }
  if (val == 1){
    createObject(velocity,1);
    createObject(velocity,2);
  }

  if (val==2){
    createObject(velocity,1);
    createObject1(velocity,2);
    createObject(velocity,3);
  }
  
  if (val==3){
    createObject1(velocity,2);
    createObject1(velocity,3);;
  }
  
  if (val==4){
    createObject(velocity,0);
  }


  if (val==5){
    createObject1(velocity,1);
    createObject(velocity,2);
    createObject1(velocity,3);}

  if (val==6){
    createObject1(velocity,1);
    createObject1(velocity,2);
  }

  if (val==7){
    createObject1(velocity,1);
    createObject1(velocity,3);
  }
  
  //CASI RARI 

  if (val==8){
    createObject1(velocity,1);
    createObject1(velocity,2);
    createObject1(velocity,3);
  }
  
  if (val==9){
    createObject(velocity,1);
    createObject1(velocity,2);

  }
 


  },1000);

  var colors = [
    0x82E0AA,
    0xEBEE63,
    0xAF7AC5,
    0xEEBB63,
    0x85C1E9,
    0x63D1EE,
    0xFDFEFE,
    0x93EE63,
    0xD35CB3,
    0xFFFF00,
    0xFFE1F7,
    0xE2E1FF,
    0x7CFC00,
    0x00FFFF
  ]


  var spectatorSpawn = setInterval(function(){
    var maglietta = colors[Math.floor(Math.random()*(14))];
    var mutande = colors[Math.floor(Math.random()*(14))];
    var scarpe = colors[Math.floor(Math.random()*(14))];
    var pos = Math.floor(Math.random()*(2));
    var type = Math.floor(Math.random()*(4));
    createSpectator(100,10000,maglietta,mutande,scarpe,type,pos);
  },200);


  function stopspawn() {
    clearInterval(spectatorSpawn);
}






//################################################### R E N D E R I N G #//###################################################
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
    //checkCollisions();
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
//##############################################
    renderer.render(scene, camera);


    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();