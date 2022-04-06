import React, {useRef} from "react";
import * as THREE from "three";
import {useFrame} from "@react-three/fiber";
import sun from "../../assets/images/sun.jpeg";

function Sun(props) {
  const sunRef = useRef();

  const textureLoader = new THREE.TextureLoader();
  useFrame((state, delta) => {
    sunRef.current.rotation.y += 0.004;
  })

  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[75, 32, 32]}/>
      <meshBasicMaterial color="#E1DC59" map={textureLoader.load(sun)}/>
    </mesh>
  );
}

export default Sun;
