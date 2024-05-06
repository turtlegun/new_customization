
import { useContext, useEffect, useState } from 'react';
import style from './customization.module.css'
import   context  from './canvas3';



function Customization() {




const handleimage=(event)=>{

const file=event.target.files[0]

setImage(URL.createObjectURL(file))

}


    return ( <>
   <div className={style.customization}>
<input type='file' onChange={handleimage}/>

{image && <Canvas2 image={image} />}
   </div>
    </> );
}

export default Customization;