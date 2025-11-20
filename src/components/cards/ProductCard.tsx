import { Card, CardContent } from "../ui/card";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  onClick?: () => void;
  className?: string;
}

export function ProductCard({
  id,
  name,
  price,
  image,
  onClick,
  className,
}: ProductCardProps) {
  return (
    <Card
      className={`group cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] py-0 ${className}`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="aspect-square mb-3 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src={image}
            alt={name}
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight">
            {name}
          </h3>
          <p className="text-sm text-gray-500 font-medium">
            ${price.toFixed(2)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
