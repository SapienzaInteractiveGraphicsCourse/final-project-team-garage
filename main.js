//import {Plot} from './palazzo1.js';
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/loaders/FBXLoader.js';

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas, antialias: true });
  renderer.setClearColor(0x87ceeb); 
  //Night
  //renderer.setClearColor(0x131862); 
  renderer.shadowMap.enabled = true;

  const fov = 75;
  const aspect = 2;  // the canvas default
  const near = 1;
  const far = 10000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 200, -400);
  



  var started = false;

  
  const controls = new OrbitControls(camera, canvas);
  controls.enabled=false; 
  controls.target.set(0, 0, 10000);

  //controls.enabled=true; 
  //controls.target.set(0, 0, 0);

  controls.update();
 
  

  //degree to radians
  function radians(degrees) {
    return degrees * Math.PI / 180;
  }



//###################################################### S C E N E ##################################################

  const scene = new THREE.Scene();
  var daylights = [];
  var nightlights = [];
  //FOG
  //scene.fog = new THREE.Fog(0x131862, near, far+5000);
  
  //LIGHTS  

  {
    
    const light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add( light );
    daylights.push(light)
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.4 );
    daylights.push(directionalLight)
    directionalLight.position.set(-500,1000,0);
    scene.add( directionalLight );
    const directionalLight2 = new THREE.DirectionalLight( 0xffffff, 0.4);
    daylights.push(directionalLight2)
    directionalLight2.position.set(+500,1000,0);
    scene.add( directionalLight2 );
    const directionalLight3 = new THREE.DirectionalLight( 0xffffff, 0.4);
    daylights.push(directionalLight3)
    directionalLight3.position.set(0,1000,-1000);
    scene.add( directionalLight3 );
    
    var ambientNightLight = new THREE.AmbientLight( 0x222222);
    ambientNightLight.visible= false;
    nightlights.push(ambientNightLight)
    scene.add(ambientNightLight);
    
  
  }


//###################################################### F I E L D ##################################################



const groundwidth = 10000;  
const groundheight = 10000;  
const grounddepth = 1;
const ground = new THREE.BoxGeometry(groundwidth,groundheight,grounddepth);
const groundtexture = new THREE.TextureLoader().load( './textures/grass.png' );
const groundtexturebump = new THREE.TextureLoader().load( './textures/grass_bump.png' );
groundtexture.wrapS = THREE.RepeatWrapping;
groundtexture.wrapT = THREE.RepeatWrapping;
groundtexture.repeat.set( 100, 100);
groundtexture.anisotropy=24;

const groundMaterial = new THREE.MeshPhongMaterial({map: groundtexture,bumpMap: groundtexturebump});
groundMaterial.shininess = 0;
const groundMesh = new THREE.Mesh(ground,groundMaterial);
groundMesh.position.set(0,0,groundheight*2/4.5);
groundMesh.rotation.x = radians(-90);
scene.add(groundMesh);





//###################################################### S T A D I U M (STADIUM) ##################################################

const stadiumwidth = 10;  
const stadiumheight = 500;  
const stadiumdepth = 10000;
const stadiumTexture = new THREE.TextureLoader().load( './textures/crowd.jpeg' );
stadiumTexture.wrapS = THREE.RepeatWrapping;
stadiumTexture.wrapT = THREE.RepeatWrapping;
stadiumTexture.repeat.set( 10, 1);
stadiumTexture.anisotropy=24;
const stadium = new THREE.BoxGeometry(stadiumwidth,stadiumheight,stadiumdepth);
const stadiumMaterial = new THREE.MeshPhongMaterial({map: stadiumTexture});
stadiumMaterial.shininess=0;
const stadiumMesh = new THREE.Mesh(stadium,stadiumMaterial);
stadiumMesh.position.set(4000,stadiumheight/3,stadiumdepth/2-600);
stadiumMesh.rotation.z = radians(-45);
scene.add(stadiumMesh);


const stadium2width = 10;  
const stadium2height = 500;  
const stadium2depth = 10000;
const stadium2Texture = new THREE.TextureLoader().load( './textures/crowd.jpeg' );
stadium2Texture.wrapS = THREE.RepeatWrapping;
stadium2Texture.wrapT = THREE.RepeatWrapping;
stadium2Texture.repeat.set( 10, 1);
stadium2Texture.anisotropy=24;
const stadium2 = new THREE.BoxGeometry(stadium2width,stadium2height,stadium2depth);
const stadium2Material = new THREE.MeshPhongMaterial({map: stadium2Texture});
stadium2Material.shininess=0;
const stadium2Mesh = new THREE.Mesh(stadium2,stadium2Material);
stadium2Mesh.position.set(-4000,stadium2height/3,stadium2depth/2-600);
stadium2Mesh.rotation.z = radians(45);
scene.add(stadium2Mesh);
//10000
/*
createjs.Tween.get(stadiumTexture.offset,{loop:-1}).to({x:stadiumTexture.offset.x+0.25}, 10000)
createjs.Tween.get(stadium2Texture.offset,{loop:-1}).to({x:stadium2Texture.offset.x-0.25}, 10000)
*/


