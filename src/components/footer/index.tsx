import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  CreditCard,
  ShoppingCartIcon as Paypal,
  Mail,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12 text-gray-600">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Essential Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Enlaces Importantes</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="hover:text-gray-900">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gray-900">
                  Acerca de Nosotros
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="hover:text-gray-900">
                  Envios y Reembolsos
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="hover:text-gray-900">
                  Terminos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gray-900">
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Servicio al Cliente</h3>
            <p>1-800-123-4567</p>
            <p>support@yourstore.com</p>
            <p>Mon-Fri: 9am-5pm EST</p>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Conecta con Nosotros</h3>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-gray-900">
                <Facebook />
              </Link>
              <Link href="#" className="hover:text-gray-900">
                <Twitter />
              </Link>
              <Link href="#" className="hover:text-gray-900">
                <Instagram />
              </Link>
              <Link href="#" className="hover:text-gray-900">
                <Youtube />
              </Link>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Newsletter</h3>
            <p className="mb-2">
              Mantente informado sobre nuestros productos y ofertas más
              recientes.
            </p>
            <form className="flex space-x-2">
              <Input
                type="email"
                placeholder="Tu correo"
                className="flex-grow bg-white"
              />
              <Button type="submit">Suscribirse</Button>
            </form>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between md:flex-row">
          {/* Payment Methods */}
          <div className="mb-4 flex space-x-4 md:mb-0">
            <CreditCard className="text-gray-400" />
            <Paypal className="text-gray-400" />
          </div>

          {/* Copyright and Legal */}
          <div className="text-center text-sm md:text-right">
            <p>&copy; 2023 Your Store Name. All rights reserved.</p>
            <p className="mt-1">
              <Link href="/privacy-policy" className="hover:text-gray-900">
                Privacy Policy
              </Link>{" "}
              |
              <Link
                href="/terms-conditions"
                className="ml-2 hover:text-gray-900"
              >
                Terms & Conditions
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
