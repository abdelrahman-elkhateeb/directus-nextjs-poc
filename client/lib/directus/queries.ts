import { directus } from "@/types/directus";
import { readItem, readItems } from "@directus/sdk";

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

export async function getMenuItems() {
  return directus.request(
    readItems("menu_items", {
      fields: [
        "id",
        "name",
        "description",
        "price",
        "image",
        "available",
        "featured",
        {
          category: ["id", "name", "slug"],
        },
      ],
    }),
  );
}

export async function getMenuItem(id: string) {
  return directus.request(
    readItem("menu_items", Number(id), {
      fields: [
        "id",
        "name",
        "description",
        "price",
        "image",
        "available",
        "featured",
        {
          category: ["id", "name", "slug"],
        },
      ],
    }),
  );
}

export async function getOffers() {
  return directus.request(
    readItems("offers", {
      fields: [
        "id",
        "title",
        "description",
        "discount_percentage",
        "image",
        "active",
      ],
      filter: {
        active: {
          _eq: true,
        },
      },
      sort: ["-discount_percentage"],
    }),
  );
}