import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    let variantClasses = "";
    if (variant === "default") {
      variantClasses = "bg-slate-900 text-white hover:bg-slate-800";
    } else if (variant === "outline") {
      variantClasses = "border border-slate-700 bg-transparent hover:bg-slate-800 hover:text-slate-100";
    } else if (variant === "ghost") {
      variantClasses = "bg-transparent hover:bg-slate-800/50 hover:text-slate-100";
    } else if (variant === "link") {
      variantClasses = "bg-transparent underline-offset-4 hover:underline text-slate-900";
    }

    let sizeClasses = "h-10 py-2 px-4";
    if (size === "sm") {
      sizeClasses = "h-9 rounded-md px-3";
    } else if (size === "lg") {
      sizeClasses = "h-11 rounded-md px-8";
    } else if (size === "icon") {
      sizeClasses = "h-10 w-10";
    }

    return (
      <button
        className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${variantClasses} ${sizeClasses} ${className || ""}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
