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
    <main
      role="main"
      className="flex flex-col items-center justify-center mt-15 gap-5"
      aria-label="Todo list application"
    >
      <header>
        <h2 className="text-[60px] font-bold italic text-blue-900 font-serif">
          Todo List
        </h2>
      </header>

      <AddTodo onAdd={handleAdd} />

      <section
        aria-labelledby="todo-section-heading"
        aria-busy={isLoading}
        className="w-full flex flex-col items-center"
      >
        <h3 id="todo-section-heading" className="sr-only">
          List of todos
        </h3>

        {isLoading ? (
          <div
            className="flex w-52 flex-col gap-4"
            role="status"
            aria-live="polite"
          >
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        ) : (
          <TodoList todos={currentTodos} onDelete={handleDelete} />
        )}
      </section>

      <nav
        className="flex items-center justify-center gap-3"
        aria-label="Pagination Navigation"
      >
        <button
          className="btn bg-blue-900 text-white rounded-2xl hover:bg-blue-950"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
          aria-disabled={currentPage === 1}
          aria-label="Previous page"
        >
          Prev
        </button>
        <span aria-live="polite">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn bg-blue-900 text-white rounded-2xl hover:bg-blue-950"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages || todos.length === 0}
          aria-disabled={currentPage === totalPages || todos.length === 0}
          aria-label="Next page"
        >
          Next
        </button>
      </nav>

      <button
        className="btn bg-blue-900 mb-8 text-white rounded-2xl hover:bg-blue-950"
        onClick={handleClearAll}
        disabled={isListEmpty}
        aria-disabled={isListEmpty}
        aria-label="Clear all todos"
      >
        Clear All Todos
      </button>
    </main>
  );
}

export default Todos;
