import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <h1 className="mt-6 text-4xl font-extrabold text-gray-900">404</h1>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Página No Encontrada
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            No pudimos encontrar la página que estas buscando.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Button asChild className="w-full">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" aria-hidden="true" />
              Volver al inico{" "}
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/products">
              <ShoppingBag className="mr-2 h-5 w-5" aria-hidden="true" />
              Buscar Productos{" "}
            </Link>
          </Button>
        </div>

        <p className="mt-6 text-xs text-gray-500">
          Si crees que esto podría ser un error, contactanos.
        </p>
      </div>
    </div>
  );
}
