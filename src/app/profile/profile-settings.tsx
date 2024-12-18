"use client";

import LoadingButton from "@/components/global/loading-btn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUpdateMember } from "@/hooks/members";
import { zodResolver } from "@hookform/resolvers/zod";
import { members } from "@wix/members";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
