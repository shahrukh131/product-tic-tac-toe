"use client";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow px-4 py-3 flex justify-between items-center border-b  sticky top-0 z-50 ">
      <div className="text-xl font-bold">IFarmer </div>
      <div className="flex gap-2">
        <Link href="/tic-tac-toe-app">
          <Button
            variant={pathname === "/tic-tac-toe-app" ? "default" : "outline"}
          >
            Assignment-1
          </Button>
        </Link>
        <Link href="/product-app">
          <Button
            variant={pathname === "/product-app" ? "default" : "outline"}
          >
            Assignment-2
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
