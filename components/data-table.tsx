"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  PaginationState,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import * as React from "react";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: boolean;
  paginationSize?: number;
  paginationSizeShow?: boolean;
  searchableField?: (keyof TData)[];
  showActionButton?: boolean;
  actionButtonName?: string;
  onActionButtonClick?: () => void;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination = false,
  paginationSize = 10,
  searchableField = [],
  paginationSizeShow = false,
  showActionButton = false,
  actionButtonName,
  onActionButtonClick,
}: DataTableProps<TData, TValue>) {
  const [paginationState, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: paginationSize,
  });

  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredData = React.useMemo(() => {
    if (searchableField.length === 0 || searchQuery.trim() === "") return data;

    return data.filter((item) =>
      searchableField.some((field) =>
        String(item[field]).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [data, searchQuery, searchableField]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      pagination: paginationState,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    ...(pagination && { getPaginationRowModel: getPaginationRowModel() }),
  });

  return (
    <div className="space-y-4">
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {searchableField.length > 0 && (
          <div className="w-full sm:w-64">
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9"
            />
          </div>
        )}

        {showActionButton && (
          <Button
            onClick={onActionButtonClick}
            className="h-9 self-start sm:self-auto cursor-pointer"
          >
            {actionButtonName || "Add Item"}
          </Button>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-2">
          <div className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <CircleArrowLeft />
            </Button>

            {Array.from({ length: table.getPageCount() }, (_, i) => (
              <Button
                key={i}
                variant={
                  table.getState().pagination.pageIndex === i
                    ? "default"
                    : "outline"
                }
                className="h-8 w-8 p-0 cursor-pointer"
                onClick={() => table.setPageIndex(i)}
              >
                {i + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <CircleArrowRight />
            </Button>

            {paginationSizeShow && (
              <Select
                value={String(table.getState().pagination.pageSize)}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent side="top">
                  {[5, 10, 20, 30, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={String(pageSize)}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
