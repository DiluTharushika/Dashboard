import React from "react";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  //  Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>User Profile</h1>

      {/* Profile Card */}
      <div style={styles.card}>
        <FaUserCircle style={styles.icon} />

        <div style={styles.info}>
          <h2 style={styles.name}>{user.username}</h2>
          <p style={styles.caption}>Full Name</p>

          <h3 style={styles.value}>{user.email}</h3>
          <p style={styles.caption}>Email Address</p>

          <h3 style={styles.value}>{user.phone}</h3>
          <p style={styles.caption}>Phone Number</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: "50px",
    textAlign: "center",
  },
  title: {
    fontSize: "32px",
    color: "#1E3A8A",
    marginBottom: "30px",
  },
  card: {
    display: "inline-block",
    padding: "30px 50px",
    border: "1px solid #ddd",
    borderRadius: "15px",
    backgroundColor: "#ffffff",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    maxWidth: "400px",
    transition: "transform 0.2s",
  },
  icon: {
    fontSize: "90px",
    color: "#1E3A8A",
    marginBottom: "20px",
  },
  info: {
    marginTop: "10px",
  },
  name: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#111827",
    margin: "10px 0 5px",
  },
  value: {
    fontSize: "18px",
    fontWeight: "500",
    color: "#374151",
    margin: "8px 0 3px",
  },
  caption: {
    fontSize: "14px",
    color: "#6B7280",
    marginBottom: "15px",
  },
};

export default Profile;
