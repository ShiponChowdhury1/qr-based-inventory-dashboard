export interface Product {
  id: string;
  _id?: string;
  name: string;
  category: string | { _id: string; name: string };
  price: number | string;
  size: number;
  date?: string;
  time?: string;
  createdAt?: string;
  updatedAt?: string;
  image: string;
  description?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  purchases: number;
  address: string;
}

export interface ProductFormData {
  category: string;
  name: string;
  description: string;
  price: string;
  image?: File;
}

export interface AddProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (product: ProductFormData, productId?: string) => void;
  editMode?: boolean;
  isLoading?: boolean;
  initialData?: {
    id: string;
    category: string;
    categoryId?: string;
    name: string;
    description?: string;
    price: number | string;
    image?: string;
  };
}

export interface DetailsModalProps {
  data: Product | Customer | null;
  type: "product" | "customer";
  isOpen: boolean;
  onClose: () => void;
}

export interface ProductTableProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
  maxVisiblePages?: number;
}
