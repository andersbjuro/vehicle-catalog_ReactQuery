import { create } from 'zustand'

interface BomStoreInterface {
    filter: any,
    rowSelection: any,
    setFilter: (fileterProp: any) => void
    setRowSelection: (rowSelectionProp: any) => void
}

const useBomStore = create<BomStoreInterface>((set, get) => ({
    filter: {},
    rowSelection: [],
    setFilter: (filterProp:any) => {
        set({ filter: filterProp })
    },
    setRowSelection: (rowSelectionProp: any) => {
        set({ rowSelection: rowSelectionProp })
    }
}))

export default useBomStore