const roofwidth = 10;  
const roofheight = 250;  
const roofdepth = 10000;
const roof = new THREE.BoxGeometry(roofwidth,roofheight,roofdepth);
const roofMaterial = new THREE.MeshPhongMaterial({color:0xFFFFFF});
const roofMesh = new THREE.Mesh(roof,roofMaterial);
roofMesh.position.set(0,stadiumheight/3+roofheight/2,0);
roofMesh.rotation.z = radians(100);
stadiumMesh.add(roofMesh);

const roof2width = 10;  
const roof2height = 250;  
const roof2depth = 10000;
const roof2 = new THREE.BoxGeometry(roof2width,roof2height,roof2depth);
const roof2Material = new THREE.MeshPhongMaterial({color:0xFFFFFF});
const roof2Mesh = new THREE.Mesh(roof2,roof2Material);
roof2Mesh.position.set(0,stadiumheight/3+roof2height/2,0);
roof2Mesh.rotation.z = radians(-100);
stadium2Mesh.add(roof2Mesh);


const fencewidth = 10;  
const fenceheight = 10000;  
const fencedepth = 150;
const fencetexture = new THREE.TextureLoader().load( './textures/fence.jpeg' );
fencetexture.wrapS = THREE.RepeatWrapping;
fencetexture.wrapT = THREE.RepeatWrapping;
fencetexture.repeat.set( 1, 50);
const fence = new THREE.BoxGeometry(fencewidth,fenceheight,fencedepth);
const fenceMaterial = new THREE.MeshPhongMaterial({map: fencetexture});
const fenceMesh = new THREE.Mesh(fence,fenceMaterial);
const fenceMesh2 = new THREE.Mesh(fence,fenceMaterial);
fenceMesh.position.set(3000,0,0);
fenceMesh2.position.set(-3000,0,0);
groundMesh.add(fenceMesh);
groundMesh.add(fenceMesh2);

const pavementwidth = 2000;  
const pavementheight = 10000;  
const pavementdepth = 10;
const pavement = new THREE.BoxGeometry(pavementwidth,pavementheight,pavementdepth);
const pavementMaterial = new THREE.MeshPhongMaterial({color:0xFFFFFF});
const pavementMesh = new THREE.Mesh(pavement,pavementMaterial);
const pavementMesh2 = new THREE.Mesh(pavement,pavementMaterial);
pavementMesh.position.set(4000,0,0);
pavementMesh2.position.set(-4000,0,0);
groundMesh.add(pavementMesh);
groundMesh.add(pavementMesh2);





//###################################################### T R A C K ##################################################
const trackwidth=  100;  
const trackheight = 10000; 
const trackdepth =  1.0; 

const track= new THREE.BoxGeometry(trackwidth, trackheight, trackdepth);
const texture = new THREE.TextureLoader().load( './textures/track2.png' );
const texture_bump = new THREE.TextureLoader().load( './textures/track2_bump.png' );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 1, 60);
texture.anisotropy=24;


const texture1 = new THREE.TextureLoader().load( './textures/track2.png' );
const texture1_bump = new THREE.TextureLoader().load( './textures/track2_bump.png' );
texture1.wrapS = THREE.RepeatWrapping;
texture1.wrapT = THREE.RepeatWrapping;
texture1.repeat.set( 1, 60);
texture1.anisotropy=24;

const texture2 = new THREE.TextureLoader().load( './textures/track2.png' );
const texture2_bump = new THREE.TextureLoader().load( './textures/track2_bump.png' );
texture2.wrapS = THREE.RepeatWrapping;
texture2.wrapT = THREE.RepeatWrapping;
texture2.repeat.set( 1, 60);
texture2.anisotropy=24;








const trackMaterial = new THREE.MeshPhongMaterial({map: texture1,bumpMap: texture_bump});
const trackMaterial2 = new THREE.MeshPhongMaterial({map: texture, bumpMap: texture1_bump});
const trackMaterial3 = new THREE.MeshPhongMaterial({map: texture2, bumpMap: texture2_bump});
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

  const postheight =  60;  
  const railwidth =  110;  
  const railheight =  10;  
  const raildepth = 2;  

  const rail= new THREE.BoxGeometry(railwidth, railheight, raildepth);
  const railMaterial = new THREE.MeshPhongMaterial({map: railtexture});
  const railMesh = new THREE.Mesh(rail, railMaterial);

  railMesh.position.set(0,postheight,0);
  obstacle.add(railMesh);

  const postwidth =  10;  
  const postdepth = 2;  

  const post= new THREE.BoxGeometry(postwidth, postheight, postdepth);
  const postMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
  const postMesh = new THREE.Mesh(post, postMaterial);
  const postMesh2 = new THREE.Mesh(post, postMaterial);
  postMesh.position.set(-railwidth/2+10,postheight/2,-postdepth);
  postMesh2.position.set(railwidth/2-10,postheight/2,-postdepth);
  obstacle.add(postMesh);
  obstacle.add(postMesh2);


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

  
  createjs.Tween.get(obstacle.position).to({z:-500}, interval).call(function(){scene.remove(obstacle),obstacles.shift()});
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
  brailMesh.position.set(0,postheight*7/10,-braildepth/2);
  obstacle.add(brailMesh);

  createjs.Tween.get(obstacle.position).to({z:-500}, interval).call(function(){scene.remove(obstacle);highobstacles.shift()});
}

