import { getMenuItems } from "@/lib/directus/queries";
import { MenuGrid } from "@/components/menu/menu-grid";

export default async function MenuPage() {
  const menuItems = await getMenuItems();

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Menu</h1>

        <p className="mt-2 text-muted-foreground">
          Explore all our delicious meals.
        </p>
      </div>

      <MenuGrid items={menuItems} />
    </main>
  );
}