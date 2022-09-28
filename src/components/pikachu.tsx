const Pikachu = () => {
  return (
    <>
      <a-entity
        id={"pika"}
        gltf-model="#pika"
        animation-mixer="clip:Idle; 
        repetitions:Infinity"
        position="0 0 -3"
        scale="1.5 1.5"
      ></a-entity>
    </>
  );
};

export default Pikachu;
