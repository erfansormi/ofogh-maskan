import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../../lib/utils";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const buttonStyles = cva(
  "px-5 py-2 rounded-lg border-main duration-300 transition-colors outline-0 focus:ring-1 focus:ring-blue-600",
  {
    variants: {
      variant: {
        default: "bg-blue-500 text-white hover:bg-blue-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Button = forwardRef<HTMLButtonElement, ButtonProps & VariantProps<typeof buttonStyles>>(
  ({ className, variant, type = "button", ...props }, ref) => {
    return (
      <button type={type} {...props} className={cn(buttonStyles({ className, variant }))} ref={ref}>
        {props.children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
