import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted">
      <div className="space-y-4 text-center">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
        <h1 className="animate-pulse text-2xl font-bold text-primary">
          Cargando tus productos...
        </h1>
        <p className="text-muted-foreground">
          Estamos cargando una selección de productos acorde a tus necesidades.
          Por favor, espera un momento.
        </p>
      </div>
    </div>
  );
}
