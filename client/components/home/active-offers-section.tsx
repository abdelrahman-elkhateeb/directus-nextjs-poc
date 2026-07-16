import Image from "next/image";

import type { Offer } from "@/types/directus";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type ActiveOffer = Pick<
  Offer,
  "id" | "title" | "description" | "discount_percentage" | "image"
>;

interface ActiveOffersSectionProps {
  offers: ActiveOffer[];
}

export function ActiveOffersSection({
  offers,
}: ActiveOffersSectionProps) {
  return (
    <section className="py-16">
      <div className="mb-10">
        <h2 className="text-3xl font-bold">Active Offers</h2>

        <p className="mt-2 text-muted-foreground">
          Limited-time deals on your favorite meals.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer) => (
          <Card
            key={offer.id}
            className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg p-0"
          >
            <CardContent className="p-0">
              <div className="relative aspect-[16/10] overflow-hidden">
                {offer.image && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${offer.image}`}
                    alt={offer.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}

                <Badge className="absolute right-3 top-3">
                  {offer.discount_percentage}% OFF
                </Badge>
              </div>

              <div className="space-y-2 p-5">
                <h3 className="text-xl font-semibold">{offer.title}</h3>

                <p className="text-sm leading-6 text-muted-foreground">
                  {offer.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}