import { create } from 'zustand'

interface VehicleStoreInterface {
    regNo: string,
    country: string,
    vehicle: any,
    selectedNode: string,
    setRegNo: (regNoProp: any) => void,
    setCountry: (countryProp: any) => void,
    setVehicle: (vehicleProp: any) => void,
    setSelectedNode: (selectedNodeProp: string) => void
}

const useVehicleStore = create<VehicleStoreInterface>((set) => ({
    regNo: "",
    country: "Sverige",
    vehicle: null,
    selectedNode: "",

    setRegNo: (regNoProp: any) => {
        set({ regNo: regNoProp })
    },

    setCountry: (coutryProp: any) => {
        set({ country: coutryProp })
    },

    setVehicle: (vehicleProp: any) => {
        set({ vehicle: vehicleProp, selectedNode: vehicleProp?.eceTree?.searchId })
    },

    setSelectedNode: (selectedNodeProp: string) => {
        set({ selectedNode: selectedNodeProp })
    }
}))

export default useVehicleStore
