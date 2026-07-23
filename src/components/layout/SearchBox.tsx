"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SearchBox() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    router.push(`/search?q=${encodeURIComponent(value.trim())}`);
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-lg text-neutral-500 hover:bg-primary-100"
      >
        🔍
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="flex items-center gap-1.5">
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => !value && setOpen(false)}
        placeholder="Search…"
        className="w-[180px] rounded-full border-[1.5px] border-[#D1D5DB] bg-white px-3.5 py-1.5 text-[14px] outline-none"
      />
    </form>
  );
}
