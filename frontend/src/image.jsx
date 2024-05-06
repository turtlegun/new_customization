import axios from 'axios';
import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
function ImageBackend() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, [setImages]);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/send_image');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };


  const imageList = images.map((image, index) => ({
    src: `data:image/${image.img.contentType};base64,${Buffer.from(image.img.data).toString('base64')}`,
    alt: `Image ${index}`,
    name: image.name,
    desc: image.desc
  }));


  console.log(imageList)
  return (
    <div>
      <h1>Uploaded Images</h1>
      <div>
        {images.map((image, index) => (
          <div key={index}>
            
            <img src={`data:image/${image.img.contentType};base64,${Buffer.from(image.img.data).toString('base64')}`} alt={`Image ${index}`} />
            <div>
              <h5>{image.name}</h5>
              <p>{image.desc}</p>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
}

export default ImageBackend;
