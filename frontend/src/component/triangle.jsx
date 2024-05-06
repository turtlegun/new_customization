
import React, { useState, useRef, useEffect } from 'react';

function ImageRotator() {
    const canvasRef = useRef(null);
    const [angleInDegrees, setAngleInDegrees] = useState(0);
    const [imageLoad, setImageLoad] = useState(null);
    const[angle_change,setAnle_change]=useState(10)

    useEffect(() => {
        if (imageLoad) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const image = new Image();
            
            image.onload = function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(image, canvas.width / 2 - image.width / 2, canvas.height / 2 - image.height / 2);
            };
            image.src = imageLoad;
        }
    }, [imageLoad]);

    const drawRotated = (degrees) => {
        if (imageLoad) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const image = new Image();
            image.onload = function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.save();
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate(degrees * Math.PI / 180);
                ctx.drawImage(image, -image.width / 2, -image.height / 2);
                ctx.restore();
            };
            image.src = imageLoad;
        }
    };

    const handleClockwise = () => {
        const newAngle = angleInDegrees + angle_change;
        setAngleInDegrees(newAngle);
        drawRotated(newAngle);
    };

    const handleCounterClockwise = () => {
        const newAngle = angleInDegrees - 30;
        setAngleInDegrees(newAngle);
        drawRotated(newAngle);
    };

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            setImageLoad(event.target.result); // Set imageLoad state with the data URL
        };
        reader.readAsDataURL(file);
    };

    const handleDownload = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'canvas_image.png';
        link.click();
    };

    return (
        <div>
            <canvas ref={canvasRef} width={600} height={600}></canvas>
            <br />
            
            <input type="file" onChange={handleUpload} />
          

            <button onClick={handleClockwise}>Rotate right</button>
            <button onClick={handleCounterClockwise}>Rotate left</button>

            <button onClick={handleDownload}>Download</button>

<h3>images angle</h3>
            <input type="number"  onChange={(e)=>{setAnle_change(parseInt(e.target.value))}} />
        </div>
    );
}

export default ImageRotator;
