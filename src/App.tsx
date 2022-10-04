import { useEffect, useState } from "react";
import "aframe";
import "aframe-extras.animation-mixer";
import Assets from "./components/Assets";
import Scene from "./components/Scene";
import './components/dragndrop'
import 'https://rawgit.com/rdub80/aframe-gui/master/dist/aframe-gui.min.js'

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="App">
      <a-scene fog="true">
        <a-assets>
          <Assets />
        </a-assets>
        
        
        {mounted ? <Scene /> : ""}
      </a-scene>

      
    </div>
  );
}

export default App;
