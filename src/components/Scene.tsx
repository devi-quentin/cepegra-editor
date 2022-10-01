import { useState } from "react";

// AFRAME.registerComponent('tourbillon-folie', {
//   tick: function () {
//     let rotationTmp =  {x: 0, y: 0, z: 0};
//     var rotation = this.el.getAttribute('rotation');
//     this.el.addEventListener("mousedown", (e) => {
//     // rotationTmp.x = rotation.x + 0.1;
//     rotationTmp.y = rotation.y + 20000000000;
//     // rotationTmp.z = rotation.z + 0.2;
//     this.el.setAttribute('rotation', rotationTmp);
//   });

//   }
// });

AFRAME.registerSystem("track-cursor", {
  init: function () {
    this.el.setAttribute("cursor", { rayOrigin: "mouse" });
  },
});

AFRAME.registerComponent("track-cursor", {
  init: function () {
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

AFRAME.registerComponent("choppe-parlecolback", {
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
      // the code below allows us to have a rotation when clicked
      let rotationTmp =  {x: 0, y: 0, z: 0};
      var rotation = this.el.getAttribute('rotation');
      // rotationTmp.x = rotation.x + 0.1;
      rotationTmp.y = rotation.y + 1;
      // rotationTmp.z = rotation.z + 0.2;
      this.el.setAttribute('rotation', rotationTmp);
    }
  },
});

const Scene = () => {
  return (
    <>  
      <a-sky src="#sky"></a-sky>
      {/* <a-entity sound="src: #sound"></a-entity>
      <a-entity sound="src: #sound2"></a-entity> */}

      {/* SOL */}
      <a-circle
        rotation="-90 0 0"
        radius="30"
        src="#my-texture"
        repeat="50 50"
        roughness="50"
      ></a-circle>

      {/* CAMERA */}
      <a-camera class="camera" position="0 1.5 0">
        {/* CURSEUR */}
        {/* <a-entity
          cursor="fuse: true; fuseTimeout: 500;"
          position="0 0 -1"
          geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
          material="color: black; shader: flat"
        ></a-entity> */}
      </a-camera>
      
      {/* HITBOX PERSONNAGE */}
      <a-entity
        id="box"
        choppe-parlecolback
        geometry="primitive: box"
        material="opacity: 0.5"
        position="2 1 -4"
        scale="1.5 1.5 1.5"
      >
        {/* PERSONNAGE */}
      </a-entity>

      <a-entity
      choppe-parlecolback
        gltf-model="#hat"
        position="0 4 0"
        scale=".2 .2 .2"
      ></a-entity>
      <a-entity
      
      animation-mixer="clip:mixamo.com;
      repetitions:Infinity"
      choppe-parlecolback
      tourbillon-folie
        gltf-model="#fish"
        position="4 2 0"
        scale="0.52 0.5 0.52"
      ></a-entity>

      {/* SPHERE ROUGE */}
      <a-entity
      choppe-parlecolback
        geometry="primitive: sphere"
        material="color: red"
        position="-2 1 -4"
      ></a-entity>
    </>
  );
};

export default Scene;