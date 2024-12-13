import { wixBrowserClient } from "@/lib/wix-client.browser";

import { useMutation } from "@tanstack/react-query";
import {
  BackInStockNotificationRequestValues,
  createBackInStockNotificationRequest,
} from "@/wix-api/back-in-stock-notifications";
import { toast } from "sonner";

export function useCreateBackInStockNotificationRequest() {
  return useMutation({
    mutationFn: (values: BackInStockNotificationRequestValues) =>
      createBackInStockNotificationRequest(wixBrowserClient, values),
    onError(error) {
      console.error(error);
      if (
        (error as any).details.applicationError.code ===
        "BACK_IN_STOCK_NOTIFICATION_REQUEST_ALREADY_EXISTS"
      ) {
        toast.error(
          "Ya solicitaste ser notificado cuando este prodducto este disponible.",
        );
      } else {
        toast("Algo salió mal. Intente más tarde.");
      }
    },
  });
}
