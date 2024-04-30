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
  "px-4 py-2 h-10 rounded-lg border-main duration-300 text-sm font-medium transition-colors outline-0",
  {
    variants: {
      variant: {
        default: "bg-blue-500 text-white hover:bg-blue-600",
        outline:
          "bg-white border text-slate-500 border-slate-400 hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-900/70 dark:text-slate-300",
        success:
          "bg-emerald-100 text-emerald-700 border-emerald-500 border hover:bg-emerald-200 dark:bg-emerald-700 dark:hover:bg-emerald-800 dark:text-emerald-100",
        error:
          "bg-red-100 text-red-700 border-red-500 border hover:bg-red-200 dark:bg-red-700 dark:hover:bg-red-800 dark:text-red-100",
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
