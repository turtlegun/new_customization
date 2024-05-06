import React, { useEffect, useState, useRef, useContext } from 'react';
import tshirtImage from './front2_tshirt.webp';
import { Context12, Context13, Context18, Context8, Context9 } from './component/canvas3';
import style from './text_2d_canvas.module.css';

import left from './left_side_black.png'

import right from './right side.png'

import ImageCrop from 'react-image-crop';

import logo from './assets/Upload-icon.svg'


function CanvasImageUploader() {


  const [updateXValue, setUpdateXValue] = useState(-0.15);
  const [updateYValue, setUpdateYValue] = useState(0.15);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);
  const canvasRef = useRef(null);
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [tshirtImageLoaded, setTshirtImageLoaded] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [decalPosition, setDecalPosition] = useContext(Context9);
  const [image5, setImage5] = useContext(Context8);
const[image_height_size,setImage_height_size]=useState(100)
const[image_side,setImage_side]=useState(tshirtImage)

const[back_position,setBack_position]=useContext(Context18);

const[back_side_image,setBack_side_image]=useContext(Context13)


const[tshirt_image_side,setTshirt_image_side]=useContext(Context12)

  const [imagePositions, setImagePositions,] = useState([]);

  useEffect(() => {
    redrawCanvas();
  }, [images, tshirtImageLoaded,image_side,image_height_size]);

  useEffect(() => {
    redrawCanvas();
    const tshirtImg = new Image();
    tshirtImg.onload = () => {
      setTshirtImageLoaded(true);
      setBackgroundImage(tshirtImg);
    };
    tshirtImg.src = image_side;
  }, [image_side,tshirtImageLoaded,image_height_size]);

  const handleImageUpload = (event) => {
   
   if(tshirt_image_side=='front_side'){
   
   

    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (event) => {
        const image = new Image();
        setImage5((prevImages) => [...prevImages, reader.result]);

        image.src = event.target.result;
        image.onload = () => {
          const maxWidth = 80;
          const maxHeight = 70;
          let aspectRatio = 1;
          if (image.width > maxWidth || image.height > maxHeight) {
            aspectRatio = Math.min(maxWidth / image.width, maxHeight / image.height);
          }
          const scaledWidth = image.width * aspectRatio;
          const scaledHeight = image.height * aspectRatio;

          setImages((prevImages) => [...prevImages, { image, x: 0, y: 0, width: scaledWidth, height: scaledHeight }]);
          setImagePositions((prevPositions) => [...prevPositions, { x: 0, y: 0 }]);
          redrawCanvas();
        };

        
      };

      reader.readAsDataURL(file);
    }
  }

  if(tshirt_image_side=='back_side'){
   
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (event) => {
        const image = new Image();
        setBack_side_image((prevImages) => [...prevImages, reader.result]);

        image.src = event.target.result;
        image.onload = () => {
          const maxWidth = 50;
          const maxHeight = 50;
          let aspectRatio = 1;
          if (image.width > maxWidth || image.height > maxHeight) {
            aspectRatio = Math.min(maxWidth / image.width, maxHeight / image.height);
          }
          const scaledWidth = image.width * aspectRatio;
          const scaledHeight = image.height * aspectRatio;

          setImages((prevImages) => [...prevImages, { image, x: 0, y: 0, width: scaledWidth, height: scaledHeight }]);
          setImagePositions((prevPositions) => [...prevPositions, { x: 0, y: 0 }]);
          redrawCanvas();
        };

        
      };

      reader.readAsDataURL(file);
    }
  }




  };



  const incrementUpdateX = () => {
    if (selectedImage) {
      const updatedImages = images.map((img) => {
        if (img === selectedImage) {
          return {
            ...img,
            x: img.x + 5, // Adjust the increment value as needed
          };
        }
        return img;
      });
  
      setImages(updatedImages);
      redrawCanvas();
    }
  };

  const updateImagePosition = (index, newX, newY,newUpdateXValue,newUpdateYValue) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
  
      if (updatedImages[index]) {
        updatedImages[index].x = newX;
        updatedImages[index].y = newY;
      }
  
      const updatedPositions = [...imagePositions];
      updatedPositions[index] = { x: newX, y: newY };
      setImagePositions(updatedPositions);
  
      return updatedImages;
    });
  
