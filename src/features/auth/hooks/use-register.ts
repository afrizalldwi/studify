"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";
import { registerSchema, type RegisterFormData } from "@/features/auth/schema";

export function useRegister() {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await register(data.name, data.email, data.password);
      toast.success("Account created!", {
        description: "Welcome to Studify. Start your learning journey.",
      });
      router.push("/dashboard");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error("Registration failed", {
        description: message,
      });
    }
  };

  return {
    form,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
