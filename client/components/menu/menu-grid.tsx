import { MenuCard } from "./menu-card";

import type { MenuItemCardData } from "@/types/directus";

interface MenuGridProps {
  items: MenuItemCardData[];
}

export function MenuGrid({ items }: MenuGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <MenuCard key={item.id} item={item} />
      ))}
    </div>
  );
}
