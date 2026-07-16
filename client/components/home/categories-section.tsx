import Image from "next/image";

import { Category } from "@/types/directus";
import { Card, CardContent } from "@/components/ui/card";

interface CategoriesSectionProps {
  categories: Category[];
}

export function CategoriesSection({
  categories,
}: CategoriesSectionProps) {
  return (
    <section className="py-16">
      <div className="mb-10">
        <h2 className="text-3xl font-bold">Categories</h2>

        <p className="mt-2 text-muted-foreground">
          Browse our menu by category.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((category) => (
          <Card
            key={category.id}
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
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${category.image}`}
                  alt={category.name}
                  fill
                  className="
      object-cover
      transition-transform
      duration-500
      group-hover:scale-110
    "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">
                  {category.name}
                </h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}