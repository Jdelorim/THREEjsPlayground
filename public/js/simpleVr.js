'use strict'


const main = () => {
    const scene = new THREE.Scene();
    let camera  = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
  
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    //document.body.appendChild( renderer.domElement ); 
    document.body.appendChild( VRButton.createButton( renderer ) );
    renderer.vr.enabled = true;

    // const onWindowResize = () => {
    //     renderer.setSize( window.innerWidth, window.innerHeight );
    //     camera.aspect = window.innerWidth / window.innerHeight;
    //     camera.updateProjectionMatrix();
    // }
    // window.addEventListener( 'resize', onWindowResize, false );

    const jbox = new THREE.BoxBufferGeometry(1.5,1.5,1.5);
    const jmat = new THREE.MeshPhongMaterial({color: 'rgb(255,255,255)'});
    const cube = new THREE.Mesh(jbox,jmat);
    var light3 = new THREE.DirectionalLight('rgb(255,200,255)',1,50);
    scene.add(light3);
    scene.add(cube);
    light3.position.set(-4,0,10);
    camera.position.set(0,1.6,3);
    cube.rotation.x = 10;
    cube.rotation.y = 5;
    cube.position.z = -5;

const animate = () => { 
   
    // renderer.render(scene, camera);
    //requestAnimationFrame(animate);
    renderer.setAnimationLoop( function () {
        cube.rotation.x += 0.04;
        cube.rotation.y += .05/2;
        renderer.render( scene, camera );
    
    } );
}
animate();
}
 

if(window.location.pathname === '/1' ) {
    main();
    console.log('nfdjnvsdnfdsl');
}