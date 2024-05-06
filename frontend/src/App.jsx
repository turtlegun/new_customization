import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Home from './component/home';

import Canvas1 from './component/canvas1';
import Canvas2 from './component/canvas2';
import Canvas3 from './component/canvas3';

import vegata from './vegeta.jpg'
import CurvedText from './curved';
import CanvasDownload from './curvedcanvas';
import Canvas_normal from './normal_canvas';
import TwoCanvasText from './canvas4';
import Tshirt_2d from './tshirt_2d';
import { store } from './store';

import { Provider } from 'react-redux'
import { createContext, useContext, useEffect, useState } from 'react';
import CanvasDownload2 from './component/circle';
import ImageRotator from './component/triangle';
import Image_backend from './image';
import CanvasImageUploader from './texting_2d_canvas';
import CanvasImageUploader2 from './text2_2d';
import Model_save from './component/model_save';

const ImageContext = createContext();

export const useImage = () => useContext(ImageContext);
function App() {
  
  const [image5, setImage5] = useState(vegata);
useEffect(()=>{


  console.log(image5)

},[image5])
 

  return (
    <>
  
     <ImageContext.Provider value={{ image5, setImage5 }}>
     <Provider store={store}>
  <Router>
    <Routes>
      
          <Route exact path="/home" element={<Home/>} />
          <Route exact path="/tshirt_2d" element={<Tshirt_2d/>} />
          <Route exact path="/canvas" element={<Canvas1/>} />
          <Route exact path="/canvas2" element={<Canvas2/>} />
          <Route exact path="/canvas3" element={<Canvas3/>} />
          <Route exact path="/curved" element={<CurvedText/>} />
          <Route exact path="/download" element={<CanvasDownload/>} />
          <Route exact path="/normal" element={<Canvas_normal/>} />
          <Route exact path="/canvas4" element={<TwoCanvasText/>} />
          <Route exact path="/circle" element={<CanvasDownload2/>} />
          <Route exact path="/rotation" element={<ImageRotator/>} />
          <Route exact path="/backend" element={<Image_backend/>} />
          <Route exact path="/testing" element={<CanvasImageUploader/>} />
          <Route exact path="/testing2" element={<CanvasImageUploader2/>} />
          <Route exact path="/model_save" element={<Model_save/>} />
          
          



          </Routes>   
    </Router>
    </Provider>
    </ImageContext.Provider>
    </>
  )
}

export default App
