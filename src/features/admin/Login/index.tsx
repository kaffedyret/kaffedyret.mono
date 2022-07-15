import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { PrimaryButton } from "~/components/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { status } = useSession();
  const isLoading = status === "loading";

  const handleSubmitSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    await signIn("sanity-login", {
      redirect: true,
      email,
      password,
    });
  };

  return (
    <div className="prose">
      <h1>Logg inn</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmitSignIn}>
        <input
          className="rounded"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <PrimaryButton
          className="self-start"
          disabled={isLoading}
          type="submit"
        >
          Logg inn
        </PrimaryButton>
      </form>
    </div>
  );
};

export default Login;
