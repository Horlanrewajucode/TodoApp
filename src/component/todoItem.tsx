import { useState } from "react";
import {  Todo } from "../api/todos";

export type TodoItemProps = {
  // todos: Todo[];
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
  todo: Todo;
};

function TodoItem({ todo, onDelete, onToggleComplete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  function handleDoubleClick() {
    setIsEditing(true);
  }

  function handleSave() {
    setIsEditing(false);
  }

  return (
    <li className="flex items-center justify-between gap-5 p-4 border-b border-gray-200">
      <div className="flex items-start gap-2 flex-1">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox checkbox-primary transition-transform duration-300 hover:scale-105"
            checked={todo.completed}
            onChange={() => onToggleComplete(todo.id)}
            disabled={isEditing}
            aria-label={`Mark todo '${editedTitle}' as ${
              todo.completed ? "incomplete" : "complete"
            }`}
          />
          <span className="sr-only">Toggle completion</span>
        </label>

        <div>
          {isEditing ? (
            <>
              <label htmlFor={`edit-${todo.id}`} className="sr-only">
                Edit todo title
              </label>
              <input
                id={`edit-${todo.id}`}
                type="text"
                className="input input-primary mb-2"
                placeholder="Edit Todo"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                aria-label="Edit todo title"
              />
              <button
                type="button"
                onClick={handleSave}
                className="btn btn-primary text-white bg-blue-900 hover:bg-blue-950"
                aria-label="Save edited todo"
              >
                Update Todo
              </button>
            </>
          ) : (
            <span
              className={`font-medium ${
                todo.completed
                  ? "text-red-600 transition-all duration-500 ease-in-out"
                  : "text-black"
              } cursor-pointer`}
              onDoubleClick={handleDoubleClick}
              tabIndex={0}
              aria-label={`Todo: ${editedTitle}. Double-click to edit.`}
            >
              {editedTitle}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="btn btn-outline mt-4 border-red-600 text-red-600 hover:bg-red-600 hover:text-white border-2 font-serif px-2"
        aria-label={`Delete todo: ${editedTitle}`}
        disabled={isEditing}
      >
        Delete Todo
      </button>
    </li>
  );
}

export default TodoItem;
