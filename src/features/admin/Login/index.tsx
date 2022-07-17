import { signIn, useSession } from "next-auth/react";
import { BsGoogle } from "react-icons/bs";
import { PrimaryButton } from "~/components/Button";

const Login = () => {
  const { status } = useSession();
  const isLoading = status === "loading";

  return (
    <div className="prose text-center">
      <h1>Logg inn</h1>

      <PrimaryButton
        onClick={() => signIn("google", { redirect: true })}
        className="self-start"
        disabled={isLoading}
        iconLeft={<BsGoogle />}
        type="submit"
      >
        Logg inn med Google
      </PrimaryButton>
    </div>
  );
};

export default Login;
