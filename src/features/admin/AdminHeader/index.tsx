import { Kaffedyret } from "~/components/Kaffedyret";

export function AdminHeader() {
  return (
    <header className="sticky top-0 bg-white drop-shadow-lg z-50 px-4 py-2">
      <div className="relative">
        <Kaffedyret withoutReg className="hidden md:block text-3xl" />
      </div>
    </header>
  );
}
