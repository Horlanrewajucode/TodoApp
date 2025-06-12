import { Link } from "react-router-dom";
import "../App.css";

function NotFound() {
  return (
    <main
      role="main"
      className="flex flex-col items-center justify-center h-screen gap-8"
    >
      <section aria-labelledby="not-found-heading" className="text-center">
        <h1
          id="not-found-heading"
          className="text-red-500 text-9xl font-black font-serif animate-dance"
        >
          404
        </h1>
        <p className="text-blue-800 text-7xl font-serif animate-zoom">
          Oops! Page Not Found
        </p>
      </section>

      <Link
        to="/"
        aria-label="Return to homepage"
        className="text-[20px] bg-blue-900 py-2.5 px-5 text-amber-50 rounded-2xl hover:bg-blue-950 font-bold font-serif transition"
      >
        🏠Go Home
      </Link>
    </main>
  );
}

export default NotFound;
