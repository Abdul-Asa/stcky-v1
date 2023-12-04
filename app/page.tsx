import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <header className="z-10 items-center justify-between w-full max-w-5xl font-mono text-sm lg:flex">
        <p className="p-6 border border-gray-300 rounded bg-gray-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.tsx</code>
        </p>
      </header>

      <main className="flex gap-5">
        <Link href="/join">Join</Link>
        <Link href="/login">Login</Link>
      </main>

      <footer className="grid mb-32 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        Designed by shehu
      </footer>
    </main>
  );
}
