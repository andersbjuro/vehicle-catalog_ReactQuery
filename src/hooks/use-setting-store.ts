
import { ClientSetting } from '@/types'
import { create } from 'zustand'

interface SettingState {
    setting: ClientSetting
    setSetting: (newSetting: ClientSetting) => void
    setlanguageCode: (code: number) => void
}

const useSettingStore = create<SettingState>((set, get) => ({
    setting: {
        languageCode: 752,
        pageSize: 100,
    } as ClientSetting,
    setSetting: (newSetting: ClientSetting) => {
        set({
            setting: {
                ...newSetting
            },
        })
    },
    setlanguageCode: async (languageCode: number) => {
        set({ setting: { ...get().setting, languageCode } })
    },
}))

export default useSettingStore
