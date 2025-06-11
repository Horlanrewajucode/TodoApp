import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ErrorBoundary } from "react-error-boundary";
// import ErrorFallBack from "./component/errorFallBack";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={ErrorBoundary}>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
