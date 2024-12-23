"use client";

import { CardWrapper } from "@/components/auth/card-wrapper"
import { tenantLinks } from "@/config/tenants"
import { TenantButton } from "./tenant-button";

export const LoginForm = () => {

  return (
    <CardWrapper
      headerLabel="Välkommen, logga in för att fortsätta"
      backButtonHref=""
      backButtonLabel=""
    >
      <div>
        {tenantLinks.map((t: any) => (
          <TenantButton key={t.id} tenant={t} />
        ))}
      </div>
    </CardWrapper>
  );
};
