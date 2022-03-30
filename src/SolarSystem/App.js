import './App.css';
import Box from "./Common/Box/Box";
import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";

function App() {
  return (
    <div id="app">
      <Canvas>
        <OrbitControls/>
        <ambientLight/>
        <pointLight position={[10, 10, 10]}/>
        <Box position={[-1.2, 0, 0]}/>
        <Box position={[1.2, 0, 0]}/>
      </Canvas>
    </div>
  );
}

export default App;
