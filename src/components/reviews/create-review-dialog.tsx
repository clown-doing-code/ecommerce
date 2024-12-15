import { useCreateProductReview } from "@/hooks/reviews";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { products } from "@wix/stores";
import { CircleAlert, ImageUp, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import WixImage from "../global/wix-image";
import LoadingButton from "../global/loading-btn";
import StarRatingInput from "./start-rating";
import useMediaUpload, { MediaAttachment } from "./use-media-upload";

const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Debe tener al menos 5 caracteres")
    .max(100, "No puede tener más de 100 caracteres")
    .or(z.literal("")),
  body: z
    .string()
    .trim()
    .min(10, "Debe tener al menos 10 caracteres")
    .max(3000, "No puede tener más de 3000 caracteres")
    .or(z.literal("")),
  rating: z.number().int().min(1, "Por favor, califique este producto"),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateProductReviewDialogProps {
  product: products.Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitted: () => void;
}

export default function CreateProductReviewDialog({
  product,
  open,
  onOpenChange,
  onSubmitted,
}: CreateProductReviewDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
      rating: 0,
    },
  });

  const mutation = useCreateProductReview();

  const { attachments, startUpload, removeAttachment, clearAttachments } =
    useMediaUpload();

  const router = useRouter();

  async function onSubmit({ title, body, rating }: FormValues) {
    if (!product._id) {
      throw Error("El ID del producto está ausente");
    }

    mutation.mutate(
      {
        productId: product._id,
        title,
        body,
        rating,
        media: attachments
          .filter((m) => m.url)
          .map((m) => ({
            url: m.url!,
            type: m.file.type.startsWith("image") ? "image" : "video",
          })),
      },
      {
        onSuccess: () => {
          form.reset();
          clearAttachments();
          onSubmitted();
          setTimeout(() => {
            router.refresh();
          }, 2000);
        },
      },
    );
  }

  const uploadInProgress = attachments.some((m) => m.state === "uploading");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Escribir una reseña</DialogTitle>
          <DialogDescription>
            ¿Te gustó este producto? Comparte tus opiniones con otros clientes.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-5">
          <div className="space-y-2">
            <Label>Producto</Label>
            <div className="flex items-center gap-3">
              <WixImage
                mediaIdentifier={product.media?.mainMedia?.image?.url}
                width={50}
                height={50}
              />
              <span className="font-bold">{product.name}</span>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Calificación</FormLabel>
                    <FormControl>
                      <StarRatingInput
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Título" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensaje</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Cuéntanos sobre tu experiencia..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Escribe una reseña detallada para ayudar a otros clientes.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <div className="flex flex-wrap gap-5">
                {attachments.map((attachment) => (
                  <AttachmentPreview
                    key={attachment.id}
                    attachment={attachment}
                    onRemoveClick={removeAttachment}
                  />
                ))}
                <AddMediaButton
                  onFileSelected={startUpload}
                  disabled={
                    attachments.filter((a) => a.state !== "failed").length >= 5
                  }
                />
              </div>
              <LoadingButton
                type="submit"
                loading={mutation.isPending}
                disabled={uploadInProgress}
              >
                Enviar
              </LoadingButton>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface AddMediaButtonProps {
  onFileSelected: (file: File) => void;
  disabled: boolean;
}

function AddMediaButton({ onFileSelected, disabled }: AddMediaButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        title="Agregar archivo multimedia"
        type="button"
        disabled={disabled}
        onClick={() => fileInputRef.current?.click()}
      >
        <ImageUp />
      </Button>
      <input
        type="file"
        accept="image/*, video/*"
        ref={fileInputRef}
        className="sr-only hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          if (files.length) {
            onFileSelected(files[0]);
            e.target.value = "";
          }
        }}
      />
    </>
  );
}

interface AttachmentPreviewProps {
  attachment: MediaAttachment;
  onRemoveClick: (id: string) => void;
}

function AttachmentPreview({
  attachment: { id, file, state, url },
  onRemoveClick,
}: AttachmentPreviewProps) {
  return (
    <div
      className={cn(
        "relative h-24 w-24 overflow-hidden rounded-md",
        state === "failed" && "outline outline-2 outline-destructive",
      )}
    >
      {file.type.startsWith("image") ? (
        <WixImage
          mediaIdentifier={url}
          scaleToFill={false}
          placeholder={URL.createObjectURL(file)}
          alt="Vista previa del archivo adjunto"
          className={cn("h-full w-full object-cover", !url && "opacity-50")}
        />
      ) : (
        <video
          controls
          className={cn("h-full w-full object-cover", !url && "opacity-50")}
        >
          <source src={url || URL.createObjectURL(file)} type={file.type} />
        </video>
      )}
      {state === "uploading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Loader2 className="animate-spin text-white" />
        </div>
      )}
      {state === "failed" && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
          title="Error al subir el archivo multimedia"
        >
          <CircleAlert className="text-destructive" />
        </div>
      )}
      <button
        title="Eliminar archivo multimedia"
        type="button"
        onClick={() => onRemoveClick(id)}
        className="absolute right-1 top-1 rounded-full bg-black bg-opacity-50 p-1 transition-colors hover:bg-opacity-75"
      >
        <X size={16} className="text-white" />
      </button>
    </div>
  );
}
