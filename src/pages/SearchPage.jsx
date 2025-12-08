
// import React, { useState } from "react";
// import SearchBar from "../components/SearchBar";
// import EntriesList from "../components/EntriesList";
// import { searchEntriesApi } from "../api/entryApi";
// import { Container, Card } from "react-bootstrap";

// function SearchPage() {
//   const [entries, setEntries] = useState([]);

//   const search = async (query) => {
//     const res = await searchEntriesApi({ q: query });
//     setEntries(res.data);
//   };

//   return (
//     <Container className="mt-4">
//       <Card className="shadow p-4 mb-4">
//         <h2>🔍 Search Entries</h2>
//         <SearchBar onSearch={search} />
//       </Card>

//       <EntriesList entries={entries} />
//     </Container>
//   );
// }

// export default SearchPage;
import React, { useState } from "react";
import axios from "axios";

export default function SearchPage() {
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!text.trim()) return;

    const token = localStorage.getItem("token");

    const res = await axios.get(`http://localhost:5000/api/search?q=${text}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setResults(res.data.entries || []);
  };

  return (
    <div className="container mt-5">
      <h2>Search Your Journal Entries</h2>
      <input
        className="form-control"
        placeholder="Search tasks, notes, emotions..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className="btn btn-primary mt-3" onClick={handleSearch}>
        Search
      </button>

      <div className="mt-4">
        {results.map((item) => (
          <div key={item._id} className="card p-3 mb-2">
            <strong>{item.type}:</strong> {item.text}
            <br />
            <small>Status: {item.status}</small>
            <br />
            <small>Date: {item.pageId?.documentId}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
