import React, { Component } from 'react';
import { AR, Asset } from 'expo';
// Let's alias ExpoTHREE.AR as ThreeAR so it doesn't collide with Expo.AR.
import ExpoTHREE, { AR as ThreeAR, THREE } from 'expo-three';
import {
    AppRegistry,
    Button,
    Dimensions,
    Text,
    View,
    TextInput,
    WebView,
    TouchableOpacity,
    Modal,
    PanResponder,
    Animated
} from 'react-native';
// Let's also import `expo-graphics`
// expo-graphics manages the setup/teardown of the gl context/ar session,
// creates a frame-loop, and observes size/orientation changes.
// it also provides debug information with `isArCameraStateEnabled`
import { View as GraphicsView } from 'expo-graphics';
import styles from '../styles/style';
const atomColors = require('../styles/colors.json');

export default class JSMolAR extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.compound,
        headerTransparent: true,
        headerTitleStyle: {
            color: '#fff',
            textShadowColor: 'rgba(0,0,0,0.7)',
            textShadowRadius: 3,
            textShadowOffset: {
                width: -1,
                height: 1
            }
        },
        headerBackTitleStyle: {
             color: '#fff',
             textShadowColor: 'rgba(0,0,0,0.7)',
             textShadowRadius: 3,
             textShadowOffset: { width: -1, height: 1 }
        },
        headerTintColor: '#fff'
    });

    constructor(props) {
        super(props);
        this.state = {
            x: this.props.navigation.state.params.x,
            y: this.props.navigation.state.params.y,
            z: this.props.navigation.state.params.z,
            aid1: this.props.navigation.state.params.aid1,
            aid2: this.props.navigation.state.params.aid2,
            numBonds: this.props.navigation.state.params.numBonds,
            elements: this.props.navigation.state.params.elements,
            mouse: { x: 0, y: 0 },
            objects: [],
            currentAtom: '',
            landscape: Dimensions.get("window").width > Dimensions.get("window").height
        }

        this._panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
            // The gesture has started. Show visual feedback so the user knows
            // what is happening!

            // gestureState.d{x,y} will be set to zero now
            },
            onPanResponderMove: ({ nativeEvent }, gestureState) => {
                this.setState({ mouse: { x: nativeEvent.locationX, y: nativeEvent.locationY }});
                const raycaster = new THREE.Raycaster();
                raycaster.setFromCamera(
                        new THREE.Vector2((this.state.mouse.x / Dimensions.get("window").width) * 2 - 1,
                                - (this.state.mouse.y / Dimensions.get("window").height) * 2 + 1), this.camera);
                let intersects = raycaster.intersectObjects( this.state.objects );
                if (intersects.length > 0) {
                    this.setState({
                        currentAtom: intersects[0].object.name
                    });
                } else {
                    this.setState({
                        currentAtom: ''
                    });
                }
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
            // The user has released all touches while this view is the
            // responder. This typically means a gesture has succeeded
            },
            onPanResponderTerminate: (evt, gestureState) => {
            // Another component has become the responder, so this gesture
            // should be cancelled
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
            // Returns whether this component should block native components from becoming the JS
            // responder. Returns true by default. Is currently only supported on android.
            return true;
            },
        });
    }
    checkLandscapeOrientation = () => {
        this.setState({
            landscape: Dimensions.get("window").width > Dimensions.get("window").height
        });
    }
    componentDidMount() {
        THREE.suppressExpoWarnings();
        Dimensions.addEventListener('change', this.checkLandscapeOrientation );
    }
    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.checkLandscapeOrientation );
    }
    // When our context is built we can start coding 3D things.
    onContextCreate = async ({ gl, scale: pixelRatio, width, height }) => {
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
        let objects = [];
        for (let i = 0; i < this.state.elements.length; i++) {
            const geometry = new THREE.SphereGeometry(0.007, 0.007, 0.007);
            const material = new THREE.MeshPhongMaterial({
                color: "#" + atomColors[this.state.elements[i]].hexColor,
            });
            this.sphere = new THREE.Mesh(geometry, material);
            this.sphere.name = this.state.elements[i];
            this.sphere.position.x = this.state.x[i] / 35;
            this.sphere.position.y = this.state.y[i] / 35;
            this.sphere.position.z = this.state.z[i] / 35 - 0.25;
            this.scene.add(this.sphere);
            objects.push(this.sphere);
        };
        this.setState({ objects: objects });
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

        ThreeAR.hitTestRayFromScreenPos(this.camera, new THREE.Vector2());
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
            <View 
                { ...this._panResponder.panHandlers }
                style={[{
                    width: Dimensions.get("window").width,
                    height: Dimensions.get("window").height
                }]}>
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
                { this.state.currentAtom !== '' &&
                    <View style={{
                            height: Dimensions.get("window").width <= Dimensions.get("window").height ? '15%' : '25%',
                            position: 'absolute',
                            backgroundColor: "transparent",
                            bottom: 0,
                            left: 0,
                            width: Dimensions.get("window").width
                        }}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 30,
                            fontWeight: 'bold',
                            color: "#" + atomColors[this.state.currentAtom].hexColor,
                            textShadowColor: 'rgba(0,0,0,0.7)',
                            textShadowRadius: 3,
                            textShadowOffset: {
                                width: -1,
                                height: 1
                            }
                            }}>{ atomColors[this.state.currentAtom].symbol }</Text>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: "#" + atomColors[this.state.currentAtom].hexColor,
                            textShadowColor: 'rgba(0,0,0,0.7)',
                            textShadowRadius: 3,
                            textShadowOffset: {
                                width: -1,
                                height: 1
                            }
                            }}>{ this.state.currentAtom }. { atomColors[this.state.currentAtom].name }</Text>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 14,
                            fontWeight: 'bold',
                            color: "#" + atomColors[this.state.currentAtom].hexColor,
                            textShadowColor: 'rgba(0,0,0,0.7)',
                            textShadowRadius: 3,
                            textShadowOffset: {
                                width: -1,
                                height: 1
                            }
                            }}>{ atomColors[this.state.currentAtom].mass } AMU</Text>
                    </View>
                }
            </View>
        );
    }
}
