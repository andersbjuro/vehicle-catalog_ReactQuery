import { createOeItemsFilter } from '@/graphql/filters'
import { create } from 'zustand'

interface ItemsFilterStoreInterface {
    query: string,
    brandId: number,
    productGroupId: number,
    filter: any
    setQuery: (queryProp: string) => void
    setBrand: (brandProp: number) => void
    setProductGroup: (productGroupProp: number) => void
    resetFilter: () => void
}

const useItemsFilterStore = create<ItemsFilterStoreInterface>((set, get) => ({
    query: "",
    brandId: 0,
    productGroupId: 0,
    filter: createOeItemsFilter({ searchTerm: "", brandId: 0, productGroupId: 0 }),

    setQuery: (queryProp: string) => {
        set({ query: queryProp, filter: createOeItemsFilter({ searchValue: queryProp, brandId: get().brandId, productGroupId: get().productGroupId }) })
    },
    setBrand: (brandProp: number) => {
        set({ brandId: brandProp, filter: createOeItemsFilter({ searchValue: get().query, brandId: brandProp, productGroupId: get().productGroupId }) })
    },
    setProductGroup: (productGroupProp: number) => {
        set({ productGroupId: productGroupProp, filter: createOeItemsFilter({ searchValue: get().query, brandId: get().brandId, productGroupId: productGroupProp }) })
    },
    resetFilter: () => {
        set({ query: "", brandId: 0, productGroupId: 0, filter: createOeItemsFilter({ searchTerm: "", brandId: 0, productGroupId: 0 }) })
    }
}))

export default useItemsFilterStore