if(tshirt_image_side=='front_side'){

    setDecalPosition((prevDecalPosition) => {
      const updatedDecalPosition = [...prevDecalPosition];
      updatedDecalPosition[index] = { 
        x: newUpdateXValue, 
        y: newUpdateYValue, 
        z: prevDecalPosition[index]?.z || 0.15 
      };
      setDecalPosition(updatedDecalPosition);
      return updatedDecalPosition;
    });
  }

  if(tshirt_image_side=='back_side'){

    setBack_position((prevDecalPosition) => {
      const updatedDecalPosition = [...prevDecalPosition];
      updatedDecalPosition[index] = { 
        x: newUpdateXValue, 
        y: newUpdateYValue, 
        z: prevDecalPosition[index]?.z || 0.15 
      };
      setBack_position(updatedDecalPosition);
      return updatedDecalPosition;
    });
  }




  };
  
  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (tshirtImageLoaded) {
      context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    }

    if(tshirt_image_side=='front_side'){

    images.forEach(({ image, x, y, width, height }, index) => {
      
      context.drawImage(image, x, y, width, height);



      const rect = canvasRef.current.getBoundingClientRect();
      
   //   let updatedX = newUpdateXValue
   

//console.log(`the update x is ${updateXValue}`)



      //console.log(`the x update is ${updatedX}`)

     // updatedX = Math.min(0.12005912, Math.max(-0.2029292, updatedX));
     const newUpdateXValue = (((x+320) - rect.left) /(rect.width+400))-0.02

     // setUpdateXValue(newUpdateXValue);
  
      // Update the y value dynamically based on mouse movement
     // const newUpdateYValue = (offsetY - rect.top) / rect.height - 1.5;

     const newUpdateYValue = - (((y-20 ) - rect.top) / (rect.height+270)) +0.09;
 
   
    

     console.log(`the y update is ${updateYValue}`)

// letupdatedY=newUpdateYValue

     // updateImagePosition(index, x, y,updatedX,updatedY);
  //   updateXValue
     updateImagePosition(index, x, y, newUpdateXValue,newUpdateYValue);
    });}

    if(tshirt_image_side=='back_side'){

      images.forEach(({ image, x, y, width, height }, index) => {
        
        context.drawImage(image, x, y, width, height);
  
  
  
        const rect = canvasRef.current.getBoundingClientRect();
        
     //   let updatedX = newUpdateXValue
     
  
  //console.log(`the update x is ${updateXValue}`)
  
  
  
        //console.log(`the x update is ${updatedX}`)
  
       // updatedX = Math.min(0.12005912, Math.max(-0.2029292, updatedX));
       const newUpdateXValue = (((x+320) - rect.left) /(rect.width+400))-0.02
  
       // setUpdateXValue(newUpdateXValue);
    
        // Update the y value dynamically based on mouse movement
       // const newUpdateYValue = (offsetY - rect.top) / rect.height - 1.5;
  
       const newUpdateYValue = - (((y-20 ) - rect.top) / (rect.height+270)) +0.09;
   
     
      
  
       console.log(`the y update is ${updateYValue}`)
  
  // letupdatedY=newUpdateYValue
  
       // updateImagePosition(index, x, y,updatedX,updatedY);
    //   updateXValue
       updateImagePosition(index, x, y, newUpdateXValue,newUpdateYValue);
      });}
  




  };

  const handleMouseDown = (event) => {
    const mouseX = event.nativeEvent.offsetX;
    const mouseY = event.nativeEvent.offsetY;

    for (let i = images.length - 1; i >= 0; i--) {
      const { x, y, image } = images[i];
      if (
        mouseX >= x &&
        mouseX <= x + image.width &&
        mouseY >= y &&
        mouseY <= y + image.height
      ) {
        setSelectedImage(images[i]);
        setDragStartX(mouseX - x);
        setDragStartY(mouseY - y);
        setDragging(true);
        break;
      }
    }
  };

  const handleMouseUp = () => {
    setSelectedImage(null);
    setDragging(false);
  };

  const handleMouseMove = (event) => {
    if (selectedImage && dragging) {
      const rect = canvasRef.current.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;




      selectedImage.x = offsetX - dragStartX;
      selectedImage.y = offsetY - dragStartY;
      const newUpdateXValue = (((offsetX+320) - rect.left) /(rect.width+400))-0.02

     // setUpdateXValue(newUpdateXValue);
  
      // Update the y value dynamically based on mouse movement
     // const newUpdateYValue = (offsetY - rect.top) / rect.height - 1.5;

     const newUpdateYValue = - (((offsetY-20 ) - rect.top) / (rect.height+270)) +0.17;


     

      // setUpdateYValue(newUpdateYValue);

      redrawCanvas();
    }
  };

  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImagePositions((prevPositions) => prevPositions.filter((_, i) => i !== index));
  };


const front_image=()=>{
  setTshirtImageLoaded(false);
  
  setTshirt_image_side("front_side")
  setImages([]);
setImage_side(tshirtImage)

redrawCanvas()

}
const back_image=()=>{
  setTshirtImageLoaded(false);

  setTshirt_image_side("back_side")
  setImages([]);
  setImage_side(tshirtImage)
 

  }
  const right_image=()=>{
    setTshirtImageLoaded(false);
    setImages([]);
    setTshirt_image_side("right_side")
    setImage_side(right)

    }

    const left_image=()=>{

      setTshirt_image_side("left_side")
      setImages([]);
      setTshirtImageLoaded(false);
      setImage_side(left)
   
      }




  return (<>
    <div className={style.t2d_whole}>
      <div className={style.canvas_style}>
        <canvas
          ref={canvasRef}
          width={320}
          height={430}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseOut={handleMouseUp}
          style={{
            cursor: dragging ? 'grabbing' : 'grab',
            position: 'relative',
            left: '460px',
            top: '30px',
          }}
        />
      </div>
      
      <div className={style.upload_div}>

      <h3>Upload</h3>

        <input type="file" id="imageInput" accept="image/*" onChange={handleImageUpload} ref={inputRef} style={{ display: 'none' }} multiple />
  
        <img src={logo}   onClick={() => inputRef.current.click()} className={style.upload_logo}/>

     
      </div>
      <div>
       





<div className={style.choose_position}>

<img src={tshirtImage} alt='front image' className={style.front_image} onClick={front_image}/>

<b>Front</b>&nbsp;&nbsp;



<img src={right} alt='right image' className={style.right_image} onClick={right_image}/>
                <b className={style.font_right_side}>Right side</b>
            
             <img src={tshirtImage} alt='back image' className={style.back_image} onClick={back_image}/>
                <b   className={style.font_back_side}>Back side </b>
                
              
                <img src={left} alt='left image' className={style.left_image} onClick={left_image}/>
                <b className={style.font_left_side}  >Left side </b>
</div>




      </div>
 
    

 
    </div>


    <div>
          <button onClick={() => setImages([])} className={style.delete_all_button}>
            Delete All
          </button>
        </div>

  <button onClick={incrementUpdateX} className={style.update_button}>
          Increment X
        </button>
    </>   
  );
}

export default CanvasImageUploader;
