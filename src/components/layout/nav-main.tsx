"use client"

import { type LucideIcon } from "lucide-react"
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { memo } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { translation } from "@/config/translation"

const NavMain = ({
  items,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
  }[]
}) =>{
  const t = useTranslations(translation.sideBar);
  const path = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t('title')}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(item => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={path.includes(`${item.url}/`) || path === item.url}>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export default memo(NavMain);
