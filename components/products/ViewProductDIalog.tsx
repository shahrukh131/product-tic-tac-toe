import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Loader from "../common/Loader";
import { ProductType } from "@/interfaces/product";
import { ViewProductDialogProps } from "@/interfaces/viewProduct";



export const ViewProductDialog: React.FC<ViewProductDialogProps> = ({
  isOpen,
  onClose,
  productId,
}) => {
  const {
    data: product,
    isLoading,
    error,
  } = useQuery<ProductType>({
    queryKey: ["product", productId],
    queryFn: async () => {
      if (!productId) throw new Error("Product ID is required");

      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/${productId}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.statusText}`);
      }

      return await response.json();
    },
    enabled: !!productId && isOpen,
  });

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>

        {isLoading && (
          <div className="flex justify-center py-8">
            <Loader center />
          </div>
        )}

        {error && (
          <div className="text-center py-8 text-red-500">
            Failed to load product details. Please try again.
          </div>
        )}

        {product && (
          <div className="space-y-6">
            {product.images && product.images.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Images</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {product.images.slice(0, 4).map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`${product.title} - Image ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg border transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://via.placeholder.com/300x200?text=Image+Not+Found";
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            <div className="space-y-4">
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Product ID
                    </label>
                    <p className="text-base">{product.id}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Price
                    </label>
                    <p className="text-5xl font-semibold tracking-tight text-green-900">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-600">
                    Title
                  </label>
                  <p className="text-xl font-semibold">{product.title}</p>
                </div>

                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-600">
                    Category
                  </label>
                  <div className="mt-1">
                    <Badge variant="secondary" className="text-sm">
                      {product.category?.name || "No Category"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <Separator />
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description || "No description available."}
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
