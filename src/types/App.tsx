import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  PointerLockControls,
  FlyControls,
} from "@react-three/drei";
import { TextureLoader } from "three";
import DragDrop from "../components/DragDrop";
import Menu from "../components/Menu";

const sol = "/assets/images/grass.png";

function Taupiqueur() {
  let mixer: any = null;
  const ref = useRef<THREE.Mesh>(null!);
  const texture = useLoader(TextureLoader, sol);
  const day = useLoader(TextureLoader, "/assets/images/sky.png");
  const night = useLoader(TextureLoader, "/assets/images/sky_2.png");

  const gltf = useGLTF("/assets/images/diglett_pokemon.glb");
  mixer = new THREE.AnimationMixer(gltf.scene);
  mixer.clipAction(gltf.animations[0]).play();
  useFrame((state, delta) => {
    mixer.update(delta);
  });

  const gltf2 = useGLTF("/assets/images/lumberjack.glb");

  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  useFrame((state, delta) => (ref.current.rotation.y += 0.007));
  // tiling de la texture
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(50, 50);
  texture.anisotropy = 16;

  return (
    <>
      <mesh
        ref={ref}
        scale={100}
        position={[0, 0, 0]}
        onClick={() => click(!clicked)}
      >
        <meshStandardMaterial
          map={clicked ? day : night}
          side={THREE.DoubleSide}
        />
        <sphereGeometry />
      </mesh>

      <mesh scale={clicked ? 10 : 5}>
        {/* <primitive position= {[0, 1, 0]} object= {clicked ? gltf2.scene: gltf.scene} /> */}
        <DragDrop />
      </mesh>

      <mesh
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial
          roughness={3}
          map={texture}
          color={clicked ? "limegreen" : "darkgreen"}
        ></meshStandardMaterial>
        <circleGeometry args={[100, 100]} />
      </mesh>
    </>
  );
}

export default function App() {
  // const canvas = document.getElementById("canvas-container");
  const canvas = useRef()
  
  useEffect(() => {
    // @ts-nocheck
    canvas.current.addEventListener("dragenter", (event: any) => {
      console.log("Drag détecté dans le canvas");
      console.log(event);
      console.log(event.fromElement);
      // console.log("canvas: ", canvas);
    });
  }, []);





  // FAIRE UNE VARIABLE GLOBALE DANS LEQUEL ON STOCK LE NOM DE L OBJET DRAGGE





  return (
    <>
      <Menu />
      <div>
        <Canvas ref={canvas} id="canvas-container" camera={{ fov: 90, position: [0, 4, 60] }}>
          <OrbitControls />
          <ambientLight position={[0, 5, 6]} intensity={2} />
          <Taupiqueur></Taupiqueur>
        </Canvas>
      </div>
    </>
  );
}

// const textureElevation = useLoader(TextureLoader,'/assets/images/grass_N.png'); Elevation if we have time

// si plutard il y'a un probleme dans l'animation essayer d'implementer le suspense
