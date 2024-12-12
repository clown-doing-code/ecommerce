import { products } from "@wix/stores";
import Link from "next/link";
import WixImage from "./wix-image";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import DiscountBadge from "./discount-badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ProductProps {
  product: products.Product;
}

export default function Product({ product }: ProductProps) {
  const mainImage = product.media?.mainMedia?.image;

  return (
    <Link href={`/products/${product.slug}`} className="block h-full">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden">
          <WixImage
            mediaIdentifier={mainImage?.url}
            alt={mainImage?.altText || product.name}
            width={700}
            height={700}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-2">
            {product.ribbon && (
              <Badge variant="secondary" className="text-xs font-semibold">
                {product.ribbon}
              </Badge>
            )}
            {product.discount && <DiscountBadge data={product.discount} />}
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="mb-2 text-lg font-bold leading-tight text-primary">
            {product.name}
          </h3>
          <div
            className="line-clamp-3 text-sm text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: product.description || "" }}
          />
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t p-4">
          <Badge variant="outline" className="text-base font-semibold">
            {getFormattedPrice(product)}
          </Badge>
          <span className="text-sm font-medium text-primary">Ver Detalles</span>
        </CardFooter>
      </Card>
    </Link>
  );
}

function getFormattedPrice(product: products.Product) {
  const minPrice = product.priceRange?.minValue;
  const maxPrice = product.priceRange?.maxValue;

  if (minPrice && maxPrice && minPrice !== maxPrice) {
    return `Desde ${formatCurrency(minPrice, product.priceData?.currency)}`;
  } else {
    return (
      product.priceData?.formatted?.discountedPrice ||
      product.priceData?.formatted?.price ||
      "N/A"
    );
  }
}

