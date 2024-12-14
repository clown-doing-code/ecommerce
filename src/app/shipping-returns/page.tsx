import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ShippingAndReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Envíos y Devoluciones
      </h1>

      <Accordion type="single" collapsible className="mb-8 w-full">
        <AccordionItem value="shipping">
          <AccordionTrigger className="text-xl font-semibold">
            Información de Envíos
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardHeader>
                <CardTitle>Métodos de Envío y Tarifas</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Zona</TableHead>
                      <TableHead>Método</TableHead>
                      <TableHead>Tarifa</TableHead>
                      <TableHead>Tiempo Estimado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Santo Domingo</TableCell>
                      <TableCell>Entrega Local</TableCell>
                      <TableCell>RD$150</TableCell>
                      <TableCell>1-2 días hábiles</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Resto del País</TableCell>
                      <TableCell>Envío Nacional</TableCell>
                      <TableCell>RD$250</TableCell>
                      <TableCell>2-4 días hábiles</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Internacional</TableCell>
                      <TableCell>Envío Internacional</TableCell>
                      <TableCell>Desde RD$1,500</TableCell>
                      <TableCell>7-14 días hábiles</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Detalles Adicionales</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    Envío gratis en pedidos superiores a RD$3,000 dentro de la
                    República Dominicana.
                  </li>
                  <li>
                    Utilizamos servicios de mensajería confiables como Caribe
                    Express y DHL.
                  </li>
                  <li>
                    El tiempo de procesamiento de los pedidos es de 1-2 días
                    hábiles.
                  </li>
                  <li>
                    Para envíos internacionales, los clientes son responsables
                    de cualquier impuesto o arancel aduanero.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="returns">
          <AccordionTrigger className="text-xl font-semibold">
            Política de Devoluciones
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardHeader>
                <CardTitle>Condiciones de Devolución</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    Aceptamos devoluciones dentro de los 30 días posteriores a
                    la recepción del pedido.
                  </li>
                  <li>
                    Los artículos deben estar sin usar, con etiquetas originales
                    y en su embalaje original.
                  </li>
                  <li>
                    La ropa interior y los trajes de baño no son retornables por
                    razones de higiene.
                  </li>
                  <li>
                    Los artículos en oferta o descuento solo son elegibles para
                    cambio o crédito de tienda.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Proceso de Devolución</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal space-y-2 pl-5">
                  <li>
                    Inicie una solicitud de devolución a través de su cuenta en
                    línea o contactando a nuestro servicio al cliente.
                  </li>
                  <li>
                    Recibirá una etiqueta de devolución por correo electrónico.
                  </li>
                  <li>
                    Empaque el artículo de forma segura y adjunte la etiqueta de
                    devolución.
                  </li>
                  <li>
                    Lleve el paquete a la oficina de correos o punto de entrega
                    más cercano.
                  </li>
                  <li>
                    Una vez recibido y aprobado, procesaremos su reembolso o
                    cambio en 3-5 días hábiles.
                  </li>
                </ol>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Reembolsos y Cambios</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    Los reembolsos se realizarán al método de pago original.
                  </li>
                  <li>
                    Ofrecemos cambios por un artículo diferente de igual o mayor
                    valor (pagando la diferencia si aplica).
                  </li>
                  <li>
                    También ofrecemos la opción de crédito de tienda, que es
                    válido por un año desde la fecha de emisión.
                  </li>
                  <li>
                    No aplicamos cargos por reposición en devoluciones estándar.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tracking">
          <AccordionTrigger className="text-xl font-semibold">
            Seguimiento de Pedidos
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent>
                <p className="mb-4">
                  Para realizar el seguimiento de su pedido:
                </p>
                <ol className="list-decimal space-y-2 pl-5">
                  <li>Inicie sesión en su cuenta en nuestro sitio web.</li>
                  <li>Vaya a la sección "Mis Pedidos".</li>
                  <li>Haga clic en el número de pedido que desea rastrear.</li>
                  <li>
                    Encontrará el número de seguimiento y un enlace directo al
                    sitio web del transportista.
                  </li>
                </ol>
                <p className="mt-4">
                  Si no tiene una cuenta, puede usar el número de pedido y su
                  dirección de correo electrónico en nuestra página de "Rastrear
                  Pedido".
                </p>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="damages">
          <AccordionTrigger className="text-xl font-semibold">
            Daños y Reclamaciones
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent>
                <p className="mb-4">
                  Si recibe un artículo dañado o incorrecto:
                </p>
                <ol className="list-decimal space-y-2 pl-5">
                  <li>Tome fotos del artículo y el embalaje.</li>
                  <li>
                    Contacte a nuestro servicio al cliente dentro de las 48
                    horas posteriores a la recepción.
                  </li>
                  <li>
                    Proporcione su número de pedido y las fotos del artículo
                    dañado.
                  </li>
                  <li>
                    Nuestro equipo revisará su reclamo y le ofrecerá una
                    solución (reemplazo o reembolso) en un plazo de 2 días
                    hábiles.
                  </li>
                </ol>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="covid">
          <AccordionTrigger className="text-xl font-semibold">
            Consideraciones Especiales COVID-19
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    Seguimos todas las pautas de seguridad e higiene
                    recomendadas por las autoridades sanitarias.
                  </li>
                  <li>
                    Nuestro personal utiliza equipo de protección personal
                    durante el procesamiento y empaque de los pedidos.
                  </li>
                  <li>
                    Puede haber retrasos en los envíos debido a restricciones
                    locales o internacionales.
                  </li>
                  <li>
                    Ofrecemos entrega sin contacto para proteger tanto a
                    nuestros clientes como a nuestros repartidores.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Card>
        <CardHeader>
          <CardTitle>Contacto de Atención al Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Si tiene alguna pregunta sobre envíos o devoluciones, no dude en
            contactarnos:
          </p>
          <ul className="mt-2 list-disc pl-5">
            <li>Email: atencionalcliente@tustienda.com</li>
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
