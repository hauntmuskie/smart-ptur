import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Smart PTUR",
    template: "%s | Smart PTUR",
  },
  description:
    "Sistem Smart Performance and Talent Utilization Review untuk manajemen karyawan dan pelacakan kinerja yang efisien",
  keywords: [
    "penilaian kinerja",
    "manajemen talenta",
    "evaluasi karyawan",
    "PTUR",
    "manajemen SDM",
    "sistem penilaian",
    "kinerja karyawan",
  ],
  authors: [{ name: "Tim Smart PTUR" }],
  creator: "Tim Smart PTUR",
  publisher: "Smart PTUR",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Smart PTUR",
    title: "Smart PTUR",
    description:
      "Sistem Smart Performance and Talent Utilization Review untuk manajemen karyawan dan pelacakan kinerja yang efisien",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart PTUR",
    description:
      "Sistem Smart Performance and Talent Utilization Review untuk manajemen karyawan dan pelacakan kinerja yang efisien",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
