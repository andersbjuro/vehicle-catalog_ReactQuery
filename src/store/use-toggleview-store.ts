import { create } from 'zustand'

export type CurrentViewOption = 'list' | 'grid'

type ToggleViewStore = {
    currentView: CurrentViewOption
    updateCurrentView: (CurrentViewProp: CurrentViewOption) => void
}

const useToggleViewStore = create<ToggleViewStore>((set) => ({
    currentView: "grid",
    updateCurrentView: (CurrentViewProp: CurrentViewOption) => {
        set({ currentView: CurrentViewProp })
    },
}))

export default useToggleViewStore
