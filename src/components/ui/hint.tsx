import * as React from "react"
import { cn } from "@/lib/utils"

const Hint = React.forwardRef<
  React.ElementRef<"p">,
  React.ComponentPropsWithoutRef<"p">
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-500 dark:text-gray-400", className)}
    {...props}
  />
))
Hint.displayName = "Hint"

export { Hint }
