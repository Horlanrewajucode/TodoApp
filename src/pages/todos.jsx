import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTodos, deleteTodos, fetchTodos } from "../api/todos";
import AddTodo from "../component/addTodo";
import TodoList from "../component/todoList";

function Todos() {
  const queryClient = useQueryClient();

  const {
    data: todos = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const addMutation = useMutation({
    mutationFn: addTodos,
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
    onError: (error) => {
      console.log("Error adding todo", error)
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodos,
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
    onError: (error) => {
      console.log("Error deleting todos", error)
    }
  });
  const handleAdd = (todo) => addMutation.mutate(todo);
  const handleDelete = (id) => deleteMutation.mutate(id);
  return (
    <div>
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
    </div>
  );
}

export default Todos;
