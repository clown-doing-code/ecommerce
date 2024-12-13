"use client";

import { Badge } from "@/components/ui/badge";
import { products } from "@wix/stores";
import ProductOptions from "./product-options";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { checkInStock, findVariant } from "@/lib/utils";
import ProductPrice from "./product-price";
import ProductMedia from "./product-media";
import { InfoIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// import AddToCartButton from '@/components/Buttons/add-to-cart-button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddToCartButton from "@/components/global/add-to-cart-btn";
import BackInStockNotificationButton from "@/components/global/back-in-stock-btn";

interface ProductDetailsProps {
  product: products.Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(
    product.productOptions
      ?.map((option) => ({
        [option.name || ""]: option.choices?.[0].description || "",
      }))
      ?.reduce((acc, curr) => ({ ...acc, ...curr }), {}) || {},
  );

  const selectedVariant = findVariant(product, selectedOptions);

  const inStock = checkInStock(product, selectedOptions);

  const availableQuantity =
    selectedVariant?.stock?.quantity ?? product.stock?.quantity;

  const availableQuantityExceeded =
    !!availableQuantity && quantity > availableQuantity;

  const selectedOptionsMedia = product.productOptions?.flatMap((option) => {
    const selectedChoice = option.choices?.find(
      (choice) => choice.description === selectedOptions[option.name || ""],
    );
    return selectedChoice?.media?.items ?? [];
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-10 md:flex-row lg:gap-20">
        <div className="md:w-1/2">
          <ProductMedia
            media={
              !!selectedOptionsMedia?.length
                ? selectedOptionsMedia
                : product.media?.items
            }
          />
        </div>
        <div className="space-y-6 md:w-1/2">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold lg:text-4xl">{product.name}</h1>
            {product.brand && (
              <div className="text-lg text-muted-foreground">
                {product.brand}
              </div>
            )}
            {product.ribbon && (
              <Badge className="rounded-full px-3 py-1 text-sm font-medium">
                {product.ribbon}
              </Badge>
            )}
          </div>
          {product.description && (
            <div
              dangerouslySetInnerHTML={{ __html: product.description }}
              className="prose max-w-none dark:prose-invert"
            />
          )}
          <div className="border-b border-t py-4">
            <ProductPrice product={product} selectedVariant={selectedVariant} />
          </div>
          <ProductOptions
            product={product}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />

          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-lg font-medium">
              Cantidad
            </Label>
            <div className="flex items-center gap-4">
              <Select
                name="quantity"
                value={quantity.toString()}
                onValueChange={(value) => setQuantity(Number(value))}
                disabled={!inStock}
              >
                <SelectTrigger className="w-24 text-lg">
                  <SelectValue placeholder="Cantidad" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(Math.min(10, availableQuantity || 10))].map(
                    (_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
              {!!availableQuantity && availableQuantity < 10 && (
                <span className="text-sm font-medium text-destructive">
                  Solo quedan {availableQuantity} en el inventario
                </span>
              )}
            </div>
          </div>

          {inStock ? (
            <div className="flex items-center gap-2.5">
              <AddToCartButton
                product={product}
                selectedOptions={selectedOptions}
                quantity={quantity}
                disabled={availableQuantityExceeded || quantity < 1}
                className="w-full"
              />
              {/* <BuyNowButton
                product={product}
                selectedOptions={selectedOptions}
                quantity={quantity}
                disabled={availableQuantityExceeded || quantity < 1}
              /> */}
            </div>
          ) : (
            <BackInStockNotificationButton
              product={product}
              selectedOptions={selectedOptions}
            />
          )}

          {!!product.additionalInfoSections?.length && (
            <div className="space-y-3">
              <span className="flex items-center gap-2 text-lg font-medium">
                <InfoIcon className="h-5 w-5" />
                <span>Información adicional del producto</span>
              </span>
              <Accordion
                type="single"
                collapsible
                className="rounded-lg border"
              >
                {product.additionalInfoSections.map((section) => (
                  <AccordionItem
                    value={section.title || ""}
                    key={section.title}
                    className="border-b last:border-b-0"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:bg-muted/50">
                      {section.title}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 py-3">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: section.description || "",
                        }}
                        className="prose text-sm text-muted-foreground dark:prose-invert"
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
