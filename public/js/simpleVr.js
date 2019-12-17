'use strict'


const main = () => {
    const scene = new THREE.Scene();
    let camera  = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
    const vr = true;
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    
    if(vr) {
    document.body.appendChild( VRButton.createButton( renderer ) );
    renderer.vr.enabled = true;
    } else {
    document.body.appendChild( renderer.domElement ); 
    }



    
    const jmat = new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load('textures/metalTex_COLOR.png'), 
        side: THREE.FrontSide,
    //    normalMap: new THREE.TextureLoader().load('textures/metalTex_NRM.png'),
    //    bumpMap:  new THREE.TextureLoader().load('textures/metalTex_DISP.png'),
    //    bumpScale: 0.8,
    //    aoMap: new THREE.TextureLoader().load('textures/metalTex_OCC.png'),
    //    aoMapIntensity: 8,
       shininess: 20, //default is 30
    });
    // const cube = new THREE.Mesh(jbox,jmat);
    const spread = 800;
    const count = 10000;
    class MyCube {
        constructor(spread) {
            this.c =  new THREE.Mesh((new THREE.BoxBufferGeometry(4,4,4,1,1,1)),jmat);
            this.c.position.x = ((Math.random()-0.5)*spread);
            this.c.position.y = ((Math.random()-0.5)*spread);
            this.c.position.z = ((Math.random()-0.5)*spread);
        }
    
    }
   
    const cubeHolder = [];
    for(let i =0;i<count;i++) {
        cubeHolder.push(new MyCube(spread));
        scene.add(cubeHolder[i].c);
    }
    const light1 = new THREE.DirectionalLight('rgb(255,255,255)',1,50);
    const light2 = new THREE.PointLight('rgb(255,100,255)',1,100);
    scene.add(light1);
    scene.add(light2);
    
    light1.position.set(-4,0,10);
    light2.position.set(4,1.6,3);
    camera.position.set(0,1.6,3);

    const map =(value,  min1,  max1,  min2,  max2)=> {
        return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }
let speed = 0;
const animate = () => { 
   renderer.setAnimationLoop( function () {
      speed= speed+1;
       for(let i =0;i<count;i++) {
        cubeHolder[i].c.rotation.x += (i*0.04)/2000;
        cubeHolder[i].c.rotation.y += (i*.05/2)/2000;
       }
       light2.intensity = map(Math.sin(speed),-1,1,0,2);
    //    console.log(light2.intensity);
        
        renderer.render( scene, camera );
    } );
}
animate();
}
 

if(window.location.pathname === '/1' ) {
    main();
    console.log('nfdjnvsdnfdsl');
}