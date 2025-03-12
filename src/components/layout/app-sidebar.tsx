"use client"

import { Car, FolderKanban, GalleryVerticalEnd, Package, FileStackIcon, CarFront } from "lucide-react"
import { NavMain } from "@/components/layout/nav-main"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail, } from "@/components/ui/sidebar"

import { UserAccountNav } from "./user-account-nav"
import { useCurrentSession } from "@/hooks/use-current-session"
import { routes } from "@/config/routes";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useCurrentSession()
  const items = [
    {
      title: 'Bomstrukturer',
      url: routes.boms,
      icon: FolderKanban,
      roles: ['Administrators', 'CatalogManager', 'CatalogUser']
    },
    {
      title: 'OE Artiklar',
      url: routes.items,
      icon: FileStackIcon,
      roles: ['Administrators', 'CatalogManager', 'CatalogUser']
    },
    {
      title: 'Katalog',
      url: routes.catalog,
      icon: Package,
      roles: ['Administrators', 'CatalogManager', 'CatalogUser']
    },
    {
      title: 'Ece',
      url: routes.ece,
      icon: Car,
      roles: ['Administrators', 'CatalogManager', 'CatalogUser']
    },
    {
      title: 'Nya Ece',
      url: routes.newece,
      icon: CarFront,
      roles: ['Administrators', 'CatalogManager']
    },
  ]

  const authRoutesFilter = (items: any, user: any) => {
    const filter = items.filter(
      (r: any) => r.roles.some((x: any) => user?.role.includes(x))
    );
    return filter;
  };

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Svensk Fordonsbas AB</span>
                  <span className="truncate text-xs">{process.env.npm_package_name?.toUpperCase()} {process.env.npm_package_version}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={authRoutesFilter(items, user)} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserAccountNav />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
