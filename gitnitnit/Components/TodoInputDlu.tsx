"use client";

import { useState, FormEvent } from "react";
import { postTodos } from "@/action/todos.action";

interface TodoInputProps {
  TambahData: (id: number, text: string) => void;
}

export default function TodoInputDlu({ TambahData }: TodoInputProps) {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState<boolean | null>(null);

  const TangkapInput = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim()) {
      setMessage("Task tidak boleh kosong");
      setSuccess(false);
      return;
    }

    const add = await postTodos(text);

    setMessage(add.message);
    setSuccess(add.success);

    if (!add.success || !add.data) {
      return;
    }

    TambahData(add.data.id, text);

    setText("");
  };

  return (
    <div>
      <form onSubmit={TangkapInput} className="flex items-center gap-3 mb-2">
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
          +
        </button>
      </form>

      {message && (
        <p className={`text-sm ${success ? "text-green-500" : "text-red-400"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
