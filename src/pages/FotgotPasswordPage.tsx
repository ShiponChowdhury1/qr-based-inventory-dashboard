import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import signinImage from "@/assets/signin.png";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type TForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: TForgotPasswordFormData) => {
    try {
      console.log("Forgot Password data:", data);
      // Perform Forgot Password logic here

      navigate("/otp-verification", { state: { email: data.email } });
      form.reset();
      toast.success("OTP Send successfully!");
    } catch (error) {
      // Show error toast using Sonner
      toast.error("Failed to Forgot Password. Please check your credentials.");
    }
  };
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
        <div>
          <div className="flex items-center justify-center">
            <img
              src={signinImage}
              alt="Shopping illustration"
              className="max-w-xl h-auto"
            />
          </div>
        </div>
      </div>

      {/* Right side - Forgot Password Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Forgot Password Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Header */}
            <div className="flex items-center mb-8">
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-auto mr-3"
                onClick={handleBack}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-semibold text-gray-900">
                Forgot Password
              </h1>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            {...field}
                            type="email"
                            placeholder="Enter your email..."
                            className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-full focus:bg-white"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Forgot Password Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Sending..." : "Send OTP"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
