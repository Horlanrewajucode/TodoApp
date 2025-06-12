import { Link } from "react-router-dom";
import "cally";

function Home() {
  return (
    <main
      className="flex flex-col items-center justify-center h-screen gap-6.5"
      role="main"
    >
      <header className="flex flex-col items-center justify-center text-center">
        <h1 className="text-[60px] font-bold italic  font-serif">Todo App📚</h1>
        <p className="text-[19px] italic font-mono">Be Productive with your Time!!!</p>
      </header>

      <section aria-label="Calendar">
        <calendar-date
          class="cally bg-base-100 border border-base-300 shadow-lg rounded-box"
          aria-label="Date Picker Calendar"
        >
          <svg
            aria-label="Previous Month"
            className="fill-current size-4 cursor-pointer"
            slot="previous"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            role="img"
            focusable="false"
          >
            <path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5"></path>
          </svg>
          <svg
            aria-label="Next Month"
            className="fill-current size-4 cursor-pointer"
            slot="next"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            role="img"
            focusable="false"
          >
            <path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
          </svg>
          <calendar-month></calendar-month>
        </calendar-date>
      </section>

      <nav aria-label="Todo Navigation">
        <Link
          to="/todos"
          className="text-[20px] bg-blue-900 py-2.5 px-5 text-amber-50 rounded-2xl hover:bg-blue-950 font-bold font-serif"
        >
          + Create New List
        </Link>
      </nav>
    </main>
  );
}

export default Home;
