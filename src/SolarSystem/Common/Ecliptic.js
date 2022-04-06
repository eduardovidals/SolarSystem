import * as THREE from "three";
import React from "react";

function Ecliptic(props) {
  const {planet} = props;
  const points = [];
  for (let index = 0; index < 64; index++) {
    const angle = (index / 64) * 2 * Math.PI;
    const x = planet.position * Math.sin(angle);
    const z = planet.position * Math.cos(angle);
    points.push(new THREE.Vector3(x, 0, z));
  }

  points.push(points[0]);

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial attach="material" color="#BFBBDA" linewidth={10}/>
    </line>
  );
}

export default Ecliptic;
