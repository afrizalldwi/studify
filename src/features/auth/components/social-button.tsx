"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SocialButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}

export function SocialButton({
  icon,
  label,
  onClick,
  className,
}: SocialButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      className={cn("w-full gap-3", className)}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </Button>
  );
}
