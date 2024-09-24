import './style.css'
import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {CSS2DObject, CSS2DRenderer} from 'three/examples/jsm/renderers/CSS2DRenderer'
import {CSS3DObject, CSS3DRenderer} from 'three/examples/jsm/renderers/CSS3DRenderer'
import { degToRad } from 'three/src/math/MathUtils'
import '@justinribeiro/lite-youtube'

//Setup of scene

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30)
camera.position.setX(300)
camera.position.setY(-100)

renderer.render(scene, camera)



//Loader


//threejs loader

const loadingManager = new THREE.LoadingManager( () => {
	
  const loadingScreen = document.getElementById( 'loading-screen' );
  loadingScreen.classList.add( 'fade-out' );
  
  // optional: remove loader from DOM via event listener
  loadingScreen.addEventListener( 'transitionend', onTransitionEnd );
  
} );

const loader = new GLTFLoader(loadingManager);
const imageloader = new THREE.ImageLoader(loadingManager)


function onTransitionEnd( event ) {

	event.target.remove();
	
}

//plane for underneath the grid

const planeGeometry = new THREE.PlaneGeometry( 300, 350, 20, 20 );
const planematerial = new THREE.MeshBasicMaterial( { color: 0x00002B } );
const planeobject = new THREE.Mesh( planeGeometry, planematerial );
planeobject.rotateX(-Math.PI * 0.5);
planeobject.position.setY(-1)
scene.add( planeobject );

//background plane

const backgroundTexture = new THREE.TextureLoader().load('Scenery/angryimg.webp'); 
const planeGeometry1 = new THREE.PlaneGeometry( 500, 200, 20, 20 );
const planematerial1 = new THREE.MeshBasicMaterial( { map: backgroundTexture } );
const planeobject1 = new THREE.Mesh( planeGeometry1, planematerial1 );
planeobject1.position.setY(99)
planeobject1.position.setZ(-200)
scene.add(planeobject1);

//stars

const points = []
for(let i=0;i<6000;i++) {
    let star = new THREE.Vector3(
    Math.random() * 600 - 300,
    Math.random() * 600,
    Math.random() * 600 - 300
  );
  star.velocity = 0.2;
  points.push(star);
}
let starGeo = new THREE.BufferGeometry().setFromPoints(points);


let sprite = new THREE.TextureLoader().load( 'Scenery/whitecirle.webp' );
let starMaterial = new THREE.PointsMaterial({
  color: 0xaaaaaa,
  size: 0.7,
  map: sprite
});

const stars = new THREE.Points(starGeo,starMaterial);
scene.add(stars);

//gridhelper startscreen

var gridhelper = new THREE.GridHelper(300, 50, 0x1F51FF, 0x1F51FF)
scene.add(gridhelper)

//camera function for transition

function tweenCamera( targetPosition, duration, linear ) {

  var position = new THREE.Vector3().copy( camera.position );
  if (linear == false) {
    var tween = new TWEEN.Tween( position )
        .to( targetPosition, duration )
        .easing( TWEEN.Easing.Quartic.InOut )
        .onUpdate( function () {
            camera.position.copy( position );
        } )
        .onComplete( function () {
            camera.position.copy( targetPosition );
        } )
        .start();
  } else {
    var tween2 = new TWEEN.Tween( position )
        .to( targetPosition, duration )
        .easing( TWEEN.Easing.Linear.None )
        .onUpdate( function () {
            camera.position.copy( position );
        } )
        .onComplete( function () {
            camera.position.copy( targetPosition );
        } )
        .start();
  }
}

//text in 3d so it moves at the same time

const moonDiv = document.getElementById('startPage')
const moonLabel = new CSS3DObject( moonDiv );
moonLabel.scale.set(0.01, 0.01, 0.01)
moonLabel.position.set( 0, 3.8, 17);
scene.add(moonLabel)

moonDiv.onclick = function() {
  tweenCamera(new THREE.Vector3( 0, -100, 30 ), 3000, false);
}



const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize( window.innerWidth, window.innerHeight );
labelRenderer.domElement.style.position = 'fixed';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.width = '99%';
document.body.appendChild( labelRenderer.domElement );

const labelRenderer3D = new CSS3DRenderer();
labelRenderer3D.setSize( window.innerWidth, window.innerHeight );
labelRenderer3D.domElement.style.position = 'fixed';
labelRenderer3D.domElement.style.top = '0px';
document.body.appendChild( labelRenderer3D.domElement );


const arrowUpSecondScreenElement = document.getElementById('second-screen-up');
const arrowUpSecondScreen = new CSS3DObject(arrowUpSecondScreenElement);
arrowUpSecondScreen.position.set(0, -97.8, 23);
arrowUpSecondScreen.scale.set(0.015, 0.015, 0.015);
scene.add(arrowUpSecondScreen);

arrowUpSecondScreenElement.onclick = function() {
  tweenCamera(new THREE.Vector3( 0, 4, 30 ), 3000, false);
}

const arrowDownSecondScreenElement = document.getElementById('second-screen-down')
const arrowDownSecondScreen = new CSS3DObject(arrowDownSecondScreenElement);
arrowDownSecondScreen.position.set(0, -102.2, 23);
arrowDownSecondScreen.scale.set(0.015, 0.015, 0.015);
scene.add(arrowDownSecondScreen);

arrowDownSecondScreenElement.onclick = function() {
  tweenCamera(new THREE.Vector3( 0, -400, 30 ), 3000, false);
  thirdScreenAnimation();
}

const arrowUpThirdScreenElement = document.getElementById('third-screen-up')
const arrowUpThirdScreen = new CSS3DObject(arrowUpThirdScreenElement);
arrowUpThirdScreen.position.set(0, -397.8, 23);
arrowUpThirdScreen.scale.set(0.015, 0.015, 0.015);
scene.add(arrowUpThirdScreen);

arrowUpThirdScreenElement.onclick = function() {
  tweenCamera(new THREE.Vector3( 0, -100, 30 ), 3000, false);
}

const arrowDownThirdScreenElement = document.getElementById('third-screen-down')
const arrowDownThirdScreen = new CSS3DObject(arrowDownThirdScreenElement);
arrowDownThirdScreen.position.set(0, -402.2, 23);
arrowDownThirdScreen.scale.set(0.015, 0.015, 0.015);
scene.add(arrowDownThirdScreen);

arrowDownThirdScreenElement.onclick = function() {
  tweenCamera(new THREE.Vector3( 0, -700, 30 ), 2000, false);
}

const arrowUpFourthScreenElement = document.getElementById('fourth-screen-up')
const arrowUpFourthScreen = new CSS3DObject(arrowUpFourthScreenElement);
arrowUpFourthScreen.position.set(0, -697.8, 23);
arrowUpFourthScreen.scale.set(0.015, 0.015, 0.015);
scene.add(arrowUpFourthScreen);

arrowUpFourthScreenElement.onclick = function() {
  tweenCamera(new THREE.Vector3( 0, -400, 30 ), 3000, false);
  thirdScreenAnimation();
}


imageloader.load("Words/mywork.webp", function(image){
  image.width = image.width * 0.18;
  image.height = image.height * 0.18;
  const myworkLabel = new CSS2DObject( image );
  myworkLabel.position.set( 0, -98.6, 23);
  scene.add(myworkLabel)
})


let arcadeMachine;


