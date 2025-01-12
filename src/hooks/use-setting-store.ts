
import { ClientSetting } from '@/types'
import data from '@/lib/data'
import { create } from 'zustand'

interface SettingState {
    setting: ClientSetting
    setSetting: (newSetting: ClientSetting) => void
    setCountryCode: (code: number) => void
}

const useSettingStore = create<SettingState>((set, get) => ({
    setting: {
        ...data.setting,
    } as ClientSetting,
    setSetting: (newSetting: ClientSetting) => {
        set({
            setting: {
                ...newSetting
            },
        })
    },
    setCountryCode: async (countryCode: number) => {
        set({ setting: { ...get().setting, countryCode } })
    },
}))

export default useSettingStore
