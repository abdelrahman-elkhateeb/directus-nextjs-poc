import type { Offer } from "@/types/directus";

import { OfferCard } from "./offer-card";

interface OffersGridProps {
  offers: Offer[];
}

export function OffersGrid({ offers }: OffersGridProps) {
  if (offers.length === 0) {
    return (
      <p className="rounded-lg border p-6 text-muted-foreground">
        No active offers are available right now.
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
}