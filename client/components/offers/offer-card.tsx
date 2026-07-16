import Image from "next/image";

import type { Offer } from "@/types/directus";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface OfferCardProps {
  offer: Offer;
}

export function OfferCard({ offer }: OfferCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg p-0">
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

        <div className="space-y-3 p-5">
          <h2 className="text-xl font-semibold">{offer.title}</h2>

          <p className="text-sm leading-6 text-muted-foreground">
            {offer.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}