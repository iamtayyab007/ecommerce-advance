"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import AddProduct from "../../../../Components/Product/AddProduct";

export default function Product() {
  const pathName = usePathname();
  const isActive = (path: string) => pathName.startsWith(path);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-[250px] bg-white border-r shadow-sm flex flex-col">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2 text-gray-700 font-medium">
            <li>
              <Link
                href="/admin/product"
                className={`block px-4 py-2 rounded-lg transition ${
                  isActive("/admin/product")
                    ? "bg-green-100 text-green-800"
                    : "hover:bg-gray-100"
                }`}
              >
                🛒 Product
              </Link>
            </li>
            <li className="block px-4 py-2 rounded-lg hover:bg-gray-100">
              📂 Categories
            </li>
            <li className="block px-4 py-2 rounded-lg hover:bg-gray-100">
              👥 Customers / Users
            </li>
            <li className="block px-4 py-2 rounded-lg hover:bg-gray-100">
              📦 Orders
            </li>
            <li className="block px-4 py-2 rounded-lg hover:bg-gray-100">
              📈 Analytics
            </li>
            <li className="block px-4 py-2 rounded-lg hover:bg-gray-100">
              ⚙️ Settings
            </li>
          </ul>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8 flex justify-center items-start">
        <div className="w-full max-w-2xl">
          <AddProduct />
        </div>
      </main>
    </div>
  );
}
