export const routes = {
	home: "/",

	boms: "/dashboard/boms",
  createBom: () => `/dashboard/boms/create`,
  editBom: (id: number) => `/dashboard/boms/${id}/edit`,
  deleteBom: (id: number) => `/dashboard/boms/${id}/delete`,

	catalog: "/dashboard/catalog",
  createCatalog: () => `/dashboard/catalog/create`,
  editCatalog: (id: number) => `/dashboard/catalog/${id}/edit`,
  deleteCatalog: (id: number) => `/dashboard/catalog/${id}/delete`,

  items: "/dashboard/items",
  editItem: (id: string) => `/dashboard/items/${id}/edit`,

  settings: "/dashboard/settings",
  ece: "/dashboard/ece",
  queryEce: (id: string) => `/dashboard/ece/?query=${id}`,
  newece: "/dashboard/newece",
};
