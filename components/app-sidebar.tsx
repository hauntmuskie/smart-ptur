"use client";

import {
  Calculator,
  ChevronRight,
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
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
];

const perhitunganMenu = {
  title: "Proses Perhitungan",
  url: "/perhitungan",
  icon: Calculator,
  subItems: [
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
  ],
};

export function AppSidebar() {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const isPerhitunganActive =
    pathname === perhitunganMenu.url ||
    pathname.startsWith(`${perhitunganMenu.url}/`);

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

              <Collapsible
                asChild
                defaultOpen={isPerhitunganActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive={pathname === perhitunganMenu.url}
                      tooltip={perhitunganMenu.title}
                    >
                      <perhitunganMenu.icon className="h-4 w-4" />
                      <Link
                        href={perhitunganMenu.url}
                        onClick={handleLinkClick}
                        className="flex-1"
                      >
                        {perhitunganMenu.title}
                      </Link>
                      <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {perhitunganMenu.subItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === subItem.url}
                          >
                            <Link href={subItem.url} onClick={handleLinkClick}>
                              <subItem.icon className="h-4 w-4" />
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
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
