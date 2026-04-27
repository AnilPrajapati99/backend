import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export const init = async ({ landmarkerRef, videoRef, streamRef }) => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
  );

  landmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
    },
    outputFaceBlendshapes: true,
    runningMode: "VIDEO",
    numFaces: 1,
  });

  streamRef.current = await navigator.mediaDevices.getUserMedia({
    video: true,
  });
  videoRef.current.srcObject = streamRef.current;

  videoRef.current.onloadeddata = () => {
    videoRef.current.play();
  };
};

export const detect = ({
  landmarkerRef,
  videoRef,
  setExpression,
  lastTimeRef,
  lastExpressionRef,
}) => {
  if (!landmarkerRef.current || !videoRef.current) return;

  const now = performance.now();

  // 👉 FPS CONTROL (10–12 FPS)
  if (now - lastTimeRef.current < 100) {
    animationRef.current = requestAnimationFrame(detect);
    return;
  }

  lastTimeRef.current = now;

  const results = landmarkerRef.current.detectForVideo(videoRef.current, now);

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

    console.log(frownLeft, frownRight);

    let currentExpression = "Neutral ";

    if (smileLeft > 0.4 && smileRight > 0.4) {
      currentExpression = "happy";
    } else if (jawOpen > 0.006 && browUp > 0.006) {
      currentExpression = "suprised";
    } else if (frownLeft > 0.2 && frownRight > 0.2) {
      currentExpression = "sad";
    }

    console.log(frownLeft, frownRight);

    // 👉 Prevent re-render spam
    if (lastExpressionRef.current !== currentExpression) {
      lastExpressionRef.current = currentExpression;
      setExpression(currentExpression);
    }
    return currentExpression;
  }

  //   animationRef.current = requestAnimationFrame(detect);
};
