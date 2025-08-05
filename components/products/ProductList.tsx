import React, { useState } from "react";
import { DataTable } from "../data-table";
import { ColumnDef } from "@tanstack/react-table";
import { ProductType } from "@/interfaces/product";
import { useProducts } from "@/hooks/use-product";
import { useAppSelector } from "@/store/hooks";
import { Delete, Edit, Eye, Trash } from "lucide-react";
import Loader from "../common/Loader";
import { DeleteConfirmation } from "../common/DeleteConfirmation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AddProductDialog } from "./AddProductDialog";
import { ViewProductDialog } from "./ViewProductDIalog";

const ProductList = () => {
  const queryClient = useQueryClient();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [productToView, setProductToView] = useState<number | null>(null);
  // Fetch categories for the dialog
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/categories"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      return await response.json();
    },
  });
  const selectedCategories = useAppSelector(
    (state) => state.categoryFilter.selectedCategories
  );
  const { data, isLoading, error } = useProducts(selectedCategories);

  const deleteProductMutation = useMutation({
    mutationFn: async (productId: number) => {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete product: ${response.statusText}`);
      }

      return await response.json();
    },
    onSuccess: (data, productId) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
      toast.success("Product deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
    },
  });
  if (isLoading)
    return (
      <div className="p-6">
        <Loader center />
      </div>
    );

  const columns: ColumnDef<ProductType>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "title",
      header: "Product Name",
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        return <span>{row.original.category.name}</span>;
      },
    },
    {
      accessorKey: "price",
      header: "Price ($)",
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Eye
              className="cursor-pointer text-blue-500"
              onClick={() => {
                setProductToView(row.original.id);
                setIsViewDialogOpen(true);
              }}
              size={16}
            />
            <Edit
              className="cursor-pointer text-amber-500"
              onClick={() => {
                console.log("Edit product:", row.original.id);
              }}
              size={16}
            />
            <Trash
              className="cursor-pointer text-red-500"
              onClick={() => {
                setProductToDelete(row.original.id);
                setIsDeleteDialogOpen(true);
              }}
              size={16}
            />
          </div>
        );
      },
    },
  ];
  const handleDelete = async () => {
    if (!productToDelete) return;
    deleteProductMutation.mutate(productToDelete);
  };
  return (
    <div>
      <DataTable
        columns={columns}
        data={data ?? []}
        pagination
        paginationSize={10}
        searchableField={["title"]}
        showActionButton
        actionButtonName="Add Product"
        onActionButtonClick={() => setIsAddDialogOpen(true)} // Open dialog
      />
      <DeleteConfirmation
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        description="Are you sure you want to delete this product? "
        confirmButtonText="Confirm Delete"
      />
      <AddProductDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        categories={categories || []}
      />
      <ViewProductDialog
        isOpen={isViewDialogOpen}
        onClose={() => {
          setIsViewDialogOpen(false);
          setProductToView(null);
        }}
        productId={productToView}
      />
    </div>
  );
};

export default ProductList;
