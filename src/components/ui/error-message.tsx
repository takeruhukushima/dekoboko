import * as React from "react"
import { cn } from "@/lib/utils"
import { useFormContext } from "react-hook-form"

const ErrorMessage = React.forwardRef<
  React.ElementRef<"p">,
  React.ComponentPropsWithoutRef<"p">
>(({ className, children, ...props }, ref) => {
  const { formState } = useFormContext();

  if (!formState.errors) {
    return null;
  }

  return (
    <p
      ref={ref}
      className={cn("text-xs text-red-600", className)}
      {...props}
    >
      {children}
    </p>
  );
})
ErrorMessage.displayName = "ErrorMessage";

export { ErrorMessage }
