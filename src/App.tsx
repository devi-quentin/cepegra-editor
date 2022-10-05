/* eslint-disable */
import * as THREE from "three";
import * as React from "react";
import { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useGLTF, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

  // function Box(props: JSX.IntrinsicElements["mesh"]) {

  //   const ref = useRef<THREE.Mesh>(null!);
  //   // Hold state for hovered and clicked events
  //   const [hovered, hover] = useState(false);
  //   const [clicked, click] = useState(false);
  //   useFrame((state, delta) => (ref.current.rotation.x += 0.01));

  //   return (
  //     <mesh {...props} ref={ref} scale={clicked ? 1.5 : 1} onClick={(event) => click(!clicked)} onPointerOver={(event) => hover(true)} onPointerOut={(event) => hover(false)}>
  //       <boxGeometry args={[1, 1, 1]} />
  //       <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
  //     </mesh>
  //   );
  // }

// export default function App() {
//   return (
//     <Canvas>
//       <ambientLight intensity={0.5} />
//       <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
//       <pointLight position={[-10, -10, -10]} />
//       <Box position={[-1.2, 0, 0]} />
//       <Box position={[1.2, 0, 0]} />
//     </Canvas>
//   );
// }

function FirstScene() {
  const gltf = useGLTF("/assets/images/diglett_pokemon.glb");
     const [hovered, hover] = useState(false);
  return (
    <>
      <primitive position= {[0, 1, 0]} object= {gltf.scene} />
      <primitive position= {[3, 1, 0]} object= {gltf.scene.clone()} />

      <mesh   onPointerOver={(event) => hover(true)} onPointerOut={(event) => hover(false)}
      rotation={[-Math.PI / 2, 0, 0]} >
        <meshStandardMaterial color={hovered ? "hotpink" : "orange"}></meshStandardMaterial>
        <planeGeometry args={[50, 50]} />
      </mesh>
    </>
  );
}

export default function App() {
  return (
    <div id="canvas-container">
      <Canvas>
        <ambientLight intensity={3} />
        <OrbitControls target={[0, 0, 0]} maxPolarAngle={1.45} />

        <FirstScene></FirstScene>
      </Canvas>
    </div>
  );
}