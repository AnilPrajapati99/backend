import { useEffect, useRef, useState } from "react";
import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const animationRef = useRef(null);
  const lastExpressionRef = useRef("");
  const lastTimeRef = useRef(0); // FPS control
    let stream;

  const [expression, setExpression] = useState("Detecting...");


   const init = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      landmarkerRef.current = await FaceLandmarker.createFromOptions(
        vision,
        {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          },
          outputFaceBlendshapes: true,
          runningMode: "VIDEO",
          numFaces: 1,
        }
      );

      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;

      videoRef.current.onloadeddata = () => {
        videoRef.current.play();
        detect();
      };
    };

    const detect = () => {

      if (!landmarkerRef.current || !videoRef.current) return;

      const now = performance.now();

      // 👉 FPS CONTROL (10–12 FPS)
      if (now - lastTimeRef.current < 100) {
        animationRef.current = requestAnimationFrame(detect);
        return;
      }

      lastTimeRef.current = now;

      const results = landmarkerRef.current.detectForVideo(
        videoRef.current,
        now
      );

      if (results.faceBlendshapes?.length > 0) {
        const blendshapes = results.faceBlendshapes[0].categories;

        // 👉 FAST LOOKUP (no multiple find)
        const map = {};
        blendshapes.forEach((b) => {
          map[b.categoryName] = b.score;
        });


        const smileLeft = map["mouthSmileLeft"] || 0;
        const smileRight = map["mouthSmileRight"] || 0;
        const jawOpen = map["jawOpen"] || 0;
        const browUp = map["browInnerUp"] || 0;
        const frownLeft = map["mouthFrownLeft"] || 0;
        const frownRight = map["mouthFrownRight"] || 0;

        console.log(frownLeft,frownRight)


        let currentExpression = "Neutral 😐";

        if (smileLeft > 0.4 && smileRight > 0.4) {
          currentExpression = "Happy 😄";
        } else if (jawOpen > 0.006 && browUp > 0.006) {
          currentExpression = "Surprised 😲";
        } else if (frownLeft > 0.2 && frownRight > 0.2) {
          currentExpression = "Sad 😢";
        }

        // 👉 Prevent re-render spam
        if (lastExpressionRef.current !== currentExpression) {
          lastExpressionRef.current = currentExpression;
          setExpression(currentExpression);
        }
      }

    //   animationRef.current = requestAnimationFrame(detect);
    };



  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (landmarkerRef.current) landmarkerRef.current.close();

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <video
        ref={videoRef}
        style={{ width: "400px", borderRadius: "12px" }}
        playsInline
      />
      <h2>{expression}</h2>
      <button onClick={init}>Open Camera</button>
      <button onClick={detect}>Detect Expression</button>
    </div>
  );
}