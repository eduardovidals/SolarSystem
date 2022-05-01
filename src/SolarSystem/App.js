import './App.css';
import {Canvas, useFrame, useLoader, useThree} from "@react-three/fiber";
import {OrbitControls, PointerLockControls} from "@react-three/drei";
import React, {useRef, useState, Suspense, useMemo, useEffect} from "react";
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

CameraControls.install({THREE})

function Planets({planetData, zoomToView}) {
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
        <Stars/>
        <Sun/>
        <Planets planetData={planetData} zoomToView={(focusRef) => {
          setZoom(!zoom);
          setFocus(focusRef);
        }}/>
        <Lights/>
        <FPSControls/>
        {/* <Controls zoom={zoom} focus={focus} /> */}
      </Canvas>
    </div>
  );
}


function FPSControls() {
  const ref = useRef();

  let A = useKeyPress("a");
  let W = useKeyPress("w");
  let S = useKeyPress("s");
  let D = useKeyPress("d");
  let UP = useKeyPress(" ");
  let DOWN = useKeyPress("Shift");

  const {camera} = useThree();

  useFrame(() => {
    if (W) ref.current.moveForward(20);
    if (A) ref.current.moveRight(-20);
    if (S) ref.current.moveForward(-20);
    if (D) ref.current.moveRight(20);
    if (UP) camera.translateY(20);
    if (DOWN) camera.translateY(-20);
  })

  return (
    <PointerLockControls ref={ref}/>
  )
}

function useKeyPress(targetKey) {
  // state for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // if pressed key is our target key then set to true
  function downHandler({key}) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  // if released key is our target key then set to false
  const upHandler = ({key}) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };
  // add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []); // empty array ensures that effect is only run on mount and unmount
  return keyPressed;
}

export default App;
