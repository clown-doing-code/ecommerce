import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-full min-h-screen w-full bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header placeholder */}
        <div className="mb-8 flex items-center justify-between">
          <div className="h-8 w-32 animate-pulse rounded"></div>
          <div className="h-8 w-40 animate-pulse rounded"></div>
        </div>

        {/* Main content area */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <h2 className="text-2xl font-semibold text-foreground">
            Cargando...
          </h2>
        </div>

        {/* Product grid placeholder */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse rounded-lg p-4">
              <div className="mb-4 h-48 w-full rounded-md"></div>
              <div className="mb-2 h-4 w-3/4 rounded"></div>
              <div className="h-4 w-1/2 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
