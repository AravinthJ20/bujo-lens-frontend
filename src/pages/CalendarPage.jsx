import React, { useState } from "react";
import { Container, Card, Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

export default function CalendarPage() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [text, setText] = useState("");
  const [type, setType] = useState("note");
  const [symbol, setSymbol] = useState("");

  const saveEntry = async () => {
    if (!date || !text)
      return alert("Please select a date and enter entry text!");

    const token = localStorage.getItem("token");

    // Final text format including time (if given)
    const finalText = time ? `${time} - ${text}` : text;

    await axios.post(
      "http://localhost:5000/api/entriesManual/manual-entry",
      {
        date,
        text: finalText,
        type,
        symbol,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Entry added!");

    setText("");
    setTime("");
    setSymbol("");
  };

  return (
    <Container className="py-4">
      {/* <h2 className="fw-bold mb-3">📅 Add Manual Journal Entry</h2> */}

      <Card className="shadow-sm border-0 p-4">
        <Form>
          <Row className="mb-3">
            {/* DATE */}
            <Col md={4}>
              <Form.Label>Select Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Col>

            {/* TIME */}
            <Col md={4}>
              <Form.Label>Select Time</Form.Label>
              <Form.Control
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </Col>

            {/* TYPE */}
            <Col md={4}>
              <Form.Label>Entry Type</Form.Label>
              <Form.Select
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
               
                <option value="task">Task</option>
                 <option value="task">Event</option>
                  <option value="note">Note</option>
              </Form.Select>
            </Col>
          </Row>

          {/* SYMBOL */}
          <Row className="mb-3">
            <Col md={4}>
              <Form.Label>Symbol</Form.Label>
              <Form.Select
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
              >
                <option value="">None</option>
                <option value="•">• Dot (Task)</option>
                <option value="X">X Completed</option>
                <option value="O">O Scheduled</option>
                <option value="/">/ In Progress</option>
                <option value="⭕">⭕ Event Done</option>
              </Form.Select>
            </Col>
          </Row>

          {/* TEXT */}
          <Form.Group className="mb-3">
            <Form.Label>Entry Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write your journal entry…"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" size="lg" onClick={saveEntry}>
            Add Entry
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
