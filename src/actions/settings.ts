"use server"

import { cookies } from 'next/headers'

// Server action to update the currency cookie
export const setCurrencyOnServer = async (newCurrency: string) => {
    'use server'
    const cookiesStore = await cookies()
    cookiesStore.set('currency', newCurrency)

    return {
        success: true,
        message: 'Currency updated successfully',
    }
}