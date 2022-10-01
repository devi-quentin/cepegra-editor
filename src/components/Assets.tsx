const Assets = () => {

  return (
    <>
      <img id="sky" src="assets/images/sky_3.png" alt="sky"></img>
      <a-sound
        id="sound"
        src="assets/sound/pikachu.mp3"
        preload="auto"
      ></a-sound>
      <img id="my-texture" src="assets/images/grass.jpeg"  alt="texture d'image"></img>
      <a-sound
        id="sound2"
        src="assets/sound/arene_theme.mp3"
        autoplay="true"
        preload="auto"
      ></a-sound>
      <a-asset-item
        id="dig"
        src="assets/images/diglett_pokemon.glb"
      ></a-asset-item>

      {/* CHAPEAU */}
      <a-asset-item
        id="hat"
        src="assets/low_poly_hat_1.glb"
      ></a-asset-item>
      <a-asset-item
        id="militaire"
        src="assets/fish.glb"
      ></a-asset-item>

      <a-asset-item id="ville" src="assets/arene/scene.gltf"></a-asset-item>
    </>
  );
};

export default Assets;
