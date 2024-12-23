// import { createSignal, createEffect } from "solid-js";
// import Database from "@tauri-apps/plugin-sql";

// function useDatabase(query: string) {
//   const [data, setData] = createSignal([]);
//   const [isLoading, setIsLoading] = createSignal(false);
//   const [error, setError] = createSignal(null);

//   createEffect(async () => {
//     setIsLoading(true);
//     try {
//       const db = await Database.load("sqlite:mydatabase.db");
//       const result = await db.select(query)
//       result.
//       setData(result.rows);
//     } catch (error) {
//       setError(error);
//     } finally {
//       setIsLoading(false);
//     }
//   });

//   return { data, isLoading, error };
// }
