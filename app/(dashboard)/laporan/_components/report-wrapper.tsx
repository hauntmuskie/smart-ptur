"use client";

import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { Download, FileImage, Printer } from "lucide-react";
import { type ReactNode, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface ReportWrapperProps {
  children: ReactNode;
  reportTitle: string;
}

const REPORT_WIDTH = 794;

export function ReportWrapper({ children, reportTitle }: ReportWrapperProps) {
  const reportRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const handleExportPng = async () => {
    if (!reportRef.current) return;

    setLoading(true);
    try {
      const dataUrl = await toPng(reportRef.current, {
        backgroundColor: "#ffffff",
        pixelRatio: 2,
        cacheBust: true,
      });

      const link = document.createElement("a");
      link.download = `${reportTitle.toLowerCase().replace(/\s+/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Export PNG failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPdf = async () => {
    if (!reportRef.current) return;

    setLoading(true);
    try {
      const dataUrl = await toPng(reportRef.current, {
        backgroundColor: "#ffffff",
        pixelRatio: 2,
        cacheBust: true,
      });

      const img = new Image();
      img.src = dataUrl;

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 0;
      const contentWidth = pageWidth;
      const contentHeight = (img.height / img.width) * contentWidth;

      const yPosition = margin;
      const availableHeight = pageHeight;

      if (contentHeight <= availableHeight) {
        pdf.addImage(
          dataUrl,
          "PNG",
          margin,
          yPosition,
          contentWidth,
          contentHeight,
        );
      } else {
        const totalPages = Math.ceil(contentHeight / availableHeight);
        for (let page = 0; page < totalPages; page++) {
          if (page > 0) {
            pdf.addPage();
          }
          const yOffset = -(page * availableHeight);
          pdf.addImage(
            dataUrl,
            "PNG",
            margin,
            margin + yOffset,
            contentWidth,
            contentHeight,
          );
        }
      }

      pdf.save(`${reportTitle.toLowerCase().replace(/\s+/g, "-")}.pdf`);
    } catch (error) {
      console.error("Export PDF failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-end gap-2 print:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportPng}
          disabled={loading}
        >
          <FileImage className="mr-2 size-4" />
          Export PNG
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportPdf}
          disabled={loading}
        >
          <Download className="mr-2 size-4" />
          Export PDF
        </Button>
        <Button variant="default" size="sm" onClick={handlePrint}>
          <Printer className="mr-2 size-4" />
          Print
        </Button>
      </div>

      <div className="mx-auto flex justify-center">
        <div
          ref={reportRef}
          className="report-content border shadow-sm print:w-full print:max-w-full print:border-none print:p-0 print:shadow-none"
          style={{
            backgroundColor: "#ffffff",
            color: "#000000",
            maxWidth: `${REPORT_WIDTH}px`,
            padding: "30px",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
