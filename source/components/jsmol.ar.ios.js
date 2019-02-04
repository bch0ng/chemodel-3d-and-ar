import React, { Component } from 'react';
import { AR, Asset } from 'expo';
// Let's alias ExpoTHREE.AR as ThreeAR so it doesn't collide with Expo.AR.
import ExpoTHREE, { AR as ThreeAR, THREE } from 'expo-three';
import {
    AppRegistry,
    Button,
    Text,
    View,
    TextInput,
    WebView
} from 'react-native';
// Let's also import `expo-graphics`
// expo-graphics manages the setup/teardown of the gl context/ar session,
// creates a frame-loop, and observes size/orientation changes.
// it also provides debug information with `isArCameraStateEnabled`
import { View as GraphicsView } from 'expo-graphics';
const atomColors = require('../styles/colors.json');

export default class JSMolAR extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.compound + " (" + navigation.state.params.formula + ")",
        headerTransparent: true,
        headerTitleStyle: { color: '#fff', textShadowColor: 'rgba(0,0,0,0.7)', textShadowRadius: 3, textShadowOffset: { width: -1, height: 1 } },
        headerBackTitleStyle: { color: '#fff', textShadowColor: 'rgba(0,0,0,0.7)', textShadowRadius: 3, textShadowOffset: { width: -1, height: 1 } },
        headerTintColor: '#fff'
    });

    constructor(props) {
        super(props);
        this.state = {
            x: '',
            y: '',
            z: '',
            aid1: '',
            aid2: '',
            numBonds: '',
            elements: ''
        }
    }
    componentDidMount() {
        THREE.suppressExpoWarnings();
    }

    getMoleculeCoords = async () => {
        try {
            let url = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/'
                    + this.props.navigation.state.params.cid + '/record/JSON/?record_type=3d&response_type=display';
            let response = await fetch(url);
            let json = await response.json();
            let conformers = json.PC_Compounds[0].coords[0].conformers[0];
            let aid1 = json.PC_Compounds[0].bonds.aid1;
            let aid2 = json.PC_Compounds[0].bonds.aid2;
            let numBonds = json.PC_Compounds[0].bonds.order;
            let elements = json.PC_Compounds[0].atoms.element;
            this.setState({
                x: conformers.x,
                y: conformers.y,
                z: conformers.z,
                aid1: aid1,
                aid2: aid2,
                numBonds: numBonds,
                elements: elements
            });
            console.log("Results received.");
        } catch (error) {
            console.log("ERROR");
            console.log(error);
        }
    };

    // When our context is built we can start coding 3D things.
    onContextCreate = async ({ gl, scale: pixelRatio, width, height }) => {
        await this.getMoleculeCoords();
        AR.setPlaneDetection(AR.PlaneDetection.None);
        this.renderer = new ExpoTHREE.Renderer({
            gl,
            pixelRatio,
            width,
            height,
        });
        this.scene = new THREE.Scene();
        this.scene.background = new ThreeAR.BackgroundTexture(this.renderer);
        this.camera = new ThreeAR.Camera(width, height, 0.01, 1000);
        //console.log('rendering...');
        console.log(this.state.elements.length);
        for (let i = 0; i < this.state.elements.length; i++) {
            const geometry = new THREE.SphereGeometry(0.007, 0.007, 0.007);
            const material = new THREE.MeshPhongMaterial({
                color: "#" + atomColors[this.state.elements[i]].hexColor,
            });
            this.sphere = new THREE.Mesh(geometry, material);
            this.sphere.position.x = this.state.x[i] / 35;
            this.sphere.position.y = this.state.y[i] / 35;
            this.sphere.position.z = this.state.z[i] / 35 - 0.25;
            this.scene.add(this.sphere);
        };
        for (let i = 0; i < this.state.aid1.length; i++) {
            const geometry = new THREE.Geometry();
            const material = new THREE.LineBasicMaterial({
                color: "#C0C0C0",
                linewidth: 10
            });
            let doubleBondOffset = 0;
            if (this.state.numBonds[i] === 2) {
                doubleBondOffset = 0.0025;
                const geometry2 = new THREE.Geometry();
                geometry2.vertices.push(
                    new THREE.Vector3(
                        this.state.x[this.state.aid1[i] - 1] / 35 - doubleBondOffset,
                        this.state.y[this.state.aid1[i] - 1] / 35,
                        this.state.z[this.state.aid1[i] - 1] / 35 - 0.25
                    ),
                    new THREE.Vector3(
                        this.state.x[this.state.aid2[i] - 1] / 35 - doubleBondOffset,
                        this.state.y[this.state.aid2[i] - 1] / 35,
                        this.state.z[this.state.aid2[i] - 1] / 35 - 0.25
                    )
                );
                const line2 = new THREE.Line(geometry2, material);
                this.scene.add(line2);
            }
            geometry.vertices.push(
                new THREE.Vector3(
                    this.state.x[this.state.aid1[i] - 1] / 35 + doubleBondOffset,
                    this.state.y[this.state.aid1[i] - 1] / 35,
                    this.state.z[this.state.aid1[i] - 1] / 35 - 0.25
                ),
                new THREE.Vector3(
                    this.state.x[this.state.aid2[i] - 1] / 35 + doubleBondOffset,
                    this.state.y[this.state.aid2[i] - 1] / 35,
                    this.state.z[this.state.aid2[i] - 1] / 35 - 0.25
                )
            );
            const line = new THREE.Line(geometry, material);
            this.scene.add(line);
        };
        let light = new THREE.AmbientLight(0xffffff, 0.8);
        let light2 = new THREE.PointLight(0x404040, 0.8, 100);
        this.scene.add(light);
        this.scene.add(light2);
        // Create this cool utility function that let's us see all the raw data points.
        //this.points = new ThreeAR.Points();
        // Add the points to our scene...
        //this.scene.add(this.points)
    };

    // When the phone rotates, or the view changes size, this method will be called.
    onResize = ({ x, y, scale, width, height }) => {
        // Let's stop the function if we haven't setup our scene yet
        if (!this.renderer) { return; }
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setPixelRatio(scale);
        this.renderer.setSize(width, height);
    };

    // Called every frame.
    onRender = () => {
        // This will make the points get more rawDataPoints from Expo.AR
        //this.points.update()

        // Finally render the scene with the AR Camera
        this.renderer.render(this.scene, this.camera);
    };

    render() {
        // You need to add the `isArEnabled` & `arTrackingConfiguration` props.
        // `isArRunningStateEnabled` Will show us the play/pause button in the corner.
        // `isArCameraStateEnabled` Will render the camera tracking information on the screen.
        // `arTrackingConfiguration` denotes which camera the AR Session will use. 
        // World for rear, Face for front (iPhone X only)
        return(
            <GraphicsView 
                style={{ flex: 1 }}
                onContextCreate={ this.onContextCreate } 
                onRender={ this.onRender } 
                onResize={ this.onResize }
                isArEnabled
                isArRunningStateEnabled= { false }
                isArCameraStateEnabled={ false }
                arTrackingConfiguration={ AR.TrackingConfiguration.World }
                key={ this.props.navigation.state.params.cid + "_AR" }
            />
        );
    }
}
