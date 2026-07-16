import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { getMenuItem } from "@/lib/directus/queries";

interface MenuItemPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MenuItemPage({
  params,
}: MenuItemPageProps) {
  const { id } = await params;

  const item = await getMenuItem(id);

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl">
          <Image
            src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${item.image}`}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-6">
          {item.featured && (
            <Badge>
              Featured
            </Badge>
          )}

          <h1 className="text-5xl font-bold">
            {item.name}
          </h1>

          <p className="text-lg text-muted-foreground">
            {item.description}
          </p>

          <div className="text-3xl font-bold text-primary">
            {item.price} EGP
          </div>

          <div className="text-muted-foreground">
            Category:{" "}
            {typeof item.category === "object"
              ? item.category.name
              : item.category}
          </div>

          <div>
            Status:{" "}
            {item.available
              ? "Available ✅"
              : "Unavailable ❌"}
          </div>
        </div>
      </div>
    </main>
  );
}