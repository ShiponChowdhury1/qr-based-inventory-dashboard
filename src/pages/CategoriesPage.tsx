import { Plus } from "lucide-react";
import ProductCard from "../components/cards/ProductCard";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { AddProductModal } from "../components/modals/AddProductModal";
import img from "../assets/hat.png";
import { Pagination } from "@/components/pagination/Pagination";

export interface TProduct {
  id: string;
  name: string;
  price: number;
  image: string;
}

const productData: TProduct[] = [
  {
    id: "1",
    name: "Classic Denim Jacket with Faux Shearling Lining",
    price: 89.99,
    image: img,
  },
  {
    id: "2",
    name: "Minimalist Leather Backpack for Daily Commute",
    price: 125.0,
    image: img,
  },
  {
    id: "3",
    name: "Vintage-Inspired High-Top Sneakers",
    price: 75.5,
    image: img,
  },
  {
    id: "4",
    name: "Slim-Fit Chinos in Olive Green",
    price: 59.99,
    image: img,
  },
  {
    id: "5",
    name: "Handmade Ceramic Mug Set",
    price: 32.0,
    image: img,
  },
  {
    id: "6",
    name: "Noise-Cancelling Wireless Headphones",
    price: 199.99,
    image: img,
  },
  {
    id: "7",
    name: "Stainless Steel Smartwatch with Health Tracking",
    price: 249.0,
    image: img,
  },
  {
    id: "8",
    name: "Portable Bluetooth Speaker with Long Battery Life",
    price: 65.75,
    image: img,
  },
  {
    id: "9",
    name: "Organic Cotton T-Shirt, 3-Pack",
    price: 45.0,
    image: img,
  },
  {
    id: "10",
    name: "Glass Water Bottle with Protective Silicone Sleeve",
    price: 22.5,
    image: img,
  },
  {
    id: "11",
    name: "Comfortable Memory Foam Pillow",
    price: 39.99,
    image: img,
  },
  {
    id: "12",
    name: "Stylish Sunglasses with Polarized Lenses",
    price: 55.0,
    image: img,
  },
  {
    id: "13",
    name: "Compact Digital Camera with HD Video Recording",
    price: 299.99,
    image: img,
  },
  {
    id: "14",
    name: "Eco-Friendly Reusable Grocery Bags, Set of 5",
    price: 18.0,
    image: img,
  },
  {
    id: "15",
    name: "Insulated Stainless Steel Coffee Thermos",
    price: 29.99,
    image: img,
  },
  {
    id: "16",
    name: "Water-Resistant Running Shoes",
    price: 89.5,
    image: img,
  },
  {
    id: "17",
    name: "Smartphone with 128GB Storage",
    price: 349.0,
    image: img,
  },
  {
    id: "18",
    name: "Electric Toothbrush with Smart Timer",
    price: 49.99,
    image: img,
  },
  {
    id: "19",
    name: "Luxury Scented Candle in Glass Jar",
    price: 25.0,
    image: img,
  },
];

const CategoriesPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Show 8 products per page

  const totalPages = Math.ceil(productData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = productData.slice(startIndex, endIndex);

  const handleSaveProduct = (productData: any) => {
    console.log("New product:", productData);
    // Implement your API call to save the product here
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-gray-50">
      {/* Search and Category Tabs */}
      <div className="py-4 flex justify-between items-center">
        <div className="flex items-center gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Dashboard</span>
              <span>›</span>
              <span className="text-blue-600">Categories</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-[#FFD700] text-[#003366] hover:bg-amber-400 rounded-full"
          >
            Add Product <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 `}
      >
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            onClick={() => console.log(`Clicked on product ${product.id}`)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* AddProductModal component */}
      <AddProductModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onSave={handleSaveProduct}
      />
    </div>
  );
};

export default CategoriesPage;
