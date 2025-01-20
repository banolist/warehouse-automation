import { createContext } from "solid-js";

interface Auth {
  isAuthorizet: boolean;
}
export const AuthContext = createContext<Auth | undefined>(undefined);
