'use strict'


const main = () => {
    const scene = new THREE.Scene();
    let camera  = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
    const vr = true;
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild( renderer.domElement ); 
    if(vr) {
    document.body.appendChild( VRButton.createButton( renderer ) );
    renderer.vr.enabled = true;
    }



    const jbox = new THREE.BoxBufferGeometry(1.5,1.5,1.5);
    const jmat = new THREE.MeshPhongMaterial({color: 'rgb(255,255,255)'});
    // const cube = new THREE.Mesh(jbox,jmat);
    const spread = 100;
    class MyCube {
        constructor(spread) {
            this.c =  new THREE.Mesh((new THREE.BoxBufferGeometry(4,4,4,1,1,1)),jmat);
            this.c.position.x = ((Math.random()-0.5)*spread);
            this.c.position.y = ((Math.random()-0.5)*spread);
            this.c.position.z = ((Math.random()-0.5)*spread);
        }
    
    }
   
    const cubeHolder = [];
    for(let i =0;i<100;i++) {
        cubeHolder.push(new MyCube(spread));
        scene.add(cubeHolder[i].c);
    }
    const light1 = new THREE.DirectionalLight('rgb(255,255,255)',1,50);
    const light2 = new THREE.PointLight('rgb(255,100,255)',1,50);
    scene.add(light1);
    scene.add(light2);
    
    light1.position.set(-4,0,10);
    light2.position.set(4,1.6,3);
    camera.position.set(0,1.6,3);
  

const animate = () => { 
   renderer.setAnimationLoop( function () {
       for(let i =0;i<100;i++) {
        cubeHolder[i].c.rotation.x += 0.04;
        cubeHolder[i].c.rotation.y += .05/2;
       }
        
        renderer.render( scene, camera );
    } );
}
animate();
}
 

if(window.location.pathname === '/1' ) {
    main();
    console.log('nfdjnvsdnfdsl');
}