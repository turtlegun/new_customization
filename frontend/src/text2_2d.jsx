import React, { useEffect, useState, useRef, useContext } from 'react';
import tshirtImage from './front2_tshirt.webp';
import { Context12, Context13, Context8, Context9 } from './component/canvas3';
import style from './text_2d_canvas.module.css';
import left from './left_side_black.png';
import right from './right side.png';
import logo from './assets/Upload-icon.svg';

function CanvasImageUploader2() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);
  const canvasRef = useRef(null);
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [tshirtImageLoaded, setTshirtImageLoaded] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [image_height_size, setImage_height_size] = useState(100);
  const [image_side, setImage_side] = useState(tshirtImage);
  const [back_side_image, setBack_side_image] = useContext(Context13);
  const [tshirt_image_side, setTshirt_image_side] = useContext(Context12);

  useEffect(() => {
    redrawCanvas();
  }, [images, tshirtImageLoaded, image_side, image_height_size]);

  useEffect(() => {
    redrawCanvas();
    const tshirtImg = new Image();
    tshirtImg.onload = () => {
      setTshirtImageLoaded(true);
      setBackgroundImage(tshirtImg);
    };
    tshirtImg.src = image_side;
  }, [image_side, tshirtImageLoaded, image_height_size]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage]);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (event) => {
        const image = new Image();
        image.src = event.target.result;
        image.onload = () => {
          const maxWidth = image_height_size;
          const maxHeight = 100;
          let aspectRatio = 1;
          if (image.width > maxWidth || image.height > maxHeight) {
            aspectRatio = Math.min(maxWidth / image.width, maxHeight / image.height);
          }
          const scaledWidth = image.width * aspectRatio;
          const scaledHeight = image.height * aspectRatio;
          
          setImages((prevImages) => [...prevImages, { src: reader.result, key: Date.now(), x: 0, y: 0, width: scaledWidth, height: scaledHeight }]);
          redrawCanvas();
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeyDown = (event) => {
    if (!selectedImage) return;

    let moveX = 0;
    let moveY = 0;

    switch (event.key) {
      case 'ArrowLeft':
        moveX = -5;
        break;
      case 'ArrowRight':
        moveX = 5;
        break;
      case 'ArrowUp':
        moveY = -5;
        break;
      case 'ArrowDown':
        moveY = 5;
        break;
      default:
        return;
    }

    const updatedImages = images.map((img) => {
      if (img === selectedImage) {
        return {
          ...img,
          x: img.x + moveX,
          y: img.y + moveY,
        };
      }
      return img;
    });

    setImages(updatedImages);
    redrawCanvas();
  };

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (tshirtImageLoaded) {
      context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    }

    images.forEach(({ src, x, y, width, height }) => {
      const image = new Image();
      image.src = src;
      image.onload = () => {
        context.drawImage(image, x, y, width, height);
      };
    });
  };

  const handleMouseDown = (event) => {
    const mouseX = event.nativeEvent.offsetX;
    const mouseY = event.nativeEvent.offsetY;

    for (let i = images.length - 1; i >= 0; i--) {
      const { x, y, src } = images[i];
      if (
        mouseX >= x &&
        mouseX <= x + width &&
        mouseY >= y &&
        mouseY <= y + height
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
      redrawCanvas();
    }
  };

  return (
    <>
      <div className={style.t2d_whole}>
        <div className={style.canvas_style}>
          <canvas
            ref={canvasRef}
            width={310}
            height={350}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onKeyDown={handleKeyDown}
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
          <img src={logo} onClick={() => inputRef.current.click()} className={style.upload_logo} />
        </div>
        
        <div>
          <div className={style.choose_position}>
            <img src={tshirtImage} alt='front image' className={style.front_image} onClick={() => setImage_side(tshirtImage)} />
            <b>Front</b>&nbsp;&nbsp;
            <img src={right} alt='right image' className={style.right_image} onClick={() => setImage_side(right)} />
            <b className={style.font_right_side}>Right side</b>
            <img src={tshirtImage} alt='back image' className={style.back_image} onClick={() => setImage_side(tshirtImage)} />
            <b className={style.font_back_side}>Back side </b>
            <img src={left} alt='left image' className={style.left_image} onClick={() => setImage_side(left)} />
            <b className={style.font_left_side}>Left side </b>
          </div>
        </div>
      </div>
      
      <div>
        <button onClick={() => setImages([])} className={style.delete_all_button}>
          Delete All
        </button>
      </div>
    </>
  );
}

export default CanvasImageUploader2;
