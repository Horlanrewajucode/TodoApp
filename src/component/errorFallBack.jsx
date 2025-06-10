function ErrorFallBack({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button className="btn btn-active btn-error" onClick={resetErrorBoundary}>
        Try Again
      </button>
    </div>
  );
}

export default ErrorFallBack;
