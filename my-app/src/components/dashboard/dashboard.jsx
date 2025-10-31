import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_URL = "https://localhost:5001"; //  change to your backend URL if different

const Dashboard = () => {
  const [materials, setMaterials] = useState([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [batch, setBatch] = useState("");
  const[date,setDate]=useState("");
  const [editingId, setEditingId] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

 /* const navigate = useNavigate();

  //  get token & user from localStorage
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  //  fetch all materials on mount
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchMaterials();
  }, [token, navigate]);

  const fetchMaterials = async () => {
    try {
      const response = await fetch(`${API_URL}/materials`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setMaterials(data);
      } else {
        console.error("Failed to fetch materials");
      }
    } catch (err) {
      console.error("Error fetching materials:", err);
    }
  };

  const addOrUpdateMaterial = async () => {
    if (!name || !code || !batch) {
      alert("Please fill all fields before adding.");
      return;
    }

    try {
      if (editingId) {
        //  Update existing material
        const response = await fetch(`${API_URL}/materials/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, code, batch }),
        });

        if (response.ok) {
          alert("Material updated!");
          fetchMaterials();
          setEditingId(null);
        } else {
          alert("Failed to update material");
        }
      } else {
        //  Add new material
        const response = await fetch(`${API_URL}/materials`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, code, batch }),
        });

        if (response.ok) {
          alert("Material added!");
          fetchMaterials();
        } else {
          alert("Failed to add material");
        }
      }

      // reset form
      setName("");
      setCode("");
      setBatch("");
    } catch (err) {
      console.error("Error saving material:", err);
    }
  };

  const handleEdit = (id) => {
    const mat = materials.find((m) => m.id === id);
    if (mat) {
      setName(mat.name);
      setCode(mat.code);
      setBatch(mat.batch);
      setEditingId(id);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/materials/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        alert("Material deleted!");
        fetchMaterials();
      } else {
        alert("Failed to delete material");
      }
    } catch (err) {
      console.error("Error deleting material:", err);
    }
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
*/
const navigate = useNavigate();

  // fake user (optional: remove if you don’t need)
  const user = {
    username: "Demo User",
    email: "test@gmail.com",
    phone: "000-000-0000",
  };

  const addOrUpdateMaterial = () => {
    if (!name || !code || !batch ||!date ) {
      alert("Please fill all fields before adding.");
      return;
    }

    if (editingId) {
      setMaterials((prev) =>
        prev.map((m) =>
          m.id === editingId ? { ...m, name, code, batch,date } : m
        )
      );
      setEditingId(null);
     
    } else {
      setMaterials((prev) => [
        ...prev,
        { id: Date.now(), name, code, batch ,date },
      ]);
     
    }

    setName("");
    setCode("");
    setBatch("");
    setDate("");
  };

  const handleEdit = (id) => {
    const mat = materials.find((m) => m.id === id);
    if (mat) {
      setName(mat.name);
      setCode(mat.code);
      setBatch(mat.batch);
      setDate(mat.date);
      setEditingId(id);
    }
  };

  const handleDelete = (id) => {
    setMaterials((prev) => prev.filter((m) => m.id !== id));
    alert("Material deleted!");
  };

  const onLogout = () => {
    navigate("/login");
  };

  return (
    <div>
      {/* Navbar */}
      <div style={styles.navbar}>
        <div style={styles.logoContainer}>
          <span style={styles.logoText}>LOGO</span>
        </div>
        <div style={styles.navRight}>
          <FaUserCircle
            style={styles.profileIcon}
            onClick={() => setShowProfile(true)}
          />
          <button style={styles.logoutButton} onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      <h1 style={{ textAlign: "center", marginTop: "20px", color: "#1E3A8A" }}>
        Welcome to the Dashboard
      </h1>

      <div style={styles.contentContainer}>
        {/* Form */}
        <div style={styles.formContainer}>
          <h2 style={{ color: "#1E3A8A" }}>
            {editingId ? "Edit Material" : "Add Material"}
          </h2>
          <input
            type="text"
            placeholder="Material Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Batch"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            style={styles.input}
          />
          <input
            type="date"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={styles.input}
          />
          <button onClick={addOrUpdateMaterial} style={styles.button}>
            {editingId ? "Update Material" : "Add Material"}
          </button>
        </div>

        {/* Table */}
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Material Name</th>
                <th style={styles.th}>Code</th>
                <th style={styles.th}>Batch</th>
                <th style={styles.th}>Exp Date</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((mat) => (
                <tr key={mat.id}>
                  <td style={styles.td}>{mat.name}</td>
                  <td style={styles.td}>{mat.code}</td>
                  <td style={styles.td}>{mat.batch}</td>
                  <td style={styles.td}>{mat.date}</td>
                  <td style={{ ...styles.td, ...styles.actionTd }}>
                    <button
                      onClick={() => handleEdit(mat.id)}
                      style={styles.editButton}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(mat.id)}
                      style={styles.deleteButton}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Profile Modal */}
      {showProfile && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <FaUserCircle style={styles.modalIcon} />
            <h2 style={styles.modalTitle}>{user.username}</h2>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <button
              style={styles.closeButton}
              onClick={() => setShowProfile(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
const styles = {
  navbar: {
    width: "100%",
    height: "60px",
    backgroundColor: "#1E3A8A",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  logoContainer: { display: "flex", alignItems: "center" },
  logoText: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "white",
    letterSpacing: "1px",
  },
  navRight: { display: "flex", alignItems: "center", gap: "15px" },
  profileIcon: {
    fontSize: "32px",
    color: "white",
    cursor: "pointer",
  },
  logoutButton: {
    padding: "6px 12px",
    backgroundColor: "#F97316",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "500",
  },
  contentContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    margin: "20px",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "250px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "white",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.05)",
  },
  tableContainer: { flex: 1, marginLeft: "20px", marginRight: "20px" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    border: "1px solid #ddd",
    padding: "10px",
    backgroundColor: "#E5E7EB",
    textAlign: "center",
    color: "#111827",
  },
  td: { border: "1px solid #ddd", padding: "10px", textAlign: "center" },
  input: {
    margin: "8px 0",
    padding: "8px",
    width: "100%",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#2563EB",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
    fontWeight: "500",
  },
  actionTd: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
  },
  editButton: {
    padding: "6px",
    backgroundColor: "#0284C7",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "6px",
    backgroundColor: "#DC2626",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  // Modal Styles
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    width: "350px",
    textAlign: "center",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
  },
  modalIcon: {
    fontSize: "70px",
    color: "#1E3A8A",
    marginBottom: "15px",
  },
  modalTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  closeButton: {
    marginTop: "20px",
    padding: "8px 16px",
    backgroundColor: "#2563EB",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "500",
  },
};

export default Dashboard;
