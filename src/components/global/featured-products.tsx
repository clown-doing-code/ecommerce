import { getWixServerClient } from "@/lib/wix-client.server";
import { getCollectionBySlug } from "@/wix-api/collection";
import { queryProducts } from "@/wix-api/products";
import Product from "./product";

export async function FeaturedProducts() {
  const wixClient = await getWixServerClient();
  const collection = await getCollectionBySlug(wixClient, "otra-categoria");

  if (!collection?._id) {
    return null;
  }

  const featuredProducts = await queryProducts(wixClient, {
    collectionIds: collection._id,
  });

  if (!featuredProducts.items.length) {
    return null;
  }
  return (
    <div className="space-y-5">
      <h2 className="mb-8 text-center text-3xl font-bold">
        Productos Destacados
      </h2>
      <div className="flex grid-cols-2 flex-col gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {featuredProducts.items.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
