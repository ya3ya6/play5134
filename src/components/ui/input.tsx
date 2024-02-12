import * as React from "react";

import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const InputVariants = cva("relative", {
  variants: {
    iconPosition: {
      left: "absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground",
      right:
        "absolute left-auto right-3 top-1/2 -translate-y-1/2 transform text-muted-foreground",
    },
  },
  defaultVariants: {
    iconPosition: "left",
  },
});

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof InputVariants> {
  icon?: JSX.Element;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, iconPosition, ...props }, ref) => {
    return (
      <>
        {icon ? (
          <div className="relative inline-block h-9">
            {iconPosition !== "right" && (
              <span className={cn(InputVariants({ iconPosition }))}>
                {icon}
              </span>
            )}
            <input
              type={type}
              className={cn(
                "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                className,
                iconPosition !== "right" ? "pl-10 pr-3" : "pl-3 pr-10",
              )}
              ref={ref}
              {...props}
            />
            {iconPosition === "right" && (
              <span className={cn(InputVariants({ iconPosition }))}>
                {icon}
              </span>
            )}
          </div>
        ) : (
          <input
            type={type}
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              className,
            )}
            ref={ref}
            {...props}
          />
        )}
      </>
    );
  },
);
Input.displayName = "Input";

export { Input };
