'use client'

import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ThemeProvider } from "next-themes";
import { ClientSetting } from '@/types'
import { SessionProvider } from "next-auth/react";
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import { Toaster } from "sonner";
import AppInitializer from './app-initializer'

export default function ClientProviders({
    setting,
    children,
}: {
    setting: ClientSetting
    children: React.ReactNode
}) {
    return (
        <SessionProvider >
            <AppInitializer setting={setting}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Toaster />
                    <NuqsAdapter>
                        <ReactQueryProvider>{children}</ReactQueryProvider>
                    </NuqsAdapter>
                </ThemeProvider>
            </AppInitializer>
        </SessionProvider>
    )
}
