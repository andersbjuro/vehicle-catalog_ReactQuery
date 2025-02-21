import { create } from 'zustand'

interface VehicleStoreInterface {
    regNo: string,
    country: string,
    searchValue: { searchValue: string, valueType: number, countryCode: number },
    setRegNo: (regNoProp: any) => void,
    setCountry: (countryProp: any) => void,
    setSearchValue: (searchValueProp: any) => void
}

const useVehicleStore = create<VehicleStoreInterface>((set) => ({
    regNo: "",
    country: "Sverige",
    searchValue: { searchValue: '', valueType: 0, countryCode: 0 },

    setRegNo: (regNoProp: any) => {
        set({ regNo: regNoProp })
    },

    setCountry: (coutryProp: any) => {
        set({ country: coutryProp })
    },

    setSearchValue: (searchValueProp: any) => {
        set({ searchValue: searchValueProp })
    },
}))

export default useVehicleStore
