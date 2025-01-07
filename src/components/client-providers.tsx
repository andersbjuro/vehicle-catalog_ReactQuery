'use client'
import React from 'react'
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
                    <ReactQueryProvider>{children}</ReactQueryProvider>
                </ThemeProvider>
            </AppInitializer>
        </SessionProvider>
    )
}