loader.load('static/Arcade/Arcade-reduced-2.glb', function(gltf) {
  const model = gltf.scene;
  model.position.y = -101;
  model.position.z = 23;
  model.scale.set(0.012, 0.012, 0.012);

  model.getObjectByName("������������_������_2_STEEL").material = new THREE.MeshLambertMaterial(0x454545);
  model.getObjectByName('������������_������_3_STEEL').material = new THREE.MeshLambertMaterial(0x454545);
  model.getObjectByName('Top_plain').material = new THREE.MeshLambertMaterial(0x454545);
  model.getObjectByName('������������_������_5_STEEL').material = new THREE.MeshLambertMaterial(0x454545);
  model.getObjectByName('������������_������_6_STEEL').material = new THREE.MeshLambertMaterial(0x454545);
  model.getObjectByName('������������_������_8_STEEL').material = new THREE.MeshLambertMaterial(0x454545);
  model.getObjectByName('������������_������_9_STEEL').material = new THREE.MeshLambertMaterial(0x454545);
  model.getObjectByName('������������_������_10_STEE').material = new THREE.MeshLambertMaterial(0x454545);
  model.getObjectByName('������������_������_11_STEE').material = new THREE.MeshLambertMaterial(0x454545);
  model.getObjectByName('������������_������_12_STEE').material = new THREE.MeshLambertMaterial(0x454545);
  model.getObjectByName('������������_������_14_STEE').material = new THREE.MeshLambertMaterial(0x454545);
  model.getObjectByName('������������_������_15_STEE').material = new THREE.MeshLambertMaterial(0x454545);
  model.getObjectByName('������������_������_16_STEE').material = new THREE.MeshLambertMaterial(0x454545);

  const monsterNeon = new THREE.TextureLoader().load('/Monster Collection/monster-neon.webp')
  monsterNeon.wrapS = THREE.RepeatWrapping; // Repeat horizontally
  monsterNeon.flipY = false; // Keep the texture orientation

  model.getObjectByName('������������_������_5_ARCAD').material = new THREE.MeshBasicMaterial({map: monsterNeon});

  // const twentyfourstroketext = document.getElementById('twentyfourstroke')
  // const twentyfourstrokeLabel = new CSS3DObject( twentyfourstroketext );
  // twentyfourstrokeLabel.position.set( -0.03, -99.23, 23);
  // twentyfourstrokeLabel.scale.set(0.005, 0.005, 0.005);
  // scene.add(twentyfourstrokeLabel)
  const twentyfourstrokeclick = document.getElementById('twentyfourstroke-clicked')
  const twentyfourstrokeclickLabel = new CSS3DObject( twentyfourstrokeclick );
  twentyfourstrokeclickLabel.position.set( -0.03, -100, 23.2);
  twentyfourstrokeclickLabel.scale.set(0.0052, 0.0052, 0.0052);
  scene.add(twentyfourstrokeclickLabel)
  const arcademachine2 = model.clone();

  const twentyfourstrokeNeon = new THREE.TextureLoader().load('/24Stroke/24stroke-neon.webp');
  twentyfourstrokeNeon.wrapS = THREE.RepeatWrapping; // Repeat horizontally
  twentyfourstrokeNeon.flipY = false; // Keep the texture orientation

  model.getObjectByName('������������_������_5_ARCAD').material = new THREE.MeshBasicMaterial({map: twentyfourstrokeNeon});


  arcademachine2.position.x = 1.8;
  arcademachine2.rotation.y = -0.3;

  const plastyclick = document.getElementById('plasty-clicked');
  const plastyclickLabel = new CSS3DObject( plastyclick );
  plastyclickLabel.position.set( 1.72, -100, 23.2);
  plastyclickLabel.scale.set(0.0052, 0.0052, 0.0052);
  scene.add(plastyclickLabel)

  const arcademachine3 = model.clone();
  const plastyNeon = new THREE.TextureLoader().load('/24Stroke/24stroke-neon.webp');
  plastyNeon.wrapS = THREE.RepeatWrapping; // Repeat horizontally
  plastyNeon.flipY = false; // Keep the texture orientation
  arcademachine3.getObjectByName('������������_������_5_ARCAD').material = new THREE.MeshBasicMaterial({map: plastyNeon});
  
  arcademachine3.position.x = -1.8
  arcademachine3.rotation.y = 0.3;

  const monsterclick = document.getElementById('monster-clicked');
  const monsterclickLabel = new CSS3DObject( monsterclick );
  monsterclickLabel.position.set( -1.80, -100, 23.2);
  monsterclickLabel.scale.set(0.0052, 0.0052, 0.0052);
  scene.add(monsterclickLabel)
  scene.add(model);
  scene.add(arcademachine2);
  scene.add(arcademachine3);
  arcadeMachine = model;
})


loader.load('static/City/city-reduced.glb', function(gltf) {
  const model2 = gltf.scene;
  model2.position.y = -118;
  model2.position.z = 8;
  model2.position.x = -1.8
  model2.rotation.y = Math.PI * -0.5
  // model2.scale.set(0.001, 0.001, 0.001);
  scene.add(model2);
})

const lightcity = new THREE.PointLight(0x301934, 10, 100)
lightcity.position.x = 6
lightcity.position.y = -98
lightcity.position.z = 10
scene.add(lightcity)


const lightcityarcade = new THREE.PointLight(0xffffff, 1, 30)
lightcityarcade.position.x = -3
lightcityarcade.position.y = -98
lightcityarcade.position.z = 30
scene.add(lightcityarcade)



//plasty
var plastyArcadeClick = document.getElementById('plasty-clicked');
plastyArcadeClick.onclick = function() {
  tweenCamera(new THREE.Vector3( 1.8, -99.7, 23.1 ), 2000, true);
  setTimeout(function() {
    camera.position.set(500, -100, 60);
    tweenCamera(new THREE.Vector3( 500, -100, 30 ), 2000, true);
  }, 2000)
}

const ambientlightplasty = new THREE.PointLight(0xffffff, 10, 50);
ambientlightplasty.position.set(300, -100, 35)
scene.add(ambientlightplasty);

const titleplastyBlock = new THREE.BoxGeometry(9, 1, 1);
const titleplastyBlockMaterial = new THREE.MeshMatcapMaterial({color: 0x0028a0})
const titleplasty = new THREE.Mesh(titleplastyBlock, titleplastyBlockMaterial);
titleplasty.position.set(300, -98, 20)
scene.add(titleplasty);

const titleplastyBlockEdges = new THREE.EdgesGeometry(titleplastyBlock);
const titleplastyBlockLine = new THREE.LineSegments(titleplastyBlockEdges, new THREE.LineBasicMaterial({color: 0xffffff}));
titleplastyBlockLine.position.set(300.01, -98.01, 20.01)
scene.add(titleplastyBlockLine)

const titleplastyBlock2 = new THREE.BoxGeometry(3, 4, 1);
const titleplastyBlockMaterial2 = new THREE.MeshMatcapMaterial({color: 0x0028a0})
const titleplasty2 = new THREE.Mesh(titleplastyBlock2, titleplastyBlockMaterial2);
titleplasty2.position.set(297, -101, 20)
scene.add(titleplasty2);

const titleplastyBlockEdges2 = new THREE.EdgesGeometry(titleplastyBlock2);
const titleplastyBlockLine2 = new THREE.LineSegments(titleplastyBlockEdges2, new THREE.LineBasicMaterial({color: 0xffffff}));
titleplastyBlockLine2.position.set(297.01, -101.01, 20.01)
scene.add(titleplastyBlockLine2)

