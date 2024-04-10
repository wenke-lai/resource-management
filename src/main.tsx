import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import logging from "./utils/logging";

import "./index.css";

const logger = logging.getLogger("main");

// TansStack Query for remote state
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60, // 1 hours
      retry: 3,
    },
    mutations: {
      retry: 0,
      onError: (error) => {
        // global error handler
      },
    },
  },
});

const Root = () => {
  useEffect(() => {
    logger.debug(`starting ${import.meta.env.VITE_PROJECT_VERSION}`);
  }, []);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);
