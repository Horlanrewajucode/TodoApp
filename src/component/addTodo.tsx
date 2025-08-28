import { FormEvent, useState } from "react";
import { Props, Todo } from "../api/todos";

const MAX_CHAR = 20;

function AddTodo({ onAdd }: Props ) {
  const [title, setTitle] = useState("");
  const [charLeft, setCharLeft] = useState(MAX_CHAR);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setTitle(value);
    setCharLeft(MAX_CHAR - value.length);

    if (value.length > MAX_CHAR) {
      setError(`Todo cannot exceed ${MAX_CHAR} characters`);
    } else {
      setError("");
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) return;
    if (title.length > MAX_CHAR) return;

    onAdd({ title, completed: false } as unknown as Todo);
    setTitle("");
    setCharLeft(MAX_CHAR);
    setError("");
  }

  return (
    <section aria-label="Add Todo Form" className="w-full max-w-xl">
      <form
        onSubmit={handleSubmit}
        className="flex flex-row items-center justify-center"
      >
        <div className="flex-grow">
          <label htmlFor="todo-input" className="sr-only">
            New Todo
          </label>
          <input
            id="todo-input"
            type="text"
            className="input input-primary w-full rounded-tl-2xl rounded-bl-2xl border-0 outline-0 border-b-2 border-l-2 placeholder:italic"
            placeholder="Add new Todo"
            value={title}
            onChange={handleChange}
            aria-describedby="todo-help todo-char-count"
            aria-invalid={!!error}
          />
          <div id="todo-help" className="sr-only">
            Maximum 100 characters. Press Add to save.
          </div>

          {error && (
            <div
              className="text-red-600 text-sm mt-1hidden "
              role="alert"
              aria-live="assertive"
            >
              {error}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="btn bg-blue-900 rounded-tr-2xl rounded-br-2xl text-[18px] text-white font-bold border-0 outline-0 hover:bg-blue-950 "
          disabled={!!error}
        >
          Add
        </button>
      </form>
      <div
        id="todo-char-count"
        aria-live="polite"
        className="text-sm text-gray-500 mt-1"
      >
        {charLeft} characters left
      </div>
    </section>
  );
}

export default AddTodo;
