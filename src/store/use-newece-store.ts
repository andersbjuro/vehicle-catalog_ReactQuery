import { CatalogSearchPayload } from '@/types/ece'
import { create } from 'zustand'

interface NewEceStoreInterface {
    catalogSearch: CatalogSearchPayload,

    setCatalogSearch: (catalogProp: any) => void,
}

const useNewEceStore = create<NewEceStoreInterface>((set) => ({
    catalogSearch: {} as CatalogSearchPayload,

    setCatalogSearch: (catalogProp: CatalogSearchPayload) => {
        set({ catalogSearch: catalogProp })
    }
}))

export default useNewEceStore