const titleplastyBlock3 = new THREE.BoxGeometry(5, 4, 1);
const titleplastyBlockMaterial3 = new THREE.MeshMatcapMaterial({color: 0x0028a0})
const titleplasty3 = new THREE.Mesh(titleplastyBlock3, titleplastyBlockMaterial3);
titleplasty3.position.set(302, -101, 20)
scene.add(titleplasty3);

const titleplastyBlockEdges3 = new THREE.EdgesGeometry(titleplastyBlock3);
const titleplastyBlockLine3 = new THREE.LineSegments(titleplastyBlockEdges3, new THREE.LineBasicMaterial({color: 0xffffff}));
titleplastyBlockLine3.scale.set(1.005, 1.005, 1.005)
titleplastyBlockLine3.position.set(302, -101, 20.01)
scene.add(titleplastyBlockLine3);


const plastyBackButton = document.getElementById('plasty-back');
const plastyBackButtonLabel = new CSS3DObject( plastyBackButton );
plastyBackButtonLabel.position.set( 300, -96.85, 20);
plastyBackButtonLabel.scale.set(0.008, 0.008, 0.008);
scene.add(plastyBackButtonLabel);

const plastyBackButton2 = document.getElementById('plasty-back-2');
const plastyBackButtonLabel2 = new CSS3DObject( plastyBackButton2 );
plastyBackButtonLabel2.position.set( 296.77, -100.97, 20);
plastyBackButtonLabel2.scale.set(0.0065, 0.0065, 0.0065);
scene.add(plastyBackButtonLabel2);

// var plastyLogoLabel;
// imageloader.load("Plasty/icon.webp", function(image){
//   image.width = image.width * 0.0022;
//   image.height = image.height * 0.0022;
//   plastyLogoLabel = new CSS3DObject( image );
//   plastyLogoLabel.position.set( 297, -97.75, 20);
//   scene.add(plastyLogoLabel)
// })

// var plastyDemoLabel;
// imageloader.load("Plasty/plasty-account.webp", function(image){
//   image.width = image.width * 0.005;
//   image.height = image.height * 0.005;
//   plastyDemoLabel = new CSS3DObject( image );
//   plastyDemoLabel.position.set( 296.60, -101.05, 20);
//   scene.add(plastyDemoLabel)
// })

const plastyTitle = document.getElementById('plasty-title');
const plastyTitleLabel = new CSS3DObject( plastyTitle );
plastyTitleLabel.position.set( 301, -97.9, 20);
plastyTitleLabel.scale.set(0.03, 0.03, 0.03);
scene.add(plastyTitleLabel);
const plastyDescription = document.getElementById('plasty-description');
const plastyDescriptionLabel = new CSS3DObject( plastyDescription );
plastyDescriptionLabel.position.set( 302.1, -100.3, 20);
plastyDescriptionLabel.scale.set(0.008, 0.008, 0.008);
scene.add(plastyDescriptionLabel);
// const plastyWebsiteButton = document.getElementById('plasty-view-website');
// const plastyWebsiteButtonLabel = new CSS3DObject( plastyWebsiteButton );
// plastyWebsiteButtonLabel.position.set( 300.24, -101.8, 20);
// plastyWebsiteButtonLabel.scale.set(0.006, 0.006, 0.006);
// scene.add(plastyWebsiteButtonLabel);
const plastyRepositoryButton = document.getElementById('plasty-view-repository');
const plastyRepositoryButtonLabel = new CSS3DObject( plastyRepositoryButton );
plastyRepositoryButtonLabel.position.set( 302, -102.8, 20);
plastyRepositoryButtonLabel.scale.set(0.006, 0.006, 0.006);
scene.add(plastyRepositoryButtonLabel);


document.addEventListener('mousemove', function(e) {
  if (camera.position.x === 300 || camera.position.x === 400 || camera.position.x === 500) {
    var mousecords = getMousePos(e);
    moveBox(mousecords, 5);
  }
  if (camera.position.y === -400) {
    onMouseMove(e)
  }
});

function getMousePos(e) {
  return { x: e.clientX, y: e.clientY };
}

function moveBox(mouse, degreeLimit) {
  let degrees = getMouseDegrees(mouse.x, mouse.y, degreeLimit);
  if (camera.position.x == 300) {
    titleplasty.rotation.y = degToRad(degrees.x);
    titleplasty.rotation.x = degToRad(degrees.y);
    titleplastyBlockLine.rotation.y = degToRad(degrees.x);
    titleplastyBlockLine.rotation.x = degToRad(degrees.y);
    titleplasty2.rotation.y = degToRad(degrees.x);
    titleplasty2.rotation.x = degToRad(degrees.y);
    titleplastyBlockLine2.rotation.y = degToRad(degrees.x);
    titleplastyBlockLine2.rotation.x = degToRad(degrees.y);
    titleplasty3.rotation.y = degToRad(degrees.x);
    titleplasty3.rotation.x = degToRad(degrees.y);
    titleplastyBlockLine3.rotation.y = degToRad(degrees.x);
    titleplastyBlockLine3.rotation.x = degToRad(degrees.y);
    // plastyLogoLabel.rotation.y = degToRad(degrees.x);
    // plastyLogoLabel.rotation.x = degToRad(degrees.y);
    // plastyDemoLabel.rotation.y = degToRad(degrees.x);
    // plastyDemoLabel.rotation.x = degToRad(degrees.y);
    plastyTitleLabel.rotation.y = degToRad(degrees.x);
    plastyTitleLabel.rotation.x = degToRad(degrees.y);
  }
  if (camera.position.x == 400) {
    titletwentyfourstroke.rotation.y = degToRad(degrees.x);
    titletwentyfourstroke.rotation.x = degToRad(degrees.y);
    titletwentyfourstrokeBlockLine.rotation.y = degToRad(degrees.x);
    titletwentyfourstrokeBlockLine.rotation.x = degToRad(degrees.y);
    titletwentyfourstroke2.rotation.y = degToRad(degrees.x);
    titletwentyfourstroke2.rotation.x = degToRad(degrees.y);
    titletwentyfourstrokeBlockLine2.rotation.y = degToRad(degrees.x);
    titletwentyfourstrokeBlockLine2.rotation.x = degToRad(degrees.y);
    titletwentyfourstroke3.rotation.y = degToRad(degrees.x);
    titletwentyfourstroke3.rotation.x = degToRad(degrees.y);
    titletwentyfourstrokeBlockLine3.rotation.y = degToRad(degrees.x);
    titletwentyfourstrokeBlockLine3.rotation.x = degToRad(degrees.y);
    // twentyfourstrokeLogoLabel.rotation.y = degToRad(degrees.x);
    // twentyfourstrokeLogoLabel.rotation.x = degToRad(degrees.y);
    twentyfourstrokeTitleLabel.rotation.y = degToRad(degrees.x);
    twentyfourstrokeTitleLabel.rotation.x = degToRad(degrees.y);
  }
  if (camera.position.x == 500) {
    titlemonster.rotation.y = degToRad(degrees.x);
    titlemonster.rotation.x = degToRad(degrees.y);
    titlemonsterBlockLine.rotation.y = degToRad(degrees.x);
    titlemonsterBlockLine.rotation.x = degToRad(degrees.y);
    titlemonster2.rotation.y = degToRad(degrees.x);
    titlemonster2.rotation.x = degToRad(degrees.y);
    titlemonsterBlockLine2.rotation.y = degToRad(degrees.x);
    titlemonsterBlockLine2.rotation.x = degToRad(degrees.y);
    titlemonster3.rotation.y = degToRad(degrees.x);
    titlemonster3.rotation.x = degToRad(degrees.y);
    titlemonsterBlockLine3.rotation.y = degToRad(degrees.x);
    titlemonsterBlockLine3.rotation.x = degToRad(degrees.y);
    // monsterLogoLabel.rotation.y = degToRad(degrees.x);
    // monsterLogoLabel.rotation.x = degToRad(degrees.y);
    // monsterDemoLabel.rotation.y = degToRad(degrees.x);
    // monsterDemoLabel.rotation.x = degToRad(degrees.y);
    monsterTitleLabel.rotation.y = degToRad(degrees.x);
    monsterTitleLabel.rotation.x = degToRad(degrees.y);
  }
}

