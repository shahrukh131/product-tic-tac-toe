"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Products from "./products";
import TicTacToe from "./tic-tac-toe";

type View = "product" | "tic-tac-toe";
const Navbar = () => {
  const [view, setView] = useState<View>("product");
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white shadow px-4 py-3 flex justify-between items-center border-b">
        <div className="text-xl font-bold">IFarmer</div>
        <div className="flex gap-2 ">
          <Button
            variant={view === "product" ? "default" : "outline"}
            onClick={() => setView("product")}
            className="cursor-pointer"
          >
            Assignment-2
          </Button>
          <Button
            variant={view === "tic-tac-toe" ? "default" : "outline"}
            onClick={() => setView("tic-tac-toe")}
            className="cursor-pointer"
          >
            Assignment-1
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {view === "product" && <Products />}
        {view === "tic-tac-toe" && <TicTacToe />}
      </main>
    </div>
  );
};

export default Navbar;
