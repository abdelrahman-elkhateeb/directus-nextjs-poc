import { Utensils } from "lucide-react";
import Link from "next/link";

const links = [
  {
    title: "Pages",
    items: [
      { label: "Home", href: "/" },
      { label: "Menu", href: "/menu" },
      { label: "Offers", href: "/offers" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Utensils className="size-5" />
              </div>

              <h3 className="text-xl font-bold">Foodie</h3>
            </div>

            <p className="max-w-sm text-sm text-muted-foreground">
              Fresh pizzas, burgers, pasta, drinks, and desserts delivered to
              your door.
            </p>
          </div>

          {links.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 font-semibold">{section.title}</h4>

              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          © 2026 Foodie. All rights reserved.
        </div>
      </div>
    </footer>
  );
}