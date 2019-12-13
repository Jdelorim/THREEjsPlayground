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

var camera, scene, renderer;
var mesh;
var pos = [];
init();
animate();

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 400;
  camera.position.y = 400;
  camera.lookAt(scene.position);


  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  //

  window.addEventListener( 'resize', onWindowResize, false );

  ADD = setInterval(addCube,50);
}

function addCube(){
  var grid = 10;
  var size = 50;
  var offset = (size * grid)/2;

  //check if all spots have been filled
  if(pos.length >= grid*grid){
    clearInterval(ADD);
    alert("All Positions Filled");
    return false;
  }

  var texture = new THREE.TextureLoader().load( 'textures/brickTex.png' );
  var geometry = new THREE.BoxBufferGeometry( size, size, size );
  var material = new THREE.MeshBasicMaterial( { map: texture } );

  mesh = new THREE.Mesh( geometry, material );
  mesh.size = size;

  var p = Math.floor((Math.random() * grid * grid));

  //check if position has already been used
  if(pos.includes(p)){
    addCube();
  }else{
    pos.push(p);

    var row = (p%grid) *size;
    var col = Math.floor(p/grid)*size;
    //console.log(row + " : " + col);
    mesh.position.set(row - offset,0,col-offset);
    scene.add( mesh );
    return mesh;
  }
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}

