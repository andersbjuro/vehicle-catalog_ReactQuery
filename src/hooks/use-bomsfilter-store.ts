import { createBomFilter } from '@/graphql/filters'
import { create } from 'zustand'

interface BomsFilterStoreInterface {
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

const useBomsFilterStore = create<BomsFilterStoreInterface>((set, get) => ({
    query: "",
    brand: 0,
    productGroup: 0,
    filter: createBomFilter({ query: "", brand: 0, productGroup: 0 }),
    rowSelection: [],
    setQuery: (queryProp: string) => {
        set({ query: queryProp, filter: createBomFilter({ query: queryProp, brand: get().brand, productGroup: get().productGroup }) })
    },
    setBrand: (brandProp: number) => {
        set({ brand: brandProp, filter: createBomFilter({ query: get().query, brand: brandProp, productGroup: get().productGroup }) })
    },
    setProductGroup: (productGroupProp: number) => {
        set({ productGroup: productGroupProp, filter: createBomFilter({ query: get().query, brand: get().brand, productGroup: productGroupProp }) })
    },
    resetFilter: () => {
        set({ query: "", brand: 0, productGroup: 0, filter: createBomFilter({ query: "", brand: 0, productGroup: 0 }) })
    },
}))

export default useBomsFilterStore
