import type { AnchorHTMLAttributes } from "react";

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary";
}) {
  return <a className={`button button-${variant} ${className}`} {...props} />;
}
