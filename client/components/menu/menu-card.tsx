import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import type { MenuItemCardData } from "@/types/directus";
import Link from "next/link";

interface MenuCardProps {
  item: MenuItemCardData;
}

export function MenuCard({ item }: MenuCardProps) {
  return (
    <Link href={`/menu/${item.id}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl p-0">
        <CardContent className="p-0">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${item.image}`}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {item.featured && (
              <Badge className="absolute right-3 top-3">
                Featured
              </Badge>
            )}
          </div>

          <div className="space-y-3 p-4">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold">
                {item.name}
              </h3>

              <span className="font-bold text-primary">
                {item.price} EGP
              </span>
            </div>

            <p className="line-clamp-2 text-sm text-muted-foreground">
              {item.description}
            </p>

            <p className="text-sm text-muted-foreground">
              {typeof item.category === "object"
                ? item.category.name
                : item.category}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
