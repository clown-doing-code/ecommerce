"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  useCart,
  useRemoveCartItem,
  useUpdateCartItemQuantity,
} from "@/hooks/cart";
import { currentCart } from "@wix/ecom";
import {
  Loader2,
  ShoppingBag,
  X,
  ChevronRight,
  Minus,
  Plus,
} from "lucide-react";
import Link from "next/link";
import WixImage from "./wix-image";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import CheckoutButton from "./checkout-btn";

interface ShoppingCartButtonProps {
  initialData: currentCart.Cart | null;
}

export default function ShoppingCartButton({
  initialData,
}: ShoppingCartButtonProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const cartQuery = useCart(initialData);

  const totalQuantity =
    cartQuery.data?.lineItems?.reduce(
      (acc, item) => acc + (item.quantity || 0),
      0,
    ) || 0;

  return (
    <>
      <div className="ml-4 flex items-center justify-end space-x-2">
        <div className="px-4">
          <button
            onClick={() => setSheetOpen(true)}
            className="group flex items-center"
            aria-label="Open shopping cart"
          >
            <ShoppingBag className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
            {totalQuantity > 0 && (
              <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                {totalQuantity < 10 ? totalQuantity : "9+"}
              </span>
            )}
          </button>
        </div>
      </div>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="flex w-full flex-col sm:max-w-md">
          <SheetHeader className="space-y-1 border-b pb-4">
            <SheetTitle className="text-xl font-semibold">Carrito</SheetTitle>
            <p className="text-sm text-muted-foreground">
              {totalQuantity} {totalQuantity === 1 ? "producto" : "productos"}
            </p>
          </SheetHeader>
          <ScrollArea className="flex-1 px-4">
            {cartQuery.isPending && (
              <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            {cartQuery.error && (
              <p className="py-4 text-center text-sm text-destructive">
                {cartQuery.error.message}
              </p>
            )}
            {!cartQuery.isPending && !cartQuery.data?.lineItems?.length && (
              <div className="flex h-full items-center justify-center text-center">
                <div className="space-y-2">
                  <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="text-lg font-medium">Tu carrito está vacío</p>
                  <Link
                    href="/shop"
                    className="inline-flex items-center text-sm text-primary hover:underline"
                    onClick={() => setSheetOpen(false)}
                  >
                    Continuar comprando
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            )}
            {cartQuery.data?.lineItems?.map((item) => (
              <ShoppingCartItem
                key={item._id}
                item={item}
                onProductLinkClicked={() => setSheetOpen(false)}
              />
            ))}
          </ScrollArea>
          {cartQuery.data?.lineItems?.length ? (
            <div className="space-y-4 border-t pt-6">
              <div className="flex items-center justify-between text-base">
                <p className="font-semibold">Subtotal</p>
                <p className="font-semibold">
                  {/* @ts-expect-error */}
                  {cartQuery.data?.subtotal?.formattedConvertedAmount}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Impuestos y tarifas calculados al momento de realizar el pago
              </p>
              <CheckoutButton
                disabled={!totalQuantity || cartQuery.isFetching}
                className="w-full"
              />
            </div>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  );
}

interface ShoppingCartItemProps {
  item: currentCart.LineItem;
  onProductLinkClicked: () => void;
}

function ShoppingCartItem({
  item,
  onProductLinkClicked,
}: ShoppingCartItemProps) {
  const updateQuantityMutation = useUpdateCartItemQuantity();
  const removeItemMutation = useRemoveCartItem();

  const productId = item._id;
  if (!productId) return null;

  const slug = item.url?.split("/").pop();
  const quantityLimitReached =
    !!item.quantity &&
    !!item.availability?.quantityAvailable &&
    item.quantity >= item.availability.quantityAvailable;

  return (
    <Card className="mb-4 bg-gray-50">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <div className="relative flex-none">
            <Link href={`/products/${slug}`} onClick={onProductLinkClicked}>
              <WixImage
                mediaIdentifier={item.image}
                width={80}
                height={80}
                alt={item.productName?.translated || "Product image"}
                className="rounded-md object-cover"
              />
            </Link>
          </div>
          <div className="flex flex-1 flex-col space-y-1">
            <div className="flex justify-between">
              <Link
                href={`/products/${slug}`}
                onClick={onProductLinkClicked}
                className="text-sm font-medium hover:underline"
              >
                {item.productName?.translated || "Item"}
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:text-foreground"
                onClick={() => removeItemMutation.mutate(productId)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {!!item.descriptionLines?.length && (
              <p className="text-xs text-muted-foreground">
                {item.descriptionLines
                  .map(
                    (line) =>
                      line.colorInfo?.translated || line.plainText?.translated,
                  )
                  .join(", ")}
              </p>
            )}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6 rounded-full p-0"
                  disabled={item.quantity === 1}
                  onClick={() =>
                    updateQuantityMutation.mutate({
                      productId,
                      newQuantity: !item.quantity ? 0 : item.quantity - 1,
                    })
                  }
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-sm">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6 rounded-full p-0"
                  disabled={quantityLimitReached}
                  onClick={() =>
                    updateQuantityMutation.mutate({
                      productId,
                      newQuantity: !item.quantity ? 1 : item.quantity + 1,
                    })
                  }
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">
                  {item.price?.formattedConvertedAmount}
                </p>
                {item.fullPrice &&
                  item.fullPrice.amount !== item.price?.amount && (
                    <p className="text-xs text-muted-foreground line-through">
                      {item.fullPrice.formattedConvertedAmount}
                    </p>
                  )}
              </div>
            </div>
            {quantityLimitReached && (
              <p className="text-xs text-destructive">
                Cantidad máxima alcanzada
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
