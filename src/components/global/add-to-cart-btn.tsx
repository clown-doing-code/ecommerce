import { useAddItemToCart } from "@/hooks/cart";
import { cn } from "@/lib/utils";
import { products } from "@wix/stores";
import { ShoppingBagIcon } from "lucide-react";
import { ButtonProps } from "../ui/button";
import LoadingButton from "./loading-btn";

interface AddToCartButtonProps extends ButtonProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
  quantity: number;
}

export default function AddToCartButton({
  product,
  selectedOptions,
  quantity,
  className,
  ...props
}: AddToCartButtonProps) {
  const mutation = useAddItemToCart();

  return (
    <LoadingButton
      onClick={() =>
        mutation.mutate({
          product,
          selectedOptions,
          quantity,
        })
      }
      loading={mutation.isPending}
      className={cn("flex gap-3", className)}
      {...props}
    >
      <ShoppingBagIcon />
      Agregar al carrito
    </LoadingButton>
  );
}
