import TodoItem from "./todoItem";

function TodoList({ todos, onDelete, onToggleComplete }) {
  return (
    <section
      aria-label="List of todos"
      className="border p-5 rounded-2xl max-w-3xl mx-auto"
    >
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </ul>
    </section>
  );
}

export default TodoList;
