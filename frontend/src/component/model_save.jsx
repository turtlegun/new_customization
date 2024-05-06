import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import New_shirt3 from '../../public/Leander_6_model'
const Model_save = () => {
  const [canvasScene, setCanvasScene] = useState(null);
  const canvasRef = useRef(null);

  const handleSaveClick = async () => {
    if (canvasScene) {
      const exporter = new GLTFExporter();
    
      exporter.parse(canvasScene, async function (gltf) {
        const blob1 = new Blob([JSON.stringify(gltf)], { type: 'application/json' });
      
        const formData = new FormData();
        formData.append('model', blob1, 'model1.gltf');
      
        try {
          const response = await fetch('http://localhost:3001/upload', {
            method: 'POST',
            body: formData,
          });
          if (response.ok) {
            console.log('Model uploaded successfully');
          } else {
            console.error('Error uploading model:', response.statusText);
          }
        } catch (error) {
          console.error('Error uploading model:', error);
        }
      });
    } else {
      console.error('Error: Unable to export model. Canvas scene is not available.');
    }
  };
  

  return (
    <>
      <Canvas ref={canvasRef} onCreated={({ gl, scene }) => setCanvasScene(scene)}>
        <OrbitControls />
       <New_shirt3/>
      </Canvas>
      <button onClick={handleSaveClick}>Save Model</button>
    </>
  );
};

export default Model_save;
