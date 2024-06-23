import Link from "next/link";

export default function Home() {
  return (
    <main className="grid place-items-center h-screen">
      <div className="grid place-items-center gap-2 grid-cols-2">
        <h1 className="text-6xl text-center text-white col-span-2 p-4 bg-zinc-700 rounded-lg">
          Expense Tracker
        </h1>
        <Link
          href="/login"
          className="p-4 bg-zinc-800 text-xl w-full text-center rounded-lg"
        >
          Login
        </Link>
        <Link
          href="/create"
          className="p-4 bg-zinc-800 text-xl w-full text-center rounded-lg"
        >
          Create
        </Link>
      </div>
    </main>
  );
}
