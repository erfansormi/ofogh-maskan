import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { inputStyles } from "./input";

interface OtherProps extends VariantProps<typeof inputStyles> {
  label?: string;
  error?: string;
  classNames?: {
    root?: string;
  };
}

type TextareaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps & OtherProps>(
  ({ label, error, className, variant, classNames, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col gap-1.5 w-full", classNames?.root)}>
        {label && <label className="text-sm">{label}</label>}

        <div className="gap-1 flex-col flex">
          <textarea
            className={cn("min-h-32", inputStyles({ className, variant }))}
            ref={ref}
            {...props}
          />
          <p className="h-4 indent-1 text-xs text-red-500">{error}</p>
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
