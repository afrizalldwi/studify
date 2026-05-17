"use client";

import { GraduationCap } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, footer, className }: AuthCardProps) {
  return (
    <Card
      className={cn(
        "w-full sm:max-w-md border-border/50 shadow-lg shadow-black/5",
        className
      )}
    >
      <div className="flex flex-col items-center pt-8 pb-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
          <GraduationCap className="h-6 w-6 text-primary" />
        </div>
      </div>
      <CardContent className="px-6 sm:px-8 pb-4">{children}</CardContent>
      {footer && (
        <CardFooter className="justify-center px-6 sm:px-8 pb-8 pt-2">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
