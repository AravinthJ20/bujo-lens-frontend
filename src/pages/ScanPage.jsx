import React, { useState } from "react";
import UploadPage from "../components/UploadPage";
import CameraCapture from "../components/CameraCapture";
import EntriesList from "../components/EntriesList";
import { Container, Card, Button, Row, Col, Image } from "react-bootstrap";

function ScanPage() {
  const [result, setResult] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  // When UploadPage or CameraCapture returns result → set preview
  const handleResult = (data) => {
    setResult(data);
    setPreviewImage(data?.imageUrl || data?.imageBase64 || null);
  };

  return (
    <Container className="py-4">
      <Card className="shadow-lg p-4 border-0" style={{ borderRadius: "18px" }}>
        
        {/* HEADER */}
        <h2 className="fw-bold mb-4" style={{ fontSize: "1.9rem" }}>
          📸 Scan Your Bullet Journal Page
        </h2>

        {/* Toggle buttons */}
        <div className="d-flex gap-3 mb-4">
          <Button
            variant={!showCamera ? "primary" : "outline-primary"}
            className="px-4 py-2"
            style={{ borderRadius: "10px" }}
            onClick={() => setShowCamera(false)}
          >
            Upload Image
          </Button>

          <Button
            variant={showCamera ? "primary" : "outline-primary"}
            className="px-4 py-2"
            style={{ borderRadius: "10px" }}
            onClick={() => setShowCamera(true)}
          >
            Use Camera
          </Button>
        </div>

        <Row className="g-4">
          
          {/* LEFT PANEL */}
          <Col md={6}>
            <Card
              className="shadow-sm border-0"
              style={{ borderRadius: "14px", padding: "20px" }}
            >
              <h5 className="fw-semibold mb-3">📤 Upload or Capture</h5>

              {showCamera ? (
                <CameraCapture onCaptured={handleResult} />
              ) : (
                <UploadPage 
                  onUploaded={handleResult} 
                  onPreview={(img) => setPreviewImage(img)} 
                />
              )}
            </Card>

            {/* Entries List */}
            {result && (
              <Card
                className="shadow-sm border-0 mt-4"
                style={{ borderRadius: "14px", padding: "20px" }}
              >
                <h5 className="fw-semibold mb-3">📝 Detected Entries</h5>
                <EntriesList entries={result.entries} pageId={result.page._id} />
              </Card>
            )}
          </Col>

          {/* RIGHT PANEL - PREVIEW */}
      {/* RIGHT PANEL - PREVIEW (HIDDEN IN CAMERA MODE) */}
{!showCamera && (
  <Col md={4}>
    <Card
      className="shadow-sm border-0"
      style={{
        borderRadius: "14px",
        padding: "20px",
        height: "100%",
        minHeight: "520px",
      }}
    >
      

      {previewImage ? (
        <div
          style={{
            width: "100%",
            height: "450px",
            borderRadius: "12px",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#f8f9fa",
          }}
        >
          <Image
            src={previewImage}
            alt="Preview"
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      ) : (
        <div
          className="d-flex flex-column justify-content-center text-center text-muted"
          style={{
            height: "450px",
            borderRadius: "12px",
            background: "#f8f9fa",
          }}
        >
          <i className="bi bi-image fs-1 mb-2"></i>
          <p>No preview available</p>
        </div>
      )}
    </Card>
  </Col>
)}


        </Row>
      </Card>
    </Container>
  );
}

export default ScanPage;
