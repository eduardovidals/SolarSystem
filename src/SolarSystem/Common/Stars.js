import React, {useMemo, useRef} from "react";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";
import {randomNumber} from "./Common";

function Stars() {
  let group = useRef();
  let theta = 0;
  useFrame(() => {
    const r = 5 * Math.sin(THREE.Math.degToRad((theta += 0.01)));
    group.current.rotation.set(r, r, r);
  });

  const [geo, mat, coords] = useMemo(() => {
    const geo = new THREE.SphereBufferGeometry(1, 10, 10);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("white")
    });
    const coords = new Array(10000)
      .fill()
      .map(i => [
        randomNumber(-4000, 4000),
        randomNumber(-4000, 4000),
        randomNumber(-4000, 4000),
      ]);
    return [geo, mat, coords];
  }, []);

  return (
    <group ref={group}>
      {coords.map(([p1, p2, p3], i) => (
        <mesh key={i} geometry={geo} material={mat} position={[p1, p2, p3]}/>
      ))}
    </group>
  );
}

export default  Stars;
