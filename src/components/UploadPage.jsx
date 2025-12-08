import React, { useState } from "react";
import { uploadPageApi } from "../api/pageApi";
import { Button, Form } from "react-bootstrap";


export function UploadPage({ onUploaded, onPreview }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (e) => {
    const selected = e.target.files[0];
    setFile(selected);

    if (selected) {
      const previewUrl = URL.createObjectURL(selected);
      onPreview(previewUrl); // 🔥 SEND PREVIEW TO PARENT
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an image");

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const res = await uploadPageApi(formData);
      setLoading(false);
      onUploaded(res.data); // parsed OCR result
    } catch (err) {
      setLoading(false);
      console.error("UPLOAD ERROR:", err);
      alert("Upload failed");
    }
  };

  return (
    <div>
      <Form.Control type="file" accept="image/*" onChange={handleFileSelect} />

      <Button className="mt-3" onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
}



export default UploadPage;
