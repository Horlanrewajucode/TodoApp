import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1>📚TODOIST</h1>
      <Link to="/todos">View Todos</Link>
    </div>
  );
}

export default Home;
