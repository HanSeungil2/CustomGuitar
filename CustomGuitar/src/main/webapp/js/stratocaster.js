var models = "../assets/models/";
var textures = "../assets/textures/";
var scene;
var camera,
    renderer,
    orbit,
    oloader,
    sloader,
    texture,
    textureLoader,
    textureCube,
    envMaterial,
    info,
    bufferGeometry,
    mat;

var divWidth = window.innerWidth - 312;
var divHeight = window.innerHeight - 200;
var guitar = new THREE.Group();
var body,neck,truss_cover,truss_tip,fingerboard,fret,string_st,nut,pickup_cover,poll,pickup_screw,
    pickguard,pickguard1,pickguard2,pickguard3,pickguard_screw,tremolo,arm_cup,volume1,tone1,tone2,way5,
    tuner,tip,output,neck_plate,strap_btn,body_plate,body_plate_screw,string;

var count = 0;

function setStratocaster() {

    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera( 45, divWidth / divHeight, 1, 1000 );
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = -500;
    camera.lookAt(new THREE.Vector3(0, 40, 0));

    // light
    var hemisphereLight = new THREE.HemisphereLight( 0xffeeee, 0x111122 );
    scene.add( hemisphereLight );

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(700, 500, -300);
    spotLight.angle = 1.6;

    var spotLight2 = new THREE.SpotLight(0xffffff);
    spotLight2.position.set(700, 500, 300);
    spotLight2.angle = 1.6;

    scene.add(spotLight);
    scene.add(spotLight2);

    // Line Helper
    //var lightHelper = new THREE.SpotLightHelper( spotLight );
    //var lightHelper2 = new THREE.SpotLightHelper( spotLight2 );
    //scene.add( lightHelper );
    //scene.add( lightHelper2 );

    var pointLight = new THREE.PointLight(0xccffcc);
    pointLight.position.set( -330, -130, -100 );
    pointLight.distance = 400;
    pointLight.intensity = 1;

    scene.add(pointLight);

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( divWidth, divHeight );
    renderer.setClearColor(0xeeeeee);

    // Controls
    orbit = new THREE.OrbitControls(camera, renderer.domElement);

    // add the output of the renderer to the html element
    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    // Metal
    textureCube = createCubeMap();
    textureCube.format = THREE.RGBFormat;
    var cubeCamera = new THREE.CubeCamera(0.1, 20000, 256);
    scene.add(cubeCamera);
    envMaterial = new THREE.MeshStandardMaterial({envMap: textureCube, side: THREE.DoubleSide});
    envMaterial.metalness = 1;

    textureLoader = new THREE.TextureLoader();

    oloader = new THREE.ColladaLoader();
    sloader = new THREE.STLLoader();

    //waitingDialog.show();

    // Body
    setBody();
    // Neck
    setNeck();
    // Tuner
    setTuner();
    // Tremolo
    setTremolo();
    // Pickup
    setPickup();
    // Pickguard
    setPickguard();
    // Control Switch
    setControl();
    // Etc
    setEtc();

    render();

    function render() {
        requestAnimationFrame( render );
        orbit.update();
        renderer.render( scene, camera );

        $('.progress-bar').css('width', Math.round(count*3.7)+'%').attr('aria-valuenow', Math.round(count*3.7));
        if(count == 27) {
            //$('.progress-bar').css('width', '100%').attr('aria-valuenow', 100);
            //waitingDialog.hide();
            $("#WebGL-info").text("MOVE mouse & press : LEFT/A: rotate,  MIDDLE/S: zoom,  RIGHT/D: pan");
            count = 0;
        }
    }

}

// 주위 환경
function createCubeMap() {
    var path = textures + "cubemap/parliament/";
    var format = '.jpg';
    var urls = [
        path + 'negx' + format, path + 'posx' + format,
        path + 'negy' + format, path + 'posy' + format,
        path + 'negz' + format, path + 'posz' + format
    ];

    var textureCube = new THREE.CubeTextureLoader().load( urls );

    return textureCube;
}

// 오브젝트 위치
function setObjPosition(dae) {
    dae.rotation.x = 3.5 * Math.PI;
    dae.rotation.y = 1.0 * Math.PI;
    dae.position.x = 50;
    dae.scale.set(0.6, 0.6, 0.6);
    //dae.updateMatrix();

    //guitar.add(dae);
    scene.add(dae);
}

