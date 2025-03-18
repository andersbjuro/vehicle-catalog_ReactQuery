"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Check, ChevronsUpDown, Monitor, Moon, Settings, Sun } from "lucide-react";
import { LogoutButton } from '@/components/auth/logout-button';
import { LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { DropdownMenuSub } from "@radix-ui/react-dropdown-menu";
import { SidebarMenuButton } from "../ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { routes } from "@/config/routes";
import { useLocale } from "next-intl";
import { startTransition } from "react";
import { setUserLocale } from "@/i18n/locale";
import {Locale} from '@/i18n/config';


export function UserAccountNav() {
  const locale = useLocale();
  const { data: session, status } = useSession();

  const { theme, setTheme } = useTheme();
  const user = session?.user;

  if (!user)
    return (
      <div className="size-8 animate-pulse rounded-full border bg-muted" />
    );

    function onLanguageChange(value: string) {
        const locale = value as Locale;
        startTransition(() => {
          setUserLocale(locale);
        });
      }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage
              src={user.image}
              alt={user.name}
            />
            <AvatarFallback className="rounded-lg"> {user.name.substring(0,2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              {user.name}
            </span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage
                src={user.image}
                alt={user.name}
              />
              <AvatarFallback className="rounded-lg">
                {user.name.substring(0,2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {user.name}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            href={routes.settings}
            className="flex w-full items-center gap-3 px-2.5 py-2"
          >
            <Settings className="size-4" />
            <p className="text-sm">Inställningar</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Monitor className="mr-2 size-4" />
            Språk
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => onLanguageChange("se")}>
                <Monitor className="mr-2 size-4" />
                Svenska
                {locale === "se" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onLanguageChange("en")}>
                <Sun className="mr-2 size-4" />
                English
                {locale === "en" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Monitor className="mr-2 size-4" />
            Tema
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="mr-2 size-4" />
                System
                {theme === "system" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 size-4" />
                Ljust
                {theme === "light" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 size-4" />
                Mörkt
                {theme === "dark" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <DropdownMenuItem asChild>
            <LogoutButton>
              <LogOut className="size-4 ml-1" />
              <p className="text-sm">Logga ut</p>
            </LogoutButton>
          </DropdownMenuItem>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
