import { createRoot } from 'react-dom/client'
import React, { useEffect, useRef, useState,useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

import { useSpring, animated } from '@react-spring/three'
import { a } from '@react-spring/three'
import Scroll from './Scroll';

function Box(props) {

  const mesh = useRef()
 
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useFrame((state, delta) => (mesh.current.rotation.x += delta))

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function Camera(props) {
  const ref = useRef();
  const set = useThree((state) => state.set)
  useEffect(() => void set({ camera: ref.current }), [])
  useFrame(() => ref.current.updateMatrixWorld());

  //const [active, setActive]=useState(false)

  //const { rotation, position } = useSpring({ rotation: active ? [0,0,0] : [0,Math.PI/2,0], position: active ?[0,0,0] : [-0.05,0,-0.07], config: { duration: 3000 } })

  const [x] = Scroll([-100, 100], { domTarget: window });
  return (
    
   <a.perspectiveCamera ref={ref} {...props} position-x={x.to((x) => (x / 500) * 25)} />
    
  )
}

export default function App() {

  const ref = useRef();
  


  return (
    <Canvas>
       
      <Camera  />
      
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
  
      <Box position={[0, -1, -10]} />
     
      <Box position={[0, 1, -10]} />
   
    </Canvas>
  )
}

