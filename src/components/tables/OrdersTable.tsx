import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trash2, Loader2 } from "lucide-react";
import { Pagination } from "@/components/pagination/Pagination";
import { toast } from "sonner";

interface Order {
  id: string;
  orderId: string;
  product: string;
  date: string;
  customer: {
    name: string;
    avatar?: string;
  };
  status: "delivered" | "canceled";
  amount: number;
}

interface OrdersResponse {
  orders: Order[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

const fetchOrders = async (
  page: number,
  limit = 6
): Promise<OrdersResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const mockOrders: Order[] = [
    {
      id: "1",
      orderId: "#25426",
      product: "Lorem Ipsum",
      date: "Nov 8th, 2023",
      customer: {
        name: "Kavin",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "delivered",
      amount: 200.0,
    },
    {
      id: "2",
      orderId: "#25425",
      product: "Lorem Ipsum",
      date: "Nov 7th, 2023",
      customer: {
        name: "Komael",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "canceled",
      amount: 200.0,
    },
    {
      id: "3",
      orderId: "#25424",
      product: "Lorem Ipsum",
      date: "Nov 6th, 2023",
      customer: {
        name: "Nikhil",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "delivered",
      amount: 200.0,
    },
    {
      id: "4",
      orderId: "#25423",
      product: "Lorem Ipsum",
      date: "Nov 5th, 2023",
      customer: {
        name: "Shivam",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "canceled",
      amount: 200.0,
    },
    {
      id: "5",
      orderId: "#25422",
      product: "Lorem Ipsum",
      date: "Nov 4th, 2023",
      customer: {
        name: "Shadab",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "delivered",
      amount: 200.0,
    },
    {
      id: "6",
      orderId: "#25421",
      product: "Lorem Ipsum",
      date: "Nov 2nd, 2023",
      customer: {
        name: "Yogesh",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "delivered",
      amount: 200.0,
    },
    // Add more mock data for pagination testing
    {
      id: "7",
      orderId: "#25420",
      product: "Lorem Ipsum",
      date: "Nov 1st, 2023",
      customer: {
        name: "Arjun",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "delivered",
      amount: 200.0,
    },
    {
      id: "8",
      orderId: "#25419",
      product: "Lorem Ipsum",
      date: "Oct 31st, 2023",
      customer: {
        name: "Priya",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "canceled",
      amount: 200.0,
    },
    {
      id: "9",
      orderId: "#25418",
      product: "Lorem Ipsum",
      date: "Oct 30th, 2023",
      customer: {
        name: "Rahul",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "delivered",
      amount: 200.0,
    },
    {
      id: "10",
      orderId: "#25417",
      product: "Lorem Ipsum",
      date: "Oct 29th, 2023",
      customer: {
        name: "Anita",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "delivered",
      amount: 200.0,
    },
    {
      id: "11",
      orderId: "#25416",
      product: "Lorem Ipsum",
      date: "Oct 28th, 2023",
      customer: {
        name: "Vikram",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "canceled",
      amount: 200.0,
    },
    {
      id: "12",
      orderId: "#25415",
      product: "Lorem Ipsum",
      date: "Oct 27th, 2023",
      customer: {
        name: "Sneha",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "delivered",
      amount: 200.0,
    },
  ];

  const totalCount = mockOrders.length;
  const totalPages = Math.ceil(totalCount / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const orders = mockOrders.slice(startIndex, endIndex);

  return {
    orders,
    totalCount,
    totalPages,
    currentPage: page,
  };
};

const deleteOrders = async (orderIds: string[]): Promise<void> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  console.log("[v0] Deleting orders:", orderIds);
};

export function OrdersTable() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const itemsPerPage = 6;

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      try {
        const response = await fetchOrders(currentPage, itemsPerPage);
        setOrders(response.orders);
        setTotalPages(response.totalPages);
        setTotalCount(response.totalCount);
        // Clear selections when page changes
        setSelectedOrders([]);
      } catch (error) {
        console.error("[v0] Error fetching orders:", error);
        toast.error("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [currentPage]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(orders.map((order) => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders((prev) => [...prev, orderId]);
    } else {
      setSelectedOrders((prev) => prev.filter((id) => id !== orderId));
    }
  };

  const handleBulkDelete = async () => {
    setDeleting(true);
    try {
      await deleteOrders(selectedOrders);

      toast.success(
        `${selectedOrders.length} order(s) have been deleted successfully.`
      );

      // Reload current page data after deletion
      const response = await fetchOrders(currentPage, itemsPerPage);
      setOrders(response.orders);
      setTotalPages(response.totalPages);
      setTotalCount(response.totalCount);
      setSelectedOrders([]);

      // If current page is empty and not the first page, go to previous page
      if (response.orders.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error("[v0] Error deleting orders:", error);
      toast.error("Failed to delete orders. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const isAllSelected =
    orders.length > 0 && selectedOrders.length === orders.length;
  const isIndeterminate =
    selectedOrders.length > 0 && selectedOrders.length < orders.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Recent Orders</h2>
          <p className="text-sm text-muted-foreground">
            {loading ? "Loading..." : `${totalCount} total orders`}
          </p>
        </div>
        {selectedOrders.length > 0 && (
          <Button
            variant="destructive"
            size="sm"
            onClick={handleBulkDelete}
            disabled={deleting}
            className="flex items-center gap-2"
          >
            {deleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            Delete {selectedOrders.length} order
            {selectedOrders.length > 1 ? "s" : ""}
          </Button>
        )}
      </div>

      <div className="rounded-lg border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                    disabled={loading}
                    aria-label="Select all orders"
                    {...(isIndeterminate && { "data-state": "indeterminate" })}
                  />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Product
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Order ID
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Date
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Customer Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Status
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-muted-foreground">
                        Loading orders...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="p-8 text-center text-muted-foreground"
                  >
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b transition-colors hover:bg-muted/50"
                  >
                    <td className="p-4 align-middle">
                      <Checkbox
                        checked={selectedOrders.includes(order.id)}
                        onCheckedChange={(checked) =>
                          handleSelectOrder(order.id, checked as boolean)
                        }
                        disabled={deleting}
                        aria-label={`Select order ${order.orderId}`}
                      />
                    </td>
                    <td className="p-4 align-middle font-medium">
                      {order.product}
                    </td>
                    <td className="p-4 align-middle text-muted-foreground">
                      {order.orderId}
                    </td>
                    <td className="p-4 align-middle text-muted-foreground">
                      {order.date}
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={order.customer.avatar || "/placeholder.svg"}
                            alt={order.customer.name}
                          />
                          <AvatarFallback>
                            {order.customer.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">
                          {order.customer.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <Badge
                        variant={
                          order.status === "delivered" ? "default" : "secondary"
                        }
                        className={
                          order.status === "delivered"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                        }
                      >
                        <div
                          className={`mr-1 h-2 w-2 rounded-full ${
                            order.status === "delivered"
                              ? "bg-green-600"
                              : "bg-yellow-600"
                          }`}
                        />
                        {order.status === "delivered"
                          ? "Delivered"
                          : "Canceled"}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle font-medium">
                      ${order.amount.toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {!loading && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
