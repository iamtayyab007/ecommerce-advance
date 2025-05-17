"use client";

import Link from "next/link";
import React from "react";

export default function AdminDashboard() {
  return (
    <>
      <div className="bg-white shadow-md w-[250px] min-h-screen border-r">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        </div>
        <ul className="flex flex-col gap-4 p-6 text-gray-700 font-medium">
          <li className="hover:bg-gray-100 px-3 py-2 rounded-lg transition cursor-pointer">
            <Link href="/admin/product">🛒 Product</Link>
          </li>
          <li className="hover:bg-gray-100 px-3 py-2 rounded-lg transition cursor-pointer">
            📂 Categories
          </li>
          <li className="hover:bg-gray-100 px-3 py-2 rounded-lg transition cursor-pointer">
            👥 Customers / Users
          </li>
          <li className="hover:bg-gray-100 px-3 py-2 rounded-lg transition cursor-pointer">
            📦 Orders
          </li>
          <li className="hover:bg-gray-100 px-3 py-2 rounded-lg transition cursor-pointer">
            📈 Analytics
          </li>
          <li className="hover:bg-gray-100 px-3 py-2 rounded-lg transition cursor-pointer">
            ⚙️ Settings
          </li>
        </ul>
      </div>
    </>
  );
}
