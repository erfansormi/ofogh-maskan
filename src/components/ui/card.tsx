import React from "react";
import { cn } from "../../lib/utils";

type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
const Card = ({ children, className, ...props }: DivProps) => {
  return (
    <div
      className={cn("p-5 rounded-lg border border-slate-200 dark:border-slate-700", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
