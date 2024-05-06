import React, { useState } from 'react';
import style from './curved.module.css';
import { useControls } from "leva";



const CurvedText = ({ text }) => {
  const [curve, setCurve] = useState('');
  const [angle, setAngle] = useState(210); // Rename curve1 to angle to make it clearer
  const [angle2, setAngle2] = useState(250);
  const [color,setColor]=useState("white")
  const[letter_space,setLetter_space]=useState(10)
  const [fontFamily, setFontFamily] = useState('sans-serif');

  useControls({
    angle: {
      min: 0,
      max: 360,
      value: 210,
      step: 1,
      onChange: (value) => {
          setAngle(value);
      },
    },


angle2:{

  min: 0,
  max: 360,
  value: 210,
  step: 1,
  onChange: (value) => {
      setAngle2(value);
  },


},
text:{

  min: 0,
  max: 50,
  value: 5,
  step: 1,
  onChange: (value) => {
      setLetter_space(value);
  },


}



  });

  const downloadSVG = () => {
    const svg = document.getElementById('curved-text-svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'curved_text.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={style.curved_text_container}>
      <svg
        id="curved-text-svg"
        viewBox={`0 0 500 500`}
        x="100"
        y="100"
        width="500"
        height="500"

       
      >
        <path id="curve" d={`M150,${angle2} Q310,120 ${angle},320`} fill="none" />
        <text width="1100"   style={{fill:color,fontStyle:'italic' ,fontSize:'larger',fontFamily: fontFamily,letterSpacing:`${letter_space}`}}>
          <textPath xlinkHref="#curve">{curve}</textPath>
        </text>
      </svg>

      <input
        type="text"
        onChange={(e) => {
          setCurve(e.target.value);
        }}
      />
      <button onClick={downloadSVG}>Download SVG</button>
      <input
            type="button"
            id="mesh"
            name="vest"
            className={style.shirt}
            onClick={(e) => setColor("yellow")}
          />
          <input
            type="button"
            id="mesh"
            name="vest"
            className={style.shirt1}
            onClick={(e) => setColor("red")}
          />
          <input
            type="button"
            id="mesh"
            name="vest"
            className={style.shirt2}
            onClick={(e) => setColor("blue")}
          />
          <input
            type="button"
            id="mesh"
            name="vest"
            className={style.shirt3}
            onClick={(e) => setColor("green")}
          />
          <input
            type="button"
            id="mesh"
            name="vest"
            className={style.shirt4}
            onClick={(e) => setColor("purple")}
          />

          <br></br>
          <input
            type="button"
            id="mesh"
            name="vest"
            className={style.shirt5}
            onClick={(e) => setColor("black")}
          />
          <input
            type="button"
            id="mesh"
            name="vest"
            className={style.shirt6}
            onClick={(e) => setColor("grey")}
          />
          <input
            type="button"
            id="mesh"
            name="vest"
            className={style.shirt7}
            onClick={(e) => setColor("white")}
          />
          <select onChange={(e) => setFontFamily(e.target.value)}>
  <option value="sans-serif">sans-serif</option>
  <option value="fantasy">fantasy</option>
</select>
    </div>
  );
};

export default CurvedText;
