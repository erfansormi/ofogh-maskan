import React from "react";
import { cn } from "../../lib/utils";

type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
const Card = ({ children, className, ...props }: DivProps) => {
  return (
    <div
      className={cn(
        "p-5 rounded-lg border border-slate-300/70 dark:border-slate-700 bg-white dark:bg-slate-900",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
