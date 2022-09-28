import Pikachu from "./pikachu";

const Scene = () => {
  return (
    <>
      <a-sky color="#c9def4"></a-sky>
      <a-entity sound="src: #sound"></a-entity>
      <a-entity sound="src: #sound2"></a-entity>

      <a-circle rotation="-90 0 0" radius="20"  src="#my-texture" repeat="50 50" roughness="100">

      </a-circle>

      <a-camera class="camera" rotation-test></a-camera>
      
      <Pikachu />      
    </>
  );
};

export default Scene;
