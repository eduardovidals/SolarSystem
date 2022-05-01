import React, {useRef} from "react";
import * as THREE from "three";
import {useFrame, useThree} from "@react-three/fiber";
import Ecliptic from "./Ecliptic";
import {OrbitControls} from "@react-three/drei";

function Planet(props) {
  const {planet, onClick} = props;
  const planetObjRef = useRef();
  const planetRef = useRef();
  const ringRef = useRef();
  const {camera} = useThree();
  const textureLoader = new THREE.TextureLoader();


  useFrame(({clock}) => {
          planetObjRef.current.rotation.y += planet.orbitingSpeed;
    planetRef.current.rotation.y += planet.rotatingSpeed;
    planetRef.current.position.x = planet.position;

    if (planet.ring){
      ringRef.current.position.x = planet.position;
      ringRef.current.rotation.x = -0.5 * Math.PI;
    }
  });

  const ringSize = planet.size + 10;

  return (
    <>
      <object3D ref={planetObjRef}>
        <mesh ref={planetRef} onClick={onClick}>
          <sphereGeometry args={[planet.size, 32, 32]}/>
          <meshStandardMaterial map={textureLoader.load(planet.texture)}/>
        </mesh>
        {
          planet.ring ?
          <mesh ref={ringRef}>
            <ringGeometry args={[ringSize, 50, 50]}/>
            <meshBasicMaterial map={textureLoader.load(planet.ringTexture)} side={THREE.DoubleSide} transparent={true}/>
          </mesh> : null
        }
        <Ecliptic planet={planet}/>
      </object3D>
    </>
  );
}

export default Planet;
