import React from "react";
import { Table, Badge } from "react-bootstrap";

function EntriesList({ entries }) {
  const statusColor = {
    pending: "secondary",
    completed: "success",
    in_progress: "warning",
    scheduled: "info",
    done: "success"
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Type</th>
          <th>Text</th>
          <th>Status</th>
          <th>Emotion</th>
        </tr>
      </thead>

      <tbody>
        {entries.map((e) => (
          <tr key={e._id}>
            <td>{e.type}</td>
            <td>{e.text}</td>
            <td>
              <Badge bg={statusColor[e.status] || "dark"}>
                {e.status}
              </Badge>
            </td>
            <td>{e.detectedEmotion || "-"}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default EntriesList;
