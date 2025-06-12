import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTodos, deleteTodos, fetchTodos } from "../api/todos";
import AddTodo from "../component/addTodo";
import TodoList from "../component/todoList";
import { useState } from "react";

function Todos() {
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);

  const todosPerPage = 10;

  function handleClearAll() {
    queryClient.setQueryData(["todos"], []);
    localStorage.removeItem("todos");
  }

  const { data: todos = [], isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const stored = localStorage.getItem("todos");
      if (stored) {
        return JSON.parse(stored);
      }
      const data = await fetchTodos();
      localStorage.setItem("todos", JSON.stringify(data));
      return data;
    },
  });

  const addMutation = useMutation({
    mutationFn: addTodos,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData(["todos"]);
      const newItem = { id: Date.now(), ...newTodo };

      const updatedTodos = [newItem, ...(previousTodos || [])];

      queryClient.setQueryData(["todos"], (old = []) => [
        { id: Date.now(), ...newTodo },
        ...old,
      ]);
      queryClient.setQueryData(["todos"], updatedTodos);

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setCurrentPage(1);

      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["todos"], context.previousTodos);
      localStorage.setItem("todos", JSON.stringify(context.previousTodos));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodos,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData(["todos"]);
      const updatedTodos = (previousTodos || []).filter(
        (todo) => todo.id !== id
      );

      queryClient.setQueryData(["todos"], updatedTodos);

      queryClient.setQueryData(["todos"], (old = []) =>
        old.filter((todo) => todo.id !== id)
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      return { previousTodos };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["todos"], context.previousTodos);
      localStorage.setItem("todos", JSON.stringify(context.previousTodos));
    },
  });
  const handleAdd = (todo) => addMutation.mutate(todo);
  const handleDelete = (id) => deleteMutation.mutate(id);

  const isListEmpty = todos.length === 0;

  const totalPages = Math.ceil(todos.length / todosPerPage);
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
  return (
    <div className="flex flex-col items-center justify-center mt-15 gap-5">
      <h2 className="text-[60px] font-bold italic  font-serif">Todo List</h2>
      <AddTodo onAdd={handleAdd} />
      {isLoading ? (
        <div className="flex w-52 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      ) : (
        <TodoList todos={currentTodos} onDelete={handleDelete} />
      )}
      <div className="flex items-center justify-center gap-3">
        <button
          className="btn btn-primary"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-primary"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages || todos.length === 0}
        >
          Next
        </button>
      </div>
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
