import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import banner from "@/assets/banner/banner.jpg";

export default function Banner() {
  return (
    <div className="flex items-center bg-secondary md:h-96">
      <div className="space-y-7 p-10 text-center md:w-1/2">
        <h1 className="text-3xl font-bold md:text-4xl">
          Viste con Estilo: Tu Destino de Moda Online
        </h1>
        <p>
          Encuentra las últimas tendencias y diseños exclusivos a un clic de
          distancia.
        </p>
        <Button asChild>
          <Link href="/shop">
            Comprar Ahora <ArrowRight size={20} />
          </Link>
        </Button>
      </div>
      <div className="relative hidden h-full w-1/2 md:block">
        <Image
          loading="eager"
          src={banner}
          alt="Flow Shop banner"
          className="h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-transparent to-transparent" />
      </div>
    </div>
  );
}
