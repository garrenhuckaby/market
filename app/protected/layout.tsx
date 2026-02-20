import Link from "next/link";
import { Suspense } from "react";
import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Navbar from "@/components/navbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      
      {/* --- TOP NAVBAR (Icons Only) --- */}
      <nav className="h-16 border-b border-foreground/10 flex items-center justify-between px-6 bg-card sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <Link href="/protected" className="text-xl">🏠</Link>
          <div className="flex items-center gap-6 border-l pl-6 border-foreground/10">
            <Link href="/protected/account" title="Account" className="text-xl">👤</Link>
            <Link href="/protected/deliver" title="Deliver" className="text-xl">🚚</Link>
            <Link href="/protected/bake" title="Bake" className="text-xl">🧁</Link>
            <Link href="/protected/eat" title="Eat" className="text-xl">🍽️</Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <Suspense>
            <AuthButton />
          </Suspense>
        </div>
      </nav>

      <div className="flex flex-1">
        {/* --- SIDEBAR (Words Only) --- */}
        <aside className="w-64 border-r border-foreground/10 p-6 hidden md:flex flex-col gap-4 bg-muted/20">
          <nav className="flex flex-col gap-2">
            <Link 
              href="/protected/eat" 
              className="px-4 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Eat
            </Link>
            <Link 
              href="/protected/bake" 
              className="px-4 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Bake
            </Link>
            <Link 
              href="/protected/deliver" 
              className="px-4 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Deliver
            </Link>
             <Link 
              href="/protected/account" 
              className="px-4 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Account
            </Link>
          </nav>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}