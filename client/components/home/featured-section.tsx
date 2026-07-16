import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import type { FeaturedMenuItem } from "@/types/directus";

interface FeaturedMenuSectionProps {
  items: FeaturedMenuItem[];
}

export function FeaturedMenuSection({
  items,
}: FeaturedMenuSectionProps) {
  return (
    <section className="py-16">
      <div className="mb-10">
        <h2 className="text-3xl font-bold">Featured Menu</h2>

        <p className="mt-2 text-muted-foreground">
          Our customers favorite dishes.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <Card
            key={item.id}
            className="
              group
              overflow-hidden
              transition-all
              duration-300
              hover:-translate-y-2
              hover:shadow-xl
              p-0
            "
          >
            <CardContent className="p-0">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${item.image}`}
                  alt={item.name}
                  fill
                  className="
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-110
                  "
                />

                <Badge className="absolute right-3 top-3">
                  Featured
                </Badge>
              </div>

              <div className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-3">
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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}