import React, { useEffect, useRef, useState } from 'react';

function Canvas_normal() {
  const canvasRef = useRef(null);
  const [text, setText] = useState('');

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw text horizontally
    ctx.font = '100px serif';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';

    // Position text at the center of the canvas horizontally and vertically
    const x = canvas.width / 2;
    const y = canvas.height / 2;

    ctx.fillText(text, x, y);

  }, [text]);

  const handleDownload = () => {
    // Create download link
    const downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'canvas_image.png');
    canvasRef.current.toBlob(function(blob) {
      const url = URL.createObjectURL(blob);
      downloadLink.setAttribute('href', url);
      downloadLink.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleInputChange} placeholder="Enter text" />
      <canvas ref={canvasRef} width="800" height="500" style={{ border: '1px solid black' }}></canvas><br />
      <button onClick={handleDownload}>Download Image</button>
    </div>
  );
}

export default Canvas_normal;
