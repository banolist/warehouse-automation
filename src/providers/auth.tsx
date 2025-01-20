// import { AuthContext } from "../context/auth";

import { createContext, createSignal } from "solid-js";
import createDatabase from "../app/database";

function useProviderValue() {
  const [logined, setLogined] = createSignal<boolean>(
    Boolean(localStorage.getItem("token")) ?? false
  );
  const [error, setError] = createSignal("");

  const saveLogined = (is: boolean) => {
    localStorage.setItem("logined", JSON.stringify(is));
    setLogined(is);
  };

  const db = createDatabase();

  const handleActionLogin = async (data: FormData) => {
    const login = data.get("login")?.toString();
    const password = data.get("password")?.toString();
    const loginType = data.get("loginType")?.toString();
    if (!login) {
      setError("login requeued");
      return;
    }
    if (!password) {
      setError("password requeued");
      return;
    }
    if (loginType === "register") {
      await db.createUser({
        password: password,
        role: "Manager",
        username: login,
        user_id: 0,
        created_at: new Date(),
        updated_at: new Date(),
      });
      saveLogined(true);
      return;
    }
    const user = await db.getUserByLogin(login);
    if (!user) {
      setError("invalid login or password");
      return;
    }
    console.log("pass", user);
    if (user.password !== password) {
      setError("invalid login or password");
      return;
    }

    saveLogined(true);
  };

  return {
    error,
    logined,
    handleActionLogin,
    logout() {
      saveLogined(false);
    },
  };
}
export type ContextType = ReturnType<typeof useProviderValue>;
export const AuthContext = createContext<ContextType | undefined>(undefined);

const AuthProvider = (props: any) => {
  const value = useProviderValue();

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
