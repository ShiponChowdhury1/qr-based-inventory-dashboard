import { useState, useEffect } from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { ArrowUpRight, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Pagination } from "../pagination/Pagination";
import { DetailsModal } from "../modals/DetailsModal";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  size: number;
  date: string;
  time: string;
  image: string;
}

interface ProductTableProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const mockProducts: Product[] = [
  {
    id: "021231",
    name: "Beigi Coffe (Navy)",
    category: "Hat",
    price: 20.0,
    size: 40,
    date: "04/17/23",
    time: "8:25 PM",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "021232",
    name: "Story Honzo (Cream)",
    category: "Hat",
    price: 20.0,
    size: 40,
    date: "04/17/23",
    time: "8:25 PM",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "021233",
    name: "Kanky Kitadakate (Green)",
    category: "Hat",
    price: 20.0,
    size: 40,
    date: "04/17/23",
    time: "8:25 PM",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "021234",
    name: "Story Honzo (Black)",
    category: "Hat",
    price: 20.0,
    size: 40,
    date: "04/17/23",
    time: "8:25 PM",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "021235",
    name: "Coffee Mug Classic",
    category: "Mug",
    price: 15.0,
    size: 350,
    date: "04/16/23",
    time: "7:30 PM",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "021236",
    name: "Tea Mug Premium",
    category: "Mug",
    price: 18.0,
    size: 400,
    date: "04/16/23",
    time: "7:30 PM",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "021237",
    name: "Smart Keychain Pro",
    category: "mart Keychains",
    price: 25.0,
    size: 5,
    date: "04/15/23",
    time: "6:45 PM",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "021238",
    name: "LED Keychain Light",
    category: "mart Keychains",
    price: 12.0,
    size: 3,
    date: "04/15/23",
    time: "6:45 PM",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "021239",
    name: "Canvas Tote Bag",
    category: "Bag",
    price: 30.0,
    size: 45,
    date: "04/14/23",
    time: "5:20 PM",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "021240",
    name: "Leather Messenger Bag",
    category: "Bag",
    price: 85.0,
    size: 60,
    date: "04/14/23",
    time: "5:20 PM",
    image: "/placeholder.svg?height=40&width=40",
  },
];

export function ProductTable({
  selectedCategory,
  onCategoryChange,
}: ProductTableProps) {
  const [allProducts] = useState<Product[]>(mockProducts);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [categories, setCategories] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 8;

  const fetchProducts = (page: number, category: string) => {
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      let filteredProducts = allProducts;

      if (category !== "all") {
        filteredProducts = allProducts.filter(
          (product) => product.category === category
        );
      }

      // Calculate pagination
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

      // Calculate categories count
      const categoryCount = allProducts.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      setProducts(paginatedProducts);
      setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage));
      setTotalItems(filteredProducts.length);
      setCategories(categoryCount);
      setSelectedProducts([]);
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    fetchProducts(currentPage, selectedCategory);
  }, [currentPage, selectedCategory]);

  const handleCategoryClick = (category: string) => {
    onCategoryChange(category);
    setCurrentPage(1);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(products.map((product) => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts((prev) => [...prev, productId]);
    } else {
      setSelectedProducts((prev) => prev.filter((id) => id !== productId));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProducts.length === 0) return;

    setDeleting(true);

    // Simulate API delay
    setTimeout(() => {
      toast.success(
        `Successfully deleted ${selectedProducts.length} product(s)`
      );

      // If current page becomes empty after deletion, go to previous page
      const remainingItems = totalItems - selectedProducts.length;
      const maxPage = Math.ceil(remainingItems / itemsPerPage);
      const newPage =
        currentPage > maxPage ? Math.max(1, maxPage) : currentPage;

      setCurrentPage(newPage);
      fetchProducts(newPage, selectedCategory);
      setDeleting(false);
    }, 500);
  };

  const handleActionClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const isAllSelected =
    products.length > 0 && selectedProducts.length === products.length;
  const isIndeterminate =
    selectedProducts.length > 0 && selectedProducts.length < products.length;

  // Category tabs data
  const categoryTabs = [
    {
      key: "all",
      label: "All",
      count: Object.values(categories).reduce((sum, count) => sum + count, 0),
    },
    { key: "Hat", label: "Hat", count: categories["Hat"] || 0 },
    { key: "Mug", label: "Mug", count: categories["Mug"] || 0 },
    {
      key: "mart Keychains",
      label: "mart Keychains",
      count: categories["mart Keychains"] || 0,
    },
    { key: "Bag", label: "Bag", count: categories["Bag"] || 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="bg-gray-50 rounded-lg p-1 flex gap-1 overflow-x-auto">
        {categoryTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleCategoryClick(tab.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === tab.key
                ? "bg-blue-500 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-white"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Bulk Actions */}
      {selectedProducts.length > 0 && (
        <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <span className="text-sm text-blue-700">
            {selectedProducts.length} product(s) selected
          </span>
          <Button
            onClick={handleBulkDelete}
            disabled={deleting}
            variant="destructive"
            size="sm"
            className="ml-auto"
          >
            {deleting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected
              </>
            )}
          </Button>
        </div>
      )}

      {/* Product Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="w-12 p-4">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                    className={
                      isIndeterminate ? "data-[state=checked]:bg-blue-500" : ""
                    }
                    ref={(el) => {
                      if (el) el.indeterminate = isIndeterminate;
                    }}
                  />
                </th>
                <th className="text-left p-4 font-medium text-gray-900">
                  Product
                </th>
                <th className="text-left p-4 font-medium text-gray-900">
                  Price
                </th>
                <th className="text-left p-4 font-medium text-gray-900">
                  Size
                </th>
                <th className="text-left p-4 font-medium text-gray-900">
                  Date
                </th>
                <th className="text-left p-4 font-medium text-gray-900">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                    <p className="text-gray-500">Loading products...</p>
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={(checked) =>
                          handleSelectProduct(product.id, checked as boolean)
                        }
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">
                            {product.name}
                          </p>
                          <p className="text-sm text-blue-600">{product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-900">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="p-4 text-gray-900">{product.size}</td>
                    <td className="p-4 text-gray-500">
                      <div>
                        <p>{product.date}</p>
                        <p className="text-sm">at {product.time}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleActionClick(product)}
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Product Details */}
      <DetailsModal
        data={selectedProduct}
        type="product"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
