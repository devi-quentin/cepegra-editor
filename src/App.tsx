import { useEffect, useState } from "react";
import "aframe";
import "aframe-extras.animation-mixer";
import Assets from "./components/Assets";
import Scene from "./components/Scene";
import './components/dragndrop'

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="App">
      <a-scene>
        <a-assets>
          <Assets />
         
        </a-assets>
        
        {mounted ? <Scene /> : ""}
      </a-scene>

      
    </div>
  );
}

export default App;
