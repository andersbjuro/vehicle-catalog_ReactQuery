"use client"

import { Car, FolderKanban, GalleryVerticalEnd, Package, FileStackIcon } from "lucide-react"
import { NavMain } from "@/components/layout/nav-main"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail, } from "@/components/ui/sidebar"

import { UserAccountNav } from "./user-account-nav"
//import { useSetAtom } from "jotai"
import { useEffect } from "react"
//import { countryCode } from "@/atoms/userAtoms"
import { useCurrentSession } from "@/hooks/use-current-session"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useCurrentSession()
  //const setCountryCode = useSetAtom(countryCode)
  const items = [
    {
      title: 'Bomstrukturer',
      url: '/dashboard/boms',
      icon: FolderKanban,
      roles: ['Administrators', 'CatalogManager', 'CatalogUser']
    },
    {
      title: 'OE Artiklar',
      url: '/dashboard/items',
      icon: FileStackIcon,
      roles: ['Administrators', 'CatalogManager', 'CatalogUser']
    },
    {
      title: 'Katalog',
      url: '/dashboard/catalog',
      icon: Package,
      roles: ['Administrators', 'CatalogManager', 'CatalogUser']
    },
    {
      title: 'Fordon',
      url: '/dashboard/vehicle',
      icon: Car,
      roles: ['Administrators', 'CatalogManager', 'CatalogUser']
    },
  ]

  const authRoutesFilter = (items: any, user: any) => {
    const filter = items.filter(
      (r: any) => r.roles.some((x: any) => user?.role.includes(x))
    );
    return filter;
  };

  useEffect(() => {
    const country = localStorage.getItem('user-country-code')?.toLowerCase() as string
    if (country === undefined) {
      localStorage.setItem("user-country-code", '752')
      // setCountryCode(752)
    }

  }, []);

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
