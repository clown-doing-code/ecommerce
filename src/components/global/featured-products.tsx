import { delay } from "@/lib/utils";
import { getWixClient } from "@/lib/wix-client.base";
import Product from "./product";

export async function FeaturedProducts() {
  await delay(3000); //TODO: Remove after finishing

  const wixClient = getWixClient();
  const { collection } =
    await wixClient.collections.getCollectionBySlug("otra-categoria");

  if (!collection?._id) {
    return null;
  }
  const featuredProducts = await wixClient.products
    .queryProducts()
    .hasSome("collectionIds", [collection._id])
    .descending("lastUpdated")
    .find();

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
