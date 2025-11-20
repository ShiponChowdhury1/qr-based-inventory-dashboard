import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Mail } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { OTPVerificationModal } from "./OTPVerificationModal";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ForgotPasswordModal({
  open,
  onOpenChange,
}: ForgotPasswordModalProps) {
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setUserEmail(data.email);
      onOpenChange(false);
      setShowOTPModal(true);

      console.log("Forgot password data:", data);

      toast.success("OTP Sent", {
        description: "We've sent a verification code to your email.",
      });
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.", {
        description: "Error",
        duration: 5000,
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md p-0 bg-white rounded-lg">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-auto"
                onClick={() => onOpenChange(false)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Forgot Password
              </DialogTitle>
            </div>

            <p className="text-gray-600 mb-6">
              Please enter your email address to reset your password
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Enter Your Email
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <Mail className="h-4 w-4 text-gray-400" />
                          </div>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Enter your Email"
                            className="pl-10 bg-gray-50 border-gray-200 rounded-full h-12"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium h-12 rounded-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Sending..." : "Send OTP"}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>

      <OTPVerificationModal
        open={showOTPModal}
        onOpenChange={setShowOTPModal}
        email={userEmail}
      />
    </>
  );
}
