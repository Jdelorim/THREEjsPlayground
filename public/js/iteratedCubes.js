console.log('thanks for looking at my demo!');
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
     
    const cubeMat = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('textures/brickTex.png'), side: THREE.FrontSide } );

 
   
    const mat = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('textures/brickTex.png'), side: THREE.FrontSide } );
    const spreadX = -6;
    const spreadR = 500;
    let h;
 

    function MyCube(spreadR) {
        this.c =  new THREE.Mesh((new THREE.BoxBufferGeometry(4,4,4,1,1,1)),mat);
        this.c.position.x = ((Math.random()-0.5)*spreadR);
        this.c.position.y = ((Math.random()-0.5)*spreadR);
        this.c.position.z = ((Math.random()-0.5)*spreadR);
        
    } 
    var count = 8000;
    var cubeHolder = [];
    for(var i =0;i<count;i++) {
        cubeHolder.push(new MyCube(spreadR));
        scene.add(cubeHolder[i].c);
    }
  
    camera.position.z = 614;
   
   const light1 = new THREE.PointLight('rgb(255,200,255)',8,900);
   const light2 = new THREE.PointLight('rgb(100,200,255)',8,900);
   const light3 = new THREE.PointLight( 'rgb(63,140,133)',4,300);
    

    light1.position.set(-900,0,0);
    light2.position.set(900,0,0);
    light3.position.set(0,0,0);
    scene.add(light1);
    scene.add(light2);
    scene.add(light3);
    let speed2 =0;
    let speed = 0.022;

    const update = () => {
    
     speed2 = speed2 + 1;
    
    for(var i=0;i<count;i++) {
       cubeHolder[i].c.rotation.y+=(i*speed)/1000;
       cubeHolder[i].c.rotation.z+=(i*speed)/1000;
       cubeHolder[i].c.rotation.x+=(i*speed)/1000;
    }
    
    var ani = ((Math.sin(speed2/2)+0.5)+0.5)*2.5;
    light3.intensity = ani;
    }

    const render = () => {
        renderer.render( scene, camera );
    };

    const Loop = () => {
        requestAnimationFrame( Loop );
        update();
        render();
    };

    Loop();