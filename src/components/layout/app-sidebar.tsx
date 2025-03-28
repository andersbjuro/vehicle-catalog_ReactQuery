"use client"

import { Car, FolderKanban, GalleryVerticalEnd, Package, FileStackIcon, CarFront } from "lucide-react"
import NavMain from "@/components/layout/nav-main"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail, } from "@/components/ui/sidebar"

import { UserAccountNav } from "./user-account-nav"
import { useCurrentSession } from "@/hooks/use-current-session"
import { routes } from "@/config/routes";
import { useTranslations } from "next-intl"
import { memo } from "react"

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const t = useTranslations('Sidebar');
  const { user } = useCurrentSession()
  const items = [
    {
      title: t('bom'),
      url: routes.boms,
      icon: FolderKanban,
      roles: ['Administrators', 'CatalogManager', 'CatalogUser']
    },
    {
      title: t('items'),
      url: routes.items,
      icon: FileStackIcon,
      roles: ['Administrators', 'CatalogManager', 'CatalogUser']
    },
    {
      title: t('catalog'),
      url: routes.catalog,
      icon: Package,
      roles: ['Administrators', 'CatalogManager', 'CatalogUser']
    },
    {
      title: t('ece'),
      url: routes.ece,
      icon: Car,
      roles: ['Administrators', 'CatalogManager', 'CatalogUser']
    },
    {
      title: t('newece'),
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
            <SidebarMenuButton size="lg" asChild className="focus-visible:ring-0 focus-visible:ring-offset-0">
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

export default memo(AppSidebar);
