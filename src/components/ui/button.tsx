import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { LoaderCircle } from "lucide-react";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface OtherProps extends VariantProps<typeof buttonStyles> {
  loading?: boolean;
}

const buttonStyles = cva(
  "px-4 py-2 rounded-lg border-main duration-300 transition-colors outline-0 focus:ring-1 focus:ring-blue-600",
  {
    variants: {
      variant: {
        default: "bg-blue-500 text-white hover:bg-blue-600",
        outline: "bg-white border text-slate-500 border-slate-400",
      },
      width: {
        default: "",
        md: "min-w-32",
        lg: "min-w-36",
      },
    },
    defaultVariants: {
      variant: "default",
      width: "default",
    },
  }
);

const Button = forwardRef<HTMLButtonElement, ButtonProps & OtherProps>(
  ({ className, variant, type = "button", width, loading, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        {...props}
        disabled={disabled}
        className={cn(disabled && "opacity-65", buttonStyles({ className, variant, width }))}
      >
        {loading ? (
          <span className="animate-spin center">
            <LoaderCircle />
          </span>
        ) : (
          props.children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
