import React from "react";
import Card from "./card";
import Button from "./button";
import { TriangleAlert, X } from "lucide-react";

interface Props {
  open: boolean;
  title?: string;
  onClick: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmModal = ({ open, setOpen, title, onClick }: Props) => {
  return (
    <>
      {open ? (
        <div className="fixed inset-0 z-50">
          <div
            onClick={() => setOpen(false)}
            className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-[6px] fixed inset-0 z-40"
          />
          <div className="center w-full h-full">
            <Card className="max-w-2xl md:w-full w-[calc(100vw-25px)] rounded-lg overflow-hidden overflow-y-auto max-h-dvh md:max-h-[calc(100dvh-20px)] bg-white dark:bg-slate-900 p-0 z-50">
              {/* HEADING */}
              <div className="flex items-center gap-4 w-full justify-between sticky top-0 inset-x-0 z-50 bg-white py-3 px-5 shadow dark:bg-slate-900">
                {title && <h3 className="text-lg">{title}</h3>}
                <span onClick={() => setOpen(false)} className="text-slate-500 cursor-pointer">
                  <X size={20} />
                </span>
              </div>

              {/* MODAL BODY */}
              <div className="p-5 flex flex-col gap-6 items-center">
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-amber-500">
                    <TriangleAlert size={50} />
                  </span>
                  <span>آیا از انجام عملیات مطمئن هستید؟</span>
                  <span>عملیات قابل بازگشت نمی‌باشد</span>
                </div>

                <div className="self-end flex items-center gap-2">
                  <Button onClick={() => setOpen(false)} variant={"outline"}>
                    کنسل
                  </Button>
                  <Button onClick={onClick} variant={"error"}>
                    تایید
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ConfirmModal;
