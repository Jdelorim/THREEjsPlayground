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
   
    var mat = new THREE.MeshFaceMaterial(cubeMat);
    var spreadX = -6;
    var spreadR = 500;
    let h;

    function MyCube(spreadR) {
        this.c =  new THREE.Mesh((new THREE.BoxGeometry(4,4,4,1,1,1)),cubeMat);
        this.c.position.x = ((Math.random()-0.5)*spreadR);
        this.c.position.y = ((Math.random()-0.5)*spreadR);
        this.c.position.z = ((Math.random()-0.5)*spreadR);
        
    } 
    var count = 10000;

//     for(var i =0; i< 5000; i++) {
//         var cube = new THREE.Mesh(geometry, mat);
//         cube.position.x = ((Math.random()-0.5)*spreadR);
//         cube.position.y = ((Math.random()-0.5)*spreadR);
//         cube.position.z = ((Math.random()-0.5)*spreadR); 
//         cube.rotation.x += ((Math.random()-0.5)*360);  
   
//         h = Math.round((Math.random() * 255)).toString();
//         scene.add(cube);
//         spreadX += 2;
//    }
    var cubeHolder = [];
    for(var i =0;i<count;i++) {
        cubeHolder.push(new MyCube(spreadR));
        scene.add(cubeHolder[i].c);
    }
  
   var c = `rgb(${h},255,255)`;
  // var mat = new THREE.MeshBasicMaterial({color: c, wireframe: false});
   
    //camera is at origin so move to see the cube
    camera.position.z = 100;
   // cube.position.z = -100;
    
    var r = [];
    for(var i =0;i<count;i++) {
        r.push = Math.random();
        
    }
    console.log('---'+r);
    //game logic
    const update = () => {
    let speed = 0.02;
    
    for(var i=0;i<count;i++) {
       cubeHolder[i].c.rotation.y+=(i*speed)/1000;
       cubeHolder[i].c.rotation.z+=(i*speed)/1000;
       cubeHolder[i].c.rotation.x+=(i*speed)/1000;
    }
       
   
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