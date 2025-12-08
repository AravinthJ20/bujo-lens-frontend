import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";

export default function ManualTextSimulator({ onResult }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const simulate = async () => {
    if (!text.trim()) return alert("Please enter text!");

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/simulate-text",
        { text },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setLoading(false);
      onResult(res.data);
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert("Simulation failed!");
    }
  };

  return (
    <Card className="p-3 shadow-sm">
      <h5>📝 Paste Manual Journal Text</h5>
      <Form.Control
        as="textarea"
        rows={8}
        value={text}
        placeholder={`Example:
Sun 02-11-25

06:00   • yoga session
07:30   • walk with friend
10:00   • Brunch

× Laundry
• Read: Himalaya: Exploring
        the roof of world
        by John Keay

11:00   — feeling fresh
16:00   • movie`}
        onChange={(e) => setText(e.target.value)}
      />

      <Button className="mt-3" onClick={simulate} disabled={loading}>
        {loading ? "Processing..." : "Simulate OCR"}
      </Button>
    </Card>
  );
}
