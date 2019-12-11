console.log('hi');
const scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement ); 

const onWindowResize = () => {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}
window.addEventListener( 'resize', onWindowResize, false );

     controls = new THREE.OrbitControls( camera, renderer.domElement);
     
     console.log(controls);
    //create shape
    var geometry = new THREE.BoxGeometry(4,4,4,1,1,1);
    // var cubeMat =  
    // [
    // new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('textures/brickTex.png'), side: THREE.DoubleSide } ),
    // new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('textures/brickTex.png'), side: THREE.DoubleSide } ),
    // new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('textures/brickTex.png'), side: THREE.DoubleSide } ),
    // new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('textures/brickTex.png'), side: THREE.DoubleSide } ),
    // new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('textures/brickTex.png'), side: THREE.DoubleSide } ),
    // new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('textures/brickTex.png'), side: THREE.DoubleSide } ),
    
    // ]
    var cubeMat = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('textures/brickTex.png'), side: THREE.FrontSide } );

    //create material or color or tex
    //for each face individual use array cubMat
    //var mat = new THREE.MeshFaceMaterial(cubeMat)
   // var mat = new THREE.MeshBasicMaterial( {color: 0xFFFFFF, wireframe: false})
  // var mat = new THREE.MeshBasicMaterial(cubeMat);
 
   var spreadX = -6;
   var spreadR = 500;
   let h;
   for(var i =0; i< 5000; i++) {
    var cube = new THREE.Mesh(geometry, mat);
    cube.position.x = ((Math.random()-0.5)*spreadR);
    cube.position.y = ((Math.random()-0.5)*spreadR);
    cube.position.z = ((Math.random()-0.5)*spreadR); 
    cube.rotation.x += ((Math.random()-0.5)*360);  
   
    h = Math.round((Math.random() * 255)).toString();
    scene.add(cube);
    spreadX += 2;
   }
  
   var c = `rgb(${h},255,255)`;
   var mat = new THREE.MeshBasicMaterial({color: c, wireframe: false});
   
    //camera is at origin so move to see the cube
    camera.position.z = 700;
    cube.position.z = -100;
    cube.rotation.x = 50;
   var arr1 = [0.01,0.02,0.03,0.04,0.05,0.06,0.07,0.08,0.09,0.1];
    //game logic
    const update = () => {
        cube.rotation.x += 0.02;
    }

    const render = () => {
        renderer.render( scene, camera );
    };

    const GameLoop = () => {
        requestAnimationFrame( GameLoop );
        update();
        render();
    }

    GameLoop();