import React, { useState, useRef, useContext, useEffect } from 'react';
import { Decal, Html, useGLTF, useTexture } from '@react-three/drei';
import goku from './goku.jpg';
import { MeshBasicMaterial, TextureLoader, Raycaster, Vector2 } from 'three';
import luffy from './luffy.webp';
import naruto from './naruto.png';
import cotton from './first_design.jpg';
import polyster from './second_design.jpg';
import { useControls } from "leva";

import { Context2, Context3 } from '../src/component/canvas3';
import font from './Oswald/static/Oswald-Bold.ttf'
import { degToRad } from "three/src/math/MathUtils.js";
import * as THREE from 'three';
import ReactCurvedText from 'react-curved-text';
import ReactDOM from 'react-dom'; // Import ReactDOM
import CurvedText from '../src/curved';
import { setImage } from '../src/counter_slice';
import { Buffer } from 'buffer';
import { useSelector, useDispatch } from 'react-redux';
import { useImage } from '../src/App';
import axios from 'axios';

export default function Model(props) {
    const dispatch = useDispatch();
    const imageURL = useSelector((state) => state.counter.image);
    const { nodes, materials } = useGLTF('/shirt.glb');
    const [pos, setPos] = useState([0, 1.8, 1]);
    const [rotation, setRotation] = useState([0, 0, 0]);
    const [image_size, setScale] = useState([0.50, 0.50, 0.10]);
    const [isDragging, setIsDragging] = useState(false);
    const canvasRef = useRef(null);
    const decalRef = useRef(null);
    const textRef = useRef(null);
    const raycaster = new Raycaster();

    const [decal_selected, setDecal_selected] = useContext(Context2);
    const [text_selected, setText_selected] = useContext(Context3);
    const [se_sel, setSe] = useState(false)

    const [tex_sel, setTex] = useState(false)

    const {image5, setImage5} = useImage();
    const [pos2, setPos2] = useState([0, 1.8, 1]);
    const [rotation2, setRotation2] = useState([0, 0, 0]);
    const [font_size, setFont_size] = useState(0.05);
    let text = props.text


    const[iamge_backend,setBackend_image]=useState()

    const [images, setImages] = useState([]);

/*

    useEffect(() => {
      fetchImages();



      const interval = setInterval(fetchImages, 5000); // Fetch every 5 seconds

      return () => clearInterval(interval);
    }, []);



    useEffect(() => {
        const material = props.material; 
        images.forEach((image) => {
            if (material === image.name) {
                console.log(image.name)
                let source = `data:image/${image.img.contentType};base64,${Buffer.from(image.img.data).toString('base64')}`
                setBackend_image(source);
            }
        });
    }, [props.material, images]); 

  
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/send_image');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };


*/

let textureprops
    if (iamge_backend) {
        textureprops = useTexture({
            map: iamge_backend,
        });
    }

    else {

        textureprops = useTexture({
            map: polyster,
        })

    }


  

    console.log(iamge_backend)

    useControls({
        angle: {
            min: degToRad(0),
            max: degToRad(360),
            value: 0,
            step: 0.01,
            onChange: (value) => {
                const x = Math.sin(value);
                const z = Math.cos(value);
                const rot = Math.atan2(x, z);
                setRotation2(() => [0, 0, rot]);

            },
        },

        image_size: {
            min: 0.1,
            max: 2,
            value: 0,
            step: 0.01,
            onChange: (value) => {
                setScale(() => [value, value, 1.5]);
            },
        },
    });

    useControls({
        font_size: {
            value: 0.05,
            min: 0.01,
            max: 0.5,
            step: 0.01,
            onChange: (value) => {
                setFont_size(value);
            },
        },

        angle2: {
            min: degToRad(0),
            max: degToRad(360),
            value: Math.PI / 4,
            step: 0.01,
            onChange: (value) => {
                const x = Math.sin(value);
                const z = Math.cos(value);
                const rot = Math.atan2(x, z);
                setRotation(() => [0, 0, rot]);
            },
        },
    });

    let decal = props.position ? props.position : [0, 0.04, 0.10];

let texture=useTexture(goku)

    let decal2 = [0, -0.20, 0.10];
    let selectedValue = props.choice;
    let text_pos = props.text_position ? props.text_position : [0, -0.20, 0.10];

    let logoTexture = props.image ? useTexture(props.image) : useTexture(goku);
    let logoTexture2 = props.image2 ? useTexture(props.image2) : useTexture(luffy)
    let logoTexture3 = useTexture(luffy);

    const handleDecalMouseDown = (event) => {
        setSe(prevState => !prevState);
        setDecal_selected(se_sel);
        event.stopPropagation();
    };

    const text_select = (event) => {
        setTex(prevState => !prevState);
        setText_selected(tex_sel);
        event.stopPropagation();
    };

    return (
        <group {...props} scale={[10, 10, 10]} position={[1, 1, 0]} ref={canvasRef}>
            <mesh geometry={nodes.T_Shirt_male.geometry} material={materials.lambert1} material-color={props.color}>
             
             
            {
  props.image.map((imageUrl, index) => {



    console.log(`props.position ${props.position[index]}`)

    const decal = props.position ? props.position[index] : { x: 0, y: 0, z: 0.15 };

    const texture = useTexture(imageUrl);
   
    const { x, y, z } = decal;
    console.log(`x is ${x}`)
    console.log(`y is ${x}`)

    const newPosition = [x, y, z];

    console.log(index);
    console.log(`the decal is ${JSON.stringify(props.position[index])}`);
 console.log(newPosition); 

    return (
      <Decal key={index} position={newPosition} rotation={rotation} scale={image_size} map={texture} />
    );
  })
}
{/* 
<Decal  position={[0,0,0]} rotation={rotation} scale={image_size} map={texture} onClick={handleDecalMouseDown}  />
     */}        
          {/*  
                <Decal
                    position={text_pos}
                    rotation={rotation}
                    scale={font_size}
                    map={logoTexture2}
                    onClick={text_select}
                />

                {!props.delete && (
                    <Decal
                        position={decal}
                        rotation={rotation2}
                        scale={image_size}
                        map={logoTexture}
                        onClick={handleDecalMouseDown}
                    />
                )} */}  
                <meshStandardMaterial {...textureprops} />
            </mesh>
        </group>
    );
}

useGLTF.preload('/shirt.glb');

