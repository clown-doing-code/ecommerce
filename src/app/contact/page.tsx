"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
interface ContactFormData {
fullName: string;
email: string;
phone: string;
orderNumber: string;
inquiryType: string;
message: string;
}

export default function PaginaDeContacto() {
const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    phone: "",
    orderNumber: "",
    inquiryType: "",
    message: "",
  });

const handleChange = (
e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } }
) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    // Reset form after submission
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      orderNumber: "",
      inquiryType: "",
      message: "",
    });
    alert("¡Gracias por tu mensaje. ¡Nos pondremos en contacto pronto!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">Contáctanos</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Envíanos un Mensaje</CardTitle>
            <CardDescription>
              Estamos aquí para responder cualquier duda que tengas.{" "}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nombre Completo</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Dirección de Correo Electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Número de Teléfono (opcional)</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="orderNumber">
                  Número de Pedido (si aplica)
                </Label>
                <Input
                  id="orderNumber"
                  name="orderNumber"
                  value={formData.orderNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inquiryType">Tipo de Consulta</Label>
                <Select
                  name="inquiryType"
                  onValueChange={(value) =>
                    handleChange({ target: { name: "inquiryType", value } })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un tipo de consulta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="order-status">
                      Estado del Pedido
                    </SelectItem>
                    <SelectItem value="returns">
                      Devoluciones e Intercambios
                    </SelectItem>
                    <SelectItem value="product-info">
                      Información del Producto
                    </SelectItem>
                    <SelectItem value="shipping">Envíos y Entregas</SelectItem>
                    <SelectItem value="other">Otros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Enviar Mensaje
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>soporte@tutienda.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span>1-800-123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span>Lun-Vie: 9am-5pm EST</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>Calle Moda 123, Ciudad Estilo, EST 12345</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preguntas Frecuentes</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>¿Cuánto tarda el envío?</AccordionTrigger>
                  <AccordionContent>
                    El envío estándar generalmente tarda de 3 a 5 días hábiles.
                    Hay opciones de envío express disponibles al momento de
                    pagar.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    ¿Cuál es su política de devoluciones?
                  </AccordionTrigger>
                  <AccordionContent>
                    Ofrecemos una política de devoluciones de 30 días para
                    artículos sin usar y en condiciones originales. Visite
                    nuestra página de Devoluciones para más detalles.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    ¿Ofrecen envíos internacionales?
                  </AccordionTrigger>
                  <AccordionContent>
                    Sí, enviamos a muchos países en todo el mundo. Los costos y
                    tiempos de envío varían según la ubicación.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    ¿Cómo puedo rastrear mi pedido?
                  </AccordionTrigger>
                  <AccordionContent>
                    Una vez que se envíe su pedido, recibirá un número de
                    seguimiento por correo electrónico. También puede verificar
                    el estado de su pedido en su panel de cuenta.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tiempo de Respuesta</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Nos esforzamos por responder a todas las consultas dentro de las
                24 horas durante los días hábiles. Para asuntos urgentes, por
                favor llame a nuestra línea de soporte.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
