

import React, { useRef, useState } from 'react'
import { useGLTF,useTexture,Decal } from '@react-three/drei'

import base from './texture/shirt/cotton.jpg'
import base2 from './texture/shirt/cotton2.jpg'
import shirt1 from './texture/shirt/shirt_material.jpg'
import normal from  './texture/shirt/Leather_008_Normal.jpg'
 
import rough from './texture/shirt/Leather_008_Roughness.jpg'

import aomap from './texture/shirt/Leather_008_Ambient Occlusion.jpg'
export default function Model(props) {
  const { nodes, materials } = useGLTF('/shirt_and_vest-processed.glb');
  
  let shirtTextureProps;
  let select_value = props.selectedValue;
  console.log(select_value);

let shirtTextureMaterialProps = useTexture({
  map: shirt1,

  
})



if(select_value==='option1'){
 shirtTextureProps = useTexture({
    map: base,
 
    
  })
}else{
   shirtTextureProps = useTexture({
    map: base2,
 
    
  })
}
  return (
    <group {...props} dispose={null} 
    


    >


      <group scale={0.09}  >
      

        <mesh material-color={props.customcolor.vest} geometry={nodes.vest_vest2_0.geometry} material={materials.vest2} />
        <mesh material-color={props.customcolor.vest} geometry={nodes.vest_vest1_0.geometry} material={materials.vest1} />
        <mesh material-color={props.customcolor.button} geometry={nodes.buttom3_buttom_0.geometry} material={materials.buttom} />
        <mesh material-color={props.customcolor.button} geometry={nodes.buttom4_buttom_0.geometry} material={materials.buttom} />
        <mesh material-color={props.customcolor.button} geometry={nodes.buttom4_buttom_0.geometry} material={materials.buttom} />
        <mesh material-color={props.customcolor.button} geometry={nodes.buttom5_buttom_0.geometry} material={materials.buttom} />
        <mesh material-color={props.customcolor.button} geometry={nodes.buttom6_buttom_0.geometry} material={materials.buttom} />
        <mesh material-color={props.customcolor.button} geometry={nodes.buttom2_buttom_0.geometry} material={materials.buttom} />
        <mesh material-color={props.customcolor.button} geometry={nodes.buttom1_buttom_0.geometry} material={materials.buttom} />
        <mesh material-color={props.customcolor.packet} geometry={nodes.Packet1_Packet_0.geometry} material={materials.Packet} />
        <mesh material-color={props.customcolor.packet} geometry={nodes.Packet2_Packet_0.geometry} material={materials.Packet} />
        <mesh material-color={props.customcolor.packet} geometry={nodes.back1_Packet_0.geometry} material={materials.Packet} />
        <mesh material-color={props.customcolor.button} geometry={nodes.back2_buttom_0.geometry} material={materials.buttom} />
        <mesh material-color={props.customcolor.shirtcolor} geometry={nodes.Tshirt1_shirt_0.geometry}>
          <meshStandardMaterial {...shirtTextureProps} />
        </mesh>
        <mesh material-color={props.customcolor.shirtcolor} geometry={nodes.Tsgirt4_shirt_0.geometry} material={materials.shirt}>
          <meshStandardMaterial {...shirtTextureMaterialProps} />
        </mesh>
        <mesh material-color={props.customcolor.shirtcolor} geometry={nodes.Tshirt3_shirt_0.geometry} material={materials.shirt}>
          <meshStandardMaterial {...shirtTextureMaterialProps} />
        </mesh>
        <mesh material-color={props.customcolor.tiecolor} geometry={nodes.CRV_CR_0.geometry} material={materials.material} />
        <mesh material-color={props.customcolor.shirtcolor} geometry={nodes.Tshirt2_shirt_0.geometry} material={materials.shirt}>
          <meshStandardMaterial {...shirtTextureMaterialProps} />
        </mesh>
        <mesh material-color={props.customcolor.shirtcolor} geometry={nodes.CRB_CR_0.geometry} material={materials.material}>
          <meshStandardMaterial {...shirtTextureMaterialProps} />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload('/shirt_and_vest-processed.glb');


