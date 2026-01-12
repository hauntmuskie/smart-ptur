"use client";

import { ReportWrapper } from "../_components/report-wrapper";

export function ReportWrapperClient({
  children,
  reportTitle,
}: {
  children: React.ReactNode;
  reportTitle: string;
}) {
  return <ReportWrapper reportTitle={reportTitle}>{children}</ReportWrapper>;
}
