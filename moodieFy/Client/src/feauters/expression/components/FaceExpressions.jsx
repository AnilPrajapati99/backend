import { useEffect, useRef, useState } from "react";
import { detect,init } from "../utils/utils";


export default function FaceExpression({onClick=()=>{}}) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);

  const lastExpressionRef = useRef("");
  const lastTimeRef = useRef(0); // FPS control
const streamRef = useRef()

  const [expression, setExpression] = useState("Detecting...");

  useEffect(() => {
    init({landmarkerRef,videoRef,streamRef})
    return () => {
      if (landmarkerRef.current) landmarkerRef.current.close();

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

async function handleClick() {
 const expression =  detect({landmarkerRef,videoRef,setExpression,lastTimeRef,lastExpressionRef})
 console.log(expression)
 onClick(expression)
}

  return (
    <div style={{ textAlign: "center" }}>
      <video
        ref={videoRef}
        style={{ width: "400px", borderRadius: "12px" }}
        playsInline
      />
      <h2>{expression}</h2>
      <button onClick={init}>Open Camera</button>
      <button onClick={handleClick}>Detect Expression</button>
    </div>
  );
}