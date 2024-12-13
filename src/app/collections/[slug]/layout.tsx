import WixImage from "@/components/global/wix-image";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { getWixServerClient } from "@/lib/wix-client.server";
import { getCollectionBySlug } from "@/wix-api/collection";
import { Loader2 } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface LayoutProps {
  children: React.ReactNode;
  params: { slug: string };
}

export default function Layout({ children, params }: LayoutProps) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <CollectionsLayout params={params}>{children}</CollectionsLayout>
    </Suspense>
  );
}

async function CollectionsLayout({ children, params: { slug } }: LayoutProps) {
  const wixClient = await getWixServerClient();
  const collection = await getCollectionBySlug(wixClient, slug);

  if (!collection) notFound();

  const banner = collection.media?.mainMedia?.image;

  return (
    <>
      <div className="flex items-center rounded-lg bg-secondary md:h-96">
        <div className="space-y-7 p-10 text-center md:w-1/2">
          <h1 className="text-3xl font-bold text-black underline md:text-4xl">
            {collection.name}
          </h1>
        </div>
        {banner && (
          <div className="relative hidden h-full w-1/2 md:block">
            <WixImage
              mediaIdentifier={banner.url}
              width={1280}
              height={400}
              alt={banner.altText}
              className="h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary via-transparent to-transparent" />
          </div>
        )}
      </div>
      <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
        {children}
      </main>
    </>
  );
}

function LoadingSkeleton() {
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
            <h2 className="mt-6 text-3xl font-extrabold text-foreground">
              Cargando tus productos...
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Please wait while we fetch the latest items for you.
            </p>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
      </div>
    </main>
  );
}
