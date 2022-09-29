AFRAME.registerComponent('tourbillon-folie', {
  tick: function () {
    let rotationTmp =  {x: 0, y: 0, z: 0};
    var rotation = this.el.getAttribute('rotation');
    console.log(this.el.object3D.rotation);
    // rotationTmp.x = rotation.x + 0.1;
    rotationTmp.y = rotation.y + 0.2;
    // rotationTmp.z = rotation.z + 0.2;
    this.el.setAttribute('rotation', rotationTmp);
  }
});



const Pikachu = () => {
  return (
    <>
      <a-entity
        id={"pika"}
        gltf-model="#pika"
        animation-mixer="clip:Idle; 
        repetitions:Infinity"
        position="0 0 -3"
        scale="1.5 1.5 1.5"
        // tourbillon-folie
      ></a-entity>
    </>
  );
};

export default Pikachu;
