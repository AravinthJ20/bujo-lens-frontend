import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button, Spinner } from "react-bootstrap";
import { uploadPageApi } from "../api/pageApi";

const videoConstraints = {
  width: 500,
  height: 380,
  facingMode: "environment" // Try to use back camera if device has any
};

export default function CameraCapture({ onCaptured }) {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    if (!imageSrc) return alert("Failed to capture image!");

    // Convert Base64 to Blob
    const res = await fetch(imageSrc);
    const blob = await res.blob();

    const file = new File([blob], "capture.jpg", { type: "image/jpeg" });

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const uploadRes = await uploadPageApi(formData);
      setLoading(false);

      onCaptured(uploadRes.data);
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert("Camera upload failed!");
    }
  };

  return (
    <div className="text-center">
      <Webcam
        audio={false}
        height={380}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
        videoConstraints={videoConstraints}
        className="border rounded shadow-sm"
      />

      <Button
        className="mt-3"
        variant="primary"
        onClick={capture}
        disabled={loading}
      >
        {loading ? <Spinner size="sm" /> : "📸 Capture & Scan"}
      </Button>
    </div>
  );
}
