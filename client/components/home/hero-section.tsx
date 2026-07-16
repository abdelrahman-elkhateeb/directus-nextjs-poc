import food from "@/public/burger, fries, and a refreshing drink.jpg";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="border-b bg-background">
      <div className=" grid min-h-[80vh] items-center gap-10 py-16 lg:grid-cols-2 lg:px-8">
        <div className="max-w-xl">
          <Badge variant="secondary" className="mb-4">
            Fresh food, delivered fast
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Delicious food for every mood.
          </h1>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Explore fresh pizzas, burgers, pasta, drinks, and desserts prepared
            with quality ingredients.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/menu"
              className={buttonVariants({
                size: "lg",
              })}
            >
              Explore menu
            </Link>

            <Link
              href="/offers"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "lg",
                }),
              )}
            >
              View offers
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-5 text-sm text-muted-foreground">
            <span>Fresh ingredients</span>
            <span>Fast delivery</span>
            <span>Quality meals</span>
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border">
          <Image
            src={food}
            alt="Burger, fries, and a refreshing drink"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}