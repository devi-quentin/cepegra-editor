import * as THREE from "three";
import { useState, useRef } from "react";
import { useDrag } from "@use-gesture/react";
import { useGLTF} from "@react-three/drei";
import { useFrame, useThree} from "@react-three/fiber";

export default function menu() {
    const [nbItem, setNbItem] = useState([{name:"chapeau"}, {name:"bottes"}])

    
    const test = (e:any, name:String) => {
      e.dataTransfer.setData('text/plain', name)
      console.log(e.dataTransfer.getData('text/plain'))
      console.log("dragStart")
    } 
    
    const Items = ():any => {
      const items = nbItem.map((a, i) => <li key={i} className="menu-item" data-name={a.name} draggable onDragStart={(e) => test(e, a.name)}></li>)
      // @ts-nocheck
      items.forEach(i => i)

      return items
    }

  

    return (
      <>
        <div className="menu">
            <ul className="menu-list">
                <Items />
            </ul>
        </div>
      </>
    )
}
