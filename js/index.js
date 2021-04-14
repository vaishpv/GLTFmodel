import * as THREE from 'https://threejs.org/build/three.module.js';
import { GLTFLoader } from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://threejs.org/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from './lib/OrbitControls.js';

let camera, scene, renderer, mixer, clock, action1, index = -1, reverse = false, startFlag = false;
let titlearr = [], start = [], end = [], endArray = [], startArray = [];

init();
render();

function getUrlParam (name) {
    let results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results ? results[1] : undefined;
}

function init() {
    const gltfModelInfoMap = {
        "magic-wand": {
            "title": "Magic Wand",
            "fileName": "magic-wand-draco.gltf"
        },
        "fitness-band": {
            "title": "Fitness Band",
            "fileName": "fitness-band-draco.gltf"
        },
        "musical-instrument": {
            "title": "Musical Instrument",
            "fileName": "musical-instrument-draco.gltf"
        },
        "hourglass": {
            "title": "Hourglass",
            "fileName": "hourglass-draco.gltf"
        },
        "passing-the-parcel": {
            "title": "Passing the Parcel",
            "fileName": "passing-the-parcel-draco.gltf"
        },
        "traffic-signal": {
            "title": "Traffic Signal",
            "fileName": "traffic-signal-draco.gltf"
        },
        "home-security-motion-alarm": {
            "title": "Home Security Motion Alarm",
            "fileName": "home-security-motion-alarm-draco.gltf"
        },
        "home-security-siren": {
            "title": "Home Security Siren",
            "fileName": "home-security-siren-draco.gltf"
        },
        "home-security-alarm-light": {
            "title": "Home Security Alarm Light",
            "fileName": "home-security-alarm-light-draco.gltf"
        },
        "superhero-blaster": {
            "title": "SuperHero Blaster",
            "fileName": "superhero-blaster-draco.gltf"
        },
        "lamp": {
            "title": "Lamp",
            "fileName": "lamp-draco.gltf"
        },
        "dumbbell": {
            "title": "Dumbbell",
            "fileName": "dumbbell-draco.gltf"
        },
        "digital-interactive-box": {
            "title": "Digital Interactive Box",
            "fileName": "digital-interactive-box-draco.gltf"
        },
        "activity-indicator": {
            "title": "Activity Indicator",
            "fileName": "activity-indicator-corekit-draco.gltf"
        },
        "barcode-scanner": {
            "title": "Barcode Scanner",
            "fileName": "barcode-scanner-corekit-draco.gltf"
        },
        "lampandwand": {
            "title": "Lamp and Wand",
            "fileName": "lampandwand-corekit-draco.gltf"
        },
        "smart-night-light": {
            "title": "Smart Night Light",
            "fileName": "smart-night-light-corekit-draco.gltf"
        },
        "smart-enchanted-light": {
            "title": "Smart Enchanted Light",
            "fileName": "smart-enchanted-light-corekit-draco.gltf"
        },
        "smart-energysaving-light": {
            "title": "Smart Energy Saving Light",
            "fileName": "smart-energysaving-light-corekit-draco.gltf"
        },
        "smart-motiondetection-light": {
            "title": "Smart Motion Detection Light",
            "fileName": "smart-motiondetection-light-corekit-draco.gltf"
        },
        "boom-barrier": {
            "title": "Boom Barrier",
            "fileName": "boom-barrier-corekit-draco.gltf"
        },
        "boom-barrier-motor": {
            "title": "Boom Barrier - Only Motor",
            "fileName": "boom-barrier-motor-corekit-draco.gltf"
        },
        "card-scanner": {
            "title": "Card Scanner",
            "fileName": "card-scanner-corekit-draco.gltf"
        },
        "dumpy-level": {
            "title": "Dumpy Level",
            "fileName": "dumpy-level-corekit-draco.gltf"
        },
        "music-box": {
            "title": "Music Box",
            "fileName": "music-box-corekit-draco.gltf"
        },
        "robot": {
            "title": "Robot",
            "fileName": "robot-corekit-draco.gltf"
        },
        "smart-traffic-light": {
            "title": "Smart Traffic Light",
            "fileName": "smart-traffic-light-corekit-draco.gltf"
        },
        "smart-parking": {
            "title": "Smart Parking",
            "fileName": "smart-parking-corekit-draco.gltf"
        },
        "smart-shop-traffic-tower": {
            "title": "Smart Shop Traffic Tower",
            "fileName": "smart-shop-traffic-tower-corekit-draco.gltf"
        },
        "driving-platform": {
            "title": "Driving Platform",
            "fileName": "driving-platform-corekit-draco.gltf"
        },
        "driving-platform-2": {
            "title": "Driving Platform 2",
            "fileName": "driving-platform2-corekit-draco.gltf"
        },
        "driving-platform-3": {
            "title": "Driving Platform 3",
            "fileName": "driving-platform3-corekit-draco.gltf"
        },
        "driving-platform-4": {
            "title": "Driving Platform 4",
            "fileName": "driving-platform4-corekit-draco.gltf"
        },
        "smart-shop-barcode-scanner": {
            "title": "Smart Shop Barcode Scanner",
            "fileName": "smart-shop-barcode-scanner-corekit-draco.gltf"
        }
    }
    
    let modelFromUrl = getUrlParam("model");
    if(!modelFromUrl || !gltfModelInfoMap[modelFromUrl]) {
        //Default to magic wand model
        modelFromUrl = "magic-wand";
    }

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / (window.innerHeight - 61 - 58), 1.5, 10000);
    camera.position.set( 45, 170, 350 );

    clock = new THREE.Clock();
    let ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    scene.add(ambientLight);

    let pointLight = new THREE.PointLight(0xffffff, 0.8);
    camera.add(pointLight);
    scene.add(camera);
    //   scene.background = new THREE.Color(0x00ff00);

    let loader = new GLTFLoader().setPath('../assets/gltfs/');
    let dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.1/');
    loader.setDRACOLoader(dracoLoader);
    loader.load(gltfModelInfoMap[modelFromUrl].fileName, function (gltf) {
        
        mixer = new THREE.AnimationMixer(gltf.scene);
        for (let key in gltf.parser.json.meshes) {
            if (gltf.parser.json.meshes[key].hasOwnProperty("extras")) {
                for (let step in gltf.parser.json.meshes[key].extras) {
                    let temp = gltf.parser.json.meshes[key].extras[step].split(";");

                    //Ex: temp[0] = "Step001:Flip the wand cutout 180 degrees."
                    //We want temp[0] to look like "Step 001: Flip the wand cutout 180 degrees."
                    //This change can't be made in the data, as the spaces mess up the order of steps.
                    let titleToShow = temp[0].replace(/^Step/, "Step ").replace(/\d{3}:/, "$&" + " ");                  

                    titlearr.push(titleToShow);

                    let temp1 = temp[1].split(":");
                    start.push(temp1[1]);

                    let temp2 = temp[2].split(":");
                    end.push(temp2[1]);

                }
            }
        }
        startArray = start.map(Number);
        endArray = end.map(Number);

        gltf.animations.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });

        // Keeping below commented lines in case there is a future requirement of making the animation 
        // autostart instead of button click event

        //document.getElementById("placeholder").innerHTML = titlearr[index];
        document.getElementById("modelTitle").innerHTML = gltfModelInfoMap[modelFromUrl].title;
        action1 = mixer.clipAction(gltf.animations[0]);
        action1.reset();
        action1.setLoop(THREE.LoopOnce)
        //action1.time = startArray[index];
        action1.clampWhenFinished = true;

        //action1.play();
        scene.add(gltf.scene);
        startFlag = true;

        document.getElementById("nextButtonId").onclick = () => {
            if(startFlag) {
                startFlag = false;
                //action1.time = startArray[index];
                action1.play();
            } 

            if(reverse) {
                reverse = false;
            } else {   
                index += 1;
            }
            if (index === startArray.length) {
                index = 0;
            }

            document.getElementById("placeholder").innerHTML = titlearr[index];
            // action1.reset();
            action1.time = startArray[index];
            action1.timeScale = 1;
            clock.start();
            action1.paused = false;
        }

        document.getElementById("prevButtonId").onclick = () => {
            if(reverse) {
                reverse = false;
                index -= 1;
            } 
            if (index < 0) {
                index = 0;
            }
            reverse = true;
            console.log(index, endArray[index])
            document.getElementById("placeholder").innerHTML = "Reverse " + titlearr[index];
            action1.time = endArray[index];
            action1.timeScale = -1;
            clock.start();
            action1.paused = false;
        }

        document.getElementById("replayButtonId").onclick = () => {
            if (index < 0) {
                index = 0;
            }
            console.log(index, startArray[index])
            document.getElementById("placeholder").innerHTML = titlearr[index];
            action1.time = startArray[index];
            action1.timeScale = 1;
            clock.start();
            action1.paused = false;
        }

        document.getElementById("resetCamPosButtonId").onclick = () => {
            controls.reset();
        }

        document.getElementById("zoomInButtonId").onclick = () => {
            controls.dOut(1.05);
            controls.update();
        }

        document.getElementById("zoomOutButtonId").onclick = () => {
            controls.dIn(1.05);
            controls.update();
        }

        animate();
    });

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight - 61 - 58);
    renderer.alpha = true;
    renderer.setClearColor('grey', 1);
    renderer.gammaOutput = true;
    renderer.domElement.style.cursor = "move";

    const controls = new OrbitControls(camera, renderer.domElement);
    document.body.appendChild(renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);
    let delta = clock.getDelta();
    if (mixer) mixer.update(delta);

    if (clock.getElapsedTime().toFixed(2) >= (endArray[index] - startArray[index]).toFixed(2)) {
        action1.paused = true;
    }
    render();
}

function render() {
    renderer.render(scene, camera);
}

