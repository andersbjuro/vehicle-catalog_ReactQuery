import { create } from 'zustand'

interface CatalogStoreInterface {
    filter: any,
    searchValue: { searchValue: string, valueType: number, countryCode: number },
    setFilter: (fileterProp: any) => void,
    setSearchValue: (searchValueProp: any) => void
}

const useCatalogStore = create<CatalogStoreInterface>((set) => ({
    filter: {id: 0 },
    searchValue: { searchValue: '', valueType: 0, countryCode: 0 },

    setFilter: (filterProp: any) => {
        set({ filter: filterProp })
    },
    setSearchValue: (searchValueProp: any) => {
        set({ searchValue: searchValueProp })
    },
}))

export default useCatalogStore
