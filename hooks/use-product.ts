import { ProductType } from "@/interfaces/product";
import { useQuery } from "@tanstack/react-query";

const fetchProducts = async (
  categoryIds?: number[]
): Promise<ProductType[]> => {
  let url = "https://api.escuelajs.co/api/v1/products";

  if (categoryIds && categoryIds.length > 0) {
    const promises = categoryIds.map((categoryId) =>
      fetch(`${url}/?categoryId=${categoryId}`).then((res) => res.json())
    );
    const results = await Promise.all(promises);
    const allProducts = results.flat();
    const uniqueProducts = allProducts.filter(
      (product, index, self) =>
        index === self.findIndex((p) => p.id === product.id)
    );
    return uniqueProducts;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};
export const useProducts = (selectedCategories?: number[]) => {
  return useQuery({
    queryKey: ["products", selectedCategories], // Include selectedCategories in query key
    queryFn: () => fetchProducts(selectedCategories),
  });
};
