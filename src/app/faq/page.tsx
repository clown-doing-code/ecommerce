"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const faqData = {
  productos: [
    {
      question: "¿Cómo puedo saber qué talla me queda mejor?",
      answer:
        "Ofrecemos una guía detallada de tallas en cada página de producto. Mide tu cuerpo y compara con nuestra tabla para encontrar tu talla ideal. Si tienes dudas, contáctanos y estaremos encantados de ayudarte.",
    },
    {
      question: "¿De qué materiales están hechas sus prendas?",
      answer:
        "Utilizamos una variedad de materiales de alta calidad, incluyendo algodón orgánico, lino y mezclas sostenibles. Cada descripción de producto incluye detalles específicos sobre los materiales utilizados.",
    },
    {
      question: "¿Cómo debo cuidar mis prendas?",
      answer:
        "Las instrucciones de cuidado varían según el artículo. Generalmente, recomendamos lavar en agua fría, evitar la secadora y planchar a temperatura media. Consulta la etiqueta de cada prenda para instrucciones específicas.",
    },
    {
      question: "¿Ofrecen opciones de personalización?",
      answer:
        "Sí, ofrecemos servicios de personalización para ciertos artículos. Puedes agregar bordados o elegir colores específicos. Visita nuestra sección de 'Personalización' para más detalles.",
    },
    {
      question: "¿Cuál es su política de garantía?",
      answer:
        "Ofrecemos una garantía de 30 días contra defectos de fabricación. Si encuentras algún problema con tu compra, contáctanos y estaremos encantados de ayudarte con un reemplazo o reparación.",
    },
  ],
  pedidos: [
    {
      question: "¿Cómo puedo realizar un pedido?",
      answer:
        "Simplemente navega por nuestra tienda, selecciona los artículos que deseas, agrégalos al carrito y procede al pago. Puedes crear una cuenta para un proceso más rápido o comprar como invitado.",
    },
    {
      question: "¿Qué métodos de pago aceptan?",
      answer:
        "Aceptamos tarjetas de crédito/débito (Visa, Mastercard, American Express), PayPal, y transferencias bancarias locales.",
    },
    {
      question: "¿Puedo modificar o cancelar mi pedido?",
      answer:
        "Puedes modificar o cancelar tu pedido dentro de las 2 horas siguientes a la realización del mismo. Después de este tiempo, contáctanos y haremos lo posible por ayudarte.",
    },
    {
      question: "¿Ofrecen descuentos por compras al por mayor?",
      answer:
        "Sí, ofrecemos precios especiales para compras al por mayor. Por favor, contáctanos directamente para discutir tus necesidades y obtener una cotización.",
    },
    {
      question: "¿Tienen opciones de regalo?",
      answer:
        "Ofrecemos envoltura de regalo y la opción de incluir una tarjeta personalizada. Selecciona estas opciones durante el proceso de pago.",
    },
  ],
  envios: [
    {
      question: "¿Cuáles son sus métodos de envío y tiempos de entrega?",
      answer:
        "Ofrecemos envío estándar (3-5 días hábiles) y envío express (1-2 días hábiles) dentro de la República Dominicana. Los tiempos pueden variar para envíos internacionales.",
    },
    {
      question: "¿Cómo puedo rastrear mi pedido?",
      answer:
        "Una vez que tu pedido sea enviado, recibirás un correo electrónico con un número de seguimiento. Puedes usar este número en nuestra página de 'Rastrear Pedido' o directamente en el sitio web del servicio de mensajería.",
    },
    {
      question: "¿Realizan envíos internacionales?",
      answer:
        "Sí, realizamos envíos a varios países. Los costos y tiempos de entrega varían según el destino. Puedes ver las opciones disponibles durante el proceso de pago.",
    },
    {
      question: "¿Cuánto cuesta el envío?",
      answer:
        "Los costos de envío dependen del peso del paquete y el destino. Ofrecemos envío gratis en pedidos superiores a RD$3,000 dentro de la República Dominicana.",
    },
    {
      question: "¿Qué sucede si mi paquete se pierde o daña durante el envío?",
      answer:
        "Nos hacemos responsables de los paquetes perdidos o dañados durante el envío. Contáctanos inmediatamente si tienes algún problema y resolveremos la situación rápidamente.",
    },
  ],
  devoluciones: [
    {
      question: "¿Cuál es su política de devoluciones?",
      answer:
        "Aceptamos devoluciones dentro de los 30 días posteriores a la compra. Los artículos deben estar sin usar, con etiquetas originales y en su embalaje original.",
    },
    {
      question: "¿Cómo puedo iniciar una devolución?",
      answer:
        "Para iniciar una devolución, inicia sesión en tu cuenta, ve a 'Mis Pedidos', selecciona el artículo que deseas devolver y sigue las instrucciones. También puedes contactarnos directamente para asistencia.",
    },
    {
      question: "¿Cuánto tiempo tarda en procesarse un reembolso?",
      answer:
        "Una vez que recibimos y aprobamos tu devolución, el reembolso se procesa en 3-5 días hábiles. El tiempo para que aparezca en tu cuenta bancaria puede variar según tu banco.",
    },
    {
      question: "¿Puedo cambiar un artículo por otro?",
      answer:
        "Sí, ofrecemos cambios por talla diferente o por otro artículo de igual o mayor valor (pagando la diferencia si aplica). Inicia el proceso de la misma manera que una devolución.",
    },
    {
      question:
        "¿Qué condiciones deben cumplir los artículos para ser devueltos?",
      answer:
        "Los artículos deben estar sin usar, con todas las etiquetas originales y en su embalaje original. No aceptamos devoluciones de ropa interior o trajes de baño por razones de higiene.",
    },
  ],
  cuenta: [
    {
      question: "¿Cómo puedo crear una cuenta?",
      answer:
        "Puedes crear una cuenta haciendo clic en 'Registrarse' en la esquina superior derecha de nuestra página. Completa el formulario con tu información y recibirás un correo de confirmación.",
    },
    {
      question: "Olvidé mi contraseña, ¿cómo puedo restablecerla?",
      answer:
        "En la página de inicio de sesión, haz clic en '¿Olvidaste tu contraseña?'. Ingresa tu correo electrónico y te enviaremos instrucciones para restablecerla.",
    },
    {
      question: "¿Cómo protegen mi información personal?",
      answer:
        "Utilizamos encriptación SSL para proteger tus datos durante la transmisión. Nunca compartimos tu información personal con terceros. Puedes leer más en nuestra Política de Privacidad.",
    },
    {
      question: "¿Cómo puedo cambiar mis preferencias de marketing?",
      answer:
        "Inicia sesi��n en tu cuenta, ve a 'Preferencias de Comunicación' y actualiza tus opciones. También puedes darte de baja de nuestros correos haciendo clic en el enlace 'Cancelar suscripción' en cualquier correo que recibas.",
    },
    {
      question: "¿Qué hago si tengo problemas técnicos con el sitio web?",
      answer:
        "Si experimentas problemas técnicos, intenta limpiar la caché de tu navegador o usar un navegador diferente. Si el problema persiste, contáctanos con detalles sobre el problema y estaremos encantados de ayudarte.",
    },
  ],
};

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  //TODO: Fix the search question feature
  //   const handleSearch = (e: any) => {
  //     e.preventDefault();
  //     const results = Object.entries(faqData).flatMap(([category, questions]) =>
  //       questions
  //         .filter(
  //           (q) =>
  //             q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //             q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  //         )
  //         .map((q) => ({ ...q, category })),
  //     );
  //     setSearchResults(results);
  //   };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Preguntas Frecuentes
      </h1>

      <form className="mb-8">
        <div className="flex gap-2">
          <Input
            type="search"
            placeholder="Buscar preguntas frecuentes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
            disabled
          />
          <Button type="submit">Buscar</Button>
        </div>
      </form>

      {searchResults.length > 0 ? (
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">
            Resultados de búsqueda
          </h2>
          {/* <Accordion type="single" collapsible className="w-full">
            {searchResults.map((result, index) => (
              <AccordionItem key={index} value={`search-result-${index}`}>
                <AccordionTrigger>{result.question}</AccordionTrigger>
                <AccordionContent>{result.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion> */}
        </div>
      ) : (
        searchTerm && (
          <p className="mb-8 text-center">
            No se encontraron resultados para "{searchTerm}"
          </p>
        )
      )}

      <Tabs defaultValue="productos">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="productos">Productos</TabsTrigger>
          <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
          <TabsTrigger value="envios">Envíos</TabsTrigger>
          <TabsTrigger value="devoluciones">Devoluciones</TabsTrigger>
          <TabsTrigger value="cuenta">Cuenta</TabsTrigger>
        </TabsList>
        {Object.entries(faqData).map(([category, questions]) => (
          <TabsContent key={category} value={category}>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {questions.map((faq, index) => (
                    <AccordionItem key={index} value={`${category}-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>¿No encontraste lo que buscabas?</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Si tienes alguna pregunta que no ha sido respondida aquí, no dudes
            en contactarnos:
          </p>
          <ul className="mt-2 list-disc pl-5">
            <li>Email: ayuda@tustienda.com</li>
            <li>Teléfono: +1 (809) 555-1234</li>
            <li>WhatsApp: +1 (829) 555-5678</li>
            <li>
              Horario de atención: Lunes a Viernes, 9:00 AM - 6:00 PM (Hora del
              Este)
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
