import React, { useState, useEffect } from "react";

function App() {
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem("leads");
    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("leads", JSON.stringify(leads));
  }, [leads]);

  const addLead = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const status = e.target.status.value;

    if (!name || !email) return;

    setLeads([...leads, { name, email, status }]);

    e.target.reset();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Mini CRM</h1>

      {/* 🔍 SEARCH */}
      <input
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      />

      {/* ➕ FORM */}
      <form onSubmit={addLead}>
        <input name="name" placeholder="Enter Name" />
        <input name="email" placeholder="Enter Email" />

        <select name="status">
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="converted">Converted</option>
        </select>

        <button type="submit">Add Lead</button>
      </form>

      <h2>Leads List:</h2>

      <ul>
        {leads
          .filter((lead) =>
            (lead.name || "")
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .map((lead, index) => (
            <li key={index}>
              {lead.name} - {lead.email} - {lead.status}

              {/* ✏️ EDIT */}
              <button
                onClick={() => {
                  const newName = prompt("Enter new name", lead.name);
                  const newEmail = prompt("Enter new email", lead.email);

                  if (!newName || !newEmail) return;

                  const updated = [...leads];
                  updated[index] = {
                    ...updated[index],
                    name: newName,
                    email: newEmail,
                  };

                  setLeads(updated);
                }}
              >
                Edit
              </button>

              {/* ❌ DELETE */}
              <button
                onClick={() => {
                  const updated = leads.filter((_, i) => i !== index);
                  setLeads(updated);
                }}
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;