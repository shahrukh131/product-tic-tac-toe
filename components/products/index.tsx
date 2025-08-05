
import React from "react";
import ProductList from "./ProductList";
import FilterList from "./FilterList";

import MobileFilter from "./utils/MobileFIlter";

const Products = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Product List</h1>

        <MobileFilter />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-10">
        <div className="lg:col-span-3">
          <ProductList />
        </div>
        <div className="hidden lg:block lg:col-span-1">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-md sticky top-4 h-[calc(100vh-200px)] overflow-y-auto">
            <FilterList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
