import React from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { router } from "./router";
import LoadingScreen from "./loadingScreen";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={ErrorBoundary}>
          <React.Suspense fallback={<LoadingScreen />}>
            <RouterProvider router={router} />
          </React.Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
