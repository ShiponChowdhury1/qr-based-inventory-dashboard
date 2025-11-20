import type React from "react";
import { useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (product: ProductFormData) => void;
}

interface ProductFormData {
  category: string;
  name: string;
  description: string;
  price: string;
  image?: File;
}

export function AddProductModal({
  open,
  onOpenChange,
  onSave,
}: AddProductModalProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    category: "",
    name: "",
    description: "",
    price: "",
  });
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const categories = ["Hat", "Mug", "Keychains", "Bag"];

  const handleInputChange = (field: keyof ProductFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setSelectedImage(file);
        setFormData((prev) => ({ ...prev, image: file }));
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSave = () => {
    if (formData.category && formData.name && formData.price) {
      console.log("formData:", formData);
      onSave(formData);
      // Reset form
      setFormData({
        category: "",
        name: "",
        description: "",
        price: "",
      });
      setSelectedImage(null);
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    setFormData({
      category: "",
      name: "",
      description: "",
      price: "",
    });
    setSelectedImage(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Add Product
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-4 h-6 w-6 p-0"
            onClick={handleClose}
          ></Button>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Product Category */}
          <div className="space-y-2">
            <Select
              value={formData.category}
              onValueChange={(value) => handleInputChange("category", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Product Name */}
          <div className="space-y-2">
            <Input
              placeholder="Product name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Textarea
              placeholder="Details"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Input
              placeholder="Price: $45"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              className="w-full"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? "border-blue-400 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <Upload className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Upload Image
                  </h3>
                  {selectedImage ? (
                    <p className="text-sm text-gray-600 mt-1">
                      {selectedImage.name}
                    </p>
                  ) : (
                    <>
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <span className="text-sm text-gray-600 underline">
                          Select File
                        </span>
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          accept="image/jpeg,image/png,image/jpg"
                          onChange={handleFileSelect}
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-2">
                        Supported formats: JPEG, PNG, JPG (mobile phone photos)
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            className="w-full rounded-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium"
            disabled={
              !formData.category ||
              !formData.name ||
              !formData.price ||
              !selectedImage
            }
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
