import type { FallbackProps } from "react-error-boundary";

export function ErrorFallBack({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <section
      role="alert"
      aria-live="assertive"
      className="p-4 bg-red-100 border border-red-400 rounded-lg text-red-800 max-w-lg mx-auto mt-10"
    >
      <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
      <p className="mb-4">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="btn btn-active btn-error"
        aria-label="Try again and reset error"
      >
        Try Again
      </button>
    </section>
  );
}

export default ErrorFallBack;
