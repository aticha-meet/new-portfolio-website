import type { HTMLAttributes } from "react";

export function GlassBox({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={`glass-box ${className}`} {...props} />;
}
