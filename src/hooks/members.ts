import { wixBrowserClient } from "@/lib/wix-client.browser";
import { updateMemberInfo, UpdateMemberInfoValues } from "@/wix-api/members";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export function useUpdateMember() {
  const router = useRouter();

  return useMutation({
    mutationFn: (variables: UpdateMemberInfoValues) =>
      updateMemberInfo(wixBrowserClient, variables),
    onSuccess() {
      toast.success("Perfil actualizado");
      setTimeout(() => {
        router.refresh();
      }, 2000);
    },
    onError(error) {
      console.error(error);
      toast.error(
        "Ocurrió un error al actualizar el perfil. Por favor, intente nuevamente.",
      );
    },
  });
}
