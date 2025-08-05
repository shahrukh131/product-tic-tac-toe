// components/ui/loader.tsx
import { Loader2 } from "lucide-react";
import React from "react";

interface LoaderProps {
  size?: number;
  center?: boolean;
}

export default function Loader({ size = 24, center = false }: LoaderProps) {
  return (
    <div
      className={
        center
          ? "flex items-center justify-center h-full w-full"
          : "flex items-center gap-2"
      }
    >
      <Loader2 className="animate-spin text-muted-foreground" size={size} />
    </div>
  );
}