function stopObstacles(){
 var interval = 0;
 for(var i=0; i<obstacles.length; i++) {
  createjs.Tween.get(obstacles[i].position, {override:true}).to(obstacles[i].position.z,interval);
 }
 for(var i=0; i<highobstacles.length; i++) {
  createjs.Tween.get(highobstacles[i].position, {override:true}).to(highobstacles[i].position.z,interval);
}
for(var i=0; i<spectators.length; i++) {
  createjs.Tween.get(spectators[i].position, {override:true}).to(spectators[i].position.z,interval);
}
createjs.Tween.get(groundtexture.offset,{override:true}).to({y:groundtexture.offset.y-20}, 0)
createjs.Tween.get(bannerMesh.position,{override:true}).to({z:bannerMesh.position.z},0);
createjs.Tween.get(bannerMesh2.position,{override:true}).to({z:bannerMesh2.position.z},0);

for (var i=0; i<displays.length;i++){
  createjs.Tween.get(displays[i].position, {override:true}).to(displays[i].position.z,interval);
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




function dist3d (v1, v2 )
{
    var dx = v1.x - v2.x;
    var dy = v1.y - v2.y;
    var dz = v1.z - v2.z;
    return Math.sqrt( dx * dx + dy * dy + dz * dz );
}


function checkCollisions(god){
  if (!god){
  var dist = 150;
  if (dead1){return}
  for (var i = 0; i < obstacles.length ; i++){
      if ( Math.abs(obstacles[i].position.x - waistMesh.position.x )<50 && jumping == false && Math.abs(obstacles[i].position.z)<dist){
        
          stopspawn();
          dead();
          stopObstacles();
          dead1=true;
      }
  }
  for (var i = 0; i < highobstacles.length ; i++){
    if ( Math.abs(highobstacles[i].position.x - waistMesh.position.x )<50 && slipping == false && Math.abs(highobstacles[i].position.z)<dist){
        
        stopspawn();
        dead();
        stopObstacles();
        dead1=true;
    }
}
  }
}

//##################################################### LAMP #################################################################
var lamps = [];
var lampsMaterial = [];

function createlamp(side,posz){
  var radiusTop = 40; 
  var radiusBottom = 40;  
  var height = 1500;  
  var height2 = 500;
  var radius2 = 20;
  var radialSegments = 12;  
  var heightSegments = 2;  

  var openEnded = false;  
  var thetaStart = Math.PI * 0.25;  

  var thetaLength = Math.PI * 1.5;  

  var bottomCylinder = new THREE.CylinderGeometry(
    radiusTop, radiusBottom, height,
    radialSegments);

  var topCylinder = new THREE.CylinderGeometry(
    radius2, radius2, height,
    radialSegments)
  var  material = new THREE.MeshPhongMaterial({color:0xFFFFFF});
  var lampMesh = new THREE.Mesh(bottomCylinder,material);
  lampMesh.position.z = posz
  var lampMesh2  = new THREE.Mesh(topCylinder,material);
  lampMesh.position.y = height/2;
  lampMesh2.position.y = height2
  



  scene.add(lampMesh);
  lamps.push(lampMesh);
  lampMesh.add(lampMesh2);
  

var width = 300;  
var height = 300;  
var depth = 25;  
var geometry2 = new THREE.BoxGeometry(width, height, depth);




var lighttexture = new THREE.TextureLoader().load( './textures/lamp.png' );
lighttexture.anisotropy=24;
var  material2 = new THREE.MeshStandardMaterial({emissive:0xFFFFFF,emissiveMap: lighttexture});
lampsMaterial.push(material2);
var mesh = new THREE.Mesh(geometry2,material2);
var mesh2 = new THREE.Mesh(geometry2,material);
mesh.position.y = height2+100;
mesh.position.z = -100;
mesh2.position.y = height2+120;
mesh2.position.z = -70;
lampMesh2.add(mesh);
lampMesh2.add(mesh2);
mesh.rotation.x = radians(-45);
mesh2.rotation.x = radians(-45);

if (side==0){
  lampMesh.rotation.y = radians(90);
  lampMesh.position.x = 4800;
}
else{
  lampMesh.rotation.y = radians(-90);
  lampMesh.position.x = -4800;
}



const spotLight = new THREE.SpotLight( 0xFFFFFF,2.5,6500,radians(90),1);
spotLight.visible=false;
spotLight.position.set( 0, 500, 0);
//const helper = new THREE.SpotLightHelper(spotLight)

spotLight.castShadow = false;

spotLight.shadow.mapSize.width = 512;
spotLight.shadow.mapSize.height = 512;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 0;
nightlights.push(spotLight);
mesh.add( spotLight );

}






createlamp(1,0);
createlamp(0,0);
createlamp(1,2000);
createlamp(0,2000);
createlamp(1,4000);
createlamp(0,4000);
createlamp(1,6000);
createlamp(0,6000);
createlamp(1,8000);
createlamp(0,8000);
createlamp(1,10000);
createlamp(0,10000);

function switchLamps(color){
  for (var i=0;i<lampsMaterial.length;i++){
    lampsMaterial[i].emissive.setHex(color)
  }
}

function updatelamps(velocity){
  for (var i=0; i<lamps.length;i++){
    var lamp = lamps[i];
    lamp.position.z-=velocity;
    if (lamp.position.z<0){
      lamp.position.z = 10000;
    }
  }
}

//######################################################DISPLAY###############################################################
var displays = []

function createDisplay(xpos,velocity){
  var displayObject = new THREE.Object3D();
  scene.add(displayObject);
  displayObject.position.x = xpos;
  displayObject.position.z = 10000;
  //box value
  displays.push(displayObject);
  var standwidth = 1000;
  var standheight = 100;
  var standdepth = 100;


  var displayradius = 200;  
  var displaytubeRadius = 20;  
  var displayradialSegments = 80;  
  var displatubularSegments = 240;  
  var displayMaterial = new THREE.MeshPhongMaterial({color: 0xF4C300});
  var display = new THREE.TorusGeometry(displayradius, displaytubeRadius,displayradialSegments, displatubularSegments);
  var displayMesh = new THREE.Mesh(display, displayMaterial);
  displayMesh.position.set(displayradius+displayradius/4,displayradius+standheight+displaytubeRadius/2,0);
  displayObject.add(displayMesh);

  //CIRCLE 2

  var displayMaterial2 = new THREE.MeshPhongMaterial({color: 0x009F3D});
  var display2 = new THREE.TorusGeometry(displayradius, displaytubeRadius,displayradialSegments, displatubularSegments);
  var displayMesh2 = new THREE.Mesh(display2, displayMaterial2);
  displayMesh2.position.set(-displayradius-displayradius/4,displayradius+standheight+displaytubeRadius/2,0);
  displayObject.add(displayMesh2)
  
  //CIRCLE 3

  var displayMaterial3 = new THREE.MeshPhongMaterial({color: 0x000000});
  var display3 = new THREE.TorusGeometry(displayradius, displaytubeRadius,displayradialSegments, displatubularSegments);
  var displayMesh3 = new THREE.Mesh(display3, displayMaterial3);
  displayMesh3.position.set(0,displayradius+displayradius*6/7+standheight+displaytubeRadius/2,displaytubeRadius);
  displayObject.add(displayMesh3)

  //CIRCLE 4

  var displayMaterial4 = new THREE.MeshPhongMaterial({color: 0x0085C7});
  var display4 = new THREE.TorusGeometry(displayradius, displaytubeRadius,displayradialSegments, displatubularSegments);
  var displayMesh4 = new THREE.Mesh(display4, displayMaterial4);
  displayMesh4.position.set(displayradius+displayradius+displayradius/2,displayradius+displayradius*6/7+standheight+displaytubeRadius/2,displaytubeRadius);
  displayObject.add(displayMesh4)

  //CIRCLE 5

  var displayMaterial5 = new THREE.MeshPhongMaterial({color: 0xDF0024});
  var display5 = new THREE.TorusGeometry(displayradius, displaytubeRadius,displayradialSegments, displatubularSegments);
  var displayMesh5 = new THREE.Mesh(display5, displayMaterial5);
  displayMesh5.position.set(-displayradius-displayradius-displayradius/2,displayradius+displayradius*6/7+standheight+displaytubeRadius/2,displaytubeRadius);
  displayObject.add(displayMesh5)

  //STAND
  var stand= new THREE.BoxGeometry(standwidth, standheight, standdepth);
  var standMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
  var standMesh = new THREE.Mesh(stand, standMaterial);
  standMesh.position.set(0,standheight/2,0);
  displayObject.add(standMesh);
  createjs.Tween.get(displayObject.position).to({z:-500}, velocity).call(function(){scene.remove(displayObject),displays.shift()});
  
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
waistMaterial.shininess=0;
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
hipsMaterial.shininess = 0;
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
const height = 35.0;  
const radialSegments = 11;  
const leg= new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
const legMaterial = new THREE.MeshPhongMaterial({color: 0xCC8866});
legMaterial.shininess=0;
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
kneeMaterial.shininess = 0;
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
calfMaterial.shininess = 0;
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
const heightTibia = 30.0;  
const radialSegmentsTibia = 11;  
const Tibia= new THREE.CylinderGeometry(radiusTopTibia, radiusBottomTibia, heightTibia, radialSegmentsTibia);
const TibiaMaterial = new THREE.MeshPhongMaterial({color: 0xCC8866});
TibiaMaterial.shininess = 0;
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
ankleMaterial.shininess = 0;
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
footMaterial.shininess = 0;
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
footMaterial2.shininess = 0;
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
shoulderMaterial.shininess = 0;
const shoulderMesh = new THREE.Mesh(shoulder, shoulderMaterial);
const shoulderMesh2 = new THREE.Mesh(shoulder, shoulderMaterial);
shoulderMesh.position.set(toptorsoradiusTop+shoulderRadius/2,bottomtorsoheight+toptorsoheight-10,0);
shoulderMesh2.position.set(-toptorsoradiusTop-shoulderRadius/2,bottomtorsoheight+toptorsoheight-10,0);
torso.add(shoulderMesh);
torso.add(shoulderMesh2);





//-------------------------------
//------------UPPER ARMS---------
//-------------------------------
const upperArmradiusTop = 3;  
const upperArmradiusBottom =3;  
const upperArmheight = 25;  
const upperArmradialSegments = 50;  
const upperArm = new THREE.CylinderGeometry(upperArmradiusTop, upperArmradiusBottom, upperArmheight, upperArmradialSegments);
const upperArmMaterial = new THREE.MeshPhongMaterial({color: 0xCC8866});
upperArmMaterial.shininess = 0;
const upperArmMesh = new THREE.Mesh(upperArm, upperArmMaterial);
upperArmMesh.position.set(4,-shoulderRadius/2-upperArmheight/2,0);

const upperArmMesh2 = new THREE.Mesh(upperArm, upperArmMaterial);
upperArmMesh2.position.set(-4,-shoulderRadius/2-upperArmheight/2,0);
shoulderMesh.add(upperArmMesh);
shoulderMesh2.add(upperArmMesh2);

//-----------------------------
//------------ELBOW------------
//-----------------------------

const elbowRadius =  4; 
const elbowwidthSegments = 30;  
const elbowheightSegments = 30;  

const elbow = new THREE.SphereGeometry(elbowRadius, elbowwidthSegments, elbowheightSegments);
const elbowMaterial = new THREE.MeshPhongMaterial({color: 0xCC8866});
elbowMaterial.shininess = 0;
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
lowerArmMaterial.shininess = 0;
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
polsoMaterial.shininess = 0;
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
handMaterial.shininess = 0;
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
neckMaterial.shininess = 0;
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
headMaterial.shininess = 0;
const headMesh = new THREE.Mesh(head, headMaterial);
const headMesh2 = new THREE.Mesh(head, headMaterial);
headMesh.position.set(0,neckheight/2+headRadius/2,0);

neckMesh.add(headMesh);

human.position.set(0,radius+height+heightTibia+heightFoot1+2.5+grounddepth+trackdepth+2.5,0);



//HEADCAMERA
function makeCamera(fov) {
  const aspect = 2;  // the canvas default
  const zNear = 1;
  const zFar = 10000;
  return new THREE.PerspectiveCamera(fov, aspect, zNear, zFar);
}
const tankCameraFov = 75;
const camera2 = makeCamera(tankCameraFov);
camera2.position.y = 80;
camera2.position.z = -15;
camera2.lookAt(0,1,10000)
human.add(camera2);


//###################################################### E V E N T - L I S T E N E R ##################################################
//======= HUMAN POS =======//
var pos = 0;
var jumping = false;
var moving = false;
var slipping = false;
var dead1 = false;



document.addEventListener('keydown', function(event) {
  if (dead1 || !started){return};
  if( event.keyCode == 87|| event.keyCode == 38) {
      if (jumping==false && slipping==false){
        var ranjump = Math.floor(Math.random() * (2));
        jumping = true;
        if (ranjump==1){
          jump()
        }
        else{jump2();}
      }
  
  }

  if(event.keyCode == 65 || event.keyCode ==37 ) {
    if (dead1 || !started){return};
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
  if(event.keyCode == 68 || event.keyCode ==39  ) {
    if (dead1 || !started){return};
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
  if(event.keyCode == 83|| event.keyCode ==40 ) {
    if (dead1 || !started){return};
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
  createjs.Tween.get(spectator.position).to({z:-500},8000).call(function(){scene.remove(spectator),spectators.shift()});

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
  


    createjs.Tween.get(camera2.position, {loop:-1}).to({y:camera2.position.y + 5}, interval/2).to({y:camera2.position.y}, interval/2);
    createjs.Tween.get(camera2.rotation, {loop:-1}).to({y: radians(0.1)}, interval).to({y:radians(-0.1)}, interval);
    
    createjs.Tween.get(hipsMesh.rotation, {loop:-1}).to({x:radians(-85)}, interval/2).to({x:radians(75)}, interval).to({x:radians(0)}, interval/2);
    createjs.Tween.get(hipsMesh2.rotation, {loop:-1}).to({x:radians(85)}, interval/2).to({x:radians(-75)},interval).to({x:radians(0)}, interval/2);
    createjs.Tween.get(waistMesh.position, {loop:-1}).to({y:20}, interval/2).to({y:0},interval/2);
    createjs.Tween.get(kneeMesh.rotation, {loop:-1}).to({x:radians(90)}, interval).to({x:radians(0)}, interval);
    createjs.Tween.get(kneeMesh2.rotation, {loop:-1}).to({x:radians(90)}, interval).to({x:radians(0)}, interval);
    createjs.Tween.get(ankleMesh.rotation, {loop:-1}).to({x:radians(-15)}, interval).to({x:radians(0)}, interval/2);
    createjs.Tween.get(ankleMesh2.rotation, {loop:-1}).to({x:radians(-15)}, interval).to({x:radians(0)}, interval/2);
    createjs.Tween.get(torso.rotation, {loop:-1}).to({y:radians(20)},interval/2).to({y:radians(-20)},interval).to({y:radians(0)},interval/2);
  
    createjs.Tween.get(shoulderMesh.rotation, {loop:-1}).to({x:radians(75)}, interval/2).to({x:radians(-75)}, interval).to({x:radians(0)}, interval/2);
    createjs.Tween.get(shoulderMesh2.rotation, {loop:-1}).to({x:radians(-75)}, interval/2).to({x:radians(75)}, interval).to({x:radians(0)}, interval/2);
    createjs.Tween.get(elbowMesh.rotation, {loop:-1}).to({x:radians(-120)}, interval).to({x:radians(-90)}, interval);
    createjs.Tween.get(elbowMesh2.rotation, {loop:-1}).to({x:radians(-120)}, interval).to({x:radians(-90)}, interval);
    //controls
}



//-----------------------------
//------------JUMP-------------
//-----------------------------


function jump(){
    var jinterval = 600
  
    createjs.Tween.get(camera.position).to({y:camera.position.y + 100}, jinterval/2).to({y:camera.position.y}, jinterval/2);

    createjs.Tween.get(camera2.position).to({y:camera2.position.y + 100}, jinterval/2).to({y:camera2.position.y}, jinterval/2);
    

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
    createjs.Tween.get(camera2.position).to({y:camera2.position.y + 100}, jinterval/2).to({y:camera2.position.y}, jinterval/2);
    
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
    createjs.Tween.get(camera2.position).to({y:camera2.position.y - 100}, interval/2).to({y:camera2.position.y}, interval/2);

    createjs.Tween.get(waistMesh.position).to({y:-85}, interval/2).to({y:0},interval/4);
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
createjs.Tween.get(camera2.position).to({y:camera2.position.y - 100}, interval/2).to({y:camera2.position.y}, interval/2);
  createjs.Tween.get(waistMesh.rotation).to({x:radians(360)}, interval).to({x:radians(0)}, 0);

  


  createjs.Tween.get(waistMesh.position).to({y:-10}, interval/2).to({y:0},interval/4);
  //createjs.Tween.get(waistMesh.rotation).to({x:radians(-90)}, interval/2).to({x:radians(0)},interval/2);
  createjs.Tween.get(torso.rotation).to({x:radians(30)}, interval/2).to({x:radians(0)},interval/2);
  createjs.Tween.get(hipsMesh.rotation).to({x:radians(-150)}, interval/2).to({x:radians(0)},interval/2);
  createjs.Tween.get(hipsMesh2.rotation).to({x:radians(-150)}, interval/2).to({x:radians(0)},interval/2);
  createjs.Tween.get(kneeMesh.rotation).to({x:radians(180)}, interval/2).to({x:radians(0)}, interval/2)
  createjs.Tween.get(kneeMesh2.rotation).to({x:radians(180)}, interval/2).to({x:radians(0)}, interval/2).call(function(){slipping=false;})
  

}



//-----------------------------
//------------LEFT-------------
//-----------------------------

function left(){
  var interval = 200;
  createjs.Tween.get(waistMesh.position).to({x:waistMesh.position.x + 100}, interval).call(function(){moving=false;});
  createjs.Tween.get(camera.position).to({x:camera.position.x + 100}, interval);

  createjs.Tween.get(camera2.position).to({x:camera2.position.x + 100}, interval);

  createjs.Tween.get(waistMesh.rotation).to({y:radians(45)}, interval/2).to({y:radians(0)},interval/2);
  createjs.Tween.get(torso.rotation).to({z:radians(45)}, interval/2).to({z:radians(0)},interval/2);
  
  createjs.Tween.get(waistMesh.position).to({x:waistMesh.position.x + 100}, interval).call(function(){moving=false;});
  createjs.Tween.get(camera.position).to({x:camera.position.x + 100}, interval);
  createjs.Tween.get(camera2.position).to({x:camera2.position.x + 100}, interval);
}

function left1(){
  var interval = 200;
  createjs.Tween.get(waistMesh.position).to({x:waistMesh.position.x + 100}, interval).call(function(){moving=false;});
  createjs.Tween.get(camera.position).to({x:camera.position.x + 100}, interval);
  createjs.Tween.get(camera2.position).to({x:camera2.position.x + 100}, interval);
  createjs.Tween.get(waistMesh.rotation).to({y:radians(45)}, interval/2).to({y:radians(0)},interval/2);
  createjs.Tween.get(torso.rotation).to({z:radians(45)}, interval/2).to({z:radians(0)},interval/2);
  
  createjs.Tween.get(waistMesh.position).to({x:waistMesh.position.x + 100}, interval).call(function(){moving=false;});
  createjs.Tween.get(camera.position).to({x:camera.position.x + 100}, interval);
  createjs.Tween.get(camera2.position).to({x:camera2.position.x + 100}, interval);
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
  createjs.Tween.get(camera2.position).to({x:camera2.position.x - 100}, interval)
  createjs.Tween.get(waistMesh.rotation).to({y:radians(-45)}, interval/2).to({y:radians(0)},interval/2);
  createjs.Tween.get(torso.rotation).to({z:radians(-45)}, interval/2).to({z:radians(0)},interval/2);

  createjs.Tween.get(shoulderMesh.rotation).to({z:radians(75)}, interval).to({z:radians(0)},interval);
  createjs.Tween.get(shoulderMesh2.rotation).to({z:radians(-75)}, interval).to({z:radians(0)},interval);
}


function right(){
  var interval = 200;
  createjs.Tween.get(waistMesh.position).to({x:waistMesh.position.x - 100}, interval).call(function(){moving=false;});

  createjs.Tween.get(camera.position).to({x:camera.position.x - 100}, interval)
  createjs.Tween.get(camera2.position).to({x:camera2.position.x - 100}, interval)
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


  createjs.Tween.get(camera2.position,{override:true}).to({y:camera2.position.y});
  createjs.Tween.get(camera2.rotation,{override:true}).to({y: radians(0)});

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
  createjs.Tween.get(torso.rotation,{override:true}).to({x:radians(75)}, interval);
  createjs.Tween.get(shoulderMesh.rotation,{override:true}).to({x:radians(-75)}, interval);
  createjs.Tween.get(shoulderMesh2.rotation,{override:true}).to({x:radians(-75)}, interval);
  createjs.Tween.get(elbowMesh.rotation,{override:true}).to({x:radians(0)}, interval/2);
  createjs.Tween.get(elbowMesh2.rotation,{override:true}).to({x:radians(0)}, interval/2);


  

  interval = 1000;



  createjs.Tween.get(waistMesh.position,{override:true}).to({y:-35}, interval/2);
  createjs.Tween.get(kneeMesh.rotation,{override:true}).to({x:radians(120)}, interval/2);
  createjs.Tween.get(kneeMesh2.rotation,{override:true}).to({x:radians(120)}, interval/2);


}
//##################################################START###############################################################

function startPosition(){
 waistMesh.position.y -= 35;
 kneeMesh.rotation.x = radians(120);
 kneeMesh2.rotation.x = radians(120);
 hipsMesh2.rotation.x = radians(-60);
 ankleMesh2.rotation.x = radians(-60);
 shoulderMesh.rotation.x = radians(-90);
 shoulderMesh2.rotation.x = radians(-90);
 elbowMesh.rotation.x = radians(0);
 elbowMesh2.rotation.x = radians(0);
 torso.rotation.x = radians(70);
}


function startRunning(){
  var interval = 700;
  createjs.Tween.get(waistMesh.position,{override:true}).to({y:0}, interval);
  createjs.Tween.get(kneeMesh.rotation,{override:true}).to({x:radians(0)}, interval);
  createjs.Tween.get(kneeMesh2.rotation,{override:true}).to({x:radians(0)}, interval);
 createjs.Tween.get(hipsMesh.rotation,{override:true}).to({x:radians(0)}, interval);
 createjs.Tween.get(hipsMesh2.rotation,{override:true}).to({x:radians(0)}, interval);
 createjs.Tween.get(shoulderMesh.rotation,{override:true}).to({x:radians(0)}, interval);
  createjs.Tween.get(shoulderMesh2.rotation,{override:true}).to({x:radians(0)}, interval);
  createjs.Tween.get(elbowMesh.rotation,{override:true}).to({x:radians(-90)}, interval);
  createjs.Tween.get(elbowMesh2.rotation,{override:true}).to({x:radians(-90)}, interval);
 createjs.Tween.get(torso.rotation,{override:true}).to({x:radians(0)}, interval).call(run);
}
startPosition();

//################################################## FINE A N I M A T I O N S ##################################################
//####### TIMERS #############//////

var velocity = 8000;

//1 left, 2 center, 3 right
function creatOstacoli(){
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
}




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

  function Sspawn(){
    var maglietta = colors[Math.floor(Math.random()*(14))];
    var mutande = colors[Math.floor(Math.random()*(14))];
    var scarpe = colors[Math.floor(Math.random()*(14))];
    var pos = Math.floor(Math.random()*(2));
    var type = Math.floor(Math.random()*(4));
    createSpectator(100,10000,maglietta,mutande,scarpe,type,pos);
  }

  

  var velocity1 = 25000;
  


  var displaySpawn;
  var spectatorSpawn;
  var callSpawn;

  function stopspawn() {
    clearInterval(displaySpawn);
    clearInterval(spectatorSpawn);
    clearInterval(callSpawn);
}

//######################################################### GUI ################################################################

var day = false;
function changeDaytime(type){
  day  = !day;
  if (day){
    switchLamps(0x101010);
    
    renderer.setClearColor(0x87ceeb); 
    for (var i=0;i<daylights.length;i++){
      daylights[i].visible=true;
    }
    for (var i=0;i<nightlights.length;i++){
      nightlights[i].visible=false;
    }
  }
  else{
    switchLamps(0xFFFFFF)
    renderer.setClearColor(0x131862); 
    for (var i=0;i<daylights.length;i++){
      daylights[i].visible=false;
    }
    for (var i=0;i<nightlights.length;i++){
      nightlights[i].visible=true;
    }
  }
}

//var obstacles = []
//var highobstacles = []









function restart(){
  var maglietta = obj.jersey.toString(16);
  var pantaloni = obj.pants.toString(16);
  var shoes = obj.shoes.toString(16);
  var fp = obj.first_person;
  document.location.href = "?var1="+maglietta+"&var2="+pantaloni+"&var3="+shoes+"&var4="+day+"&var5="+fp;
}

function findGetParameter(parameterName) {
  var result = null,
      tmp = [];
  location.search
      .substr(1)
      .split("&")
      .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
      });
  return result;
}



function startgame(){
  if (started==false){
   callSpawn = setInterval(creatOstacoli,2000);
   spectatorSpawn = setInterval(Sspawn,200);
  createDisplay(2000,25000);
  createDisplay(-2000,25000);

  displaySpawn= setInterval(function(){
    createDisplay(2000,velocity1);
    createDisplay(-2000,velocity1);
  },25000);
  startRunning();
  run();
  createjs.Tween.get(bannerMesh.position,{loop:-1}).to({z:bannerMesh.position.z-5000},4000);
  createjs.Tween.get(bannerMesh2.position,{loop:-1}).to({z:bannerMesh2.position.z-5000},4000);
  createjs.Tween.get(groundtexture.offset,{loop:-1}).to({y:groundtexture.offset.y-20}, 50).to({y:groundtexture.offset.y+20}, 50);
  createjs.Tween.get(texture.offset,{loop:-1}).to({y:texture.offset.y-20}, 50).to({y:texture.offset.y+20}, 50);
createjs.Tween.get(texture1.offset,{loop:-1}).to({y:texture1.offset.y-20}, 50).to({y:texture1.offset.y+20}, 50);
createjs.Tween.get(texture2.offset,{loop:-1}).to({y:texture2.offset.y-20}, 50).to({y:texture2.offset.y+10}, 50);
  started = true;
}
}




var obj = {
  god_mode: false,
  first_person: false,

  maxSize: 6.0,
  speed: 5,

  height: 10,
  noiseStrength: 10.2,
  growthSpeed: 0.2,

  type: 'day',


  Restart: restart,

  Start: startgame,
  

  change_day_time: changeDaytime,

  jersey: 0x6495ED, 
  pants: 0x6495ED, 
  shoes: 0xDFFF00 
};

var m = findGetParameter("var1");
var p = findGetParameter("var2");
var s = findGetParameter("var3");
var d = findGetParameter("var4");
var g = findGetParameter("var5");
if (m!=null){obj.jersey=parseInt(m, 16);}
if (p!=null){obj.pants=parseInt(p, 16);}
if (s!=null){obj.shoes=parseInt(s,16);}
if (d!=null){
  if (d=="true"){
    day=false;
  }
  else{
    day=true;
  }
}
if (g!=null){
  if (g=="true"){
    obj.first_person=true;
  }
  else{
    obj.first_person=false;
  }
}
changeDaytime();







var gui = new dat.gui.GUI();


gui.add(obj, 'god_mode');
gui.add(obj, 'first_person');
gui.add(obj, 'change_day_time');
gui.add(obj,'Restart');
gui.add(obj,'Start')
var f1 = gui.addFolder('Customize Outfit');
f1.addColor(obj, 'jersey');
f1.addColor(obj, 'pants');
f1.addColor(obj, 'shoes');





function updateOutfit(){
  bottomtorsoMaterial.color.setHex(obj.jersey);
  toptorsoMaterial.color.setHex(obj.jersey);

  waistMaterial.color.setHex(obj.pants);
  hipsMaterial.color.set(obj.pants);

  footMaterial.color.setHex(obj.shoes);
  footMaterial2.color.setHex(obj.shoes);




}

function updateStadium(){
  if (!dead1 && started){
    stadiumTexture.offset.x +=0.001;
    stadium2Texture.offset.x -=0.001;
  }
}




renderer.render(scene, camera2);

//############STATS##############

var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

//################################################### R E N D E R I N G #//###################################################
  function resizeRendererToDisplaySize(renderer) {
    stats.begin();
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
    if (obj.first_person==true){
    renderer.render(scene, camera2);
    headMesh.visible=false;
toptorsoMesh.visible=false;
bottomtorsoMesh.visible=false;
    }
    else{
      renderer.render(scene, camera);
      headMesh.visible=true;
toptorsoMesh.visible=true;
bottomtorsoMesh.visible=true;
    }
    
    updateStadium();
    checkCollisions(obj.god_mode);
    updateOutfit()
    stats.end();
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();