import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ProductDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-10 md:flex-row lg:gap-20">
        <div className="md:w-1/2">
          <Skeleton className="aspect-square w-full rounded-lg" />
        </div>
        <div className="space-y-6 md:w-1/2">
          <div className="space-y-2">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-24 w-full" />
          <div className="border-b border-t py-4">
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-24" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-5 w-48" />
            </div>
          </div>
          <Skeleton className="h-12 w-full" />
          <div className="space-y-3">
            <Skeleton className="h-6 w-48" />
            <Accordion type="single" collapsible className="rounded-lg border">
              {[1, 2, 3].map((index) => (
                <AccordionItem
                  value={`item-${index}`}
                  key={index}
                  className="border-b last:border-b-0"
                >
                  <AccordionTrigger className="px-4 py-3 hover:bg-muted/50">
                    <Skeleton className="h-5 w-32" />
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3">
                    <Skeleton className="h-16 w-full" />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
