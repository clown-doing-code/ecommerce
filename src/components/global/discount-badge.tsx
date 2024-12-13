import { products } from "@wix/stores";
import { Badge } from "../ui/badge";

interface DiscountBadgeProps {
  data: products.Discount;
}

export default function Discount({ data }: DiscountBadgeProps) {
  if (data.type !== "PERCENT") {
    return null;
  }

  return (
    <Badge variant="secondary" className="text-sm font-medium text-green-600">
      -{data.value}%
    </Badge>
  );
}