// 재질 변경
var setMaterial = function(node, material) {
    node.material = material;
    if (node.children) {
        for (var i = 0; i < node.children.length; i++) {
            setMaterial(node.children[i], material);
        }
    }
}

// Body
function setBody() {
    // oloader.load( models + "body.dae", function( collada ) {
    //     body = collada.scene;
    //     count++;
    //     setObjPosition(body);
    // });
    sloader.load(models + "body.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial({color: 0x3f5c94});
        mat.shininess = 300;
        bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
        body = new THREE.Mesh(bufferGeometry, mat);
        count++;
        setObjPosition(body);
    });
}

// Neck
function setNeck() {
    // oloader.load(models + "maple_neck.dae", function (collada) {
    //     neck = collada.scene;
    //     count++;
    //     setObjPosition(neck);
    // });
    sloader.load(models + "neck.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial();
        var textureLoader = new THREE.TextureLoader();
        var texture = textureLoader.load( textures + "crop_wood-098.jpg" );
        mat.map = texture;
        bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
        neck = new THREE.Mesh(bufferGeometry, mat);
        count++;
        setObjPosition(neck);
    });
    sloader.load(models + "truss_cover.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial();
        var textureLoader = new THREE.TextureLoader();
        var texture = textureLoader.load( textures + "crop_wood-071.jpg" );
        mat.map = texture;
        bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
        truss_cover = new THREE.Mesh(bufferGeometry, mat);
        count++;
        setObjPosition(truss_cover);
    });
    sloader.load(models + "truss_tip.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial();
        var textureLoader = new THREE.TextureLoader();
        var texture = textureLoader.load( textures + "crop_wood-071.jpg" );
        mat.map = texture;
        bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
        truss_tip = new THREE.Mesh(bufferGeometry, mat);
        count++;
        setObjPosition(truss_tip);
    });
    oloader.load(models + "maple_finger.dae", function (collada) {
        fingerboard = collada.scene;
        count++;
        setObjPosition(fingerboard);
    });
    sloader.load(models + "fret.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial({color: 0xe5eaed});
        mat.metalness = 1;
        bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
        fret = new THREE.Mesh(bufferGeometry, mat);
        count++;
        setObjPosition(fret);
    });
    sloader.load(models + "string_st.stl", function (geometry) {
        bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
        string_st = new THREE.Mesh(bufferGeometry, envMaterial);
        count++;
        setObjPosition(string_st);
    });
    sloader.load(models + "nut.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial({color: 0xffffff});
        bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
        nut = new THREE.Mesh(bufferGeometry, mat);
        count++;
        setObjPosition(nut);
    });
}

// Tuner
function setTuner(){
    sloader.load(models + "tuner.stl", function (geometry) {
        bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
        tuner = new THREE.Mesh(bufferGeometry, envMaterial);
        count++;
        setObjPosition(tuner);
    });
}

// Tremolo
function setTremolo(){
    // oloader.load( models + "tremolo.dae", function( collada ) {
    //     tremolo = collada.scene;
    //     mat = new THREE.MeshPhongMaterial();
    //     setMaterial(tremolo, envMaterial);
    //     count++;
    //     setObjPosition(tremolo);
    // });
    // oloader.load( models + "arm_cup.dae", function( collada ) {
    //     arm_cup = collada.scene;
    //     mat = new THREE.MeshPhongMaterial({color: 0xffffff});
    //     setMaterial(arm_cup, mat);
    //     count++;
    //     setObjPosition(arm_cup);
    // });
    sloader.load(models + "tremolo.stl", function (geometry) {
        bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
        tremolo = new THREE.Mesh(bufferGeometry, envMaterial);
        count++;
        setObjPosition(tremolo);
    });
    sloader.load(models + "arm_cup.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial({color: 0xffffff});
        bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
        arm_cup = new THREE.Mesh(bufferGeometry, mat);
        count++;
        setObjPosition(arm_cup);
    });
}

