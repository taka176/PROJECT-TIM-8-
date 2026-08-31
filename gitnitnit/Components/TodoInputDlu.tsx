"use client";

import { useState, FormEvent, ChangeEvent } from "react";

export default function TodoInputDlu({
  TambahinTask,
}: {
  TambahinTask: (text: string) => void;
}) {
  const [text, setText] = useState("");

  const TangkapInput = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;
    TambahinTask(text);
    setText("");
  };

  return (
    <form onSubmit={TangkapInput} className="flex items-center gap-3 mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Tambahkan task baru..."
        className="flex-1 bg-stone-100/70 text-gray-800 placeholder-gray-400 text-sm px-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
      />
      <button
        type="submit"
        className="w-11 h-11 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl flex items-center justify-center text-xl font-medium transition-colors shadow-sm shrink-0"
      >
        {" "}
        +{" "}
      </button>{" "}
    </form>
  );
}
