import { Check, Copy } from "lucide-react";
import React, { useState } from "react";
import { cn } from "../../lib/utils";

const CopyIcon = ({ text }: { text: string | number }) => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <span
      className={cn(
        "text-slate-500 dark:text-slate-400 cursor-pointer rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-300 relative",
        isCopied &&
          "text-emerald-500 hover:bg-emerald-100 dark:hover:bg-emerald-600 dark:text-emerald-100"
      )}
      onClick={() => {
        navigator.clipboard.writeText(String(text));
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1500);
      }}
    >
      {isCopied ? <Check size={18} /> : <Copy size={18} />}

      {/* TOOLTIP */}
      {isCopied && (
        <span className="absolute -top-10 right-0 left-0 center">
          <span className="bg-slate-900 dark:bg-slate-100 font-medium dark:text-slate-800 px-3 py-2 text-slate-50 text-nowrap text-xs rounded-md">
            کپی شد!
          </span>

          {/* BOTTOM FLAG */}
          <span className="absolute -bottom-1 inset-x-0 center">
            <span className="bg-slate-900 size-2.5 rotate-45 dark:bg-slate-100" />
          </span>
        </span>
      )}
    </span>
  );
};

export default CopyIcon;