function getMouseDegrees(x, y, degreeLimit) {
  let dx = 0,
      dy = 0,
      xdiff,
      xPercentage,
      ydiff,
      yPercentage;

  let w = { x: window.innerWidth, y: window.innerHeight };

  // Left (Rotates neck left between 0 and -degreeLimit)
  
   // 1. If cursor is in the left half of screen
  if (x <= w.x / 2) {
    // 2. Get the difference between middle of screen and cursor position
    xdiff = w.x / 2 - x;  
    // 3. Find the percentage of that difference (percentage toward edge of screen)
    xPercentage = (xdiff / (w.x / 2)) * 100;
    // 4. Convert that to a percentage of the maximum rotation we allow for the neck
    dx = ((degreeLimit * xPercentage) / 100) * -1; }
// Right (Rotates neck right between 0 and degreeLimit)
  if (x >= w.x / 2) {
    xdiff = x - w.x / 2;
    xPercentage = (xdiff / (w.x / 2)) * 100;
    dx = (degreeLimit * xPercentage) / 100;
  }
  // Up (Rotates neck up between 0 and -degreeLimit)
  if (y <= w.y / 2) {
    ydiff = w.y / 2 - y;
    yPercentage = (ydiff / (w.y / 2)) * 100;
    // Note that I cut degreeLimit in half when she looks up
    dy = (((degreeLimit * 0.5) * yPercentage) / 100) * -1;
    }
  
  // Down (Rotates neck down between 0 and degreeLimit)
  if (y >= w.y / 2) {
    ydiff = y - w.y / 2;
    yPercentage = (ydiff / (w.y / 2)) * 100;
    dy = (degreeLimit * yPercentage) / 100;
  }
  return { x: dx, y: dy };
}

plastyBackButton.onclick = function() {
  tweenCamera(new THREE.Vector3( 300, -100, 60 ), 2000, true);
  setTimeout(function() {
    camera.position.set(-2.1, -99.6, 22);
    tweenCamera(new THREE.Vector3( 0, -100, 30 ), 2000, true);
  }, 2000)
}


//24stroke
var twentyfourstrokeArcadeClick = document.getElementById('twentyfourstroke-clicked');
twentyfourstrokeArcadeClick.onclick = function() {
  tweenCamera(new THREE.Vector3( 0, -99.7, 23.1 ), 2000, true);
  setTimeout(function() {
    camera.position.set(400, -100, 60);
    tweenCamera(new THREE.Vector3( 400, -100, 30 ), 2000, true);
  }, 2000)
}

const ambientlighttwentyfourstroke = new THREE.PointLight(0xffffff, 10, 50);
ambientlighttwentyfourstroke.position.set(400, -100, 35)
scene.add(ambientlighttwentyfourstroke);

const titletwentyfourstroke = titleplasty.clone()
titletwentyfourstroke.position.set(400, -98, 20)
scene.add(titletwentyfourstroke);

const titletwentyfourstrokeBlockLine = titleplastyBlockLine.clone();
titletwentyfourstrokeBlockLine.position.set(400.02, -98.01, 20.01)
scene.add(titletwentyfourstrokeBlockLine)

const titletwentyfourstroke2 = titleplasty2.clone()
titletwentyfourstroke2.position.set(397, -101, 20)
scene.add(titletwentyfourstroke2);

const titletwentyfourstrokeBlockLine2 = titleplastyBlockLine2.clone();
titletwentyfourstrokeBlockLine2.position.set(397.02, -101.01, 20.01)
scene.add(titletwentyfourstrokeBlockLine2)

const titletwentyfourstroke3 = titleplasty3.clone()
titletwentyfourstroke3.position.set(402, -101, 20)
scene.add(titletwentyfourstroke3);

const titletwentyfourstrokeBlockLine3 = titleplastyBlockLine3.clone();
titletwentyfourstrokeBlockLine3.position.set(402, -101, 20);
scene.add(titletwentyfourstrokeBlockLine3);


const twentyfourstrokeBackButton = document.getElementById('twentyfourstroke-back');
const twentyfourstrokeBackButtonLabel = new CSS3DObject( twentyfourstrokeBackButton );
twentyfourstrokeBackButtonLabel.position.set( 400, -96.85, 20);
twentyfourstrokeBackButtonLabel.scale.set(0.008, 0.008, 0.008);
scene.add(twentyfourstrokeBackButtonLabel);

// const twentyfourstrokeiframe = document.getElementById('iframe-24stroke');
// const twentyfourstrokeiframeLabel = new CSS3DObject( twentyfourstrokeiframe );
// twentyfourstrokeiframeLabel.position.set( 196.79, -101, 20);
// twentyfourstrokeiframeLabel.scale.set(0.0065, 0.0065, 0.0065);
// scene.add(twentyfourstrokeiframeLabel);

const bajabikesiframe = document.getElementById('iframe-bb');
const bajabikesiframelabel = new CSS3DObject( bajabikesiframe );
bajabikesiframelabel.position.set( 396.79, -101, 20);
bajabikesiframelabel.scale.set(0.0065, 0.0065, 0.0065);
scene.add(bajabikesiframelabel);

var twentyfourstrokeLogoLabel;
imageloader.load("24Stroke/24stroke-logo.webp", function(image){
  image.width = image.width * 0.0044;
  image.height = image.height * 0.0044;
  twentyfourstrokeLogoLabel = new CSS3DObject( image );
  twentyfourstrokeLogoLabel.position.set(296.60, -97.9, 20 );
  scene.add(twentyfourstrokeLogoLabel)
})

// var bajabikesLogoLabel;
// imageloader.load("BajaBikes/bb-logo.webp", function(image){
//   image.width = image.width * 0.019;
//   image.height = image.height * 0.027;
//   bajabikesLogoLabel = new CSS3DObject( image );
//   bajabikesLogoLabel.position.set( 396.4, -97.70, 20 );
//   scene.add(bajabikesLogoLabel)
// })

