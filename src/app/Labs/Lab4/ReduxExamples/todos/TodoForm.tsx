"use client";
import { ListGroupItem, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();

  return (
    <ListGroupItem
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        border: "none",
        paddingBottom: "15px",
      }}
    >
      <FormControl
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
        placeholder="Enter todo..."
        style={{
          flex: 1,
          borderRadius: "6px",
        }}
      />

      <Button
        variant="warning"
        id="wd-update-todo-click"
        style={{
          fontWeight: "600",
          color: "black",
          minWidth: "80px",
        }}
        onClick={() => dispatch(updateTodo(todo))}
      >
        Update
      </Button>

      <Button
        variant="success"
        id="wd-add-todo-click"
        style={{
          fontWeight: "600",
          minWidth: "70px",
        }}
        onClick={() => dispatch(addTodo(todo))}
      >
        Add
      </Button>
    </ListGroupItem>
  );
}
