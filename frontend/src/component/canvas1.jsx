
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei';

import React, { Suspense, useState } from 'react';
import Shirt_vest from '../../public/Shirt_and_vest-processed';

import poncho from '../../public/Poncho';

import styles from './canvas1.module.css';


function Canvas1() {

    const [isOpen, setIsOpen] = useState(false);
    // State to manage the selected value
    const [selectedValue, setSelectedValue] = useState('option1');

    // Toggle dropdown visibility
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    // Handle selection of an option
    const handleOptionSelect = (value) => {
      setSelectedValue(value);
      setIsOpen(false); // Close the dropdown after selection
    };

    const [vest, setVest] = useState('#ffffff');
    const [button, setButton] = useState('#ffffff');
    const [packet, setPacket] = useState('#ffffff');
    const [shirtColor, setShirtColor] = useState('#ffffff');
    const [tieColor, setTieColor] = useState('#ffffff');

    return (
      <>
        <div>
          <Canvas
            style={{ width: '100%', height: '70vh' }}
            eventSource={document.getElementById('root')} eventPrefix="client" camera={{ position: [0, 0, 8], fov: 35 }} >
            <color attach="background" args={["#213547"]} />
            <fog attach="fog" args={["#213547", 10, 20]} />
            <OrbitControls />
            <ambientLight />
            <ambientLight intensity={0.3} />
            <spotLight intensity={0.3} position={[5, 20, 20]} />
            <directionalLight />
            <spotLight intensity={0.9} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
            <Suspense fallback={null}>
              <Shirt_vest customcolor={{ vest: vest, button: button, packet: packet, shirtcolor: shirtColor, tiecolor: tieColor }} selectedValue={selectedValue} />
            </Suspense>
          </Canvas>
        </div>

        <h2>Color chooser</h2>
        <div className='colors'>
          <div>
            <h2> vest  color </h2>
            <input type="button" id="mesh" name="vest" className={styles.shirt} onClick={(e) => setVest('yellow')} />
            <input type="button" id="mesh" name="vest" className={styles.shirt1} onClick={(e) => setVest('red')} />
            <input type="button" id="mesh" name="vest" className={styles.shirt2} onClick={(e) => setVest('blue')} />
            <input type="button" id="mesh" name="vest" className={styles.shirt3} onClick={(e) => setVest('green')} />
          </div>
          <div>
            <input type="color" id="button" name="button" value={button} onChange={(e) => setButton(e.target.value)} />
            <label>Button Color</label>
          </div>
          <div>
            <input type="color" id="packet" name="packet" value={packet} onChange={(e) => setPacket(e.target.value)} />
            <label>Pocket Color</label>
            <input type="color" id="shirtcolor" name="shirtcolor" value={shirtColor} onChange={(e) => setShirtColor(e.target.value)} />
            <label>Shirt Color</label>
            <input type="color" id="shirtcolor" name="shirtcolor" value={shirtColor} onChange={(e) => setTieColor(e.target.value)} />
            <label>Tie Color</label>
          </div>
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            Select an option
          </button>
          {isOpen && (
            <ul className={styles.dropdownUl}>
              <ul className="dropdown-menu">
                <li onClick={() => handleOptionSelect("option1")}>cotton 1</li>
                <li onClick={() => handleOptionSelect("option2")}>cotton 2</li>
              </ul>
            </ul>
          )}
        </div>
      </>
    );
}

export default Canvas1;