// const twentyfourstrokeLogo = document.getElementById('twentyfourstroke-logo');
// const twentyfourstrokeLogoLabel = new CSS3DObject( twentyfourstrokeLogo );
// twentyfourstrokeLogoLabel.position.set( 397.4, -97.90, 20);
// twentyfourstrokeLogoLabel.scale.set(0.006, 0.006, 0.006);
// scene.add(twentyfourstrokeLogoLabel)
const twentyfourstrokeTitle = document.getElementById('twentyfourstroke-title');
const twentyfourstrokeTitleLabel = new CSS3DObject( twentyfourstrokeTitle );
twentyfourstrokeTitleLabel.position.set( 400, -97.9, 20);
twentyfourstrokeTitleLabel.scale.set(0.03, 0.03, 0.03);
scene.add(twentyfourstrokeTitleLabel);
const twentyfourstrokeDescription = document.getElementById('twentyfourstroke-description');
const twentyfourstrokeDescriptionLabel = new CSS3DObject( twentyfourstrokeDescription );
twentyfourstrokeDescriptionLabel.position.set( 402.1, -100.8, 20);
twentyfourstrokeDescriptionLabel.scale.set(0.008, 0.008, 0.008);
scene.add(twentyfourstrokeDescriptionLabel);
const twentyfourstrokeWebsiteButton = document.getElementById('twentyfourstroke-view-website');
const twentyfourstrokeWebsiteButtonLabel = new CSS3DObject( twentyfourstrokeWebsiteButton );
twentyfourstrokeWebsiteButtonLabel.position.set( 401.9, -102.83, 20);
twentyfourstrokeWebsiteButtonLabel.scale.set(0.006, 0.006, 0.006);
scene.add(twentyfourstrokeWebsiteButtonLabel);
// const twentyfourstrokeRepositoryButton = document.getElementById('twentyfourstroke-view-repository');
// const twentyfourstrokeRepositoryButtonLabel = new CSS3DObject( twentyfourstrokeRepositoryButton );
// twentyfourstrokeRepositoryButtonLabel.position.set( 403.71, -102, 20);
// twentyfourstrokeRepositoryButtonLabel.scale.set(0.006, 0.006, 0.006);
// scene.add(twentyfourstrokeRepositoryButtonLabel);

twentyfourstrokeBackButton.onclick = function() {
  tweenCamera(new THREE.Vector3( 400, -100, 60 ), 2000, true);
  setTimeout(function() {
    camera.position.set(0, -99.7, 24);
    tweenCamera(new THREE.Vector3( 0, -100, 30 ), 2000, true);
  }, 2000)
}

//monster
var monsterArcadeClick = document.getElementById('monster-clicked');
monsterArcadeClick.onclick = function() {
  tweenCamera(new THREE.Vector3( -2.1, -99.6, 22.1 ), 2000, true);
  setTimeout(function() {
    camera.position.set(300, -100, 60);
    tweenCamera(new THREE.Vector3( 300, -100, 30 ), 2000, true);
  }, 2000)
}

const ambientlightmonster = new THREE.PointLight(0xffffff, 10, 50);
ambientlightmonster.position.set(500, -100, 35)
scene.add(ambientlightmonster);

const titlemonster = titleplasty.clone()
titlemonster.position.set(500, -98, 20)
scene.add(titlemonster);

const titlemonsterBlockLine = titleplastyBlockLine.clone();
titlemonsterBlockLine.position.set(500.02, -98.01, 20.01)
scene.add(titlemonsterBlockLine)

const titlemonster2 = titleplasty2.clone()
titlemonster2.position.set(497, -101, 20)
scene.add(titlemonster2);

const titlemonsterBlockLine2 = titleplastyBlockLine2.clone();
titlemonsterBlockLine2.position.set(497.02, -101.01, 20.01)
scene.add(titlemonsterBlockLine2)

const titlemonster3 = titleplasty3.clone()
titlemonster3.position.set(502, -101, 20)
scene.add(titlemonster3);

const titlemonsterBlockLine3 = titleplastyBlockLine3.clone();
titlemonsterBlockLine3.position.set(502, -101, 20);
scene.add(titlemonsterBlockLine3);


const monsterBackButton = document.getElementById('monster-back');
const monsterBackButtonLabel = new CSS3DObject( monsterBackButton );
monsterBackButtonLabel.position.set( 500, -96.85, 20);
monsterBackButtonLabel.scale.set(0.008, 0.008, 0.008);
scene.add(monsterBackButtonLabel);

var monsterLogoLabel;
imageloader.load("Monster Collection/icon-512x512-removebg-preview.webp", function(image){
  image.width = image.width * 0.0036;
  image.height = image.height * 0.0036;
  monsterLogoLabel = new CSS3DObject( image );
  monsterLogoLabel.position.set( 496.5, -98, 20);
  scene.add(monsterLogoLabel)
})

const monsterIframe = document.getElementById('iframe-monster');
const monsterIframeLabel = new CSS3DObject( monsterIframe );
monsterIframeLabel.position.set( 496.79, -101.07, 20);
monsterIframeLabel.scale.set(0.0065, 0.0065, 0.0065);
scene.add(monsterIframeLabel);

const monsterTitle = document.getElementById('monster-title');
const monsterTitleLabel = new CSS3DObject( monsterTitle );
monsterTitleLabel.position.set( 501, -97.95, 20);
monsterTitleLabel.scale.set(0.03, 0.03, 0.03);
scene.add(monsterTitleLabel);
const monsterDescription = document.getElementById('monster-description');
const monsterDescriptionLabel = new CSS3DObject( monsterDescription );
monsterDescriptionLabel.position.set( 502, -100.7, 20);
monsterDescriptionLabel.scale.set(0.008, 0.008, 0.008);
scene.add(monsterDescriptionLabel);
// const monsterWebsiteButton = document.getElementById('monster-view-website');
// const monsterWebsiteButtonLabel = new CSS3DObject( monsterWebsiteButton );
// monsterWebsiteButtonLabel.position.set( 500.24, -102.8, 20);
// monsterWebsiteButtonLabel.scale.set(0.006, 0.006, 0.006);
// scene.add(monsterWebsiteButtonLabel);
const monsterRepositoryButton = document.getElementById('monster-view-repository');
const monsterRepositoryButtonLabel = new CSS3DObject( monsterRepositoryButton );
monsterRepositoryButtonLabel.position.set( 502, -102.8, 20);
monsterRepositoryButtonLabel.scale.set(0.006, 0.006, 0.006);
scene.add(monsterRepositoryButtonLabel);

monsterBackButton.onclick = function() {
  tweenCamera(new THREE.Vector3( 500, -100, 60 ), 2000, true);
  setTimeout(function() {
    camera.position.set(1.8, -99.7, 23.1);
    tweenCamera(new THREE.Vector3( 0, -100, 30 ), 2000, true);
  }, 2000)
}

//third screen

const pointlightthirdscreen = new THREE.PointLight(0xffffff, 1, 80)
pointlightthirdscreen.position.set(-2, -402, 30)
scene.add(pointlightthirdscreen)

const RoadPlane = new THREE.PlaneGeometry(20, 400, 10, 10)
const RoadPlaneMaterial = new THREE.MeshBasicMaterial({color: 0x1be9ff,
  transparent: true,
  opacity: 0.7,})
const Road = new THREE.Mesh(RoadPlane, RoadPlaneMaterial)
Road.rotateX(-Math.PI * 0.5)
Road.position.set(0, -404, 0)
scene.add(Road)

const RoadLineMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.8,})

const RoadLineLeftPlane = new THREE.PlaneGeometry(0.6, 400, 1, 1)
const RoadLineLeft = new THREE.Mesh(RoadLineLeftPlane, RoadLineMaterial)
RoadLineLeft.rotateX(-Math.PI * 0.5)
RoadLineLeft.position.set(-9, -403.9, 0);
scene.add(RoadLineLeft);


const RoadLineRightPlane = new THREE.PlaneGeometry(0.6, 400, 1, 1)
const RoadLineRight = new THREE.Mesh(RoadLineRightPlane, RoadLineMaterial)
RoadLineRight.rotateX(-Math.PI * 0.5)
RoadLineRight.position.set(9, -403.9, 0);
scene.add(RoadLineRight);


const RoadLineCenterLeftPlane = new THREE.PlaneGeometry(0.2, 400, 1, 1)
const RoadLineCenterLeft = new THREE.Mesh(RoadLineCenterLeftPlane, RoadLineMaterial)
RoadLineCenterLeft.rotateX(-Math.PI * 0.5)
RoadLineCenterLeft.position.set(-3, -403.9, 0);
scene.add(RoadLineCenterLeft);


