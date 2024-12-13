import { Label } from "@/components/ui/label";
import { checkInStock, cn } from "@/lib/utils";
import { products } from "@wix/stores";
import { XCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProductOptionsProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
  setSelectedOptions: (options: Record<string, string>) => void;
}

export default function ProductOptions({
  product,
  selectedOptions,
  setSelectedOptions,
}: ProductOptionsProps) {
  return (
    <div className="space-y-6">
      {product.productOptions?.map((option) => (
        <fieldset key={option.name} className="space-y-3">
          <legend className="mb-2 text-lg font-semibold">{option.name}</legend>
          <div className="flex flex-wrap items-center gap-3">
            {option.choices?.map((choice) => {
              const isAvailable = checkInStock(product, {
                ...selectedOptions,
                [option.name || ""]: choice.description || "",
              });
              return (
                <TooltipProvider key={choice.description}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative">
                        <input
                          type="radio"
                          id={`${option.name}-${choice.description}`}
                          name={option.name}
                          value={choice.description}
                          checked={
                            selectedOptions[option.name || ""] ===
                            choice.description
                          }
                          onChange={() =>
                            setSelectedOptions({
                              ...selectedOptions,
                              [option.name || ""]: choice.description || "",
                            })
                          }
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`${option.name}-${choice.description}`}
                          className={cn(
                            "flex min-w-[3.5rem] cursor-pointer items-center justify-center gap-2 rounded-md border-2 px-3 py-2 text-sm transition-all",
                            "hover:bg-muted",
                            "peer-checked:border-primary peer-checked:bg-muted/10",
                            "peer-disabled:opacity-50",
                            !isAvailable &&
                              "cursor-not-allowed bg-gray-200 line-through",
                          )}
                        >
                          {option.optionType === products.OptionType.color && (
                            <span
                              className="h-5 w-5 rounded-full border shadow-sm"
                              style={{ backgroundColor: choice.value }}
                            />
                          )}
                          <span>{choice.description}</span>
                        </Label>
                        {!isAvailable && (
                          <XCircle className="absolute -right-2 -top-2 h-5 w-5 text-destructive" />
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      {isAvailable ? "Disponible" : "Agotado"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
