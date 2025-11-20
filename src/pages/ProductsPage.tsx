import { useState } from "react";
import { ProductTable } from "@/components/tables/ProductTable";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const getBreadcrumbCategory = () => {
    if (selectedCategory === "all") return "All Products";
    return selectedCategory;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Product</h1>

        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <span>Dashboard</span>
          <span>›</span>
          <span>Product</span>
          <span>›</span>
          <span className="text-blue-600 font-medium">
            {getBreadcrumbCategory()}
          </span>
        </nav>
      </div>

      {/* Product Table */}
      <ProductTable
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
    </div>
  );
}
