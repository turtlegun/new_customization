import { Canvas } from "@react-three/fiber";

import styles from './canvas1.module.css'
import { Suspense, useRef, useState } from "react";
import { ContactShadows, Environment, OrbitControls, PresentationControls, Stage } from "@react-three/drei";
import Shirt from '../../public/Shirt'
import Customization from "./customization";
import style from './canvas3.module.css'

import Tshirt from '../../public/Tshirt'

function Canvas2(props) {

  const canvasRef = useRef();
  const [decalPosition, setDecalPosition] = useState([0, 0.04, 0.15]);


 
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [image,setImage]=useState(null)


  const handleimage=(event)=>{
  
  const file=event.target.files[0]
  
  setImage(URL.createObjectURL(file))
  
  }
  


  const [dragging, setDragging] = useState(false);
 
  const [selectedValue, setSelectedValue] = useState('goku');

  const [color,setColor]=useState('white')
 

  // Handle selection of an option
  const handleOptionSelect = (value) => {
    setSelectedValue('goku');
    
  };
  const handleOptionSelect1= (value) => {
    setSelectedValue('vegeta');
    
  };
  const handleOptionSelect2= (value) => {
    setSelectedValue('naruto');
    
  };



  const handleMouseDown = (event) => {
   
   /*
    setDragging(true);
    */
    const { clientX, clientY } = event;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((clientY - rect.top) / rect.height) * 2 + 1;
    setDecalPosition([x, y, decalPosition[2]]);
  };

  const handleMouseUp = () => {
   /*
    setDragging(false);
 */
  };


/*

  const handleMouseMove = (event) => {
    if (dragging && canvasRef.current) {
      const { clientX, clientY } = event;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((clientY - rect.top) / rect.height) * 2 + 1;
      setDecalPosition([x, y, decalPosition[2]]); // Update only x and y positions
    }
  };
*/
  
    return ( <>
    <div className={style.app}>
    <Canvas  camera={{ position: [-10, 0, -10], fov: 55 } } 
    
    
   // onMouseMove={handleMouseMove}
    onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        ref={canvasRef}
    >
       
         <PresentationControls
        speed={1.5}
        global
        polar={[-0.1, Math.PI / 4]}
        rotation={[Math.PI / 8, Math.PI / 4, 0]}
      ></PresentationControls>
     
          <ambientLight/>
    <pointLight position={[10, 10, 10]} intensity={1.5} />
    <Suspense fallback={null}>
        <group rotation={[0, Math.PI, 0]} position={[0, 0, 0]}>
<Shirt choice={selectedValue} image={image} position={decalPosition} color={color}  className={style.canvas}/>
</group>
      

      </Suspense>


      <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
      <OrbitControls  />
    </Canvas>
    
<div className={style.customization} >
    <button className="dropdown-toggle" onClick={handleOptionSelect }>
        Goku
      </button>
      <button className="dropdown-toggle" onClick={handleOptionSelect1 }>
      Luffy
      </button>
      <button className="dropdown-toggle" onClick={handleOptionSelect2 }>
      naruto
      </button>

      <div /*</>className={styles.customization}*/>
<input type='file' onChange={handleimage}/>
</div>
<div>
            <h2> shirt   color </h2>
            <input type="button" id="mesh" name="vest" className={styles.shirt} onClick={(e) => setColor('yellow')} />
            <input type="button" id="mesh" name="vest" className={styles.shirt1} onClick={(e) => setColor('red')} />
            <input type="button" id="mesh" name="vest" className={styles.shirt2} onClick={(e) => setColor('blue')} />
            <input type="button" id="mesh" name="vest" className={styles.shirt3} onClick={(e) => setColor('green')} />
          </div>

</div>
</div>  
    </> );
}

export default Canvas2;