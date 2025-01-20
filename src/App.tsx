import { createEffect } from "solid-js";
import "./App.css";
import { Navigate } from "@solidjs/router";
import Database from "@tauri-apps/plugin-sql";

function App() {
  createEffect(async () => {
    Database.load("sqlite:database.db");
  });
  return <Navigate href="/app/home" />;
}

export default App;
