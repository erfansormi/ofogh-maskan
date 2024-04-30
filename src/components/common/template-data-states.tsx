import { ReactNode } from "react";
import Skeleton from "../ui/skeleton";
import { ShieldAlert, TriangleAlert } from "lucide-react";
import { cn } from "../../lib/utils";

interface Props {
  isError?: boolean;
  classNames?: {
    root?: string;
    skeleton?: string;
  };
  error?: string | null;
  isLoading?: boolean;
  children: ReactNode;
  isDataEmpty?: boolean;
  loadingItemsCount?: number;
}

const TemplateDataStates = (props: Props) => {
  const { loadingItemsCount = 10, isDataEmpty = false, isError = false, isLoading = false } = props;

  return (
    <div
      className={cn(
        "lg:grid-cols-4 grid-cols-2 xl:grid-cols-5 grid gap-5 w-full",
        props.classNames?.root
      )}
    >
      {
        // LOADING
        isLoading ? (
          [...Array(loadingItemsCount)].map((_, i) => (
            <Skeleton key={i} className={cn("h-32 w-full", props.classNames?.skeleton)} />
          ))
        ) : // ERROR
        isError || props.error ? (
          <div className="col-span-full center flex-col gap-4 text-red-500 text-lg font-medium">
            <div>
              <TriangleAlert size={60} />
            </div>
            <p>{props.error || "خطا در دریافت اطلاعات!"}</p>
          </div>
        ) : // DATA EMPTY
        isDataEmpty ? (
          <div className="col-span-full center flex-col gap-4 text-slate-500 text-lg font-medium">
            <div>
              <ShieldAlert size={60} />
            </div>
            <p>دیتایی جهت نمایش وجود ندارد!</p>
          </div>
        ) : (
          // DATA
          props.children
        )
      }
    </div>
  );
};

export default TemplateDataStates;
