import { ReactNode } from "react";

interface Props {
  title: string;
  value: ReactNode;
}

const LinerAdDetail = ({ title, value }: Props) => {
  return (
    <div className="flex gap-4 items-center justify-between">
      <span>{title}</span>
      <span>{value}</span>
    </div>
  );
};

export default LinerAdDetail;
