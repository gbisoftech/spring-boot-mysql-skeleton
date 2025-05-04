// components/ui/button.tsx
import { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/utils"; // or use `clsx` if preferred

type Variant = "default" | "ghost" | "outline";
type Size = "default" | "icon" | "sm";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  children,
  variant = "default",
  size = "default",
  className,
  ...props
}: ButtonProps) {
  const baseStyle = "rounded transition";
  const variantStyle: Record<Variant, string> = {
    default: "bg-gray-200 hover:bg-gray-300",
    ghost: "bg-transparent hover:bg-gray-100",
    outline: "border border-gray-300",
  };
  const sizeStyle: Record<Size, string> = {
    default: "px-4 py-2 text-sm",
    icon: "p-2 w-10 h-10",
    sm: "px-3 py-1 text-xs",
  };

  return (
    <button
      className={cn(baseStyle, variantStyle[variant], sizeStyle[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
