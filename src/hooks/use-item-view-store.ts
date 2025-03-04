import { create } from 'zustand'

export type CurrentViewOption = 'list' | 'grid'

type ItemViewStore = {
    currentView: CurrentViewOption
    updateCurrentView: (CurrentViewProp: CurrentViewOption) => void
}

const useItemViewStore = create<ItemViewStore>((set) => ({
    currentView: "grid",
    updateCurrentView: (CurrentViewProp: CurrentViewOption) => {
        set({ currentView: CurrentViewProp })
    },
}))

export default useItemViewStore
