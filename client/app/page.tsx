import { CategoriesSection } from "@/components/home/categories-section";
import { FeaturedMenuSection } from "@/components/home/featured-section";
import { HeroSection } from "@/components/home/hero-section";
import { getCategories, getFeaturedMenuItems } from "@/lib/directus/queries";

export default async function Home() {
  const [categories, featuredItems] = await Promise.all([
    getCategories(),
    getFeaturedMenuItems(),
  ]);

  return (
    <>
      <HeroSection />
      <CategoriesSection categories={categories} />
      <FeaturedMenuSection items={featuredItems} />
    </>
  );
}