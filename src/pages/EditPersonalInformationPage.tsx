import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Use `useNavigate` for React Router
import { ArrowLeft, User, Phone, Camera, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

// Define schema using Zod
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

const EditPersonalInformationPage: React.FC = () => {
  const navigate = useNavigate(); // Use navigate for routing in React
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock user data - replace with actual user data from your state management
  const [userData, setUserData] = useState({
    name: "Shoron Ahmed",
    email: "shoron@gmail.com",
    phone: "+1 555 000 0000",
    profileImage: "/placeholder.svg?height=80&width=80", // Make sure your image is in the `public` folder
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData.name,
      phone: userData.phone,
    },
  });
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserData((prev) => ({
          ...prev,
          profileImage: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: FormData) => {
    // Handle form submission - update user data
    console.log("Updated user data:", { ...userData, ...data });

    // Update local state
    setUserData((prev) => ({ ...prev, ...data }));

    // Navigate back to the personal information view page
    navigate("/settings/personal-information");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8 border p-3 bg-white rounded-xl">
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-auto mr-3"
            onClick={handleBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-medium text-gray-900">
            Personal Information
          </h1>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex gap-6 items-start">
                <div className="bg-white p-8 rounded-lg shadow-sm flex-shrink-0">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <Avatar
                        className="h-20 w-20 cursor-pointer"
                        onClick={handleImageClick}
                      >
                        <AvatarImage
                          src={userData.profileImage || "/placeholder.svg"}
                          alt={userData.name}
                        />
                        <AvatarFallback className="text-lg">
                          {userData.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <button
                        type="button"
                        onClick={handleImageClick}
                        className="absolute -bottom-1 -right-1 bg-yellow-400 hover:bg-yellow-500 rounded-full p-1.5 shadow-sm"
                      >
                        <Camera className="h-3 w-3 text-black" />
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>
                    <h2 className="text-xl font-medium text-gray-900 text-center">
                      {userData.name}
                    </h2>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              {...field}
                              placeholder="Enter your name"
                              className="w-full pl-10 border-gray-200 focus:border-yellow-400 focus:ring-yellow-400"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone Field */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              {...field}
                              placeholder="Enter your phone number"
                              className="w-full pl-10 border-gray-200 focus:border-yellow-400 focus:ring-yellow-400"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-4 flex justify-end">
                    <Button
                      type="submit"
                      className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium"
                    >
                      Save Change
                      <Save className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditPersonalInformationPage;
