import { CatalogSearchPayload } from '@/types/ece'
import { create } from 'zustand'

interface NewEceStoreInterface {
    catalogSearch: CatalogSearchPayload,

    setCatalogSearch: (catalogProp: any) => void,
    resetCatalogSearch: () => void
}

const useNewEceStore = create<NewEceStoreInterface>((set) => ({
    catalogSearch: {} as CatalogSearchPayload,

    setCatalogSearch: (catalogProp: CatalogSearchPayload) => {
        set({ catalogSearch: catalogProp })
    },
    resetCatalogSearch: () => {
        set({
            catalogSearch: {
                newCatalogSearchViews: []
            }
        })
    }
}))

export default useNewEceStore
