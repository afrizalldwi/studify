"use client";

import { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface AuthInputProps extends React.ComponentProps<typeof Input> {
  label: string;
  error?: string;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Input
          ref={ref}
          id={id}
          className={cn(
            error && "border-destructive ring-destructive/20",
            className
          )}
          aria-invalid={!!error}
          {...props}
        />
        {error && (
          <p className="text-xs text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";
