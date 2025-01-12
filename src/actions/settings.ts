"use server"

import { cookies } from 'next/headers'

// Server action to update the countryCode cookie
export const setCountryOnServer = async (newCode: string) => {
    'use server'
    const cookiesStore = await cookies()
    cookiesStore.set('user-country-code', newCode)

    return {
        success: true,
        message: 'CountryCode updated successfully',
    }
}