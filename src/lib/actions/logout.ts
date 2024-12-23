"use server";

import { signOut, auth } from "@/auth";

export const logout = async () => {
    const session = await auth();
    const issuerUrl = session?.issuer as string
    const token = session?.id_token as string
    const endsessionParams = new URLSearchParams({
        id_token_hint: token,
        issuer: issuerUrl
    })
    await signOut({ redirectTo: `/api/auth/federated-sign-out?${endsessionParams}` });
};