import { env } from "@/env";
import { useCreateBackInStockNotificationRequest } from "@/hooks/back-in-stock";
import { zodResolver } from "@hookform/resolvers/zod";
import { products } from "@wix/stores";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, ButtonProps } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Bell, Mail, CheckCircle } from "lucide-react";
import LoadingButton from "./loading-btn";
import { requiredString } from "@/lib/validation";

const formSchema = z.object({
  email: requiredString.email(),
});

type FormValues = z.infer<typeof formSchema>;

interface BackInStockNotificationButtonProps extends ButtonProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
}

export default function BackInStockNotificationButton({
  product,
  selectedOptions,
  ...props
}: BackInStockNotificationButtonProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useCreateBackInStockNotificationRequest();

  async function onSubmit({ email }: FormValues) {
    mutation.mutate({
      email,
      itemUrl: env.NEXT_PUBLIC_BASE_URL + "/products/" + product.slug,
      product,
      selectedOptions,
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button {...props} className="flex w-full items-center space-x-2">
          <Bell className="h-4 w-4" />
          <span>¡Notifícame cuando esté disponible!</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-2xl">
            <Bell className="h-6 w-6" />
            <span>Notificación de disponibilidad</span>
          </DialogTitle>
          <DialogDescription className="text-base">
            Ingresa tu email y te enviaremos una notificación cuando el producto
            este disponible nuevamente.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="tu@email.com"
                        {...field}
                        className="pl-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <LoadingButton
                type="submit"
                loading={mutation.isPending}
                className="w-full"
              >
                {mutation.isPending ? "Enviando..." : "¡Notifícame!"}
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
        {mutation.isSuccess && (
          <div className="mt-4 rounded-lg bg-green-50 p-4 text-green-700">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span className="font-semibold">¡Gracias por suscribirte!</span>
            </div>
            <p className="mt-2 text-sm">
              Te notificaremos cuando el producto esté disponible.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
