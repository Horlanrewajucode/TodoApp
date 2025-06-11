import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTodos, deleteTodos, fetchTodos } from "../api/todos";
import AddTodo from "../component/addTodo";
import TodoList from "../component/todoList";

function Todos() {
  const queryClient = useQueryClient();

  function handleClearAll() {
    queryClient.setQueryData(["todos"], []);
  };

  const {
    data: todos = [],
    isLoading,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const addMutation = useMutation({
    mutationFn: addTodos,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData(["todos"]);

      queryClient.setQueryData(["todos"], (old = []) => [
        ...old,
        { id: Date.now(), ...newTodo }, 
      ]);

      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["todos"], context.previousTodos);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodos,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      const previousTodos = queryClient.getQueryData(['todos']);

      queryClient.setQueryData(['todos'], (old = []) =>
        old.filter((todo) => todo.id !== id)
      );

      return { previousTodos };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(['todos'], context.previousTodos);
    },
  });
  const handleAdd = (todo) => addMutation.mutate(todo);
  const handleDelete = (id) => deleteMutation.mutate(id);

  const isListEmpty = todos.length === 0;
  return (
    <div className="flex flex-col items-center justify-center mt-15">
      <h2>Todo List</h2>
      <AddTodo onAdd={handleAdd} />
      {isLoading ? (
        <div className="flex w-52 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      ) : (
        <TodoList todos={todos} onDelete={handleDelete} />
      )}
      <button
        className="btn btn-primary"
        onClick={handleClearAll}
        disabled={isListEmpty}
      >
        Clear All Todos
      </button>
    </div>
  );
}

export default Todos;
