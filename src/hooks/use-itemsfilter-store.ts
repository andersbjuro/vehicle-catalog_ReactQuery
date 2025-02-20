import { createOeItemsFilter } from '@/graphql/filters'
import { create } from 'zustand'

interface ItemsFilterStoreInterface {
    query: string,
    brand: number,
    productGroup: number,
    filter: any,
    rowSelection: any,
    setQuery: (queryProp: string) => void
    setBrand: (brandProp: number) => void
    setProductGroup: (productGroupProp: number) => void
    resetFilter: () => void
    //setRowSelection: (rowSelectionProp: any) => void
}

const useItemsFilterStore = create<ItemsFilterStoreInterface>((set, get) => ({
    query: "",
    brand: 0,
    productGroup: 0,
    filter: createOeItemsFilter({ searchTerm: "", brand: 0, productGroup: 0 }),
    rowSelection: [],
    setQuery: (queryProp: string) => {
        set({ query: queryProp, filter: createOeItemsFilter({ searchValue: queryProp, brandId: get().brand, productGroup: get().productGroup }) })
    },
    setBrand: (brandProp: number) => {
        set({ brand: brandProp, filter: createOeItemsFilter({ searchValue: get().query, brand: brandProp, productGroup: get().productGroup }) })
    },
    setProductGroup: (productGroupProp: number) => {
        set({ productGroup: productGroupProp, filter: createOeItemsFilter({ searchValue: get().query, brandId: get().brand, productGroupId: productGroupProp }) })
    },
    resetFilter: () => {
        set({ query: "", brand: 0, productGroup: 0, filter: createOeItemsFilter({ searchTerm: "", brandId: 0, productGroupId: 0 }) })
    },
    // setRowSelection: (rowSelectionProp: any) => {
    //     set({ rowSelection: rowSelectionProp })
    // }
}))

export default useItemsFilterStore
