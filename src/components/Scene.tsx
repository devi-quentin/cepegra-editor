import Pikachu from "./pikachu";

const Scene = () => {
  return (
    <>
      <a-sky src="#sky"></a-sky>
      <a-entity sound="src: #sound"></a-entity>
      <a-entity sound="src: #sound2"></a-entity>

      <a-circle rotation="-90 0 0" radius="30"  src="#my-texture" repeat="50 50" roughness="50">

      </a-circle>

      <a-camera class="camera" look-controls position="0 1.5 0"></a-camera>
      
      <Pikachu />      
    </>
  );
};

export default Scene;
