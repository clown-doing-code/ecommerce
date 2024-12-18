import { getWixServerClient } from "@/lib/wix-client.server";
import { getLoggedInMember } from "@/wix-api/members";
import { getOrder } from "@/wix-api/orders";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, Package, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Order from "@/components/global/order";
import ClearCart from "./clear-cart";

interface PageProps {
  searchParams: Promise<{ orderId: string }>;
}

export const metadata: Metadata = {
  title: "Confirmación de Pedido | Gracias por tu Compra",
  description:
    "Tu pedido ha sido realizado con éxito. Consulta los detalles de tu pedido y los siguientes pasos.",
};

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const { orderId } = searchParams;

  const wixClient = await getWixServerClient();

  const [order, loggedInMember] = await Promise.all([
    getOrder(wixClient, orderId),
    getLoggedInMember(wixClient),
  ]);

  if (!order) {
    notFound();
  }

  const orderCreatedDate = order._createdDate
    ? new Date(order._createdDate)
    : null;

  const showClearCart =
    orderCreatedDate && orderCreatedDate.getTime() > Date.now() - 60_000 * 5;

  return (
    <main className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary py-10 text-center text-primary-foreground">
          <div className="mb-4 flex justify-center">
            <CheckCircle className="h-16 w-16" />
          </div>
          <CardTitle className="mb-2 text-3xl font-bold md:text-4xl">
            ¡Gracias por tu Pedido!
          </CardTitle>
          <p className="text-lg">
            Un resumen de tu pedido ha sido enviado a tu dirección de correo
            electrónico.
          </p>
        </CardHeader>
        <CardContent className="space-y-8 p-6 md:p-8">
          <div>
            <h2 className="mb-4 flex items-center justify-center text-2xl font-bold">
              <Package className="mr-2" /> Detalles del Pedido
            </h2>
            <Order order={order} />
          </div>
          {loggedInMember && (
            <div className="text-center">
              <h3 className="mb-4 flex items-center justify-center text-xl font-semibold">
                <User className="mr-2" /> Tu Cuenta
              </h3>
              <p className="mb-4">
                Rastrea tu pedido y consulta tu historial de compras en tu
                cuenta.
              </p>
              <Button asChild>
                <Link href="/profile">Ver tus Pedidos</Link>
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4 bg-muted p-6">
          <p className="text-center text-muted-foreground">
            Si tienes alguna pregunta sobre tu pedido, no dudes en contactar con
            nuestro servicio de atención al cliente.
          </p>
          <div className="flex space-x-4">
            <Button variant="outline" asChild>
              <Link href="/contact">Contactar Soporte</Link>
            </Button>
            <Button asChild>
              <Link href="/">Continuar Comprando</Link>
            </Button>
          </div>
          {showClearCart && <ClearCart />}
        </CardFooter>
      </Card>
    </main>
  );
}
