console.log('hi');
const scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement ); 

const onWindowResize = () => {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}
window.addEventListener( 'resize', onWindowResize, false );

     controls = new THREE.OrbitControls( camera, renderer.domElement);
     
     
    //create shape
    var geometry = new THREE.BoxBufferGeometry(4,4,4,1,1,1);
    // var cubeMat =  
    // [
    // new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('textures/brickTex.png'), side: THREE.DoubleSide } ),
    // new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('textures/brickTex.png'), side: THREE.DoubleSide } ),
    // new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('textures/brickTex.png'), side: THREE.DoubleSide } ),
    // new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('textures/brickTex.png'), side: THREE.DoubleSide } ),
    // new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('textures/brickTex.png'), side: THREE.DoubleSide } ),
    // new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('textures/brickTex.png'), side: THREE.DoubleSide } ),
    
    // ]
    var holder =  new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('textures/brickTex.png'), side: THREE.FrontSide } );
   // var cubeMat = [holder,holder,holder,holder,holder,holder];
    var cubeMat = holder;
    //lighting
    var color1 = 'rgb(255,255,255)';
    var color2 = 'rgb(100,50,100)';
    const ambientLight =  new THREE.AmbientLight('rgb(255,255,255)', 1);
    //scene.add( ambientLight );
    var light1 = new THREE.PointLight(color1, 1, 50);
    var light2 = new THREE.PointLight(color2, 2, 50);
    var light3 = new THREE.DirectionalLight(color1,1,50);
    light3.position.set(2,0,0);
    light1.position.set( 4,0,10);
    light2.position.set(-4,0,10);
 
    scene.add( light1 );
    scene.add(light2);
  
    //create material or color or tex
    //for each face individual use array cubMat
    //var mat = new THREE.MeshFaceMaterial(cubeMat)
   // var mat = new THREE.MeshBasicMaterial( {color: 0xFFFFFF, wireframe: false})
  // var mat = new THREE.MeshBasicMaterial(cubeMat);
   // var mat = new THREE.MeshBasicMaterial({color: 'rgb(255,100,255)', wireframe: false});
    var cube = new THREE.Mesh(geometry, cubeMat);
    scene.add(cube);
  //camera is at origin so move to see the cube
    
    camera.position.z = 10;
    cube.position.z = 0.0;
    cube.position.x = 0.0;
    cube.position.y = 0.0;
   
   var arr1 = [0.01,0.02,0.03,0.04,0.05,0.06,0.07,0.08,0.09,0.1];

    //game logic
    const update = () => {
        cube.rotation.x += 0.02;
        cube.rotation.y += 0.01;
        cube.rotation.z += 0.005;
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