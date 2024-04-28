import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../../lib/utils";

interface OtherProps extends VariantProps<typeof inputStyles> {
  label?: string;
  error?: string;
  classNames?: {
    root?: string;
  };
}

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const inputStyles = cva(
  "px-3 py-2 rounded-lg border-main outline-0 focus:ring-1 focus:ring-blue-500",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-slate-900",
        filled: "bg-slate-50 dark:bg-slate-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Input = forwardRef<HTMLInputElement, InputProps & OtherProps>(
  ({ label, error, className, variant, classNames, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col gap-1.5 w-full", classNames?.root)}>
        {label && <label className="text-sm">{label}</label>}

        <div className="gap-1 flex-col flex">
          <input className={cn(inputStyles({ className, variant }))} ref={ref} {...props} />
          <p className="h-4 text-xs text-red-500">{error}</p>
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
