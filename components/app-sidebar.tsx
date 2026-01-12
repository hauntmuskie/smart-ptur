"use client";

import {
  Calculator,
  ClipboardList,
  FileText,
  Grid2X2,
  LayoutDashboard,
  LogOut,
  Scale,
  Trophy,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/_actions/auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import PenerbitErlanggaLogo from "@/public/penerbit-erlangga-cropped.png";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Data Karyawan",
    url: "/karyawan",
    icon: Users,
  },
  {
    title: "Kriteria & Bobot",
    url: "/kriteria",
    icon: Scale,
  },
  {
    title: "Pembobotan Kriteria",
    url: "/pembobotan",
    icon: ClipboardList,
  },
  {
    title: "Proses Perhitungan",
    url: "/perhitungan",
    icon: Calculator,
  },
  {
    title: "Nilai Utility",
    url: "/perhitungan/nilai-utility",
    icon: Grid2X2,
  },
  {
    title: "Lihat Hasil",
    url: "/perhitungan/hasil",
    icon: Trophy,
  },
  {
    title: "Laporan",
    url: "/laporan",
    icon: FileText,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-4 py-3">
        <div className="flex flex-col items-center gap-1">
          <Image
            src={PenerbitErlanggaLogo}
            alt="Penerbit Erlangga"
            width={500}
            height={500}
            className="h-auto w-auto"
            quality={100}
            priority
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link
                      href={item.url}
                      onClick={handleLinkClick}
                      className="my-1 p-2 *:text-lg"
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="p-1 font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi Logout</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin keluar dari aplikasi?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={() => logout()}>
                Ya, Keluar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarFooter>
    </Sidebar>
  );
}
