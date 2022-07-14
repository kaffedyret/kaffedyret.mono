import { signUp } from "next-auth-sanity/client";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { PrimaryButton } from "~/components/Button";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { status } = useSession();
  const isLoading = status === "loading";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await signUp({
      email,
      password,
      name,
    });

    await signIn("sanity-login", {
      redirect: false,
      email,
      password,
    });
  };

  return (
    <div className="">
      <h1>Opprett bruker</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className="rounded"
          type="text"
          placeholder="Navn"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="rounded"
          type="email"
          placeholder="E-post"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="rounded"
          type="password"
          placeholder="Passord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <PrimaryButton
          className="self-start"
          disabled={isLoading}
          type="submit"
        >
          Opprett bruker
        </PrimaryButton>
      </form>
    </div>
  );
};

export default Signup;
