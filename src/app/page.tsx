"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="animated flex min-h-screen flex-col items-center justify-center">
      <Link
        className="w-96 bg-blue-500 h-10 rounded-md text-white hover:bg-blue-600 transition-all flex items-center justify-center"
        href={"/editor"}
      >
        Start
      </Link>
    </main>
  );
}
