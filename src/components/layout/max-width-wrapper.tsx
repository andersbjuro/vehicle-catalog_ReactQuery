import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export default function MaxWidthWrapper({
  className,
  children,
  large = false,
}: {
  className?: string;
  large?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "",
        large ? "[2048px]" : "max-w-screen-2xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
