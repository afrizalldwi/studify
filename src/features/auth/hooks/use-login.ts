"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";
import { loginSchema, type LoginFormData } from "@/features/auth/schema";

export function useLogin() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      toast.success("Welcome back!", {
        description: "You have been signed in successfully.",
      });
      router.push("/dashboard");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error("Sign in failed", {
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
