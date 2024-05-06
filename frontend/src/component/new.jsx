
import { PresentationControls, Stage } from '@react-three/drei';
import { useLoader } from '@react-three/fiber'
import { Suspense } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
function New() {
  
const gltf=useLoader(GLTFLoader,"../../public/car.glb")
  
  return ( 
  
<Stage  >
<Suspense fallback={null}>
<primitive object={gltf.scene}/>
</Suspense>



</Stage>




  


     );
}

export default New;