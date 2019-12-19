'use strict'




// let mic, fft, spectrum;
// function setup() {
//  noCanvas();

//   mic = new p5.AudioIn();
//   mic.start();
//   //arg is smoothing and bins
//   fft = new p5.FFT(0.8, 512);
//   console.log(fft);
//   fft.setInput(mic);
//   if(window.location.pathname === '/3') {
//   meshAudio();
//   }
// }
// const startAudio = () => {
//     console.log('audio started');
//     if (getAudioContext().state !== 'running') {
//         getAudioContext().resume();
//     }
// }

let wir = false;
const wireFrame = () => {
    wir = !wir;
}

const meshAudio = () => {
   
   
    //fps 
    const stats = new Stats();
    document.body.appendChild(stats.domElement); 

    const scene = new THREE.Scene();

    let camera  = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;
    document.body.appendChild(renderer.domElement); 
    let vr = true;
    if(vr === true) {
        document.body.appendChild( VRButton.createButton( renderer ) );
        renderer.vr.enabled = true;
    }
    
    const onWindowResize = () => {
        renderer.setSize( window.innerWidth, window.innerHeight );
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

    window.addEventListener( 'resize', onWindowResize, false );
    //helper functions
    const simplex = new SimplexNoise(Math.random());
    
    const map =(value,  min1,  max1,  min2,  max2)=> {
        return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }
    // const clamp = (num, min, max) => {
    //     return num <= min ? min : num >= max ? max : num;
    //   }
    
    //materials
    const jLmat = new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load('textures/metalTex_COLOR.png'), 
        side: THREE.FrontSide,
        aoMap: new THREE.TextureLoader().load('textures/metalTex_OCC.png'),
        aoMapIntensity: 8,
        wireframe: false
    });
    
   const sphere = new THREE.Mesh((new THREE.SphereGeometry(2,100,100)), jLmat);
   sphere.position.set(0,0,-10);
   scene.add(sphere);

   const light1 = new THREE.DirectionalLight('rgb(255,255,255)',0.9,5);
   light1.position.set(-4,0,10);
   scene.add(light1);
 
  
  

const render = () => {
    renderer.render(scene, camera);
}
let speed =0;

  
const makeRoughBall = (mesh,time, bassFr, treFr, amp, sp1, sp2, sp3) => { 
    
    mesh.geometry.vertices.forEach(function (vertex, i) {
    var offset = mesh.geometry.parameters.radius;
    
    vertex.normalize();
    var distance = (offset + bassFr ) + simplex.noise3D(
          (vertex.x ) + (time ) * (0.0007),
          (vertex.y)  + (time ) * (0.0008),
          (vertex.z)  + (time ) * (0.0009)
    ) * amp * treFr;
    vertex.multiplyScalar(distance);
  });
  mesh.geometry.verticesNeedUpdate = true;
  mesh.geometry.normalsNeedUpdate = true;
  mesh.geometry.computeVertexNormals();
  mesh.geometry.computeFaceNormals();
}
 
 const slider1 = document.getElementById('jSlider1');
 const slider2 = document.getElementById('jSlider2');
 const slider3 = document.getElementById('jSlider3');




const drawtoScreen = () => {
    renderer.setAnimationLoop(()=>{
        // spectrum = fft.analyze();
        // let bass = [];
        // let mid = [];
        // let high = [];
        // let total = 0;
        // for(let i =0;i<50;i++) {
        //     bass.push(spectrum[i]);
        //     mid.push(spectrum[i+50]);
        //     high.push(spectrum[i+100]);
        //     total += bass[i];
        // }
        
        // let bassAvg = total/50;
        // let midAvg = total/50;
        // let highAvg = total/50;
       
        // let b1 = map(bassAvg, 0,256,0, 1);
        // let m1 = map(midAvg, 0, 256/50, 0, 1);
        // let h1 = map(highAvg, 0, 256/50, 0, 1);
       jLmat.wireframe = wir;
      
    
        speed = window.performance.now();
        let sl2 = map(slider2.value,0,100,0,1);
        let sl1 = map(slider1.value, 0,100, 0,0.09);
        let sl3 = map(slider3.value, 0, 100, 0, 1);
        let n1 = map(simplex.noise2D(speed/5000,speed/3000),-1,1,-5,5);
        let n2 = map(simplex.noise2D((speed/4000),(speed/2004)),-1,1,-5,5);
        makeRoughBall(sphere,speed,sl2*3,sl2*2,1, 0,0, 0);
         
        
        sphere.position.x = n1*sl3;
        sphere.position.y = n2*sl3;
        sphere.rotation.x += sl1;
        sphere.rotation.z += sl1+0.005;
        stats.update();
        render();    
    });
    
   
    
}
   
    drawtoScreen();
}
meshAudio();

console.log('hi');