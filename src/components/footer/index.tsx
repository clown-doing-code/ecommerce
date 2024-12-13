import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter } from "lucide-react";

//TODO: Fix the typos

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Tienda</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Todos los Productos
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Categorias
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Servicio al Cliente{" "}
            </h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Contactanos{" "}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-gray-900">
                  Preguntas Frecuentes{" "}
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Envio y Devoluciones{" "}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Company</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Acerca de Nostros
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Politica de Privacidad{" "}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Terminos de Servicio
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Mantente Conectado{" "}
            </h2>
            <p className="mt-4 text-gray-600">
              Suscribete a nuestro newsletter para recibir actualizaciones sobre
              ofertas y descuentos.
            </p>
            <form className="mt-4">
              <div className="flex max-w-md">
                <Input
                  type="email"
                  placeholder="Ingresa tu correo"
                  className="rounded-r-none"
                  required
                />
                <Button type="submit" className="rounded-l-none">
                  Suscribirme
                </Button>
              </div>
            </form>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 py-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Your E-commerce Store. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
