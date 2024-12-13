import { getWixServerClient } from "@/lib/wix-client.server";
import { getCollections } from "@/wix-api/collection";
import SearchFilterLayout from "./search-filter-layout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const wixClient = await getWixServerClient();
  const collections = await getCollections(wixClient);

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-6">
      <SearchFilterLayout collections={collections}>
        {children}
      </SearchFilterLayout>
    </main>
  );
}
