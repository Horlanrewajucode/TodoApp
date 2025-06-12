import { useState } from "react";

function TodoItem({ todo, onDelete }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  function handleCheckbox() {
    setIsChecked((prev) => !prev);
  }
  function handleDoubleClick() {
    setIsEditing(true);
  }

  function handleSave() {
    setIsEditing(false);
  }
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2 p-5">
        <input
          type="checkbox"
          className="checkbox checkbox-primary"
          checked={isChecked}
          onChange={handleCheckbox}
        />
        <div>
          {isEditing ? (
            <>
              <input
                type="text"
                className="input input-primary"
                placeholder="Add new Todo"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSave}
              >
                Update Todo
              </button>
            </>
          ) : (
            <span
              className={` ${
                isChecked ? "text-red-600" : "text-black"
              } cursor-pointer`}
              onDoubleClick={handleDoubleClick}
            >
              {editedTitle}
            </span>
          )}
        </div>
      </div>
      <button
        className="btn btn-outline mt-4 border-red-600 text-red-600 hover:bg-red-600 hover:text-white border-2 font-serif"
        onClick={() => onDelete(todo.id)}
      >
        Delete Todo
      </button>
    </div>
  );
}

export default TodoItem;
