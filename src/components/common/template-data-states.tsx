import { ReactNode } from "react";
import Skeleton from "../ui/skeleton";
import { ShieldAlert, TriangleAlert } from "lucide-react";

interface Props {
  error?: string | null;
  isError?: boolean;
  isLoading?: boolean;
  children: ReactNode;
  isDataEmpty?: boolean;
  loadingItemsCount?: number;
}

const TemplateDataStates = (props: Props) => {
  const { loadingItemsCount = 10, isDataEmpty = false, isError = false, isLoading = false } = props;

  return (
    <div className="grid-cols-5 grid gap-5 w-full">
      {
        // LOADING
        isLoading ? (
          [...Array(loadingItemsCount)].map((_, i) => <Skeleton key={i} className="h-32 w-full" />)
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
