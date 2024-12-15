import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import placeholder from "@/assets/placeholder.svg";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold">
        About Estilo Quisqueya
      </h1>

      {/* Hero Section */}
    <div className="relative mb-12 h-[400px]">
    <Image
        src={placeholder}
        alt="Colorful scene from Santo Domingo&apos;s Zona Colonial"
        className="rounded-lg object-cover"
        priority
        fill
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <p className="px-4 text-center text-2xl font-semibold text-white">
            Bringing the vibrant spirit of the Dominican Republic to your
            wardrobe
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">Nuestra Historia</h2>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="mb-4">
              Estilo Quisqueya nació de un profundo amor por la cultura
              dominicana y el deseo de compartir nuestra moda vibrante con el
              mundo. Nuestra fundadora, Luisa Medina, creció en Santiago de los
              Caballeros, rodeada de los ricos colores, patrones y texturas que
              definen el estilo dominicano.
            </p>
            <p className="mb-4">
              En 2018, después de trabajar en la industria de la moda en Nueva
              York, Luisa se dio cuenta de que faltaba una marca que realmente
              capturara la esencia de la moda dominicana contemporánea. Soñaba
              con crear una marca que no solo mostrara la belleza de la moda
              dominicana, sino que también apoyara a los artesanos locales y
              promoviera prácticas sostenibles.
            </p>
            <p>
              Con determinación y una maleta llena de ideas, Luisa regresó a la
              República Dominicana y lanzó Estilo Quisqueya. Hoy, nos
              enorgullece llevar un pedacito de nuestro paraíso caribeño a los
              dominicanos de todo el mundo y a cualquiera que aprecie nuestra
              mezcla única de estilo caribeño tradicional y contemporáneo.
            </p>
          </div>
          <div className="relative h-[400px]">
            <Image
              fill
              src={placeholder}
              alt="Luisa Medina, fundadora de Estilo Quisqueya"
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* What Makes Us Unique Section */}
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">Lo Que Nos Hace Únicos</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Diseños Auténticamente Dominicanos</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Nuestras colecciones se inspiran en el rico patrimonio cultural
                de la República Dominicana, desde las casas coloridas de la Zona
                Colonial hasta las playas prístinas de Punta Cana.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Artesanía Local</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Colaboramos con artesanos dominicanos para crear piezas únicas y
                hechas a mano que apoyan a nuestra comunidad y preservan las
                técnicas tradicionales.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Prácticas Sostenibles</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Desde el uso de materiales ecológicos hasta la implementación de
                procesos de producción éticos, estamos comprometidos con la
                protección de nuestra hermosa isla y sus recursos.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="mb-12 rounded-lg bg-primary p-8 text-primary-foreground">
        <h2 className="mb-4 text-center text-3xl font-bold">Nuestra Misión</h2>
        <p className="text-center text-xl">
          Celebrar y compartir el espíritu vibrante de la moda dominicana
          mientras empoderamos a las comunidades locales y promovemos prácticas
          sostenibles.
        </p>
      </section>

      {/* Brand Timeline */}
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">Nuestro Viaje</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-24 font-bold">2018</div>
            <div className="flex-grow border-t border-gray-300"></div>
            <div className="w-3/4">
              Luisa concibe la idea de Estilo Quisqueya mientras trabaja en
              Nueva York
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-24 font-bold">2019</div>
            <div className="flex-grow border-t border-gray-300"></div>
            <div className="w-3/4">
              Lanzamiento de la primera colección de Estilo Quisqueya en Santo
              Domingo
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-24 font-bold">2020</div>
            <div className="flex-grow border-t border-gray-300"></div>
            <div className="w-3/4">
              Expansión a ventas en línea, llegando a dominicanos en todo el
              mundo
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-24 font-bold">2021</div>
            <div className="flex-grow border-t border-gray-300"></div>
            <div className="w-3/4">
            Introducción de nuestra línea sostenible &apos;Eco-Quisqueya&apos;
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-24 font-bold">2023</div>
            <div className="flex-grow border-t border-gray-300"></div>
            <div className="w-3/4">
              Celebrando nuestro cliente número 100,000 y abriendo nuestra
              tienda insignia en Santiago
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">Conoce a Nuestro Equipo</h2>
        <div className="grid gap-6 md:grid-cols-4">
          {["Luisa Medina", "Rafael Pérez", "Carmen Díaz", "José Ramírez"].map(
            (name, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-2 h-48">
                <Image
                src={placeholder}
                alt={name}
                className="rounded-full object-cover"
                fill
                  />
                </div>
                <h3 className="font-semibold">{name}</h3>
                <p className="text-sm text-gray-600">Miembro del Equipo</p>
              </div>
            ),
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <h2 className="mb-4 text-3xl font-bold">
          Vive la Experiencia Estilo Quisqueya
        </h2>
        <p className="mb-4">
          Únete a nosotros para celebrar el estilo y la cultura dominicana.
          Descubre nuestra última colección y lleva un pedazo del Caribe a tu
          guardarropa.
        </p>
        <Button size="lg">Comprar Ahora</Button>
      </section>
    </div>
  );
}
