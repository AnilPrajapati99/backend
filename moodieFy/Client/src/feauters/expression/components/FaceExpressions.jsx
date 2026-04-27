import { useEffect, useRef, useState } from "react";
import { detect,init } from "../utils/utils";
import { useSong } from "../../home/hooks/useSong";
import Expresion from "./Expresion";
import "./expression.scss"
export default function FaceExpression({onClick=()=>{}}) {
  const {setMood} =  useSong()
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const lastExpressionRef = useRef("");
  const lastTimeRef = useRef(0); // FPS control
  const streamRef = useRef()

  const [expression, setExpression] = useState("Detecting...");
  const [isCameraOpen, setisCameraOpen] = useState(false)

console.log(videoRef.current);

  useEffect(() => {
  if (!isCameraOpen) return;

  init({ landmarkerRef, videoRef, streamRef });

  return () => {
    if (landmarkerRef.current) landmarkerRef.current.close();

    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject
        .getTracks()
        .forEach((track) => track.stop());
    }
  };
}, [isCameraOpen]);

async function handleClick() {
 const expression =  detect({landmarkerRef,videoRef,setExpression,lastTimeRef,lastExpressionRef})
 console.log(expression)
 onClick(expression)
 setMood(expression)
 setisCameraOpen(false)
}

const toggleOpen = () => {
  setisCameraOpen(true);
  setExpression("Opening Camera...");
}

console.log(isCameraOpen)
  return (
    <div className="faceexpression-container">
      {isCameraOpen? (
         <div style={{ textAlign: "center" }}>
      <video
        ref={videoRef}
        style={{ width: "400px", borderRadius: "10px" }}
        playsInline
      />
      <h2>{expression}</h2>
      <div className="btn-container">
      <button  className="button" onClick={handleClick}>Detect Expression</button>
      </div>
    </div>
      ):(
        
     <div>
          <Expresion/>
         <button style={{marginTop:"10px"}} className="button" onClick={toggleOpen}>Set Mood</button>
         </div>
      
       
      )}
    </div>
   
  );
}