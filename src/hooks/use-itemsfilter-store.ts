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
}

const useItemsFilterStore = create<ItemsFilterStoreInterface>((set, get) => ({
    query: "",
    brand: 0,
    productGroup: 0,
    filter: createOeItemsFilter({ query: "", brand: 0, productGroup: 0 }),
    rowSelection: [],
    setQuery: (queryProp: string) => {
        set({ query: queryProp, filter: createOeItemsFilter({ query: queryProp, brand: get().brand, productGroup: get().productGroup }) })
    },
    setBrand: (brandProp: number) => {
        set({ brand: brandProp, filter: createOeItemsFilter({ query: get().query, brand: brandProp, productGroup: get().productGroup }) })
    },
    setProductGroup: (productGroupProp: number) => {
        set({ productGroup: productGroupProp, filter: createOeItemsFilter({ query: get().query, brand: get().brand, productGroup: productGroupProp }) })
    },
    resetFilter: () => {
        set({ query: "", brand: 0, productGroup: 0, filter: createOeItemsFilter({ query: "", brand: 0, productGroup: 0 }) })
    },
}))

export default useItemsFilterStore
