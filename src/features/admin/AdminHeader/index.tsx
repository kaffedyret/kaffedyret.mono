import { signOut, useSession } from "next-auth/react";
import { DangerButton } from "~/components/Button";
import { Kaffedyret } from "~/components/Kaffedyret";

export function AdminHeader() {
  const { data, status } = useSession();
  const isLoading = status === "loading";

  return (
    <header className="sticky top-0 bg-white drop-shadow-lg z-50 px-4 py-2">
      <div className="relative flex justify-between items-center">
        <Kaffedyret withoutReg className="hidden md:block text-3xl" />

        {data?.user && (
          <div className="flex items-center justify-center gap-4">
            <span>
              Logget inn som <span className="font-bold">{data.user.name}</span>
            </span>
            {data.user.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="w-8 h-8 object-fill rounded-full"
                alt="Profile image"
                width={32}
                height={32}
                src={data.user.image}
              />
            )}
            <DangerButton
              disabled={isLoading}
              onClick={() => signOut({ redirect: true })}
            >
              Logg ut
            </DangerButton>
          </div>
        )}
      </div>
    </header>
  );
}
