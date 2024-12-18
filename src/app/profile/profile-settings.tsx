"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { members } from "@wix/members";
import { useUpdateMember } from "@/hooks/members";
import LoadingButton from "@/components/global/loading-btn";
import Order from "@/components/global/order";
import { getUserOrders } from "@/wix-api/orders";
import { useInfiniteQuery } from "@tanstack/react-query";
import { wixBrowserClient } from "@/lib/wix-client.browser";
import Orders from "./orders";

const profileFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  lastName: z.string().min(2, {
    message: "El apellido debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, introduce una dirección de correo electrónico válida.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface MemberInfoFormProps {
  member: members.Member;
}

const orderHistory = [
  { id: "1234", date: "2023-06-15", total: 150.0, status: "Entregado" },
  { id: "1235", date: "2023-06-01", total: 89.99, status: "En tránsito" },
  { id: "1236", date: "2023-05-20", total: 200.5, status: "Entregado" },
];

export default function ProfileSettingsPage({ member }: MemberInfoFormProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: member.contact?.firstName || "",
      lastName: member.contact?.lastName || "",
      email: member.loginEmail || "",
    },
  });

  const mutation = useUpdateMember();

  function onSubmit(values: ProfileFormValues) {
    mutation.mutate(values);
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["orders"],
      queryFn: async ({ pageParam }) =>
        getUserOrders(wixBrowserClient, {
          limit: 2,
          cursor: pageParam,
        }),
      initialPageParam: null as string | null,
      getNextPageParam: (lastPage) => lastPage.metadata?.cursors?.next,
    });

  const orders = data?.pages.flatMap((page) => page.orders) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Configuración de Perfil</h1>
      <Tabs defaultValue="personal-info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal-info">Información Personal</TabsTrigger>
          <TabsTrigger value="order-history">Historial de Pedidos</TabsTrigger>
        </TabsList>
        <TabsContent value="personal-info">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>
                Actualiza tu información personal aquí. Haz clic en guardar
                cuando hayas terminado.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="María" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellido</FormLabel>
                        <FormControl>
                          <Input placeholder="González" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo Electrónico</FormLabel>
                        <FormControl>
                          <Input
                            disabled
                            placeholder="maria.gonzalez@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Este es el correo electrónico que usarás para iniciar
                          sesión y recibir notificaciones.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <LoadingButton type="submit" loading={mutation.isPending}>
                    Enviar
                  </LoadingButton>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="order-history">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Pedidos</CardTitle>
              <CardDescription>
                Aquí puedes ver un resumen de tus pedidos recientes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Orders />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
