import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Validation schema
const productSchema = yup.object({
  title: yup
    .string()
    .required("Product name is required")
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name must not exceed 100 characters"),
  price: yup
    .number()
    .required("Price is required")
    .min(0.01, "Price must be greater than 0")
    .max(999999, "Price must not exceed 999,999"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),
  categoryId: yup
    .number()
    .required("Category is required")
    .min(1, "Please select a valid category"),
  images: yup.array().of(
    yup.string().url("Please enter a valid URL")
  ).optional(),
});

type ProductFormData = yup.InferType<typeof productSchema>;

interface Category {
  id: number;
  name: string;
}

interface AddProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  categories?: Category[];
}

export const AddProductDialog: React.FC<AddProductDialogProps> = ({
  isOpen,
  onClose,
  categories = [],
}) => {
  const queryClient = useQueryClient();

  const form = useForm<ProductFormData>({
    resolver: yupResolver<ProductFormData>(productSchema),
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      categoryId: 0,
      images: [""],
    },
  });

  const addImageField = () => {
    const currentImages = form.getValues("images") || [];
    if (currentImages.length < 3) {
      form.setValue("images", [...currentImages, ""]);
    }
  };

  const removeImageField = (index: number) => {
    const currentImages = form.getValues("images") || [];
    form.setValue("images", currentImages.filter((_, i) => i !== index));
  };

  const addProductMutation = useMutation({
    mutationFn: async (productData: ProductFormData) => {
      const response = await fetch("https://api.escuelajs.co/api/v1/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create product: ${response.statusText}`);
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product created successfully");
      form.reset();
      onClose();
    },
    onError: (error) => {
      console.error("Error creating product:", error);
      toast.error("Failed to create product. Please try again.");
    },
  });

 const onSubmit = (data: ProductFormData) => {
    // Filter out empty image URLs
    const filteredData = {
      ...data,
      images: (data.images ?? []).filter(url => url?.trim() !== ""),
    };
    addProductMutation.mutate(filteredData);
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };



  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Create a new product by filling in the details below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter product name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($) *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Category *</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    value={field.value.toString()}
                   
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter product description"
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Product Images * (Max 3)</FormLabel>
              {(form.watch("images") || []).map((_, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={`images.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input
                            placeholder="Enter image URL"
                            {...field}
                          />
                        </FormControl>
                        {(form.watch("images") ?? []).length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeImageField(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              
              {(form.watch("images") ?? []).length < 3 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addImageField}
                  className="w-full"
                >
                  Add Another Image
                </Button>
              )}
            </div>


            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={addProductMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={addProductMutation.isPending}
              >
                {addProductMutation.isPending ? "Creating..." : "Create Product"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};