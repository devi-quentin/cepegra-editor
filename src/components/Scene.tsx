import { useState } from "react";

const Scene = () => {
  return (
    <>  
      <a-sky src="#sky">
        
      </a-sky>
      {/* <a-entity sound="src: #sound"></a-entity>
      <a-entity sound="src: #sound2"></a-entity> */}

      {/* SOL */}
      <a-circle
        rotation="-90 0 0"
        radius="30"
        src="#my-texture"
        repeat="50 50"
        roughness="50"
        fog="true"
      ></a-circle>

      {/* CAMERA */}
      <a-camera class="camera" position="0 1.5 0" look-controls>

      <a-plane width="0.03" height="0.12" position="-0.1 0 -.1" opacity="0.5">
        <a-plane width="0.045" height="0.045" position="-0.1 0 -.1" color="#fff"></a-plane>
        <a-plane width="0.045" height="0.045" position="-0.1 0 -.1" color="#fff"></a-plane>
        <a-plane width="0.045" height="0.045" position="-0.1 0 -.1" color="#fff"></a-plane>
        
      </a-plane>

      </a-camera>
      
      {/* HITBOX PERSONNAGE */}
      <a-entity
        id="box"
        dragdrop
        geometry="primitive: box"
        material="opacity: 0.5"
        position="2 1 -4"
        scale="1.5 1.5 1.5"
        
      ></a-entity>

        {/* CHAPEAU */}
      <a-entity
        dragdrop
        gltf-model="#hat"
        position="0 4 0"
        scale=".2 .2 .2"
      ></a-entity>
    
      {/* MILITAIRE */}
      <a-entity  
        animation-mixer="clip:mixamo.com; repetitions:Infinity"
        dragdrop
        gltf-model="#militaire"
        position="4 2 0"
        scale="0.52 0.5 0.52"
        wireframe="true"
      ></a-entity>

      {/* SPHERE ROUGE */}
      <a-entity
        dragdrop
        geometry="primitive: sphere"
        material="color: red"
        position="-2 2 -4"
        scale="1 1.6 1"
        
      ></a-entity>

      

       
    </>
  );
};

export default Scene;