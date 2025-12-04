export default function AddingAndRemovingToFromArrays() {
  const todos = ["Buy milk", "Feed the pets"];

  todos.push("Walk the dogs"); // add item dynamically

  return (
    <div>
      <h2>Adding and Removing to/from Arrays</h2>
      <ol>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ol>
    </div>
  );
}
