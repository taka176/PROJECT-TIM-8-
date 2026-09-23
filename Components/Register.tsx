"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Eye, EyeOff, Target, Sparkles } from "lucide-react";

export interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterProps {
  onSubmit?: (
    data: RegisterFormData,
  ) => boolean | void | Promise<boolean | void>;

  onGoogleRegister?: () => void;
  onFacebookRegister?: () => void;

  onNavigateToLogin?: () => void;

  isLoading?: boolean;

  errorMessage?: string;

  redirectTo?: string;
}

export default function Register({
  onSubmit,
  onGoogleRegister,
  onFacebookRegister,
  onNavigateToLogin,
  isLoading = false,
  errorMessage,
  redirectTo = "/",
}: RegisterProps) {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const result = await onSubmit?.({
      fullName,
      email,
      password,
      confirmPassword,
    });

    if (result !== false) {
      router.push(redirectTo);
    }
  };

  return (
    // WRAPPER: 2 kolom -> kiri panel branding, kanan form
    <div className="flex min-h-screen w-full overflow-hidden rounded-2xl bg-white">
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-100 via-indigo-50 to-white p-10 md:flex">
        <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600">
          <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} />
          <span>To-DO List</span>
        </div>

        <div className="max-w-sm">
          <h1 className="font-serif text-3xl italic leading-snug text-slate-800">
            Selesaikan tugasmu satu per satu.
          </h1>

          <ul className="mt-10 space-y-6">
            <li className="flex gap-3">
              <Target className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
                  Fokus
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  Atur tugas dengan tenang
                </p>
                <p className="text-sm text-slate-500">
                  Bebas dari gangguan visual yang tidak perlu.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
                  Esensi
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  Fokus pada substansi
                </p>
                <p className="text-sm text-slate-500">
                  Desain minimalis yang mengutamakan produktivitas Anda.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Footer kecil di pojok kiri bawah */}
        <p className="text-[11px] tracking-wide text-slate-400">
          PREMIUM PRODUCTIVITY
        </p>
      </div>

      <div className="flex w-full flex-col justify-center px-8 py-10 md:w-1/2 md:px-16">
        <div className="mx-auto w-full max-w-sm">
          <h2 className="font-serif text-2xl text-slate-900">Buat Akun</h2>
          <p className="mt-1 text-sm text-slate-500">
            Bergabunglah untuk memulai perjalanan produktif Anda.
          </p>

          {errorMessage && (
            <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {errorMessage}
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Nama Lengkap */}
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Masukkan nama lengkap kamu"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
              />
            </div>

            {/* Email */}
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

            {/* Password */}
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
                  placeholder="Buat password kamu"
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

            {/* Konfirmasi Password */}
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Masukkan kembali password kamu"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 pr-9 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  aria-label="Tampilkan/sembunyikan konfirmasi password"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60"
            >
              {isLoading ? "Memproses..." : "Daftar  →"}
            </button>
          </form>

          {/* Divider ATAU */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-[11px] text-slate-400">ATAU</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={onGoogleRegister}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              <GoogleIcon /> Daftar dengan Google
            </button>
            <button
              type="button"
              onClick={onFacebookRegister}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              <FacebookIcon /> Daftar dengan Facebook
            </button>
          </div>

          {/* Link ke halaman login */}
          <p className="mt-5 text-center text-sm text-slate-500">
            Sudah punya akun?{" "}
            <button
              type="button"
              onClick={onNavigateToLogin}
              className="font-medium text-indigo-600 hover:underline"
            >
              Masuk
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

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