// Pickup
function setPickup(){
    sloader.load(models + "pickup_cover.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial({color: 0xffffff});
        bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
        pickup_cover = new THREE.Mesh(bufferGeometry, mat);
        count++;
        setObjPosition(pickup_cover);
    });
    sloader.load(models + "poll.stl", function (geometry) {
        bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
        poll = new THREE.Mesh(bufferGeometry, envMaterial);
        count++;
        setObjPosition(poll);
    });
    sloader.load(models + "pickup_screw.stl", function (geometry) {
        bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
        pickup_screw = new THREE.Mesh(bufferGeometry, envMaterial);
        count++;
        setObjPosition(pickup_screw);
    });
}

// Pickguard
function setPickguard() {
    sloader.load(models + "pickguard.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial({color: 0xffffff});
        bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
        pickguard = new THREE.Mesh(bufferGeometry, mat);
        count++;
        setObjPosition(pickguard);
    });
    sloader.load(models + "pickguard_screw.stl", function (geometry) {
        bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
        pickguard_screw = new THREE.Mesh(bufferGeometry, envMaterial);
        count++;
        setObjPosition(pickguard_screw);
    });
}

// Control Switch
function setControl(){
    sloader.load(models + "volume1.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial({color: 0xffffff});
        bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
        volume1 = new THREE.Mesh(bufferGeometry, mat);
        count++;
        setObjPosition(volume1);
    });
    sloader.load(models + "tone1.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial({color: 0xffffff});
        bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
        tone1 = new THREE.Mesh(bufferGeometry, mat);
        count++;
        setObjPosition(tone1);
    });
    sloader.load(models + "tone2.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial({color: 0xffffff});
        bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
        tone2 = new THREE.Mesh(bufferGeometry, mat);
        count++;
        setObjPosition(tone2);
    });
    sloader.load(models + "5way.stl", function (geometry) {
        var mat = new THREE.MeshStandardMaterial({color: 0xe5eaed});
        mat.metalness = 1;
        bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
        way5 = new THREE.Mesh(bufferGeometry, mat);
        count++;
        setObjPosition(way5);
    });
    sloader.load(models + "tip.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial({color: 0xffffff});
        bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
        tip = new THREE.Mesh(bufferGeometry, mat);
        count++;
        setObjPosition(tip);
    });
}

// Etc
function setEtc(){
    sloader.load(models + "output.stl", function (geometry) {
        bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
        output = new THREE.Mesh(bufferGeometry, envMaterial);
        count++;
        setObjPosition(output);
    });
    sloader.load(models + "neck_plate.stl", function (geometry) {
        bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
        neck_plate = new THREE.Mesh(bufferGeometry, envMaterial);
        count++;
        setObjPosition(neck_plate);
    });
    sloader.load(models + "strap_btn.stl", function (geometry) {
        bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
        strap_btn = new THREE.Mesh(bufferGeometry, envMaterial);
        count++;
        setObjPosition(strap_btn);
    });
    sloader.load(models + "body_plate.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial({color: 0xffffff});
        bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
        body_plate = new THREE.Mesh(bufferGeometry, mat);
        count++;
        setObjPosition(body_plate);
    });
    sloader.load(models + "body_plate_screw.stl", function (geometry) {
        bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
        body_plate_screw = new THREE.Mesh(bufferGeometry, envMaterial);
        count++;
        setObjPosition(body_plate_screw);
    });
    sloader.load(models + "string.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial({color: 0xcfcfcf});
        bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
        string = new THREE.Mesh(bufferGeometry, mat);
        count++;
        setObjPosition(string);
    });
}

function chgBodyColor(color) {
    scene.remove(body);
    guitar.remove(body);

    if(color == "#8B4513") {
        oloader.load(models + "body.dae", function (collada) {
            body = collada.scene;
            setObjPosition(body);
        });
    } else if(color == "#C19A6B") {
        oloader.load(models + "natural_body.dae", function (collada) {
            body = collada.scene;
            setObjPosition(body);
        });
    } else {
        sloader.load(models + "body.stl", function (geometry) {
            var mat = new THREE.MeshPhongMaterial({color: color});
            mat.shininess = 180;
            bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
            body = new THREE.Mesh(bufferGeometry, mat);
            setObjPosition(body);
        });
    }

}

function chgNeck(board) {
    scene.remove(neck);
    guitar.remove(neck);
    if(board == "rosewood") {
        oloader.load(models + "rose_neck.dae", function (collada) {
            neck = collada.scene;
            setObjPosition(neck);
        });
    } else if(board == "maple") {
        oloader.load(models + "maple_neck.dae", function (collada) {
            neck = collada.scene;
            setObjPosition(neck);
        });
    }
}

