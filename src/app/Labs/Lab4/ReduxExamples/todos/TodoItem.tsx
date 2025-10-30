"use client";
import { ListGroupItem, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({
  todo,
}: {
  todo: { id: string; title: string };
}) {
  const dispatch = useDispatch();

  return (
    <ListGroupItem
      key={todo.id}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid #ddd",
        borderRadius: "6px",
        marginBottom: "8px",
        padding: "8px 12px",
      }}
    >
      <span>{todo.title}</span>

      <div style={{ display: "flex", gap: "8px" }}>
        <Button
          variant="primary"
          id="wd-set-todo-click"
          style={{
            fontWeight: "600",
            minWidth: "60px",
          }}
          onClick={() => dispatch(setTodo(todo))}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          id="wd-delete-todo-click"
          style={{
            fontWeight: "600",
            minWidth: "80px",
          }}
          onClick={() => dispatch(deleteTodo(todo.id))}
        >
          Delete
        </Button>
      </div>
    </ListGroupItem>
  );
}
