import './App.css';
import {Canvas, useFrame, useLoader, useThree} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import React, {useRef, useState, Suspense, useMemo} from "react";
import * as THREE from "three";
import planetData from "./planetData";
import img from '../assets/images/universe.jpeg'
import {CubeTextureLoader, Quaternion, Texture} from "three";
import sun from '../assets/images/sun.jpeg';
import Sun from "./Common/Sun";
import Lights from "./Common/Lights";
import Planet from "./Common/Planet";
import Stars from "./Common/Stars";
import CameraControls from 'camera-controls'
CameraControls.install({ THREE })

function Planets({ planetData, zoomToView }){
  return planetData.map((planet, id) => (
    <Planet planet={planet} key={id} onClick={(e) => zoomToView(e.object.position)}/>
  ))
}


function App() {
  const [zoom, setZoom] = useState(false)
  const [focus, setFocus] = useState({})
  return (
    <div id={"app"}>
      <Canvas camera={{position: [-1500, 550, 120], fov: 60, far: 100000}}>
        <OrbitControls/>
        <Stars/>
        <Sun/>
        <Planets planetData={planetData} zoomToView={(focusRef) => {
          setZoom(!zoom);
          setFocus(focusRef);
        }}/>
        <Lights/>
        <OrbitControls/>
        {/* <Controls zoom={zoom} focus={focus} /> */ }
      </Canvas>
    </div>
  );
}


function Controls({ zoom, focus, pos = new THREE.Vector3(), look = new THREE.Vector3() }) {
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [])
  return useFrame((state, delta) => {
    zoom ? pos.set(focus.x, focus.y, focus.z + 0.2) : pos.set(-400, 50, 50)
    zoom ? look.set(focus.x, focus.y, focus.z - 0.2) : look.set(-400, 50, 50)

    state.camera.position.lerp(pos, 0.5)
    state.camera.updateProjectionMatrix()

    controls.setLookAt(state.camera.position.x, state.camera.position.y, state.camera.position.z, look.x, look.y, look.z, true)
    return controls.update(delta)
  })
}

export default App;
