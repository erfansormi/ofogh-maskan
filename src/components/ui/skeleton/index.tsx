import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";
import styles from "./skeleton.module.css";

type SkeletonVariantProps = VariantProps<typeof skeletonVariants>;
const skeletonVariants = cva("block", {
  variants: {
    rounded: { full: "rounded-full", lg: "rounded-lg" },
  },
  defaultVariants: {
    rounded: "lg",
  },
});

interface Props extends SkeletonVariantProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

const Skeleton = ({ rounded, className, width, height }: Props) => {
  return (
    <div
      style={{ width, height }}
      className={cn(
        styles.skeleton_box,
        "dark:bg-slate-800",
        skeletonVariants({ rounded, className })
      )}
    ></div>
  );
};

export default Skeleton;
