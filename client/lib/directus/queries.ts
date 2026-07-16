import { directus } from "@/types/directus";
import { readItems } from "@directus/sdk";

export async function getCategories() {
  return directus.request(
    readItems("categories", {
      fields: ["id", "name", "slug", "image"],
    })
  );
}

export async function getFeaturedMenuItems() {
  return directus.request(
    readItems("menu_items", {
      filter: {
        featured: {
          _eq: true,
        },
      },

      fields: [
        "id",
        "name",
        "description",
        "price",
        "image",
      ],
    }),
  );
}

export async function getActiveOffers() {
  return directus.request(
    readItems("offers", {
      fields: [
        "id",
        "title",
        "description",
        "discount_percentage",
        "image",
      ],
      filter: {
        active: {
          _eq: true,
        },
      },
    }),
  );
}

