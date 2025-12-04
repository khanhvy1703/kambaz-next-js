"use client";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(7);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        marginTop: "20px",
      }}
    >
      <h2 style={{ fontSize: "1.8rem", fontWeight: "600", marginBottom: "15px" }}>
        Counter: {count}
      </h2>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          id="wd-counter-up-click"
          onClick={() => setCount(count + 1)}
          style={{
            backgroundColor: "#2e7d32",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "8px 18px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Up
        </button>

        <button
          id="wd-counter-down-click"
          onClick={() => setCount(count - 1)}
          style={{
            backgroundColor: "#c62828",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "8px 18px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Down
        </button>
      </div>
    </div>
  );
}
