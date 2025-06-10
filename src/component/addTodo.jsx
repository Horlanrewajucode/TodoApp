import { useState } from "react";

function AddTodo({onAdd}) {
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
      e.preventDefault();
      if (title.trim()) {
          onAdd({ title, completed: false })
          setTitle("")
      }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add new Todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    </>
  );
}

export default AddTodo;
