import { useContext } from "solid-js";
import { AuthContext } from "../providers/auth";

export default function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useDark must be used within a DarkProvider`);
  }
  return context;
}
