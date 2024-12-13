import { delay } from "@/lib/utils";
import { getWixClient } from "@/lib/wix-client.base";
import Product from "./product";
import { queryProducts } from "@/wix-api/products";
import { getCollectionBySlug } from "@/wix-api/collection";

export async function FeaturedProducts() {
  await delay(1000); //TODO: Remove after finishing

  const wixClient = getWixClient();
  const collection = await getCollectionBySlug(wixClient, "otra-categoria");

  if (!collection?._id) {
    return null;
  }

  const featuredProducts = await queryProducts({
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
