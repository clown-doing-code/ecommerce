import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StarRatingInputProps {
  value: number;
  onChange: (value: number) => void;
}

export default function StarRatingInput({
  value,
  onChange,
}: StarRatingInputProps) {
  const [hoverValue, setHoverValue] = useState(0);
  const ratingsText = ["Terrible", "Malo", "Regular", "Bueno", "Excelente"];

  return (
    <TooltipProvider>
      <div className="flex flex-col items-start space-y-2">
        <div className="flex items-center space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onChange(i + 1)}
                  onMouseEnter={() => setHoverValue(i + 1)}
                  onMouseLeave={() => setHoverValue(0)}
                  type="button"
                  className="p-1 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label={`Rate ${i + 1} out of 5 stars`}
                >
                  <StarIcon
                    className={cn(
                      "size-8 transition-colors",
                      i < value || i < hoverValue
                        ? "fill-primary text-primary"
                        : "fill-gray-200 text-gray-200",
                      "hover:fill-primary-400 hover:text-primary",
                    )}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-primary text-primary-foreground"
              >
                {ratingsText[i]}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        <span className="text-sm font-medium text-gray-700" aria-live="polite">
          {value > 0
            ? `Your rating: ${ratingsText[value - 1]}`
            : "Select a rating"}
        </span>
      </div>
    </TooltipProvider>
  );
}
