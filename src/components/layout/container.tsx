import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

function Container({ children, className }: Props) {
  return (
    <div className={cn("w-full max-w-2xl mx-auto px-4", className)}>
      {children}
    </div>
  );
}

export default Container;
