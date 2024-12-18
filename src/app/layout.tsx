import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ReactQueryProvider from "./react-query-provider";
import { Toaster } from "@/components/ui/sonner";

const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Ecommerce",
    absolute: "Ecommerce",
  },
  description: "Una tienda online",
  //TODO: Cambiar titulo y descripcion cuando este terminado
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lora.className} antialiased`}>
        <ReactQueryProvider>
          <Navbar />
          <div className="min-[50vh]">{children}</div>
          <Footer />
        </ReactQueryProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
