import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export async function fetchTodos() {
  const { data } = await axios.get(API_URL);
  return data;
}

export async function addTodos(todo) {
  const { data } = await axios.post(API_URL, todo);
  return data;
}

export async function deleteTodos(id) {
  await axios.delete(`${API_URL}/${id}`);
  return id;
}
