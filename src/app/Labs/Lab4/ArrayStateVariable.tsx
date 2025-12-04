"use client";
import { useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function ArrayStateVariable() {
  const { todos } = useSelector((state: any) => state.todosReducer);
  const [array, setArray] = useState([1, 2, 3, 4, 5]);

  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };

  const deleteElement = (index: number) => {
    setArray(array.filter((item, i) => i !== index));
  };

  return (
    <div
      id="wd-array-state-variables"
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        width: "250px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h4
        style={{
          fontWeight: "700",
          fontSize: "1.2rem",
          marginBottom: "12px",
        }}
      >
        Array State Variable
      </h4>

      {/* Add Button */}
      <button
        onClick={addElement}
        style={{
          backgroundColor: "#2e7d32",
          color: "white",
          border: "none",
          borderRadius: "6px",
          padding: "6px 12px",
          fontWeight: "600",
          marginBottom: "12px",
          cursor: "pointer",
        }}
      >
        Add Element
      </button>

      {/* List */}
      <div>
        {array.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid #ddd",
              borderRadius: "6px",
              padding: "6px 10px",
              marginBottom: "8px",
            }}
          >
            <span>{item}</span>
            <button
              onClick={() => deleteElement(index)}
              style={{
                backgroundColor: "#c62828",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "4px 10px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <hr />

      {/* Redux Todo List */}
      <ListGroup>
        {todos.map((todo: any) => (
          <ListGroupItem key={todo.id}>{todo.title}</ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
