"use client";
import { ListGroup } from "react-bootstrap";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";

export default function TodoList() {
  const { todos } = useSelector((state: any) => state.todosReducer);

  return (
    <div
      id="wd-todo-list-redux"
      style={{
        width: "360px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h4 style={{ fontWeight: "700", marginBottom: "15px" }}>Todo List</h4>

      <ListGroup>
        <TodoForm />
        {todos.map((todo: any, index: number) => (
          <TodoItem key={index} todo={todo} />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
