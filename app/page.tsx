// src/app/page.tsx
// import Loginril from "../Components/Loginril";

// export default function Home() {
//   return (
//     <main className="min-h-screen flex items-center justify-center p-4">
//       <Loginril />
//     </main>
//   );
// }

// pembates

"use client";

import { useState } from "react";
import Loginril from "../Components/Loginril";
import Register from "../Components/Register";
import TodokartUtama from "../Components/TodokartUtama";

export default function Home() {
  // state kontrol halaman: 'login' | 'register' | 'todo'
  const [currentView, setCurrentView] = useState<"login" | "register" | "todo">(
    "login",
  );

  return (
    <main>
      {currentView === "login" && (
        <Loginril
          onNavigateToRegister={() => setCurrentView("register")}
          onSubmit={() => {
            setCurrentView("todo");
            return false;
          }}
        />
      )}

      {currentView === "register" && (
        <Register onNavigateToLogin={() => setCurrentView("login")} />
      )}

      {currentView === "todo" && <TodokartUtama />}
    </main>
  );
}
