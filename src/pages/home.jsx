import { Link } from "react-router-dom";
import "cally"

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3.5">
      <h1 className="text-[60px] font-extrabold italic to-teal-500">Todo App📚</h1>
      <h2 className="text-[20px] italic ">Be Productive with your Time</h2>
    <calendar-date class="cally bg-base-100 border border-base-300 shadow-lg rounded-box">
        <svg
          aria-label="Previous"
          className="fill-current size-4"
          slot="previous"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5"></path>
        </svg>
        <svg
          aria-label="Next"
          className="fill-current size-4"
          slot="next"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
        </svg>
        <calendar-month></calendar-month>
      </calendar-date>
      <Link to="/todos" className="text-4xl hover:text-indigo-500 ">
        Get Started➡️
      </Link>
    </div>
  );
}

export default Home;
