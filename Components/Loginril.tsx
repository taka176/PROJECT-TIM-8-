"use client";

import { useState, FormEvent } from "react";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  PenLine,
  Focus,
  Laptop2,
} from "lucide-react";

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginProps {
  onSubmit?: (data: LoginFormData) => boolean | void | Promise<boolean | void>;
  onGoogleLogin?: () => void;
  onFacebookLogin?: () => void;
  onForgotPassword?: () => void;
  //  ---
  onNavigateToRegister?: () => void;

  isLoading?: boolean;

  errorMessage?: string;

  redirectTo?: string;
}

export default function Loginril({
  onSubmit,
  onGoogleLogin,
  onFacebookLogin,
  onForgotPassword,
  onNavigateToRegister,
  isLoading = false,
  errorMessage,
  redirectTo = "/",
}: LoginProps) {
  // ---------- FORM STATE (controlled inputs) ----------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await onSubmit?.({ email, password, rememberMe });
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden rounded-2xl bg-white">
      <div className="relative hidden w-1/2 flex-col justify-center overflow-hidden bg-gradient-to-br from-slate-100 via-indigo-50 to-white p-10 md:flex">
        <div className="max-w-sm">
          <h1 className="font-serif text-3xl leading-snug text-slate-800">
            Lanjutkan tugasmu yang belum selesai.
          </h1>
          <p className="mt-4 text-sm text-slate-500">
            Satu tempat untuk mencatat, mengatur, dan menyelesaikan tugas.
          </p>

          {/* List fitur/value prop - gampang nambah item baru, tinggal copy block <li> */}
          <ul className="mt-10 space-y-6">
            <li className="flex gap-3">
              <PenLine className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Atur tugas dengan tenang
                </p>
                <p className="text-sm text-slate-500">
                  Desain minimalis yang mengurangi stres visual.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <Focus className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Fokus pada yang penting
                </p>
                <p className="text-sm text-slate-500">
                  Pisahkan pekerjaan prioritas dari kebisingan.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <Laptop2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Sinkronisasi di semua perangkat
                </p>
                <p className="text-sm text-slate-500">
                  Akses daftar tugasmu di mana saja, kapan saja.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bagian Kanannih */}
      <div className="flex w-full flex-col justify-center px-8 py-10 md:w-1/2 md:px-16">
        <div className="mx-auto w-full max-w-sm">
          {/* Logo */}
          <div className="mb-6 flex items-center gap-2 text-sm font-semibold text-indigo-600">
            <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} />
            <span>To-Do List</span>
          </div>

          <h2 className="font-serif text-2xl text-slate-900">Selamat datang</h2>
          <p className="mt-1 text-sm text-slate-500">
            Masuk untuk melanjutkan dan mengatur tugasmu.
          </p>

          {errorMessage && (
            <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {errorMessage}
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email kamu"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 pr-9 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  aria-label="Tampilkan/sembunyikan password"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-400"
                />
                Ingat saya
              </label>
              <button
                type="button"
                onClick={onForgotPassword}
                className="font-medium text-indigo-600 hover:underline"
              >
                Lupa password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60"
            >
              {isLoading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-[11px] text-slate-400">atau</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={onGoogleLogin}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              <GoogleIcon /> Masuk dengan Google
            </button>
            <button
              type="button"
              onClick={onFacebookLogin}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              <FacebookIcon /> Masuk dengan Facebook
            </button>
          </div>

          {/* Link ke halaman register */}
          <p className="mt-5 text-center text-sm text-slate-500">
            Belum punya akun?{" "}
            <button
              type="button"
              onClick={onNavigateToRegister}
              className="font-medium text-indigo-600 hover:underline"
            >
              Daftar
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// Jelas2 logow
function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.7-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.3 21.3 7.3 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.4 14.4c-.2-.7-.4-1.5-.4-2.4s.1-1.6.4-2.4V6.5H1.4C.5 8.2 0 10.1 0 12s.5 3.8 1.4 5.5l4-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.8c1.7 0 3.3.6 4.5 1.7l3.4-3.4C17.9 1.2 15.2 0 12 0 7.3 0 3.3 2.7 1.4 6.5l4 3.1c.9-2.8 3.5-4.8 6.6-4.8z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 5 3.7 9.1 8.4 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7C18.3 21.1 22 17 22 12z" />
    </svg>
  );
}
