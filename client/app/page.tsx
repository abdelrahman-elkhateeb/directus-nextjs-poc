import { readItems } from "@directus/sdk";
import { directus } from "@/lib/directus";
import Image from "next/image";

export default async function Home() {
  const menuItems = await directus.request(
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
    })
  );

  return (
    <main className="min-h-screen p-10">
      <h1 className="mb-8 text-4xl font-bold">Our Menu</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item) => {
          const imageUrl = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${item.image}`;

          return (
            <article key={item.id} className="rounded-xl border p-5">
              <Image
                src={imageUrl}
                alt={item.name}
                width={300}
                height={200}
                className="h-48 w-full rounded-lg object-cover"
              />

              <h2 className="mt-4 text-xl font-semibold">
                {item.name}
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                {item.description}
              </p>

              <p className="mt-4 font-bold">
                {item.price} EGP
              </p>

              <p className="mt-2 text-sm">
                Category:{" "}
                {typeof item.category === "object"
                  ? item.category.name
                  : item.category}
              </p>
            </article>
          );
        })}
      </div>
    </main>
  );
}