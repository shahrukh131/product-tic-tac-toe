"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Funnel } from "lucide-react";
import { useState } from "react";
import FilterList from "../FilterList";

const MobileFilter = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <SheetTrigger asChild>
        <button className="md:hidden bg-orange-500 text-white px-4 py-2 rounded-lg w-50% sm:w-auto flex items-center justify-center gap-2">
          <Funnel size={16} />
          Filters
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[85%] sm:w-[80%] max-w-md">
        <SheetHeader>
          <SheetTitle>Filter Products</SheetTitle>
        </SheetHeader>
        <div className="p-4 pb-16">
          <FilterList />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilter;
