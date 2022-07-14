import { DangerButton } from "~/components/Button";
import { Kaffedyret } from "~/components/Kaffedyret";
import { signOut, useSession } from "next-auth/react";

export function AdminHeader() {
  const { data, status } = useSession();
  const isLoading = status === "loading";
  
  console.log(data?.user);

  return (
    <header className="sticky top-0 bg-white drop-shadow-lg z-50 px-4 py-2">
      <div className="relative flex justify-between items-center">
        <Kaffedyret withoutReg className="hidden md:block text-3xl" />

        {data && (
          <div className="flex items-center justify-center gap-4">
            <span>
              Logget inn som{" "}
              <span className="font-bold">{data?.user?.name}</span>
            </span>
            <DangerButton disabled={isLoading} onClick={() => signOut()}>
              Logg ut
            </DangerButton>
          </div>
        )}
      </div>
    </header>
  );
}
