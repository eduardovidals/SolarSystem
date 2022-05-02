import * as THREE from "three";
import React, {useLayoutEffect, useRef} from "react";
import {BufferGeometry} from "three";

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

  console.log("points: ");
  console.log(points);

  const ref = useRef (null);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.setFromPoints(points);
    }
  }, []);


  return (
    <line>
      <bufferGeometry attach={'geometry'} ref={ref}/>
      <lineBasicMaterial attach="material" color="#BFBBDA" linewidth={10}/>
    </line>
  );
}

export default Ecliptic;
