import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TerminosCondiciones() {
  return (
    <>
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Términos y Condiciones</h1>
        <Card>
          <CardHeader>
            <CardTitle>Bienvenido a Nuestra Tienda en Línea</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Estos términos y condiciones establecen las reglas y regulaciones
              para el uso de nuestro sitio web de comercio electrónico.
            </p>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>1. Aceptación de Términos</AccordionTrigger>
                <AccordionContent>
                  Al acceder y utilizar este sitio web, usted acepta cumplir con
                  estos Términos y Condiciones de Uso. El uso de nuestro sitio
                  implica la aceptación plena de estas condiciones. Si no está
                  de acuerdo con alguno de estos términos, le solicitamos que no
                  utilice nuestro sitio web.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>2. Compras y Pagos</AccordionTrigger>
                <AccordionContent>
                  Al realizar una compra en nuestro sitio web, usted se
                  compromete a:
                  <ul className="mt-2 list-disc pl-5">
                    <li>
                      Proporcionar información personal y de pago precisa y
                      actualizada;
                    </li>
                    <li>
                      Realizar pagos completos por los productos seleccionados;
                    </li>
                    <li>
                      Aceptar los precios vigentes al momento de la compra;
                    </li>
                    <li>Cumplir con los métodos de pago disponibles;</li>
                    <li>
                      Mantener la confidencialidad de sus credenciales de
                      cuenta.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>3. Política de Productos</AccordionTrigger>
                <AccordionContent>
                  Todos los productos en nuestro sitio web se presentan con la
                  mayor precisión posible. Nos reservamos el derecho de:
                  <ul className="mt-2 list-disc pl-5">
                    <li>Modificar precios sin previo aviso;</li>
                    <li>Limitar las cantidades de productos;</li>
                    <li>Retirar productos de la venta;</li>
                    <li>Corregir errores de descripción o precio.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>4. Envíos y Entregas</AccordionTrigger>
                <AccordionContent>
                  Nuestros envíos están sujetos a las siguientes condiciones:
                  <ul className="mt-2 list-disc pl-5">
                    <li>
                      Los tiempos de entrega pueden variar según la ubicación;
                    </li>
                    <li>
                      No nos hacemos responsables por retrasos causados por el
                      transportista;
                    </li>
                    <li>
                      El cliente es responsable de verificar la dirección de
                      entrega;
                    </li>
                    <li>
                      Los gastos de envío se calculan al momento de la compra.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>
                  5. Devoluciones y Reembolsos
                </AccordionTrigger>
                <AccordionContent>
                  Nuestra política de devoluciones incluye:
                  <ul className="mt-2 list-disc pl-5">
                    <li>
                      Devoluciones válidas dentro de 30 días posteriores a la
                      compra;
                    </li>
                    <li>
                      Productos en condiciones originales, sin usar y con
                      etiquetas;
                    </li>
                    <li>Reembolsos realizados al método de pago original;</li>
                    <li>
                      Gastos de envío de devolución corren por cuenta del
                      cliente.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>
                  6. Privacidad y Protección de Datos
                </AccordionTrigger>
                <AccordionContent>
                  Nos comprometemos a proteger su información personal. Toda la
                  información recopilada se maneja según nuestra Política de
                  Privacidad. Nos reservamos el derecho de modificar esta
                  política, notificando a los usuarios a través de nuestro sitio
                  web.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger>7. Propiedad Intelectual</AccordionTrigger>
                <AccordionContent>
                  Todo el contenido de este sitio web, incluyendo textos,
                  gráficos, logotipos y imágenes, es propiedad exclusiva de
                  nuestra empresa. Queda prohibida su reproducción, distribución
                  o uso sin autorización expresa.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-8">
                <AccordionTrigger>
                  8. Limitación de Responsabilidad
                </AccordionTrigger>
                <AccordionContent>
                  No nos hacemos responsables por:
                  <ul className="mt-2 list-disc pl-5">
                    <li>Daños indirectos o consecuenciales;</li>
                    <li>Pérdidas derivadas del uso del sitio web;</li>
                    <li>Errores técnicos o de contenido;</li>
                    <li>Interrupciones en el servicio.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-9">
                <AccordionTrigger>9. Ley Aplicable</AccordionTrigger>
                <AccordionContent>
                  Estos términos y condiciones se regirán e interpretarán de
                  acuerdo con las leyes de México. Cualquier controversia será
                  resuelta por los tribunales competentes de la Ciudad de
                  México.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
        <p className="mt-8 text-sm text-gray-500">
          Última actualización: {new Date().toLocaleDateString()}
        </p>
      </div>
    </>
  );
}
