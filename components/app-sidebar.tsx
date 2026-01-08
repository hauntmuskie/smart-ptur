"use client";

import {
  Calculator,
  ClipboardList,
  Grid2X2,
  LayoutDashboard,
  LogOut,
  Scale,
  Trophy,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/_actions/auth";
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
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex flex-col">
          <span className="font-bold text-lg">SPK SMART</span>
          <span className="text-muted-foreground text-xs">
            Penerbit Erlangga
          </span>
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
                    <Link href={item.url} onClick={handleLinkClick}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <Button
          variant="destructive"
          className="w-full"
          onClick={() => logout()}
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
