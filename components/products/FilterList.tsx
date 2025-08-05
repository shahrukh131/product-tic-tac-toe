"use client";

import { useCategories } from "@/hooks/use-category";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { ListFilter } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleCategory } from "@/store/slices/categoryFilterSlice";
import Loader from "../common/Loader";

const FilterList = () => {
  const { data, isLoading, error } = useCategories();
  const dispatch = useAppDispatch();
  const selectedCategories = useAppSelector(
    (state) => state.categoryFilter.selectedCategories
  );

  if (isLoading) return <div className="p-6"><Loader center/></div>;
  if (error)
    return <div className="p-6 text-red-500">Error loading categories</div>;

  const handleCheckboxChange = (id: number, checked: boolean) => {
    dispatch(toggleCategory(id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold flex">
        <ListFilter className="mx-2" />
        Filter by Category
      </h2>
      <div className="flex flex-col gap-3">
        {data?.map((category) => (
          <label
            key={category.id}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Checkbox
              checked={selectedCategories.includes(category.id)}
              onCheckedChange={(checked) =>
                handleCheckboxChange(category.id, checked as boolean)
              }
              id={`cat-${category.id}`}
            />
            <span className="text-sm capitalize">{category.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterList;
