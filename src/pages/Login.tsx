import { createEffect, Show } from "solid-js";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "@solidjs/router";

function Login() {
  const {
    handleActionLogin: handleLoginOrRegister,
    error,
    logined,
  } = useAuth();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    console.log(formData);

    await handleLoginOrRegister(formData).catch((err) =>
      console.log("login", err)
    );
  };
  const navigate = useNavigate();
  createEffect(() => {
    if (logined()) {
      console.log(logined());
      navigate("/app/home");
      return;
    }
  });

  return (
    <div class="min-h-screen flex items-center justify-center bg-base-200">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Вход в систему</h2>
          <form onSubmit={handleSubmit}>
            <div class="form-control">
              <fieldset class="flex justify-center space-x-4">
                <legend class="sr-only">Login or Register?</legend>
                <label class="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="loginType"
                    value="login"
                    class="radio radio-primary"
                    checked={true}
                  />
                  <span>Login</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="loginType"
                    value="register"
                    class="radio radio-primary"
                  />
                  <span>Register</span>
                </label>
              </fieldset>
              <label class="label">
                <span class="label-text">Имя пользователя</span>
              </label>
              <input
                name="login"
                type="text"
                placeholder="Login"
                class="input input-bordered"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Пароль</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="Введите пароль"
                class="input input-bordered"
              />
            </div>
            <div class="form-control mt-6">
              <button type="submit" class="btn btn-primary">
                Войти
              </button>
            </div>
            <Show when={error()}>
              <p
                class="text-red-500 text-sm text-center"
                role="alert"
                id="error-message"
              >
                {error()}
              </p>
            </Show>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
