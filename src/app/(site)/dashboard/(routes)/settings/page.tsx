"use client"
import { Label } from "@/components/ui/label";
import UserCountrySelector from "@/components/user-country-selector";
import { Heading } from "@/components/heading";
import { useCurrentSession } from "@/hooks/use-current-session";
import { useTranslations } from "next-intl";
import { translation } from "@/config/translation";

export default function SettingsPage() {
  const { user, userId } = useCurrentSession()
  const t = useTranslations(translation.settingsPage);

  return (
    <div className="flex flex-col w-full gap-2">
      <Heading title={t('title')} description="" />
      <div className="flex flex-col gap-2 mt-4">
        <Label>{t('itemCode')}</Label>
        <UserCountrySelector />
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <Label>{t('user')}</Label>
        <span className="text-sm">{userId}</span>
        <span className="text-sm">{user?.name}</span>
        <Label>{t('role')}</Label>
        {user && user.role && <span className="text-sm">{Array.isArray(user.role) ? user.role?.join(', ') : user.role}</span>}
        <Label>{t('countryCodes')}</Label>
        {user && <span className="text-sm">{user.locale}</span>}
      </div>
    </div>
  )
}