const RoadLineCenterRightPlane = new THREE.PlaneGeometry(0.2, 400, 1, 1)
const RoadLineCenterRight = new THREE.Mesh(RoadLineCenterRightPlane, RoadLineMaterial)
RoadLineCenterRight.rotateX(-Math.PI * 0.5)
RoadLineCenterRight.position.set(3, -403.9, 0);
scene.add(RoadLineCenterRight);




const sidewalkMaterial = new THREE.MeshBasicMaterial({
  color: 0x1be9ff,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.2,
});

const sidewalkTopLeftGeometry = new THREE.PlaneGeometry(50, 100, 1, 1);
sidewalkTopLeftGeometry.rotateX(-Math.PI * 0.5);
const sidewalkLeft = new THREE.Mesh(sidewalkTopLeftGeometry, sidewalkMaterial);
sidewalkLeft.position.set(29.2, -401, 0)
scene.add(sidewalkLeft);

const sidewalkTopLeftGeometryGrid = new THREE.GridHelper(150, 60, 0x1be9ff, 0x1be9ff)
sidewalkTopLeftGeometryGrid.position.set(79.2, -401, 8)
scene.add(sidewalkTopLeftGeometryGrid);

const sidewalkSideLeftGeometry = new THREE.PlaneGeometry(2, 500, 1, 1);
sidewalkSideLeftGeometry.rotateX(-Math.PI * 0.5);
sidewalkSideLeftGeometry.rotateZ(Math.PI * 0.49);
const sidewalkSideLeft = new THREE.Mesh(sidewalkSideLeftGeometry, sidewalkMaterial);
sidewalkSideLeft.position.set(12.1, -403.9, 0)
scene.add(sidewalkSideLeft);


const sidewalkSideRightGeometryGrid = new THREE.GridHelper(500, 100, 0x1be9ff, 0x1be9ff)
sidewalkSideRightGeometryGrid.position.set(12.1, -652.9, 0)
sidewalkSideRightGeometryGrid.rotateX(-Math.PI * 0.5);
sidewalkSideRightGeometryGrid.rotateZ(Math.PI * 0.5);
scene.add(sidewalkSideRightGeometryGrid);

const invisGridRightGeometry = new THREE.PlaneGeometry(500, 500, 1, 1);
invisGridRightGeometry.rotateX(-Math.PI * 0.5);
invisGridRightGeometry.rotateZ(Math.PI * 0.5);
const invisGridRightMaterial = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.DoubleSide, transparent: false})
const invisGridRight = new THREE.Mesh(invisGridRightGeometry, invisGridRightMaterial);
invisGridRight.position.set(12, -654.8, 0)
scene.add(invisGridRight);

const sidewalkTopRightGeometry = new THREE.PlaneGeometry(50, 100, 1, 1);
sidewalkTopRightGeometry.rotateX(-Math.PI * 0.5);
const sidewalkRight = new THREE.Mesh(sidewalkTopRightGeometry, sidewalkMaterial);
sidewalkRight.position.set(-29.2, -401, 0)
scene.add(sidewalkRight);

const sidewalkTopRightGeometryGrid = new THREE.GridHelper(150, 60, 0x1be9ff, 0x1be9ff)
sidewalkTopRightGeometryGrid.position.set(-79.2, -401, 8)
scene.add(sidewalkTopRightGeometryGrid);

const sidewalkSideRightGeometry = new THREE.PlaneGeometry(2, 500, 10, 10);
sidewalkSideRightGeometry.rotateX(-Math.PI * 0.5);
sidewalkSideRightGeometry.rotateZ(Math.PI * 0.49);
const sidewalkSideRight = new THREE.Mesh(sidewalkSideRightGeometry, sidewalkMaterial);
sidewalkSideRight.position.set(-12.1, -403.9, 0)
scene.add(sidewalkSideRight);

const sidewalkSideLeftGeometryGrid = new THREE.GridHelper(500, 100, 0x1be9ff, 0x1be9ff)
sidewalkSideLeftGeometryGrid.position.set(-12.1, -652.9, 0)
sidewalkSideLeftGeometryGrid.rotateX(-Math.PI * 0.5);
sidewalkSideLeftGeometryGrid.rotateZ(Math.PI * 0.5);
scene.add(sidewalkSideLeftGeometryGrid);

const invisGridLeftGeometry = new THREE.PlaneGeometry(500, 500, 1, 1);
invisGridLeftGeometry.rotateX(-Math.PI * 0.5);
invisGridLeftGeometry.rotateZ(Math.PI * 0.5);
const invisGridLeftMaterial = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.DoubleSide, transparent: false})
const invisGridLeft = new THREE.Mesh(invisGridLeftGeometry, invisGridLeftMaterial);
invisGridLeft.position.set(-12, -654.8, 0)
scene.add(invisGridLeft);


const pyramidBigGeometry = new THREE.TetrahedronGeometry(2)
const pyramidBigMaterial = new THREE.MeshBasicMaterial({color: 0x1a003f,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 1,})
const pyramidBig = new THREE.Mesh(pyramidBigGeometry, pyramidBigMaterial)
pyramidBig.position.set(5, -400, 0)
scene.add(pyramidBig)

const pyramidBigGeometryEdges = new THREE.EdgesGeometry(pyramidBigGeometry);
const pyramidBigEdges = new THREE.LineSegments(pyramidBigGeometryEdges, new THREE.LineBasicMaterial({color: 0xffffff}));
pyramidBigEdges.scale.set(1.01, 1.01, 1.01)
pyramidBigEdges.position.set(5, -400, 0)
pyramidBig.rotation.set(degToRad(54), degToRad(-45), 0)
pyramidBigEdges.rotation.set(degToRad(54), degToRad(-45), 0)
scene.add(pyramidBigEdges);

const pyramid2 = pyramidBig.clone()
const pyramidedges2 = pyramidBigEdges.clone()
pyramid2.position.set(7, -400, 9)
pyramidedges2.position.set(7, -400, 9)
scene.add(pyramid2)
scene.add(pyramidedges2)

const pyramid3 = pyramidBig.clone()
const pyramidedges3 = pyramidBigEdges.clone()
pyramid3.position.set(6, -400, 22)
pyramidedges3.position.set(6, -400, 22)
scene.add(pyramid3)
scene.add(pyramidedges3)

const pyramid4 = pyramidBig.clone()
const pyramidedges4 = pyramidBigEdges.clone()
pyramid4.position.set(10, -400, 8)
pyramidedges4.position.set(10, -400, 8)
scene.add(pyramid4)
scene.add(pyramidedges4)

const pyramid5 = pyramidBig.clone()
const pyramidedges5 = pyramidBigEdges.clone()
pyramid5.position.set(6, -400, 20)
pyramidedges5.position.set(6, -400, 20)
scene.add(pyramid5)
scene.add(pyramidedges5)

const pyramid6 = pyramidBig.clone()
const pyramidedges6 = pyramidBigEdges.clone()
pyramid6.position.set(11, -400, -20)
pyramidedges6.position.set(11, -400, -20)
scene.add(pyramid6)
scene.add(pyramidedges6)

const pyramid7 = pyramidBig.clone()
const pyramidedges7 = pyramidBigEdges.clone()
pyramid7.position.set(-7, -400, 7)
pyramidedges7.position.set(-7, -400, 7)
scene.add(pyramid7)
scene.add(pyramidedges7)

