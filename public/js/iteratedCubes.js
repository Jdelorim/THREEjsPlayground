console.log('thanks for looking at my demo!');
//FPS
(()=>{
    const script=document.createElement('script');
    script.onload=()=>{
        const stats=new Stats();
        document.getElementById('stats').appendChild(stats.dom);
        requestAnimationFrame(loop=()=>{
            stats.update();
            requestAnimationFrame(loop);
        });
    };
        script.src='//mrdoob.github.io/stats.js/build/stats.min.js';
        document.head.appendChild(script);
    })()
//


// let synth;


    
//         Tone.start();
   
//         synth = new Tone.Synth().toDestination();
//         function onkeydown(){
//             Tone.context.resume().then(()=>{
//                 synth.triggerAttackRelease('C4', Tone.context.currentTime);
//             })
//         }
//         function onkeyup(){
//             Tone.context.resume().then(()=>{
//                 synth.triggerRelease('C4',0);
//             })
            
//         }



// window.addEventListener('keydown', this.onkeydown);
// window.addEventListener('keyup', this.onkeyup);
// document.querySelector('#button').addEventListener('click', () => Tone.start())




const scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement ); 
const userDisplay = () => {
    const id = document.getElementById('userInfo');
    id.innerText = `Cube Count: ${count}`;
}


const onWindowResize = () => {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

window.addEventListener( 'resize', onWindowResize, false );

     controls = new THREE.OrbitControls( camera, renderer.domElement);
     
    const cubeMat = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('textures/brickTex.png'), side: THREE.FrontSide } );
    const mat = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('textures/metalTex.png'), side: THREE.FrontSide } );
    const spreadX = -6;
    const spreadR = 150;
    
    function MyCube(spreadR) {
        this.c =  new THREE.Mesh((new THREE.BoxBufferGeometry(4,4,4,1,1,1)),mat);
        this.c.position.x = ((Math.random()-0.5)*spreadR);
        this.c.position.y = ((Math.random()-0.5)*spreadR);
        this.c.position.z = ((Math.random()-0.5)*spreadR);
    } 
    const map =(value,  min1,  max1,  min2,  max2)=> {
        return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }

    const count = 1000;
    const cubeHolder = [];

    for(var i =0;i<count;i++) {
        cubeHolder.push(new MyCube(spreadR));
        scene.add(cubeHolder[i].c);
    }
    
    
    camera.position.set(57,-1,58);
    camera.rotation.set(-1,1,9);
    
   const light1 = new THREE.PointLight('rgb(255,200,255)',10,300);
   const light2 = new THREE.PointLight('rgb(100,200,255)',10,300);
   const light3 = new THREE.PointLight( 'rgb(63,140,133)',4,150);
    
    light1.position.set(-300,0,0);
    light2.position.set(300,0,0);
    light3.position.set(0,0,0);
    scene.add(light1);
    scene.add(light2);
    scene.add(light3);
    let speed2 =0;
    let speed = 0.022;
    //update
    const update = () => {
    
     speed2 = speed2 + 1;
    
    for(let i=0;i<count;i++) {
       cubeHolder[i].c.rotation.y+=(i*speed)/1000;
       cubeHolder[i].c.rotation.z+=(i*speed)/1000;
       cubeHolder[i].c.rotation.x+=(i*speed)/1000;
    }
    const sin = Math.sin(speed2/8);
    const ani = map(sin,-1.0,1.0,0,6);
    light3.intensity = ani;

    }
    /////////////////////////////
    
    const render = () => {
        renderer.render( scene, camera );
    };

    const Loop = () => {
        requestAnimationFrame( Loop );
        update();
        render();
    };
    userDisplay();
    Loop();