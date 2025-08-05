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
import { ProductDialog } from "./ProductDialog"; // Updated import
import { ViewProductDialog } from "./ViewProductDIalog";

const ProductList = () => {
  const queryClient = useQueryClient();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false); // Unified dialog state
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [productToView, setProductToView] = useState<number | null>(null);
  const [productToEdit, setProductToEdit] = useState<{
    id: number;
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images?: string[];
  } | null>(null); // Match the Product interface from ProductDialog
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add'); // Dialog mode

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

  // Helper functions to open dialogs
  const openAddDialog = () => {
    setDialogMode('add');
    setProductToEdit(null);
    setIsProductDialogOpen(true);
  };

  const openEditDialog = (product: ProductType) => {
    setDialogMode('edit');
    // Transform ProductType to match Product interface expected by dialog
    const editProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      categoryId: product.category.id, // Extract categoryId from nested category
      images: product.images || [],
    };
    setProductToEdit(editProduct);
    setIsProductDialogOpen(true);
  };

  const closeProductDialog = () => {
    setIsProductDialogOpen(false);
    setProductToEdit(null);
    setDialogMode('add');
  };

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
              onClick={() => openEditDialog(row.original)} // Updated to use helper function
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
        onActionButtonClick={openAddDialog} // Updated to use helper function
      />
      
      <DeleteConfirmation
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        description="Are you sure you want to delete this product? "
        confirmButtonText="Confirm Delete"
      />
      
      {/* Unified ProductDialog for both add and edit */}
      <ProductDialog
        isOpen={isProductDialogOpen}
        onClose={closeProductDialog}
        categories={categories || []}
        product={productToEdit}
        mode={dialogMode}
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