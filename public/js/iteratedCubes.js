'use strict'
console.log('thanks for looking at my demo!');

//FPS
const stats = new Stats();
document.body.appendChild( stats.domElement ); 

const scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.physicallyCorrectLights = true;
renderer.shadowMap.enabled = true;
//renderer.vr.enabled = true;
document.body.appendChild( renderer.domElement ); 
//document.body.appendChild( VRButton.createButton( renderer ) );

const onWindowResize = () => {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

const userDisplay = () => {
    const id = document.getElementById('userInfo');
    id.innerText = `Cube Count: ${count}`;
}

window.addEventListener( 'resize', onWindowResize, false );

    const controls = new THREE.OrbitControls( camera, renderer.domElement);
    const cubeMat = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('textures/brickTex.png'), side: THREE.FrontSide } );
    const mat = new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load('textures/metalTex_COLOR.png'), 
        side: THREE.FrontSide,
       normalMap: new THREE.TextureLoader().load('textures/metalTex_NRM.png'),
       bumpMap:  new THREE.TextureLoader().load('textures/metalTex_DISP.png'),
       bumpScale: 0.8,
       aoMap: new THREE.TextureLoader().load('textures/metalTex_OCC.png'),
       aoMapIntensity: 8,
       shininess: 20, //default is 30
    });
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
    
   const light1 = new THREE.PointLight('rgb(255,200,255)',1200,400);
   const light2 = new THREE.PointLight('rgb(100,200,255)',1200,400);
   const light3 = new THREE.PointLight( 'rgb(63,140,133)',500,150*2);
    
    light1.position.set(-300,0,0);
    light2.position.set(300,0,0);
    light3.position.set(0,0,0);
    scene.add(light1);
    scene.add(light2);
    scene.add(light3);
    let speed2 = 0;
    let speed = 0.022;
    //update

    /////////////////////////////

    //post processing
    // const myEffect ={
    //     uniforms: {
    //         'tDiffuse': { value: null},
    //         'amount': { value: 0.0 }
    //     },
    //     vertexShader: [
    //         `varying vec2 vUv;`,
    //         `void main() {`,
    //         `vUv = uv;`,
    //         `gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);`,
    //         `}`
    //     ].join("\n"),
    //     fragmentShader: [
    //         `uniform float amount;`,
    //         'uniform sampler2D tDiffuse;',
    //         'varying vec2 vUv;',
    //         `void main() {`,
    //             `vec4 color = texture2D( tDiffuse, vUv );`,
    //             `vec3 c = color.rgb;`,
    //             `color.r = c.r * 2.0;`,
    //             `color.g = c.g + amount;`,
    //             `color.b = c.b;`,
    //             `gl_FragColor = vec4( color.rgb, color.a );`,
    //         `}`
    //     ].join("\n")
    // }

    const composer = new THREE.EffectComposer(renderer);
    const renderPass = new THREE.RenderPass(scene, camera);
    composer.addPass(renderPass);
    
    const pass1 = new THREE.ShaderPass(THREE.SepiaShader);
    //composer.addPass(pass1);

    const pass2 = new THREE.GlitchPass(20);
   // composer.addPass(pass2);

    const pass3 = new THREE.ShaderPass(THREE.BadTVShader);
    //composer.addPass(pass3);
   //strength(0-5),threshold(0 or 1),  
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight),0.6, 0.5, 0.9);
	composer.addPass(bloomPass);


    bloomPass.renderToScreen = true;
    

    const render = () => {
        //renderer.render( scene, camera );
        composer.render();
    };

    const update = () => {
    
        speed2 = speed2 + 1;
       
       for(let i=0;i<count;i++) {
          cubeHolder[i].c.rotation.y+=(i*speed)/1000;
          cubeHolder[i].c.rotation.z+=(i*speed)/1000;
          cubeHolder[i].c.rotation.x+=(i*speed)/1000;
       }
       const sin = Math.sin(speed2/8);
       const ani = map(sin,-1.0,1.0,0,300);
       light3.intensity = ani;

    //    pass3.uniforms.distortion.value += 0.000001;
    //    pass3.uniforms.distortion2.value += 0.01;
    
    }

    const Loop = () => {
         requestAnimationFrame( Loop );
       // renderer.setAnimationLoop( Loop );
        update();
        stats.update(); 
        render();
    };
    userDisplay();
    Loop();