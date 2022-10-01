import AFRAME from 'aframe';

AFRAME.registerSystem("track-cursor", {
  init: function () {
    this.el?.setAttribute("cursor", { rayOrigin: "mouse" });
  }
});

AFRAME.registerComponent("track-cursor", {
  update: function (this:any) {
    this.el.addEventListener("mousedown", () => {
      if (this.el.is("cursor-hovered")) {
        this.el.addState("dragging");
        this.el.sceneEl?.camera.el.setAttribute("look-controls", {enabled: false});
      }});
      this.el.addEventListener("mouseup", () => {
        if (this.el.is("dragging")) {
          this.el.removeState("dragging");
          this.el.sceneEl?.camera.el.setAttribute("look-controls", {enabled: true})
        }});
      }
});
    
AFRAME.registerComponent("dragdrop", {
  dependencies: ["track-cursor"],
  init: function (this:any) {
    this.direction = new AFRAME.THREE.Vector3();
    this.target = new AFRAME.THREE.Vector3();   
    this.range = 0;
    this.dist = 0;
    
    this.el.addEventListener("stateadded", () => {
      this.range = 0;
      this.dist = this.el.object3D.position.clone()
      .sub(this.el.sceneEl?.camera.el.object3D.position).length();
    });
    
    document.addEventListener("wheel", (e) => {
      if (e.deltaY < 0) {
        this.range += 0.1;
      } else {
        this.range -= 0.1;
      }
    });
  },
  updateTarget: function (this:any) {
    let camera = this.el.sceneEl?.camera.el;
    // on copie la position de la camera a celui du target
    this.target.copy(camera.object3D.position.clone()
    .add(this.direction.clone().multiplyScalar(this.dist + this.range))
    );
  },
  tick: function (this:any) {
    if (this.el.is("dragging")) {
      // this will updateDirection;
      this.direction.copy(this.el.sceneEl?.getAttribute("raycaster").direction);
      this.updateTarget();
      // on passe la valeur de la target(copié auparavant) à l'élément draggable
      this.el.object3D.position.copy(this.target);
      
      // the code below allows us to have a rotation when clicked
      // // let rotationTmp =  {x: 0, y: 0, z: 0};
      // // var rotation = this.el.getAttribute('rotation');
      // // rotationTmp.x = rotation.x + 0.1;
      // // rotationTmp.y = rotation.y + 1;
      // // rotationTmp.z = rotation.z + 0.2;
      // // this.el.setAttribute('rotation', rotationTmp);
    }
  },
});