const pyramid8 = pyramidBig.clone()
const pyramidedges8 = pyramidBigEdges.clone()
pyramid8.position.set(-6, -400, -5)
pyramidedges8.position.set(-6, -400, -5)
scene.add(pyramid8)
scene.add(pyramidedges8)

const pyramid9 = pyramidBig.clone()
const pyramidedges9 = pyramidBigEdges.clone()
pyramid9.position.set(-8, -400, 10)
pyramidedges9.position.set(-8, -400, 10)
scene.add(pyramid9)
scene.add(pyramidedges9)

const pyramid10 = pyramidBig.clone()
const pyramidedges10 = pyramidBigEdges.clone()
pyramid10.position.set(-6, -400, 20)
pyramidedges10.position.set(-6, -400, 20)
scene.add(pyramid10)
scene.add(pyramidedges10)

const pyramid11 = pyramidBig.clone()
const pyramidedges11 = pyramidBigEdges.clone()
pyramid11.position.set(-11, -400, -20)
pyramidedges11.position.set(-11, -400, -20)
scene.add(pyramid11)
scene.add(pyramidedges11)

const pyramid12 = pyramidBig.clone()
const pyramidedges12 = pyramidBigEdges.clone()
pyramid12.position.set(-6, -400, 24)
pyramidedges12.position.set(-6, -400, 24)
scene.add(pyramid12)
scene.add(pyramidedges12)


let mixer;
let Me;
let MeClips;
loader.load('static/Me/MeRiggedActions.glb', function(gltf) {
    Me = gltf.scene;
    MeClips = gltf.animations;
    Me.position.set(1.6 , -404.5, 26)
    Me.scale.set(2.7, 2.7, 2.7);
    Me.rotation.y = Math.PI * -0.1
    scene.add(Me);
  })

function thirdScreenAnimation() {
  mixer = new THREE.AnimationMixer(Me);
  const clipCombined = THREE.AnimationClip.findByName(MeClips, 'CombinedActions');

  const actionCombined = mixer.clipAction(clipCombined);
  actionCombined.setLoop(THREE.LoopRepeat);
  actionCombined.enable = true;
  actionCombined.play();
}

const lightAboutMe = new THREE.PointLight(0xffffff, 2, 20)
lightAboutMe.position.x = 0
lightAboutMe.position.y = -399
lightAboutMe.position.z = 30
scene.add(lightAboutMe)


const AboutMeTitle = document.getElementById('about-me-title')
const AboutMeTitleLabel = new CSS3DObject( AboutMeTitle );
AboutMeTitleLabel.position.set( 0, -397.5, 20);
AboutMeTitleLabel.scale.set(0.025, 0.025, 0.025);
scene.add(AboutMeTitleLabel)
const aboutMeDescription = document.getElementById('about-me-description')
const aboutMeDescriptionLabel = new CSS3DObject( aboutMeDescription );
aboutMeDescriptionLabel.position.set( 0, -398.85, 22);
aboutMeDescriptionLabel.scale.set(0.01, 0.01, 0.01);
scene.add(aboutMeDescriptionLabel)
const aboutMeVue = document.getElementById('vue')
// const aboutMeVueLabel = new CSS3DObject( aboutMeVue );
// aboutMeVueLabel.position.set( 0, -400, 22);
// aboutMeVueLabel.scale.set(0.001, 0.001, 0.001);
// aboutMeVueLabel.rotation.y = -Math.PI * 0.1
// scene.add(aboutMeVueLabel)
let vue;
loader.load('static/Logo/vue.glb', function(gltf) {
  vue = gltf.scene;
  vue.position.set(-0.3, -401, 26.2)
  vue.scale.set(0.04, 0.04, 0.04);
  vue.name = "vue";
  scene.add(vue);
})

let react;
loader.load('static/Logo/react.glb', function(gltf) {
  react = gltf.scene;
  react.position.set(0.33, -400.9, 26.2)
  react.scale.set(0.6,0.6, 0.6);
  react.name = "react"
  scene.add(react);
})

let spring;
loader.load('static/Logo/Spring.glb', function(gltf) {
  spring = gltf.scene;
  spring.position.set(-0.3, -400.9, 23)
  spring.scale.set(0.6,0.6, 0.6);
  spring.rotateX(Math.PI * 0.5)
  spring.name = "springboot"
  scene.add(spring);
})

let dotnet;
loader.load('static/Logo/dotnet.glb', function(gltf) {
  dotnet = gltf.scene;
  dotnet.position.set(0, -400.9, 24)
  dotnet.scale.set(0.25, 0.25, 0.25);
  dotnet.rotateX(Math.PI * 0.5);
  dotnet.name= "dotnet"
  scene.add(dotnet);
})

let csharp;
loader.load('static/Logo/csharp.glb', function(gltf) {
  csharp = gltf.scene;
  csharp.position.set(-1.3, -400.9, 26.2)
  csharp.scale.set(0.35,0.35, 0.35);
  csharp.rotateX(Math.PI * 0.5);
  csharp.name = "csharp"
  scene.add(csharp);
})

let javascript;
loader.load('static/Logo/javascript.glb', function(gltf) {
  javascript = gltf.scene;
  javascript.position.set(-0.8, -400.9, 25.3)
  javascript.scale.set(1.8, 1.8, 1.8);
  javascript.rotation.set(Math.PI * 0, Math.PI * -0.5, Math.PI* -0.09)
  javascript.name = "javascript"
  scene.add(javascript);
})

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let hover = false;
let currentIntersection = null;


document.addEventListener('click', function(e) {
  onClick(e)
})

function onClick(event) {
  mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const objects = [javascript, csharp, dotnet, spring, react, vue];
  const intersects = raycaster.intersectObjects(objects, true);
  if (intersects.length > 0) {
    if (intersects[0].object.parent.name == "javascript") {
      window.open("https://www.javascript.com/")
    }
    if (intersects[0].object.parent.name == "csharp"){
      window.open("https://en.wikipedia.org/wiki/C_Sharp_(programming_language)")
    }
    if (intersects[0].object.parent.parent.name == "springboot") {
      window.open("https://www.spring.io/")
    }
    if (intersects[0].object.parent.name == "dotnet") {
      window.open("https://dotnet.microsoft.com/")
    }
    if (intersects[0].object.parent.parent.name == "vue") {
      window.open("https://www.vuejs.org/")
    }
    if(intersects[0].object.parent.name == "react") {
      window.open("https://www.reactjs.org/")
    }
  }
}
function onMouseMove(event, object) {
  mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const objects = [javascript, csharp, dotnet, spring, react, vue];
  const intersects = raycaster.intersectObjects(objects, true);
  if (intersects.length > 0 && currentIntersection == null) {
    currentIntersection = intersects[0].object;
    document.body.style.cursor = "pointer"
  } else {
    if (intersects.length <= 0 && currentIntersection !== null) {
      currentIntersection = null;
      document.body.style.cursor = "default"
    }
  }
  renderer.render(scene, camera);
}

