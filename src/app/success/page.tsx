"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import placeholder from "@/assets/placeholder.svg";

//TODO: Customize this component
const orderData = {
  orderNumber: "1234567890",
  estimatedDelivery: "15 de julio, 2023",
  items: [
    {
      id: 1,
      name: "Camisa de Lino",
      price: 1500,
      image: placeholder,
    },
    {
      id: 2,
      name: "Pantalón de Algodón",
      price: 2000,
      image: placeholder,
    },
  ],
  total: 3500,
  shippingAddress: "Calle Principal #123, Santo Domingo, República Dominicana",
  paymentMethod: "Tarjeta de crédito (Visa terminada en 1234)",
};

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="mb-8 text-center"
      >
        <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
        <h1 className="text-3xl font-bold text-green-700">
          ¡Gracias por tu compra!
        </h1>
        <p className="text-xl text-gray-600">Tu pedido ha sido confirmado.</p>
      </motion.div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Resumen del Pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex justify-between">
              <span className="font-semibold">Número de Pedido:</span>
              <span>{orderData.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Fecha Estimada de Entrega:</span>
              <span>{orderData.estimatedDelivery}</span>
            </div>
            <Separator />
            <div>
              <h3 className="mb-2 font-semibold">Artículos Comprados:</h3>
              {orderData.items.map((item) => (
                <div
                  key={item.id}
                  className="mb-2 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <Avatar className="mr-2 h-10 w-10">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={40}
                        height={40}
                      />
                    </Avatar>
                    <span>{item.name}</span>
                  </div>
                  <span>RD${item.price}</span>
                </div>
              ))}
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total Pagado:</span>
              <span>RD${orderData.total}</span>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Dirección de Envío:</h3>
              <p>{orderData.shippingAddress}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
