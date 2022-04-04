import './App.css';
import Box from "./Common/Box/Box";
import {Canvas, useFrame, useLoader, useThree} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import React, {useRef, useState, Suspense, useMemo} from "react";
import * as THREE from "three";
import planetData from "./planetData";
import img from '../universe.jpeg'
import {CubeTextureLoader} from "three";

function genRand(min, max, decimalPlaces) {
  return (Math.random() * (max - min) + min).toFixed(decimalPlaces) * 1;
}

function Stars() {
  let group = useRef();
  let theta = 0;
  useFrame(() => {
    if (group.current) {
      // Some things maybe shouldn't be declarative, we're in the render-loop here with full access to the instance
      const r = 5 * Math.sin(THREE.Math.degToRad((theta += 0.01)));
      const s = Math.cos(THREE.Math.degToRad(theta * 2));
      group.current.rotation.set(r, r, r);
      group.current.scale.set(s, s, s);
    }
  });

  const [geo, mat, coords] = useMemo(() => {
    const geo = new THREE.SphereBufferGeometry(1, 5, 5);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("lightpink")
    });
    const coords = new Array(3000)
      .fill()
      .map(i => [
        Math.random() * 800 - 300,
        Math.random() * 800 - 300,
        Math.random() * 800 - 300
      ]);
    return [geo, mat, coords];
  }, []);

  return (
    <group ref={group}>
      {coords.map(([p1, p2, p3], i) => (
        <mesh key={i} geometry={geo} material={mat} position={[p1, p2, p3]} />
      ))}
    </group>
  );
}

function App() {
  return (
    <div id={"app"}>
      <Canvas camera={{ position: [0, 20, 25], fov: 45 }}>
        <OrbitControls />
        <Stars/>
        <Sun />
        {planetData.map((planet) => (
          <Planet planet={planet} key={planet.id} randomSpeed={genRand(0.2, 1, 2)}/>
        ))}
        <Lights />
      </Canvas>
    </div>
  );
}

function Sun() {
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.y += 0.10
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2.5, 32, 32]} />
      <meshStandardMaterial color="#E1DC59" />
    </mesh>
  );
}

function Planet(props) {
  const {planet, randomSpeed} = props;
  const planetRef = React.useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * randomSpeed;
    const x = planet.xRadius * Math.sin(t);
    const z = planet.zRadius * Math.cos(t);
    planetRef.current.position.x = x;
    planetRef.current.position.z = z;
  });

  return (
    <>
      <mesh ref={planetRef}>
        <sphereGeometry args={[planet.size, 32, 32]} />
        <meshStandardMaterial color={planet.color} />
      </mesh>
      <Ecliptic xRadius={planet.xRadius} zRadius={planet.zRadius} />
    </>
  );
}

function Lights() {
  return (
    <>
      <ambientLight />
      <pointLight position={[0, 0, 0]} />
    </>
  );
}

function Ecliptic({ xRadius = 1, zRadius = 1 }) {
  const points = [];
  for (let index = 0; index < 64; index++) {
    const angle = (index / 64) * 2 * Math.PI;
    const x = xRadius * Math.cos(angle);
    const z = zRadius * Math.sin(angle);
    points.push(new THREE.Vector3(x, 0, z));
  }

  points.push(points[0]);

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial attach="material" color="#BFBBDA" linewidth={10} />
    </line>
  );
}

export default App;
