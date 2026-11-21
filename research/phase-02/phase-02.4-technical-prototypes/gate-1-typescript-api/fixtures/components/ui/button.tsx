import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

/**
 * Accessible button component.
 * WARNING: Do not alter ref forwarding structure.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
          variant === 'default' && "bg-primary text-primary-foreground hover:bg-primary/90",
          variant === 'destructive' && "bg-destructive text-destructive-foreground hover:bg-destructive/90",
          size === 'default' && "h-10 px-4 py-2",
          size === 'sm' && "h-9 rounded-md px-3",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