const backgroundTextureThirdScreen = new THREE.TextureLoader().load('Scenery/Scenery.webp'); 
const backgroundThirdScreenGeometry = new THREE.PlaneGeometry( 192, 108, 20, 20 );
const backgroundMaterialThirdScreen = new THREE.MeshBasicMaterial( { map: backgroundTextureThirdScreen } );
const backgroundThirdScreen = new THREE.Mesh( backgroundThirdScreenGeometry, backgroundMaterialThirdScreen );
backgroundThirdScreen.position.set(2, -324, -250)
backgroundThirdScreen.scale.set(1.5, 1.5, 1.5)
scene.add(backgroundThirdScreen);
const backgroundTextureThirdScreen1 = new THREE.TextureLoader().load('Scenery/Scenery-background.webp'); 
const backgroundThirdScreenGeometry1 = new THREE.PlaneGeometry( 192, 108, 20, 20 );
const backgroundMaterialThirdScreen1 = new THREE.MeshBasicMaterial( { map: backgroundTextureThirdScreen1 } );
const backgroundThirdScreen1 = new THREE.Mesh( backgroundThirdScreenGeometry1, backgroundMaterialThirdScreen1 );
backgroundThirdScreen1.position.set(-190, -324, -251)
backgroundThirdScreen1.scale.set(1.5, 1.5, 1.5)
scene.add(backgroundThirdScreen1);

const backgroundTextureThirdScreen2 = new THREE.TextureLoader().load('Scenery/Scenery-background.webp'); 
const backgroundThirdScreenGeometry2 = new THREE.PlaneGeometry( 192, 108, 20, 20 );
const backgroundMaterialThirdScreen2 = new THREE.MeshBasicMaterial( { map: backgroundTextureThirdScreen2 } );
const backgroundThirdScreen2 = new THREE.Mesh( backgroundThirdScreenGeometry2, backgroundMaterialThirdScreen2 );
backgroundThirdScreen2.position.set(194, -324, -251)
backgroundThirdScreen2.scale.set(1.5, 1.5, 1.5)
scene.add(backgroundThirdScreen2);


//Fourth screen
const triangleElement = document.getElementById('triangle');
const triangle = new CSS3DObject(triangleElement);
triangle.position.set(-2.1, -698.2, 23);
triangle.scale.set(0.015, 0.015, 0.015);
scene.add(triangle);

const squareElement = document.getElementById('square');
const square = new CSS3DObject(squareElement);
square.position.set(-3.2, -701, 23);
square.scale.set(0.015, 0.015, 0.015);
scene.add(square);

const circleElement = document.getElementById('circle');
const circle = new CSS3DObject(circleElement);
circle.position.set(-2.1, -701.5, 23);
circle.scale.set(0.015, 0.015, 0.015);
scene.add(circle);

const crossElement = document.getElementById('cross');
const cross = new CSS3DObject(crossElement);
cross.position.set(-1.8, -699.9, 23);
cross.scale.set(0.015, 0.015, 0.015);
scene.add(cross);

const cross2 = cross.clone();
cross.position.set(-4, -702, 23);
scene.add(cross2)

const cross3 = cross.clone();
cross3.position.set(0, -700.3, 23);
scene.add(cross3)

const cross4 = cross.clone();
cross4.position.set(4, -702, 23);
scene.add(cross4)

const cross5 = cross.clone();
cross5.position.set(1.8, -699.9, 23);
scene.add(cross5)

const triangle2 = triangle.clone();
triangle2.position.set(-3.8, -700, 23);
scene.add(triangle2)

const triangle3 = triangle.clone();
triangle3.position.set(-0.6, -702.2, 23);
scene.add(triangle3)

const triangle4 = triangle.clone();
triangle4.position.set(0, -698.2, 23);
scene.add(triangle4)

const triangle5 = triangle.clone();
triangle5.position.set(3.8, -700, 23);
scene.add(triangle5)

const triangle6 = triangle.clone();
triangle6.position.set(0.6, -702.2, 23);
scene.add(triangle6)

const triangle7 = triangle.clone();
triangle7.position.set(2.1, -698.2, 23);
scene.add(triangle7)

const square2 = square.clone();
square2.position.set(-4, -698, 23);
scene.add(square2)

const square3 = square.clone();
square3.position.set(-4.8, -699.2, 23);
scene.add(square3)

const square4 = square.clone();
square4.position.set(-0.8, -699, 23);
scene.add(square4)

const square5 = square.clone();
square5.position.set(4.8, -699.2, 23);
scene.add(square5)

const square6 = square.clone();
square6.position.set(4, -698, 23);
scene.add(square6)

const square7 = square.clone();
square7.position.set(0.8, -699, 23);
scene.add(square7)

const square8 = square.clone();
square8.position.set(3.2, -701, 23);
scene.add(square8)


const circle2 = circle.clone();
circle2.position.set(-2.9, -699, 23);
scene.add(circle2)

const circle3 = circle.clone();
circle3.position.set(-5, -701, 23);
scene.add(circle3)

const circle4 = circle.clone();
circle4.position.set(-0.8, -701, 23);
scene.add(circle4)

const circle5 = circle.clone();
circle5.position.set(2.9, -699, 23);
scene.add(circle5)

const circle6 = circle.clone();
circle6.position.set(5, -701, 23);
scene.add(circle6)

const circle7 = circle.clone();
circle7.position.set(0.8, -701, 23);
scene.add(circle7)

const circle8 = circle.clone()
circle8.position.set(2.1, -701.5, 23);
scene.add(circle8);

const contactFormElement = document.getElementById('contact-form');
const contactForm = new CSS3DObject(contactFormElement);
contactForm.position.set(0, -700, 24);
contactForm.scale.set(0.015, 0.015, 0.015);
scene.add(contactForm);

const backgroundPlaneFourthScreenGeometry = new THREE.PlaneGeometry(200, 30, 1, 1);
const backgroundMaterialFourthScreen = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.DoubleSide});
const backgroundPlaneFourthScreen = new THREE.Mesh(backgroundPlaneFourthScreenGeometry, backgroundMaterialFourthScreen)
backgroundPlaneFourthScreen.position.set(0, -700, 20)
scene.add(backgroundPlaneFourthScreen)

const backgroundPlaneThirdScreenGeometry = new THREE.PlaneGeometry(700, 700, 1, 1);
const backgroundPlaneThirdScreenUnderneath = new THREE.Mesh(backgroundPlaneThirdScreenGeometry, backgroundMaterialFourthScreen)
backgroundPlaneThirdScreenUnderneath.position.set(0, -405, 20)
backgroundPlaneThirdScreenUnderneath.rotateX(-Math.PI * 0.5)
scene.add(backgroundPlaneThirdScreenUnderneath)
//resize function

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () =>
{
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  labelRenderer.setSize(sizes.width, sizes.height)
  labelRenderer3D.setSize(sizes.width, sizes.height)
})

//animation

const clock = new THREE.Clock()
const updatedPositions = new Float32Array(points.length * 3);

function animate() {
    requestAnimationFrame( animate );

    if (camera.position.y >= -40) {

      // Update positions in a separate array without modifying the geometry directly
        for (let i = 0; i < points.length; i++) {
          points[i].z += points[i].velocity;
          if (points[i].z > 40) {
              points[i].z = -200;
          }

          updatedPositions[i * 3] = points[i].x;
          updatedPositions[i * 3 + 1] = points[i].y;
          updatedPositions[i * 3 + 2] = points[i].z;
      }

      // Update the geometry's position attribute once outside the loop
      starGeo.setAttribute('position', new THREE.BufferAttribute(updatedPositions, 3));
    }

    TWEEN.update();
    if (mixer){
      mixer.update(clock.getDelta());
    }
    renderer.render(scene, camera);
    labelRenderer.render( scene, camera );
    labelRenderer3D.render( scene, camera );
}


animate()

//click to get started text blinking

// let hiddenStart = false

// setInterval(() => {
//     const box = document.getElementsByClassName('start');
//     hiddenStart = !hiddenStart;
//     if (hiddenStart == true) {
//       box[0].style.visibility = 'visible';
//     }
//     else {
//       box[0].style.visibility = 'hidden';
//     }
//   }, 800);