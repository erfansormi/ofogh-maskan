import React, { ReactNode } from "react";
import Card from "./card";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  title?: string;
  children: ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ open, setOpen, title, children }: Props) => {
  return (
    <>
      {open ? (
        <div className="fixed inset-0 z-50">
          <div
            onClick={() => setOpen(false)}
            className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-[6px] fixed inset-0 z-40"
          />
          <div className="center w-full h-full">
            <Card className="max-w-2xl w-full rounded-lg overflow-hidden overflow-y-auto max-h-dvh md:max-h-[calc(100dvh-20px)] bg-white dark:bg-slate-900 p-0 z-50">
              {/* HEADING */}
              <div className="flex items-center gap-4 w-full justify-between sticky top-0 inset-x-0 z-50 bg-white dark:bg-slate-900 py-3 px-5 shadow">
                {title && <h3 className="text-lg">{title}</h3>}
                <span onClick={() => setOpen(false)} className="text-slate-500 cursor-pointer">
                  <X size={20} />
                </span>
              </div>

              {/* MODAL BODY */}
              <div className="p-5">{children}</div>
            </Card>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
