"use client";

import { useState } from "react";
import LoadingButton from "@/components/global/loading-btn";
import WixImage from "@/components/global/wix-image";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { wixBrowserClient } from "@/lib/wix-client.browser";
import { getProductReviews } from "@/wix-api/reviews";
import { useInfiniteQuery } from "@tanstack/react-query";
import { reviews } from "@wix/reviews";
import { media as wixMedia } from "@wix/sdk";
import { products } from "@wix/stores";
import { StarIcon, ThumbsUp } from "lucide-react";
import Zoom from "react-medium-image-zoom";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

interface ProductReviewsProps {
  product: products.Product;
}

export default function ProductReviews({ product }: ProductReviewsProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["product-reviews", product._id],
      queryFn: async ({ pageParam }) => {
        if (!product._id) {
          throw Error("Product ID missing");
        }

        const pageSize = 5;

        return getProductReviews(wixBrowserClient, {
          productId: product._id,
          limit: pageSize,
          cursor: pageParam,
        });
      },
      select: (data) => ({
        ...data,
        pages: data.pages.map((page) => ({
          ...page,
          items: page.items.filter(
            (item) =>
              item.moderation?.moderationStatus ===
              reviews.ModerationModerationStatus.APPROVED,
          ),
        })),
      }),
      initialPageParam: null as string | null,
      getNextPageParam: (lastPage) => lastPage.cursors.next,
    });

  const reviewItems = data?.pages.flatMap((page) => page.items) || [];

  const averageRating =
    reviewItems.reduce(
      (acc, review) => acc + (review.content?.rating || 0),
      0,
    ) / reviewItems.length;
  const ratingCounts = reviewItems.reduce(
    (acc, review) => {
      const rating = review.content?.rating || 0;
      acc[rating] = (acc[rating] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>,
  );

  return (
    <div className="space-y-8 rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Reseñas del Producto</h2>
      {status === "pending" && <ProductReviewsLoadingSkeleton />}
      {status === "error" && (
        <p className="text-destructive">Error fetching reviews</p>
      )}
      {status === "success" && !reviewItems.length && !hasNextPage && (
        <p className="italic text-gray-500">
          Este producto aun no tiene reseñas, se el primero en dejar una.{" "}
        </p>
      )}
      {status === "success" && reviewItems.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="col-span-1">
            <div className="text-center">
              <div className="text-5xl font-bold">
                {averageRating.toFixed(1)}
              </div>
              <div className="my-2 flex justify-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className={cn(
                      "size-5",
                      i < Math.round(averageRating)
                        ? "fill-primary text-primary"
                        : "text-gray-300",
                    )}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-500">
                {reviewItems.length} reseña
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center">
                  <span className="w-24 text-sm text-gray-600">
                    {rating} estrellas
                  </span>
                  <Progress
                    value={
                      ((ratingCounts[rating] || 0) / reviewItems.length) * 100
                    }
                    className="mx-2 h-2"
                  />
                  <span className="w-12 text-right text-sm text-gray-600">
                    {ratingCounts[rating] || 0}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-2">
            <div className="space-y-6">
              {reviewItems.map((review) => (
                <Review key={review._id} review={review} />
              ))}
            </div>
            {hasNextPage && (
              <div className="mt-6 text-center">
                <LoadingButton
                  loading={isFetchingNextPage}
                  onClick={() => fetchNextPage()}
                  className="hover:bg-primary-dark bg-primary text-white"
                >
                  Cargar más
                </LoadingButton>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface ReviewProps {
  review: reviews.Review;
}

function Review({
  review: { author, reviewDate, content, reply },
}: ReviewProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="border-b pb-6 last:border-b-0">
      <div className="flex items-start space-x-4">
        <Avatar className="h-10 w-10 items-center justify-center bg-muted-foreground text-white">
          {author?.authorName ? author.authorName[0].toUpperCase() : "A"}
        </Avatar>
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">
                {author?.authorName || "Anonymous"}
              </h3>
              <div className="flex items-center space-x-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className={cn(
                      "size-4",
                      i < (content?.rating || 0)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300",
                    )}
                  />
                ))}
                {content?.title && (
                  <span className="font-medium text-gray-700">
                    {content.title}
                  </span>
                )}
              </div>
            </div>
            {reviewDate && (
              <span className="text-sm text-gray-500">
                {new Date(reviewDate).toLocaleDateString()}
              </span>
            )}
          </div>
          {content?.body && (
            <p className="mt-2 text-gray-600">{content.body}</p>
          )}
          {!!content?.media?.length && (
            <div className="mt-3 flex flex-wrap gap-2">
              {content.media.map((media) => (
                <MediaAttachment
                  key={media.image || media.video}
                  media={media}
                />
              ))}
            </div>
          )}
          <div className="mt-3 flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className={cn("text-gray-500", isLiked && "text-primary")}
              onClick={() => setIsLiked(!isLiked)}
            >
              <ThumbsUp className="mr-1 size-4" />
              Me gusta
            </Button>
          </div>
        </div>
      </div>
      {reply?.message && (
        <div className="ml-14 mt-4 rounded-lg bg-gray-100 p-4">
          <div className="mb-2 flex items-center space-x-2">
            <Avatar className="h-6 w-6 items-center justify-center bg-muted-foreground text-xs text-white">
              S
            </Avatar>
            <span className="text-sm font-semibold">Flow Shop Team</span>
          </div>
          <p className="text-sm text-gray-600">{reply.message}</p>
        </div>
      )}
    </div>
  );
}

export function ProductReviewsLoadingSkeleton() {
  return (
    <div className="space-y-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <div className="flex space-x-4" key={i}>
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-grow space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

interface MediaAttachmentProps {
  media: reviews.Media;
}

function MediaAttachment({ media }: MediaAttachmentProps) {
  if (media.image) {
    return (
      <Zoom>
        <WixImage
          mediaIdentifier={media.image}
          alt="Review media"
          scaleToFill={false}
          className="max-h-20 max-w-20 rounded-md object-cover"
        />
      </Zoom>
    );
  }

  if (media.video) {
    return (
      <video controls className="max-h-20 max-w-20 rounded-md">
        <source src={wixMedia.getVideoUrl(media.video).url} type="video/mp4" />
      </video>
    );
  }

  return <span className="text-destructive">Unsupported media type</span>;
}
