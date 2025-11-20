import { useState } from "react";
import { Trash2, Loader2, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Pagination } from "../components/pagination/Pagination";
import { DetailsModal } from "@/components/modals/DetailsModal";

// Mock customer data
const mockCustomers = [
  {
    id: "ID 12451",
    name: "Leslie Alexander",
    email: "georgia@example.com",
    phone: "+62 819 1314 1435",
    purchases: 21.78,
    address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
  },
  {
    id: "ID 12452",
    name: "Guy Hawkins",
    email: "guys@example.com",
    phone: "+62 819 1314 1435",
    purchases: 21.78,
    address: "4517 Washington Ave. Manchester, Kentucky 39495",
  },
  {
    id: "ID 12453",
    name: "Kristin Watson",
    email: "kristin@example.com",
    phone: "+62 819 1314 1435",
    purchases: 21.78,
    address: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
  },
  {
    id: "ID 12454",
    name: "Kristin Watson",
    email: "kristin@example.com",
    phone: "+62 819 1314 1435",
    purchases: 21.78,
    address: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
  },
  {
    id: "ID 12455",
    name: "Guy Hawkins",
    email: "guys@example.com",
    phone: "+62 819 1314 1435",
    purchases: 21.78,
    address: "4517 Washington Ave. Manchester, Kentucky 39495",
  },
  {
    id: "ID 12456",
    name: "Leslie Alexander",
    email: "georgia@example.com",
    phone: "+62 819 1314 1435",
    purchases: 21.78,
    address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
  },
  {
    id: "ID 12457",
    name: "Kristin Watson",
    email: "kristin@example.com",
    phone: "+62 819 1314 1435",
    purchases: 21.78,
    address: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
  },
  {
    id: "ID 12458",
    name: "Leslie Alexander",
    email: "georgia@example.com",
    phone: "+62 819 1314 1435",
    purchases: 21.78,
    address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
  },
];

export default function CustomersPage() {
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleting, setDeleting] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<
    (typeof mockCustomers)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(mockCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = mockCustomers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCustomers(paginatedCustomers.map((c) => c.id));
    } else {
      setSelectedCustomers([]);
    }
  };

  const handleSelectCustomer = (customerId: string, checked: boolean) => {
    if (checked) {
      setSelectedCustomers([...selectedCustomers, customerId]);
    } else {
      setSelectedCustomers(selectedCustomers.filter((id) => id !== customerId));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedCustomers.length === 0) return;

    setDeleting(true);

    // Simulate API delay
    setTimeout(() => {
      toast.success(
        `Successfully deleted ${selectedCustomers.length} customer(s)`
      );
      setSelectedCustomers([]);
      setDeleting(false);
    }, 500);
  };

  const handleActionClick = (customer: (typeof mockCustomers)[0]) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  const isAllSelected =
    paginatedCustomers.length > 0 &&
    selectedCustomers.length === paginatedCustomers.length;
  const isIndeterminate =
    selectedCustomers.length > 0 &&
    selectedCustomers.length < paginatedCustomers.length;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Customer
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Dashboard</span>
              <span>›</span>
              <span className="text-blue-600">Customer</span>
            </div>
          </div>

          <div className="space-y-6">
            {selectedCustomers.length > 0 && (
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-sm text-blue-700">
                  {selectedCustomers.length} customer(s) selected
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
                            isIndeterminate
                              ? "data-[state=checked]:bg-blue-500"
                              : ""
                          }
                          ref={(el) => {
                            if (el) el.indeterminate = isIndeterminate;
                          }}
                        />
                      </th>
                      <th className="text-left p-4 font-medium text-gray-900">
                        Name Customer
                      </th>
                      <th className="text-left p-4 font-medium text-gray-900">
                        Contact
                      </th>
                      <th className="text-left p-4 font-medium text-gray-900">
                        Purchases
                      </th>
                      <th className="text-left p-4 font-medium text-gray-900">
                        Address
                      </th>
                      <th className="text-left p-4 font-medium text-gray-900">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedCustomers.map((customer, index) => (
                      <tr
                        key={`${customer.id}-${index}`}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-4">
                          <Checkbox
                            checked={selectedCustomers.includes(customer.id)}
                            onCheckedChange={(checked) =>
                              handleSelectCustomer(
                                customer.id,
                                checked as boolean
                              )
                            }
                          />
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-gray-900">
                              {customer.name}
                            </p>
                            <p className="text-sm text-blue-600">
                              {customer.id}
                            </p>
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="text-gray-900">{customer.email}</p>
                            <p className="text-sm text-gray-500">
                              {customer.phone}
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-gray-900">
                          ${customer.purchases.toFixed(2)}
                        </td>
                        <td className="p-4 text-gray-900">
                          {customer.address}
                        </td>
                        <td className="p-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleActionClick(customer)}
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </main>
      </div>
      <DetailsModal
        data={selectedCustomer}
        type="customer"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
