import { SUPPORT_EMAIL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { orders } from "@wix/ecom";
import { formatDate } from "date-fns";
import Link from "next/link";
import { Badge } from "../ui/badge";
import WixImage from "./wix-image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Package, Truck } from "lucide-react";

interface OrderProps {
  order: orders.Order;
}

export default function Order({ order }: OrderProps) {
  const paymentStatusMap: Record<orders.PaymentStatus, string> = {
    [orders.PaymentStatus.PAID]: "Pagado",
    [orders.PaymentStatus.NOT_PAID]: "No Pago",
    [orders.PaymentStatus.FULLY_REFUNDED]: "Reembolsado",
    [orders.PaymentStatus.PARTIALLY_PAID]: "Parcialmente Pagado",
    [orders.PaymentStatus.PARTIALLY_REFUNDED]: "Parcialmente Reembolsado",
    [orders.PaymentStatus.PENDING]: "Pendiente",
    [orders.PaymentStatus.UNSPECIFIED]: "Sin Información",
  };

  const fulfillmentStatusMap: Record<orders.FulfillmentStatus, string> = {
    [orders.FulfillmentStatus.FULFILLED]: "Enviado",
    [orders.FulfillmentStatus.NOT_FULFILLED]: "No Enviado",
    [orders.FulfillmentStatus.PARTIALLY_FULFILLED]: "Parcialmente Enviado",
  };

  const paymentStatus = order.paymentStatus
    ? paymentStatusMap[order.paymentStatus]
    : null;

  const fulfillmentStatus = order.fulfillmentStatus
    ? fulfillmentStatusMap[order.fulfillmentStatus]
    : null;

  const shippingDestination =
    order.shippingInfo?.logistics?.shippingDestination;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">
          Pedido #{order.number}
        </CardTitle>
        <Link
          href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(`Ayuda para Pedido #${order.number}`)}&body=${encodeURIComponent(`Necesito ayuda con el pedido #${order.number}\n\n<Describe tu problema>`)}`}
          className="flex items-center text-sm font-medium text-primary hover:underline"
        >
          <Mail className="mr-2 h-4 w-4" />
          ¿Necesitas ayuda?
        </Link>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            {order._createdDate && (
              <span>{formatDate(order._createdDate, "d MMM, yyyy")}</span>
            )}
            <Badge
              className={cn(
                "ml-auto",
                order.paymentStatus === orders.PaymentStatus.NOT_PAID &&
                  "bg-red-500 text-white",
                order.paymentStatus === orders.PaymentStatus.PAID &&
                  "bg-green-500 text-white",
              )}
            >
              {paymentStatus || "Sin información"}
            </Badge>
            <Badge variant="outline" className="flex items-center">
              <Package className="mr-1 h-3 w-3" />
              {fulfillmentStatus || "Sin información"}
            </Badge>
          </div>

          <Separator />

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold">Artículos del Pedido</h3>
              <div className="space-y-4">
                {order.lineItems?.map((item) => (
                  <OrderItem key={item._id} item={item} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">Resumen del Pedido</h3>
              <div className="rounded-lg bg-secondary p-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-medium">
                    {order.priceSummary?.subtotal?.formattedAmount}
                  </span>
                </div>
                {/* Agregar más detalles del resumen si es necesario */}
              </div>

              {shippingDestination && (
                <div className="mt-4">
                  <h3 className="mb-2 font-semibold">Dirección de Entrega</h3>
                  <div className="rounded-lg bg-secondary p-4">
                    <div className="flex items-start">
                      <Truck className="mr-2 h-5 w-5 flex-shrink-0" />
                      <div>
                        <p>
                          {shippingDestination.contactDetails?.firstName}{" "}
                          {shippingDestination.contactDetails?.lastName}
                        </p>
                        <p>
                          {shippingDestination.address?.streetAddress?.name}{" "}
                          {shippingDestination.address?.streetAddress?.number}
                        </p>
                        <p>
                          {shippingDestination.address?.postalCode}{" "}
                          {shippingDestination.address?.city}
                        </p>
                        <p>
                          {shippingDestination.address?.subdivision ||
                            shippingDestination.address?.country}
                        </p>
                        <p className="mt-2 font-medium">
                          {order.shippingInfo?.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface OrderItemProps {
  item: orders.OrderLineItem;
}

function OrderItem({ item }: OrderItemProps) {
  return (
    <div className="flex items-center space-x-4">
      <WixImage
        mediaIdentifier={item.image}
        width={80}
        height={80}
        alt={item.productName?.translated || "Imagen del producto"}
        className="rounded-md bg-secondary object-cover"
      />
      <div className="flex-1 space-y-1">
        <p className="font-medium">{item.productName?.translated}</p>
        <p className="text-sm text-muted-foreground">
          {item.quantity} x {item.price?.formattedAmount}
        </p>
        {!!item.descriptionLines?.length && (
          <p className="text-xs text-muted-foreground">
            {item.descriptionLines
              .map(
                (line) =>
                  line.colorInfo?.translated || line.plainText?.translated,
              )
              .join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}
