import { BomDetailFilter } from '@/types'
import { create } from 'zustand'

interface BomStoreInterface {
    filter: BomDetailFilter,
    setFilter: (fileterProp: BomDetailFilter) => void
}

const useBomStore = create<BomStoreInterface>((set) => ({
    filter: {id: 0, countryCode: 0},
    rowSelection: {},
    setFilter: (filterProp: BomDetailFilter) => {
        set({ filter: filterProp })
    },
}))

export default useBomStore
