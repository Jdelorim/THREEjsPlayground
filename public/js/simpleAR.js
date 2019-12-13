/*-- ------------------------------------------------------------ 
###################################################################### 
#Copyright (C) 2018  Kris Occhipinti
#https://filmsbykris.com

#This program is free software: you can redistribute it and/or modify
#it under the terms of the GNU General Public License as published by
#the Free Software Foundation, either version 3 of the License, or
#(at your option) any later version.

#This program is distributed in the hope that it will be useful,
#but WITHOUT ANY WARRANTY; without even the implied warranty of
#MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#GNU General Public License for more details.

#You should have received a copy of the GNU General Public License
#along with this program.  If not, see <http://www.gnu.org/licenses/>.
###################################################################### 

*/

var camera, scene, renderer, controls;
var context, analyser, source;
var spheres=[];

var audio = new Audio();
audio.src = 'music.mp3';
audio.autoplay = true;


init();
animate();

function init() {
  scene = new THREE.Scene();

  audioCreate();
  loop();

  createRenderer();
  createCamera();
  light = createLights();
  window.addEventListener( 'resize', onWindowResize, false );

  //add spheres
  for(var i = 50;i<500;i+=50){
    spheres[i]=createSphere();
    spheres[i].position.x=i*2-400
  }

  canvas = document.getElementsByTagName("canvas")[0];
  canvas.addEventListener('click', function() { 
    //alert("click");
    audio.play();
    context.resume();
  }, false);
}

function audioCreate(){
  context = new AudioContext(); // AudioContext object instance
  analyser = context.createAnalyser(); // AnalyserNode method
  source = context.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(context.destination);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  controls.update();
}

function createCamera(){
  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 5000 );
  camera.position.z = 400;
  camera.position.y = 400;
  camera.lookAt(scene.position);

  //addcontrols
  controls = new THREE.OrbitControls( camera, renderer.domElement );
}

function createRenderer(){
  renderer = new THREE.WebGLRenderer( { antialias: true,alpha: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

}

function createLights(){
  light1 = new THREE.DirectionalLight( 0xffffff, 1 );
  light1.position.set( 5, 5, 10 ).normalize();
  scene.add( light1 );

  light2 = new THREE.DirectionalLight( 0xffffff, 1 );
  light2.position.set(-1,-1,-5).normalize();
  scene.add( light2 );

  return true;
}

function loop(){
  window.requestAnimationFrame(loop);
  fbc_array = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(fbc_array);      
  spheres.forEach(function(m,i){
    var s=fbc_array[i]/10;
    if(s==0){s=1};
    m.scale.x=s;
    m.scale.y=s;
    m.scale.z=s;
  })

}

function createSphere(){

  var material = new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff }) ;
  var geometry = new THREE.SphereBufferGeometry( 5, 32, 16 );
  var mesh = new THREE.Mesh( geometry, material );
  scene.add(mesh);

  return mesh;
}



