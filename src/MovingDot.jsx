import { useState } from "react";

export default function MovingDot () {
  const [position, setPosition] = useState({x: 0, y: 0});


  return (<>
  <div style={{
    blockSize: "100vh",
    inlineSize: "100vw",
    position: "relative",
  }} 
  onPointerMove={e => setPosition({
    x: e.clientX,
    y: e.clientY
  })}>
    <div style={{
        position: "absolute",
        blockSize: "1.5rem",
        inlineSize: "1.5rem",
        borderRadius: "50%",
        backgroundColor: "red",
        transform:` translate(${position.x}px, ${position.y}px)`,
      
    }}/>
  </div>
  </>);
}  