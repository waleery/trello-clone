import * as React from "react"

//A component for handling slots, which are dynamic content insertion points.
import { Slot } from "@radix-ui/react-slot"

//Tools for handling component variants.
import { cva, type VariantProps } from "class-variance-authority"

//A function for combining CSS classes in a flexible manner.
import { cn } from "@/lib/utils"



// Define button variants using class-variance-authority
const buttonVariants = cva(
  // Base class for styling common properties
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      // Styles for different button variants
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        primary:'bg-sky-700 text-primary-foreground hover:bg-sky-700/90',
        transparent:'bg-transparent text-white hover:bg-white/20'
      },
      // Styles for different button sizes
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    // Default variants for the button
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  // Additional prop to render the button as a child (using Slot)
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

// Set a display name for the Button component
Button.displayName = "Button"

export { Button, buttonVariants }
