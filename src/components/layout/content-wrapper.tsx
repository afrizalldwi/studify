import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface ContentWrapperProps {
  children: ReactNode
  className?: string
}

function ContentWrapper({ children, className }: ContentWrapperProps) {
  return (
    <main
      className={cn(
        "flex-1 px-4 py-6 md:px-6 lg:px-8",
        "w-full",
        className
      )}
    >
      {children}
    </main>
  )
}

export { ContentWrapper }
