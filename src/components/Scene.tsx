import Pikachu from "./pikachu";

AFRAME.registerComponent("cursor-listener", {
  update: function () {
    let position = this.el.getAttribute("position")
    this.el.addEventListener("click", function (evt) {
      this.setAttribute("position", {
        x: evt.detail.intersection.point.x,
        y: evt.detail.intersection.point.y,
        z: position.z
      });
      // console.log("I was clicked at: ", evt.detail.intersection.point);
    });
  },
});

const Scene = () => {
  return (
    <>
      <a-sky src="#sky"></a-sky>
      <a-entity sound="src: #sound"></a-entity>
      <a-entity sound="src: #sound2"></a-entity>

      <a-circle
        rotation="-90 0 0"
        radius="30"
        src="#my-texture"
        repeat="50 50"
        roughness="50"
      ></a-circle>

      <a-camera class="camera" look-controls position="0 1.5 0">
        <a-entity
          cursor="fuse: true; fuseTimeout: 500; rayOrigin: mouse;"
          position="0 0 -1"
          geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
          material="color: black; shader: flat"
        ></a-entity>
      </a-camera>

      <a-entity
        id="box"
        cursor-listener
        geometry="primitive: box"
        material="color: blue"
        position="2 1 -4"
      ></a-entity>

      <Pikachu />
    </>
  );
};

export default Scene;
