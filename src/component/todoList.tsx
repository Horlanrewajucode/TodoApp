import { Props, Todo } from "../api/todos";
import TodoItem from "./todoItem";

export type TodoListProps = {
  todos: Todo[];
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
};

function TodoList({ todos, onDelete, onToggleComplete } : TodoListProps) {
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
