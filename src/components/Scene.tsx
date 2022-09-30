import { useState } from "react";
import Pikachu from "./pikachu";

AFRAME.registerSystem("track-cursor", {
  init: function () {
    this.el.setAttribute("cursor", { rayOrigin: "mouse" });
  },
});

AFRAME.registerComponent("track-cursor", {
  init: function () {
    console.log("aaa");
    this.el.addEventListener("mousedown", (e) => {
      if (this.el.is("cursor-hovered")) {
        this.el.sceneEl.camera.el.setAttribute("look-controls", {
          enabled: false,
        });
        this.el.addState("dragging");
      }
    });
    this.el.addEventListener("mouseup", (e) => {
      if (this.el.is("dragging")) {
        this.el.sceneEl.camera.el.setAttribute("look-controls", {
          enabled: true,
        });
        this.el.removeState("dragging");
      }
    });
  },
});

AFRAME.registerComponent("dragndrop", {
  dependencies: ["track-cursor"],
  init: function () {
    this.range = 0;
    this.dist = 0;

    this.el.addEventListener("stateadded", (e) => {
      if (e.detail == "dragging") {
        this.range = 0;
        this.dist = this.el.object3D.position
          .clone()
          .sub(this.el.sceneEl.camera.el.object3D.position)
          .length();
      }
    });

    this.direction = new AFRAME.THREE.Vector3();
    this.target = new AFRAME.THREE.Vector3();
    document.addEventListener("wheel", (e) => {
      if (e.deltaY < 0) {
        this.range += 0.1;
      } else {
        this.range -= 0.1;
      }
    });
  },
  updateDirection: function () {
    this.direction.copy(this.el.sceneEl.getAttribute("raycaster").direction);
  },
  updateTarget: function () {
    let camera = this.el.sceneEl.camera.el;
    this.target.copy(
      camera.object3D.position
        .clone()
        .add(this.direction.clone().multiplyScalar(this.dist + this.range))
    );
  },
  tick: function () {
    if (this.el.is("dragging")) {
      this.updateDirection();
      this.updateTarget();
      this.el.object3D.position.copy(this.target);
    }
  },
});

const Scene = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mouseUp, setMouseUp] = useState(false);
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

      <a-camera class="camera" position="0 1.5 0">
        <a-entity
          cursor="fuse: true; fuseTimeout: 500;"
          position="0 0 -1"
          geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
          material="color: black; shader: flat"
        ></a-entity>
      </a-camera>

      <a-entity
        id="box"
        dragndrop
        geometry="primitive: box"
        material="opacity: 0.5"
        position="2 1 -4"
        scale="1.5 1.5 1.5"
      >
        <Pikachu />
      </a-entity>

      <a-entity
        dragndrop
        geometry="primitive: sphere"
        material="color: red"
        position="-2 1 -4"
      ></a-entity>

      {/* <Pikachu /> */}
    </>
  );
};

export default Scene;
