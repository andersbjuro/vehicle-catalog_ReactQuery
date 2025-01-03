"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ButtonHTMLAttributes } from "react"

type Props = {
    title: string,
    className?: string,
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined,
    url?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export function BackButton(
    { title, variant, className, url, ...props }: Props
) {
    const router = useRouter()
    return (
        <Button
            variant={variant}
            className={className}
            onClick={() => url ? router.push(url) : router.back()}
            title={title}
        >{title}</Button>
    )
}
