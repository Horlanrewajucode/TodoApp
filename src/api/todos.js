import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

// Fetch all todos
export async function fetchTodos() {
  try {
    const { data } = await axios.get(API_URL);
    return data;
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    throw error; // rethrow to handle in UI or caller
  }
}

// Add a new todo
export async function addTodos(todo) {
  try {
    const { data } = await axios.post(API_URL, todo);
    return data;
  } catch (error) {
    console.error("Failed to add todo:", error);
    throw error;
  }
}

// Delete a todo by ID
export async function deleteTodos(id) {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (error) {
    console.error(`Failed to delete todo with ID ${id}:`, error);
    throw error;
  }
}
