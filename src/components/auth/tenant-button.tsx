"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Icons } from "@/components/icons";
import { TenantLinkType } from "@/types";

interface TenantButtonProps {
 tenant: TenantLinkType
}
export const TenantButton = ({ tenant}: TenantButtonProps) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: string) => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  }

  const Icon = Icons[tenant.icon || "arrowRight"];
  return (
    <div className="flex items-center w-full gap-x-2 mt-10">
      <Button
        size="lg"
        className="w-full rounded-md"
        variant="default"
        onClick={() => onClick(tenant.id)}
      >
        <Icon className="h-5 w-5" />
        <p className="ml-3">{tenant.name}</p>
      </Button>
    </div>
  );
};
