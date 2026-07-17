import { OffersGrid } from "@/components/offers/offer-grid";
import { getOffers } from "@/lib/directus/queries";

export default async function OffersPage() {
  const offers = await getOffers();

  return (
    <main className="container mx-auto min-h-[70vh] px-4 py-16 lg:px-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">
          Special Offers
        </h1>

        <p className="mt-2 text-muted-foreground">
          Discover our latest deals and limited-time discounts.
        </p>
      </div>

      <OffersGrid offers={offers} />
    </main>
  );
}