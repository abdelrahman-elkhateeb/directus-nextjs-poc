import { createDirectus, rest } from "@directus/sdk";

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string | null;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
  available: boolean;
  featured: boolean | null;
  category: number | Category;
}

export interface Offer {
  id: number;
  title: string;
  description: string;
  discount_percentage: number;
  image: string | null;
  active: boolean;
}

export interface DirectusSchema {
  categories: Category[];
  menu_items: MenuItem[];
  offers: Offer[];
}

export interface FeaturedMenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
}

const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;

if (!directusUrl) {
  throw new Error("NEXT_PUBLIC_DIRECTUS_URL is not defined");
}

export const directus = createDirectus<DirectusSchema>(directusUrl).with(rest());