import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTodos, deleteTodos, fetchTodos } from "../api/todos";
import AddTodo from "../component/addTodo";
import TodoList from "../component/todoList";
import { useState } from "react";
import toast from "react-hot-toast";


function Todos() {
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const todosPerPage = 10;

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
      const newItem = { id: Date.now(),completed:false, ...newTodo };
      const updatedTodos = [newItem, ...(previousTodos || [])];
      toast.success("Todo added successfully!")
      queryClient.setQueryData(["todos"], updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setCurrentPage(1);
      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      toast.error("Failed to add todo.");
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
      toast.success("Todo deleted.");
      queryClient.setQueryData(["todos"], updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return { previousTodos };
    },
    onError: (err, id, context) => {
      toast.error("Failed to delete todo.");
      queryClient.setQueryData(["todos"], context.previousTodos);
      localStorage.setItem("todos", JSON.stringify(context.previousTodos));
    },
  });
  const toggleComplete = (id) => {
    const previousTodos = queryClient.getQueryData(["todos"]) || [];
    const updatedTodos = previousTodos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    queryClient.setQueryData(["todos"], updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    const updated = updatedTodos.find((todo) => todo.id === id);
    toast.success(
      `Marked as ${updated.completed ? "completed" : "incomplete"}`
    );
  };
  

  const handleAdd = (todo) => {
    if (!todo.title.trim()) return;
    addMutation.mutate(todo)
  };
  const handleDelete = (id) => deleteMutation.mutate(id);
  const isListEmpty = todos.length === 0;

  function handleClearAll() {
    queryClient.setQueryData(["todos"], []);
    localStorage.removeItem("todos");
    toast.success("All todos cleared.");
  }

  const filteredTodos = todos.filter((todo) => {
    const matchSearch = todo.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchStatus =
      filterStatus === "all"
        ? true
        : filterStatus === "completed"
        ? todo.completed
        : !todo.completed;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

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
        <aside className="flex flex-col gap-3">
          <input
            id="todo-input"
            type="text"
            className="input input-primary border-0 outline-0 border-b-2 mb-3"
            placeholder="Search Todos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-describedby="todo-help todo-char-count"
          />
          <div className=" flex gap-2 mb-4">
            <button
              className={`btn ${
                filterStatus === "all"
                  ? " bg-blue-900 text-[16px] text-white font-bold border-0 outline-0 hover:bg-blue-950 "
                  : ""
              }`}
              onClick={() => setFilterStatus("all")}
            >
              All
            </button>
            <button
              className={`btn ${
                filterStatus === "completed"
                  ? " bg-green-900 text-[16px] text-white font-bold border-0 outline-0 hover:bg-green-500 "
                  : ""
              }`}
              onClick={() => setFilterStatus("completed")}
            >
              Completed
            </button>
            <button
              className={`btn ${
                filterStatus === "incomplete"
                  ? " bg-red-900 text-[16px] text-white font-bold border-0 outline-0 hover:bg-red-500 "
                  : ""
              }`}
              onClick={() => setFilterStatus("incomplete")}
            >
              Incomplete
            </button>
          </div>
        </aside>

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
          <TodoList
            todos={currentTodos}
            onDelete={handleDelete}
            onToggleComplete={toggleComplete}
          />
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
