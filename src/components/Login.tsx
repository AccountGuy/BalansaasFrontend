import { useRef } from "react";
import { useLoginStore } from "../stores/authStore";
import Logo from "./Logo";
import { useMutation } from "@tanstack/react-query";
import { sessionLoginHandler } from "../handlers/sessionHandlers";
import { redirect } from "@tanstack/react-router";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { setUserData } = useLoginStore();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: sessionLoginHandler,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isPending) return;
    const userPayload = {
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
    };
    const loginResponse = await mutateAsync(userPayload);
    if (loginResponse) {
      setUserData(loginResponse);
      redirect({ to: "/" });
    }
  };

  return (
    <div className="grid place-items-center min-w-full min-h-svh relative">
      <main className="border-[2px] border-slate-700 px-6 py-6 w-96 rounded-md">
        <article className="grid place-items-center mb-3">
          <div className="max-w-64">
            <Logo />
          </div>
        </article>
        <form onSubmit={handleSubmit}>
          <article>
            <section className="form-field">
              <label className="label-field">Email</label>
              <input
                ref={emailRef}
                className="input-field"
                type="email"
                placeholder="balansaas@gmail.com"
              ></input>
            </section>
            <section className="form-field">
              <label className="label-field">Contraseña</label>
              <input
                ref={passwordRef}
                className="input-field"
                type="password"
                placeholder="••••••••••••"
              ></input>
            </section>
            <section className="form-field">
              <button className="btn w-full" disabled={isPending}>
                {isPending ? "Cargando..." : "Ingresar"}
              </button>
            </section>
          </article>
        </form>
      </main>
    </div>
  );
};

export default Login;
