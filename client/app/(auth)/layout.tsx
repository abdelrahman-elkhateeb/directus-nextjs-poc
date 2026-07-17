import Link from "next/link";
import { Utensils } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <section className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-8 flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Utensils className="size-5" />
            </span>

            <span className="text-xl font-bold">Foodie</span>
          </Link>

          {children}
        </div>
      </section>

      <section className="hidden bg-muted lg:flex lg:items-center lg:justify-center">
        <div className="max-w-md px-10">
          <h2 className="text-3xl font-bold">
            Fresh meals, one account away.
          </h2>

          <p className="mt-4 text-muted-foreground">
            Create an account to explore offers and manage your profile.
          </p>
        </div>
      </section>
    </main>
  );
}