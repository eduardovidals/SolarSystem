import mercury from '../assets/images/mercury.jpeg';
import venus from '../assets/images/venus.jpeg';
import earth from '../assets/images/earth.jpeg';
import mars from '../assets/images/mars.jpeg';
import jupiter from '../assets/images/jupiter.jpeg';
import saturn from '../assets/images/saturn.jpeg';
import saturnRing from '../assets/images/saturn-ring.png';
import neptune from '../assets/images/neptune.jpeg';
import uranus from '../assets/images/uranus.jpeg';

const planetData = [
  {
    size: 8,
    position: 150,
    texture: mercury,
    ring: false,
    orbitingSpeed: 0.04,
    rotatingSpeed: 0.004
  },
  {
    size: 10,
    position: 250,
    texture: venus,
    ring: false,
    orbitingSpeed: 0.015,
    rotatingSpeed: 0.002
  },
  {
    size: 15,
    position: 350,
    texture: earth,
    ring: false,
    orbitingSpeed: 0.01,
    rotatingSpeed: 0.02
  }
  ,
  {
    size: 16,
    position: 450,
    texture: mars,
    ring: false,
    orbitingSpeed: 0.008,
    rotatingSpeed: 0.018
  },
  {
    size: 25,
    position: 550,
    texture: jupiter,
    ring: false,
    orbitingSpeed: 0.002,
    rotatingSpeed: 0.04
  },
  {
    size: 25,
    position: 650,
    texture: saturn,
    ring: true,
    ringTexture: saturnRing,
    orbitingSpeed: 0.0009,
    rotatingSpeed: 0.038
  },
  {
    size: 25,
    position: 750,
    texture: uranus,
    ring: false,
    orbitingSpeed: 0.0004,
    rotatingSpeed: 0.03
  },
  {
    size: 25,
    position: 850,
    texture: neptune,
    ring: false,
    orbitingSpeed: 0.0001,
    rotatingSpeed: 0.032
  },
];

export default planetData;
