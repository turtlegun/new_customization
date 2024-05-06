import React, { useState, useRef, useEffect } from 'react';

const TwoCanvasText = () => {
  const canvas1Ref = useRef(null);
  const canvas2Ref = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const canvas1 = canvas1Ref.current;
    const canvas2 = canvas2Ref.current;
    const ctx1 = canvas1.getContext('2d');
    const ctx2 = canvas2.getContext('2d');

    // Set font style for both canvases
    ctx1.font = '20px Arial';
    ctx2.font = '20px Arial';

    // Function to draw text on both canvases
    const drawText = (x, y, text) => {
      ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
      ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
      ctx1.fillText(text, x, y);
      ctx2.fillText(text, x, y);
    };

    // Mouse move event listener
    const handleMouseMove = (e) => {
      if (isDragging) {
        const rect1 = canvas1.getBoundingClientRect();
        const rect2 = canvas2.getBoundingClientRect();
        const mouseX = e.clientX - rect1.left;
        const mouseY = e.clientY - rect1.top;
        setMouseX(mouseX);
        setMouseY(mouseY);
        drawText(mouseX, mouseY, 'Your Text');
      }
    };

    // Mouse down event listener
    const handleMouseDown = () => {
      setIsDragging(true);
    };

    // Mouse up event listener
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    canvas1.addEventListener('mousemove', handleMouseMove);
    canvas1.addEventListener('mousedown', handleMouseDown);
    canvas1.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas1.removeEventListener('mousemove', handleMouseMove);
      canvas1.removeEventListener('mousedown', handleMouseDown);
      canvas1.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <canvas ref={canvas1Ref} width={400} height={200} style={{backgroundColor:"red"}}></canvas>
        <canvas ref={canvas2Ref} width={400} height={200}></canvas>
      </div>
    </div>
  );
};

export default TwoCanvasText;
