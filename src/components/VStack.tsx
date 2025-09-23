import { cn } from "@/lib/utils";

type VStackProps = {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
  style?: React.CSSProperties;
};

const VStack: React.FC<VStackProps> = (props) => {
  const { children, className, narrow, style } = props;
  return (
    <div
      className={cn([
        "flex flex-col items-center justify-center gap-4",
        narrow && "gap-2",
        className,
      ])}
      style={style}
    >
      {children}
    </div>
  );
};

export default VStack;
