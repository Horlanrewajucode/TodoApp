import TodoItem from "./todoItem";

function TodoList({ todos, onDelete }) {
  
  return (
    <div className="border-1 p-5 rounded-2xl">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default TodoList
