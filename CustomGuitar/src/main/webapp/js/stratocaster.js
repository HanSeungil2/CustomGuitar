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

    waitingDialog.show();

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
            $('.progress-bar').css('width', '100%').attr('aria-valuenow', 100);
            waitingDialog.hide();
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

    guitar.add(dae);
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
        body = new THREE.Mesh(geometry, mat);
        count++;
        setObjPosition(body);
    });
}

// Neck
function setNeck() {
    oloader.load(models + "maple_neck.dae", function (collada) {
        neck = collada.scene;
        count++;
        setObjPosition(neck);
    });
    sloader.load(models + "truss_cover.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial();
        var textureLoader = new THREE.TextureLoader();
        var texture = textureLoader.load( textures + "crop_wood-071.jpg" );
        mat.map = texture;
        truss_cover = new THREE.Mesh(geometry, mat);
        count++;
        setObjPosition(truss_cover);
    });
    sloader.load(models + "truss_tip.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial();
        var textureLoader = new THREE.TextureLoader();
        var texture = textureLoader.load( textures + "crop_wood-071.jpg" );
        mat.map = texture;
        truss_tip = new THREE.Mesh(geometry, mat);
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
        fret = new THREE.Mesh(geometry, mat);
        count++;
        setObjPosition(fret);
    });
    sloader.load(models + "string_st.stl", function (geometry) {
        string_st = new THREE.Mesh(geometry, envMaterial);
        count++;
        setObjPosition(string_st);
    });
    sloader.load(models + "nut.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial({color: 0xffffff});
        nut = new THREE.Mesh(geometry, mat);
        count++;
        setObjPosition(nut);
    });
}

// Tuner
function setTuner(){
    sloader.load(models + "tuner.stl", function (geometry) {
        tuner = new THREE.Mesh(geometry, envMaterial);
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
        tremolo = new THREE.Mesh(geometry, envMaterial);
        count++;
        setObjPosition(tremolo);
    });
    sloader.load(models + "arm_cup.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial({color: 0xffffff});
        arm_cup = new THREE.Mesh(geometry, mat);
        count++;
        setObjPosition(arm_cup);
    });
}

// Pickup
function setPickup(){
    sloader.load(models + "pickup_cover.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial({color: 0xffffff});
        pickup_cover = new THREE.Mesh(geometry, mat);
        count++;
        setObjPosition(pickup_cover);
    });
    sloader.load(models + "poll.stl", function (geometry) {
        poll = new THREE.Mesh(geometry, envMaterial);
        count++;
        setObjPosition(poll);
    });
    sloader.load(models + "pickup_screw.stl", function (geometry) {
        pickup_screw = new THREE.Mesh(geometry, envMaterial);
        count++;
        setObjPosition(pickup_screw);
    });
}

// Pickguard
function setPickguard() {
    sloader.load(models + "pickguard.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial({color: 0xffffff});
        pickguard = new THREE.Mesh(geometry, mat);
        count++;
        setObjPosition(pickguard);
    });
    sloader.load(models + "pickguard_screw.stl", function (geometry) {
        pickguard_screw = new THREE.Mesh(geometry, envMaterial);
        count++;
        setObjPosition(pickguard_screw);
    });
}

// Control Switch
function setControl(){
    sloader.load(models + "volume1.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial({color: 0xffffff});
        volume1 = new THREE.Mesh(geometry, mat);
        count++;
        setObjPosition(volume1);
    });
    sloader.load(models + "tone1.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial({color: 0xffffff});
        tone1 = new THREE.Mesh(geometry, mat);
        count++;
        setObjPosition(tone1);
    });
    sloader.load(models + "tone2.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial({color: 0xffffff});
        tone2 = new THREE.Mesh(geometry, mat);
        count++;
        setObjPosition(tone2);
    });
    sloader.load(models + "5way.stl", function (geometry) {
        var mat = new THREE.MeshStandardMaterial({color: 0xe5eaed});
        mat.metalness = 1;
        way5 = new THREE.Mesh(geometry, mat);
        count++;
        setObjPosition(way5);
    });
    sloader.load(models + "tip.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial({color: 0xffffff});
        tip = new THREE.Mesh(geometry, mat);
        count++;
        setObjPosition(tip);
    });
}

