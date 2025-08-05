import React from "react";
import ProductList from "./ProductList";
import FilterList from "./FilterList";

const Products = () => {
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-2 lg:px-10 py-10">
      <h1 className="text-2xl font-bold mb-6">Product List</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <ProductList />
        </div>

        <div className="md:col-span-1 ">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-md sticky top-4 h-[calc(100vh-300px)] overflow-y-auto">
            <FilterList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
