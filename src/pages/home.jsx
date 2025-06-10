import { Link } from "react-router-dom"
function Home() {
    return <div>
        <h1>Welcome to your TodoApp</h1>
        <Link to="/todos">
            View Todos
        </Link>
    </div>
}

export default Home