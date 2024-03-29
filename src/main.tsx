import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';
import "@mantine/dropzone/styles.css"
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { router } from "./router";
import { createClient } from "@supabase/supabase-js";
import { API_KEY, PROJECT_URL } from "./constants";
import {Notifications} from "@mantine/notifications";

declare global {
  interface Window {
    supabase: ReturnType<typeof createClient>;
  }
}

window.supabase = createClient(PROJECT_URL, API_KEY);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider>
      <Notifications/>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);
