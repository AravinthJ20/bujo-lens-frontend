import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Badge,
  Modal,
} from "react-bootstrap";
const Base_URL = process.env.REACT_APP_API_BASE_URL;

export default function EntriesPage() {
  const [entries, setEntries] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
const [editData, setEditData] = useState({
  _id: "",
  text: "",
  type: "",
  status: "",
  time: "",
  symbol: ""
});

  const [filters, setFilters] = useState({
    type: "",
    status: "",
    q: "",
    date: "",
  });

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const openModal = (entry) => {
    setSelectedEntry(entry);
    setShowModal(true);
  };

  const openEditModal = (entry) => {
  setEditData({ ...entry });
  setShowEditModal(true);
};
const deleteEntry = async (entry) => {
  if (!window.confirm("Delete this entry?")) return;

  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${Base_URL}/api/entries/${entry._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    loadEntries(); // Refresh
  } catch (err) {
    console.error("DELETE ERROR:", err);
    alert("Failed to delete");
  }
};
const saveEntryChanges = async () => {
  try {
    const token = localStorage.getItem("token");

    await axios.put(
      `${Base_URL}/api/entries/${editData._id}`,
      editData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setShowEditModal(false);
    loadEntries(); // refresh
  } catch (err) {
    console.error("EDIT ERROR:", err);
    alert("Failed to update entry");
  }
};

  const closeModal = () => {
    setShowModal(false);
    setSelectedEntry(null);
  };

  const loadEntries = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${Base_URL}/api/entries`, {
        headers: { Authorization: `Bearer ${token}` },
        params: filters,
      });

      setEntries(res.data || []);
    } catch (err) {
      console.error("LOAD ENTRIES ERROR:", err);
      setEntries([]);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const extractTime = (text) => {
    try {
        const match = text.match(/\b\d{1,2}[:.]\d{2}\b/);
    return match ? match[0] : "--";
    } catch (error) {
      return "0:00"
    }
  
  };

  // 🔥 DOWNLOAD FUNCTION WITH AUTH HEADER
  const downloadFile = async (url, filename) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(url, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${token}` },
      });

      const blob = new Blob([response.data]);
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    } catch (err) {
      console.error("EXPORT ERROR:", err);
      alert("Failed to export file. Check backend logs.");
    }
  };

  // Export filtered
  const exportFiltered = () => {
    const query = new URLSearchParams(filters).toString();
    downloadFile(
      `${Base_URL}/api/export/filtered?${query}`,
      "filtered-entries.txt"
    );
  };

  return (
    <div style={{ backgroundColor: "#f5f6fa", minHeight: "100vh" }}>
      <Container fluid className="py-4">
        
        {/* PAGE TITLE + EXPORT BUTTONS */}
        <Row className="mb-4">
          <Col>
            <h2 className="fw-bold">📋 Journal Entries</h2>
            <p className="text-muted">
              Organized list of your tasks & notes extracted from scanned pages
            </p>
          </Col>

          <Col className="text-end d-flex align-items-center justify-content-end gap-2">

            {/* Export TaskPaper */}
            <Button
              variant="outline-primary"
              onClick={() =>
                downloadFile(
                  `${Base_URL}/api/export/taskpaper`,
                  "bujo.taskpaper"
                )
              }
            >
              📄 Export TaskPaper
            </Button>

            {/* Export Markdown */}
            <Button
              variant="outline-success"
              onClick={() =>
                downloadFile(
                  `${Base_URL}/api/export/markdown`,
                  "notes.md"
                )
              }
            >
              📝 Export Markdown
            </Button>
            <Button variant="outline-primary" 
        onClick={() => downloadFile(`${Base_URL}/api/export/tasks`, "tasks.taskpaper")}>
  📄 Export Tasks
</Button>

<Button variant="outline-success" 
        onClick={() => downloadFile(`${Base_URL}/api/export/notes`, "notes.md")}>
  📝 Export Notes
</Button>


            {/* Export Filtered */}
            {/* <Button variant="outline-dark" onClick={exportFiltered}>
              🎯 Export Filtered
            </Button> */}
          </Col>
        </Row>

        {/* FILTER PANEL */}
        <Card className="shadow-sm border-0 mb-4">
          <Card.Body>
            <Row className="g-3">
              <Col md={3}>
                <Form.Control
                  placeholder="Search..."
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, q: e.target.value }))
                  }
                />
              </Col>

              <Col md={2}>
                <Form.Select
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, type: e.target.value }))
                  }
                >
                  <option value="">All Types</option>
                  <option value="task">Task</option>
                  <option value="note">Note</option>
                </Form.Select>
              </Col>

              <Col md={2}>
                <Form.Select
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, status: e.target.value }))
                  }
                >
                  <option value="">All Status</option>
                  <option value="Completed">Completed</option>
                  <option value="Event Completed">Pending</option>
                  <option value="In-Progress">In Progress</option>
                  <option value="Scheduled">Scheduled</option>
                </Form.Select>
              </Col>

              <Col md={3}>
                <Form.Control
                  type="date"
                  onChange={(e) => {
                    if (!e.target.value) return;
                    const [y, m, d] = e.target.value.split("-");
                    setFilters((prev) => ({ ...prev, date: `${d}-${m}-${y}` }));
                  }}
                />
              </Col>

              <Col md={2}>
                <Button className="w-100" onClick={loadEntries} variant="primary">
                  Apply Filters
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* ENTRY CARDS GRID */}
        <Row className="g-4">
          {entries.length === 0 ? (
            <Col className="text-center text-muted py-5">
              <i className="bi bi-inbox fs-2 d-block mb-2"></i>No entries found
            </Col>
          ) : (
            entries.map((e) => {
              const bg =
                e.type === "task"
                  ? e.status === "completed"
                    ? "rgba(25,135,84,0.15)"
                    : e.status === "pending"
                    ? "rgba(108,117,125,0.15)"
                    : e.status === "in-progress"
                    ? "rgba(255,193,7,0.15)"
                    : "rgba(13,202,240,0.15)"
                  : "rgba(0,123,255,0.12)";

              return (
                <Col md={4} key={e._id}>
                  <Card
                    className="shadow-sm border-0"
                    style={{
                      borderRadius: "16px",
                      backgroundColor: bg,
                    }}
                  >
                    <Card.Body>
                      {/* <div className="d-flex justify-content-between mb-2">
                        <h5 className="fw-bold">
                          {e.type === "task" ? "📝 Task" : "📌 Note"}
                        </h5>

                        <Button
                          size="sm"
                          variant="light"
                          onClick={() => openModal(e)}
                        >
                          <i className="bi bi-eye"></i>
                        </Button>
                        <div className="dropdown">
  <button
    className="btn btn-light btn-sm"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <i className="bi bi-three-dots-vertical"></i>
  </button>

  <ul className="dropdown-menu dropdown-menu-end">
    <li>
      <button className="dropdown-item" onClick={() => openModal(e)}>
        👁 View
      </button>
    </li>
    <li>
      <button className="dropdown-item" onClick={() => openEditModal(e)}>
        ✏ Edit
      </button>
    </li>
    <li>
      <button className="dropdown-item text-danger" onClick={() => deleteEntry(e)}>
        🗑 Delete
      </button>
    </li>
  </ul>
</div>

                      </div> */}
<div className="d-flex justify-content-between mb-2">
  <h5 className="fw-bold">
    {/* {e.type === "task" ? "📝 Task" : "📌 Note"} */}
    {
  e.type === "task"
    ? "📝 Task"
    : e.type === "note"
    ? "📌 Note"
    : e.type === "event"
    ? "📅 Event"
    : "🔖 Entry"
}

  </h5>

  <div className="dropdown">
    <button
      className="btn btn-light btn-sm"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i className="bi bi-three-dots-vertical"></i>
    </button>

    <ul className="dropdown-menu dropdown-menu-end">
      <li>
        <button className="dropdown-item" onClick={() => openModal(e)}>
          👁 View
        </button>
      </li>
      <li>
        <button className="dropdown-item" onClick={() => openEditModal(e)}>
          ✏ Edit
        </button>
      </li>
      <li>
        <button className="dropdown-item text-danger" onClick={() => deleteEntry(e)}>
          🗑 Delete
        </button>
      </li>
    </ul>
  </div>
</div>

                      <p>{e.text}</p>

                      <div className="d-flex justify-content-between mt-3">
                        <span className="text-muted">
                          Symbol: <strong>{e.symbol || "--"}</strong>
                        </span>

                        <span className="text-muted">
                          Time: <strong>{extractTime(e?.time)}</strong>
                        </span>

                        {e.type === "task" ? (
                          <Badge
                            bg={
                              e.status === "Completed"
                                ? "success"
                               
                                  : e.status === "pending"
                                ? "secondary"
                                 : e.status === "Scheduled"
                                ? "info"
                                : e.status === "In-Progress"
                                ? "warning"
                                : "info"
                            }
                          >
                            {e.status}
                          </Badge>
                        ) : (
                          <Badge bg="light" text="dark">
                           {e.status}
                          </Badge>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          )}
        </Row>
      </Container>

      {/* DETAILS MODAL */}
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Entry Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedEntry && (
            <>
              <p><strong>Type:</strong> {selectedEntry.type}</p>
              <p><strong>Symbol:</strong> {selectedEntry.symbol || "--"}</p>
              <p><strong>Content:</strong> {selectedEntry.text}</p>
              <p>
                <strong>Date:</strong>{" "}
                {/* {selectedEntry.pageId?.date
                  ? new Date(selectedEntry.pageId.date).toLocaleDateString()
                  : "--"} */}
                   {selectedEntry.createdAt}
              </p>
              <p><strong>Time:</strong> {extractTime(selectedEntry.time)}</p>

              <p>
                <strong>Status:</strong>{" "}
                {selectedEntry.type === "task" ? (
                  <Badge bg="info">{selectedEntry.status}</Badge>
                ) : (
                  "N/A"
                )}
              </p>

              {/* <p><strong>Line Index:</strong> {selectedEntry.lineIndex}</p> */}
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Edit Entry</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    <Form>

      <Form.Group className="mb-3">
        <Form.Label>Text</Form.Label>
        <Form.Control
          value={editData.text}
          onChange={(e) => setEditData({ ...editData, text: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Time</Form.Label>
        <Form.Control
          value={editData.time}
          onChange={(e) => setEditData({ ...editData, time: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Symbol</Form.Label>
        <Form.Select
          value={editData.symbol}
          onChange={(e) => setEditData({ ...editData, symbol: e.target.value })}
        >
          <option value="">None</option>
          <option value="X">X (Completed)</option>
          <option value="/">/ (In Progress)</option>
          <option value="•">• (Pending)</option>
          <option value="O">O (Scheduled Event)</option>
          <option value="●">● (Event Completed)</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Type</Form.Label>
        <Form.Select
          value={editData.type}
          onChange={(e) => setEditData({ ...editData, type: e.target.value })}
        >
          <option value="task">Task</option>
          <option value="note">Note</option>
          <option value="event">Event</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Status</Form.Label>
        <Form.Select
          value={editData.status}
          onChange={(e) => setEditData({ ...editData, status: e.target.value })}
        >
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="Scheduled">Scheduled</option>
        </Form.Select>
      </Form.Group>

    </Form>
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
      Cancel
    </Button>
    <Button variant="primary" onClick={saveEntryChanges}>
      Save Changes
    </Button>
  </Modal.Footer>
</Modal>

    </div>
  );
}