function chgFingerBoard(board) {
    scene.remove(fingerboard);
    guitar.remove(fingerboard);
    if(board == "rosewood") {
        oloader.load(models + "rose_finger.dae", function (collada) {
            fingerboard = collada.scene;
            setObjPosition(fingerboard);
        });
    } else if(board == "maple") {
        oloader.load(models + "maple_finger.dae", function (collada) {
            fingerboard = collada.scene;
            setObjPosition(fingerboard);
        });
    }
}

function chgPickupColor(color) {
    pickup_cover.material = new THREE.MeshPhongMaterial({color: color});
}

function chgPickguardColor(color) {
    scene.remove(pickguard);
    guitar.remove(pickguard);
    scene.remove(pickguard1);
    guitar.remove(pickguard1);
    scene.remove(pickguard2);
    guitar.remove(pickguard2);
    scene.remove(pickguard3);
    guitar.remove(pickguard3);
    scene.remove(body_plate);
    guitar.remove(body_plate);

    if(color == "Gold") {
        sloader.load(models + "pickguard.stl", function (geometry) {
            var textureLoader = new THREE.TextureLoader();
            var texture = textureLoader.load(textures + "gold-anodized-aluminum-brushed.jpg");
            texture.mapping = THREE.SphericalReflectionMapping;
            var mat = new THREE.MeshPhongMaterial()
            mat.shininess = 500;
            mat.map = texture;
            bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
            pickguard = new THREE.Mesh(bufferGeometry, mat);
            setObjPosition(pickguard);
        });
    } else if(color == "Tortoise") {
        oloader.load(models + "tortoise.dae", function (collada) {
            pickguard = collada.scene;
            count++;
            setObjPosition(pickguard);
        });
    } else {
        if($('#pickguard option:selected').val() == '1ply') {
            sloader.load(models + "pickguard.stl", function (geometry) {
                var mat = new THREE.MeshPhongMaterial({color: color});
                bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
                pickguard = new THREE.Mesh(bufferGeometry, mat);
                setObjPosition(pickguard);
            });
        } else {
            sloader.load(models + "pickguard1.stl", function (geometry) {
                var mat = new THREE.MeshPhongMaterial({color: color});
                bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
                pickguard1 = new THREE.Mesh(bufferGeometry, mat);
                setObjPosition(pickguard1);
            });
            sloader.load(models + "pickguard2.stl", function (geometry) {
                var mat;
                mat = new THREE.MeshPhongMaterial({color: 0x000000});
                bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
                pickguard2 = new THREE.Mesh(bufferGeometry, mat);
                setObjPosition(pickguard2);
            });
            sloader.load(models + "pickguard3.stl", function (geometry) {
                var mat = new THREE.MeshPhongMaterial({color: color});
                bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
                pickguard3 = new THREE.Mesh(bufferGeometry, mat);
                setObjPosition(pickguard3);
            });
        }
    }
    sloader.load(models + "body_plate.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial({color: color});
        bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
        body_plate = new THREE.Mesh(bufferGeometry, mat);
        setObjPosition(body_plate);
    });
}

function chgControlColor(color) {
    volume1.material = new THREE.MeshPhongMaterial({color: color});
    tone1.material = new THREE.MeshPhongMaterial({color: color});
    tone2.material = new THREE.MeshPhongMaterial({color: color});
    tip.material = new THREE.MeshPhongMaterial({color: color});
    arm_cup.material = new THREE.MeshPhongMaterial({color: color});
}

function chgHardwareColor(color) {
    if(color == 0) {
        envMaterial = new THREE.MeshStandardMaterial({envMap: textureCube, side: THREE.DoubleSide});
    } else {
        envMaterial = new THREE.MeshStandardMaterial({color: color, envMap: textureCube, side: THREE.DoubleSide});
    }
    envMaterial.metalness = 1;

    string_st.material = envMaterial;
    pickup_screw.material = envMaterial;
    pickguard_screw.material = envMaterial;
    tuner.material = envMaterial;
    tremolo.material = envMaterial;
    output.material = envMaterial;
    neck_plate.material = envMaterial;
    strap_btn.material = envMaterial;
    body_plate_screw.material = envMaterial;

}