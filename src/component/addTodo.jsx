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
    <div className="flex flex-row">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input input-primary rounded-tl-2xl rounded-bl-2xl border-0 outline-0 border-b-2 border-l-2 placeholder:italic"
          placeholder="Add new Todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>
      <button
        type="submit"
        className="btn bg-blue-900 rounded-tr-2xl rounded-br-2xl text-[18px] text-white font-bold border-0 outline-0"
      >
        Add
      </button>
    </div>
  );
}

export default AddTodo;
