import { useCartCheckout } from "@/hooks/checkout";
import LoadingButton from "./loading-btn";
import { ButtonProps } from "../ui/button";

export default function CheckoutButton(props: ButtonProps) {
  const { startCheckoutFlow, pending } = useCartCheckout();

  return (
    <LoadingButton onClick={startCheckoutFlow} loading={pending} {...props}>
      Pasar a Pagar
    </LoadingButton>
  );
}