// Etc
function setEtc(){
    sloader.load(models + "output.stl", function (geometry) {
        output = new THREE.Mesh(geometry, envMaterial);
        count++;
        setObjPosition(output);
    });
    sloader.load(models + "neck_plate.stl", function (geometry) {
        neck_plate = new THREE.Mesh(geometry, envMaterial);
        count++;
        setObjPosition(neck_plate);
    });
    sloader.load(models + "strap_btn.stl", function (geometry) {
        strap_btn = new THREE.Mesh(geometry, envMaterial);
        count++;
        setObjPosition(strap_btn);
    });
    sloader.load(models + "body_plate.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial({color: 0xffffff});
        body_plate = new THREE.Mesh(geometry, mat);
        count++;
        setObjPosition(body_plate);
    });
    sloader.load(models + "body_plate_screw.stl", function (geometry) {
        body_plate_screw = new THREE.Mesh(geometry, envMaterial);
        count++;
        setObjPosition(body_plate_screw);
    });
    sloader.load(models + "string.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial({color: 0xcfcfcf});
        string = new THREE.Mesh(geometry, mat);
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
            body = new THREE.Mesh(geometry, mat);
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
    scene.remove(pickup_cover);
    guitar.remove(pickup_cover);
    sloader.load(models + "pickup_cover.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial({color: color});
        pickup_cover = new THREE.Mesh(geometry, mat);
        setObjPosition(pickup_cover);
    });
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
            pickguard = new THREE.Mesh(geometry, mat);
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
                pickguard = new THREE.Mesh(geometry, mat);
                setObjPosition(pickguard);
            });
        } else {
            sloader.load(models + "pickguard1.stl", function (geometry) {
                var mat = new THREE.MeshPhongMaterial({color: color});
                pickguard1 = new THREE.Mesh(geometry, mat);
                setObjPosition(pickguard1);
            });
            sloader.load(models + "pickguard2.stl", function (geometry) {
                var mat;
                mat = new THREE.MeshPhongMaterial({color: 0x000000});
                pickguard2 = new THREE.Mesh(geometry, mat);
                setObjPosition(pickguard2);
            });
            sloader.load(models + "pickguard3.stl", function (geometry) {
                var mat = new THREE.MeshPhongMaterial({color: color});
                pickguard3 = new THREE.Mesh(geometry, mat);
                setObjPosition(pickguard3);
            });
        }
    }
    sloader.load(models + "body_plate.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial({color: color});
        body_plate = new THREE.Mesh(geometry, mat);
        setObjPosition(body_plate);
    });
}

function chgControlColor(color) {
    scene.remove(volume1);
    guitar.remove(volume1);
    sloader.load(models + "volume1.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial({color: color});
        volume1 = new THREE.Mesh(geometry, mat);
        setObjPosition(volume1);
    });
    scene.remove(tone1);
    guitar.remove(tone1);
    sloader.load(models + "tone1.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial({color: color});
        tone1 = new THREE.Mesh(geometry, mat);
        setObjPosition(tone1);
    });
    scene.remove(tone2);
    guitar.remove(tone2);
    sloader.load(models + "tone2.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial({color: color});
        tone2 = new THREE.Mesh(geometry, mat);
        setObjPosition(tone2);
    });
    scene.remove(tip);
    guitar.remove(tip);
    sloader.load(models + "tip.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial({color: color});
        tip = new THREE.Mesh(geometry, mat);
        setObjPosition(tip);
    });
    scene.remove(arm_cup);
    guitar.remove(arm_cup);
    sloader.load(models + "arm_cup.stl", function (geometry) {
        var mat = new THREE.MeshPhongMaterial({color: color});
        arm_cup = new THREE.Mesh(geometry, mat);
        setObjPosition(arm_cup);
    });
}

function chgHardwareColor(color) {
    if(color == 0) {
        envMaterial = new THREE.MeshStandardMaterial({envMap: textureCube, side: THREE.DoubleSide});
    } else {
        envMaterial = new THREE.MeshStandardMaterial({color: color, envMap: textureCube, side: THREE.DoubleSide});
    }
    envMaterial.metalness = 1;

    scene.remove(string_st);
    guitar.remove(string_st);
    sloader.load(models + "string_st.stl", function (geometry) {
        string_st = new THREE.Mesh(geometry, envMaterial);
        setObjPosition(string_st);
    });
    scene.remove(pickup_screw);
    guitar.remove(pickup_screw);
    sloader.load(models + "pickup_screw.stl", function (geometry) {
        pickup_screw = new THREE.Mesh(geometry, envMaterial);
        setObjPosition(pickup_screw);
    });
    scene.remove(pickguard_screw);
    guitar.remove(pickguard_screw);
    sloader.load(models + "pickguard_screw.stl", function (geometry) {
        pickguard_screw = new THREE.Mesh(geometry, envMaterial);
        setObjPosition(pickguard_screw);
    });
    scene.remove(tuner);
    guitar.remove(tuner);
    sloader.load(models + "tuner.stl", function (geometry) {
        tuner = new THREE.Mesh(geometry, envMaterial);
        setObjPosition(tuner);
    });
    scene.remove(tremolo);
    guitar.remove(tremolo);
    sloader.load(models + "tremolo.stl", function (geometry) {
        tremolo = new THREE.Mesh(geometry, envMaterial);
        setObjPosition(tremolo);
    });
    scene.remove(output);
    guitar.remove(output);
    sloader.load(models + "output.stl", function (geometry) {
        output = new THREE.Mesh(geometry, envMaterial);
        setObjPosition(output);
    });
    scene.remove(neck_plate);
    guitar.remove(neck_plate);
    sloader.load(models + "neck_plate.stl", function (geometry) {
        neck_plate = new THREE.Mesh(geometry, envMaterial);
        setObjPosition(neck_plate);
    });
    scene.remove(strap_btn);
    guitar.remove(strap_btn);
    sloader.load(models + "strap_btn.stl", function (geometry) {
        strap_btn = new THREE.Mesh(geometry, envMaterial);
        setObjPosition(strap_btn);
    });
    scene.remove(body_plate_screw);
    guitar.remove(body_plate_screw);
    sloader.load(models + "body_plate_screw.stl", function (geometry) {
        body_plate_screw = new THREE.Mesh(geometry, envMaterial);
        setObjPosition(body_plate_screw);
    });

}