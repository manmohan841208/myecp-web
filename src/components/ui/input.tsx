import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 px-1 border-[1.35px]  rounded text-sm focus:outline-none w-full min-w-0",
        className
      )}
      {...props}
    />
  )
}

export { Input }
