function TodoItem({ todo, onDelete }) {
  return (
    <div>
      <span>{todo.title}</span>
      <IconButton aria-label="delete" onClick={() => onDelete(todo.id)}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
}

export default TodoItem;
