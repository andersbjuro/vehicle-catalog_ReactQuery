"use client"
import { Label } from "@/components/ui/label";
import UserCountrySelector from "@/components/user-country-selector";
import { Heading } from "@/components/heading";
import { useCurrentSession } from "@/hooks/use-current-session";
import LocaleSwitcher from "@/components/next-intl/LocaleSwitcher";

export default  function SettingsPage() {
  const {user, userId} = useCurrentSession()

  return (
    <div className="flex flex-col w-full gap-2">
      <Heading title="Inställningar" description="" />
      <div className="flex flex-col gap-2 mt-4">
        <Label>Programspråk</Label>
        <LocaleSwitcher />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <Label>Kod för artikel koppling</Label>
        <UserCountrySelector />
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <Label>Användare</Label>
        <span>{userId}</span>
        <span>{user?.name}</span>
        <Label>Roller</Label>

        {user && user.role && <span>{Array.isArray(user.role) ? user.role?.join(', ') : user.role}</span> }
        <Label>Land</Label>
        {user && <span>{user.locale}</span> }
      </div>
    </div>
  )
}
