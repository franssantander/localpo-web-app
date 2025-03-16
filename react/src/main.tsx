// import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "unfonts.css";
import "./index.css";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/dates/styles.css";
import AuthProvider from "./context/AuthProvider.tsx";
import { Notifications } from "@mantine/notifications";

const theme = createTheme({
  primaryColor: "local-po",
  colors: {
    "local-po": [
      "#EBF2FF",
      "#DCEAFF",
      "#CBDFFF",
      "#B8D1FF",
      "#9FBEFF",
      "#7EA3FF",
      "#3155FF",
      "#2B4BE1",
      "#2E50E6",
      "#182A69",
    ],
  },
});

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <MantineProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <Notifications />
      <App />
    </QueryClientProvider>
  </MantineProvider>
);
