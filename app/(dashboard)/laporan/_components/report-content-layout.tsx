import type { ReactNode } from "react";

interface ReportContentLayoutProps {
  children: ReactNode;
  signature: ReactNode;
}

export function ReportContentLayout({
  children,
  signature,
}: ReportContentLayoutProps) {
  return (
    <div className="flex min-h-full flex-col">
      <div className="grow">{children}</div>
      <div className="mt-auto pt-12">{signature}</div>
    </div>
  );
}
