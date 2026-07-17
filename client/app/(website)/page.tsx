import { ActiveOffersSection } from "@/components/home/active-offers-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { FeaturedMenuSection } from "@/components/home/featured-section";
import { HeroSection } from "@/components/home/hero-section";

import {
  getActiveOffers,
  getCategories,
  getFeaturedMenuItems,
} from "@/lib/directus/queries";

export default async function HomePage() {
  const [categories, featuredItems, activeOffers] = await Promise.all([
    getCategories(),
    getFeaturedMenuItems(),
    getActiveOffers(),
  ]);

  return (
    <main>
      <HeroSection />

      <div className="container mx-auto px-4 lg:px-8">
        <CategoriesSection categories={categories} />

        <FeaturedMenuSection items={featuredItems} />

        <ActiveOffersSection offers={activeOffers} />
      </div>
    </main>
  );
}