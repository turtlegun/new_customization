
import { useContext, useRef, useState } from 'react';
import style from './canvas3.module.css'
import logo_input from "../assets/Upload-icon.svg";
import   {Context, Context4, Context6}  from './canvas3';
import   {Context1}  from './canvas3';

import { context } from '@react-three/drei/web/pivotControls/context';

function Upload(props) {
  const inputRef=useRef()
  const [image, setImage] = useContext(Context); // Destructure image from Context
const[image2,setImage2]=useContext(Context6)

  const [text, setText] = useContext(Context1); 
    const[color_text,setColor_text]=useContext(Context4)
    const[input_text,setInput_text]=useState()
    const[position,setPosition]=useState({ x: 0, y: 0 })

    const[count,setCount]=useState(0)


    const handleimage = (event) => {
        const file = event.target.files[0];
       
        if(count==0){
        setImage(URL.createObjectURL(file));
        setCount(prevCount => prevCount + 1);
        console.log("first image ")
    
      }
if(count==1 ){

  setImage2(URL.createObjectURL(file));
console.log("second image set")
setCount(prevCount => prevCount - 1);

}
     
      };
    const text_input=(e)=>{

setText(e.target.value)


    }
    const handlemouse=(event)=>{
      setPosition({ x: event.clientX, y: event.clientY });


    }
    const [selectedOption, setSelectedOption] = useState('');
   

    const handleSelectChange = (event) => {
      setSelectedOption(event.target.value);
    };
  console.log(`${image} this is the image`)

    return ( 


     
      
        <div className={style.input_file}>
        <input type='file' onChange={handleimage} style={{ display: 'none' }} ref={inputRef}/>
        <img src={logo_input} alt="Logo" onClick={() => inputRef.current.click()} className={style.upload_svg} />
        <h2>Upload Image </h2>
        <h2>Write text</h2>

        <input type='text' onChange={text_input}/>
        <div className={style.color_container}>
        <input
            type="button"
            id="mesh"
            name="vest"
            className={style.shirt}
            onClick={(e) => setColor_text("yellow")}
          />
          <input
            type="button"
            id="mesh"
            name="vest"
            className={style.shirt1}
            onClick={(e) => setColor_text("red")}
          />
          <input
            type="button"
            id="mesh"
            name="vest"
            className={style.shirt2}
            onClick={(e) => setColor_text("blue")}
          />
          <input
            type="button"
            id="mesh"
            name="vest"
            className={style.shirt3}
            onClick={(e) => setColor_text("green")}
          />
          <input
            type="button"
            id="mesh"
            name="vest"
            className={style.shirt4}
            onClick={(e) => setColor_text("purple")}
          />
           <br></br>
          <input
            type="button"
            id="mesh"
            name="vest"
            className={style.shirt5}
            onClick={(e) => setColor_text("black")}
          />
          <input
            type="button"
            id="mesh"
            name="vest"
            className={style.shirt6}
            onClick={(e) => setColor_text("grey")}
          />
          <input
            type="button"
            id="mesh"
            name="vest"
            className={style.shirt7}
            onClick={(e) => setColor_text("white")}
          />
          </div>

<div>

<h2>Font Family</h2>
<select value={selectedOption} onChange={handleSelectChange} >
        <option value="">{selectedOption}</option>
        <option value="apple">Roboto</option>
        <option value="banana">Oswald</option>
        <option value="orange">Ojuju</option>
        <option value="grape">Montserrat</option>
        <option value="grape">Madimi_One</option>
      </select>
      <h2>Font style</h2>
</div>
{count}
      </div>
     
     );
}


export default Upload;