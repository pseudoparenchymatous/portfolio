"use client";

import { Sun, Moon } from "lucide-react";
import Link from "next/link";

export default function Header({ dark, setDark }) {
  return (
    <header className="max-w-5xl mx-auto px-6 py-10 flex items-center justify-between">
      <div>
        <Link href="/">
          <h1 className="text-2xl font-bold">Georey Saliente</h1>
        </Link>
      </div>
    </header>
  );
}
