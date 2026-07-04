import * as React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  let variantClasses = "";
  if (variant === "default") {
    variantClasses = "border-transparent bg-slate-900 text-slate-100 hover:bg-slate-800 focus:ring-slate-400";
  } else if (variant === "secondary") {
    variantClasses = "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80";
  } else if (variant === "destructive") {
    variantClasses = "border-transparent bg-red-500 text-slate-100 hover:bg-red-500/80";
  } else if (variant === "outline") {
    variantClasses = "text-slate-950";
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 ${variantClasses} ${className || ""}`}
      {...props}
    />
  )
}

export { Badge }
