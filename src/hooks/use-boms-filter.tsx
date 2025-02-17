"use client";
import {
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "nuqs";

type FilterKeys =
  | "query"
  | "brand"
  | "productGroup";

type FilterTypes = {
  query: string
  brand: number;
  productGroup: number;
};

const useBomsFilter = () => {
  const [query, setQuery] = useQueryState(
    "query",
    parseAsString.withDefault("")
  );

  const [brand, setBrand] = useQueryState(
    "brand",
    parseAsInteger
  );

  const [productGroup, setProductGroup] = useQueryState(
    "productGroup",
    parseAsInteger
  );

  const getFilters = () => ({
    query,
    brand,
    productGroup,
  });

  const updateFilter = (
    key: FilterKeys,
    values: string[] | string | number | null
  ) => {
    switch (key) {
      case "query":
        return setQuery(typeof values === "string" ? values : null);

      case "brand":
        return setBrand(typeof values === "number" ? values : null);

      case "productGroup":
        return setProductGroup(typeof values === "number" ? values : null);

      default:
        throw new Error(`Invalid filter key: ${key}`);
    }
  };

  const clearFilter = (key: FilterKeys) => {
    updateFilter(key, null);
  };

  // Clear all filters
  const clearFilters = async () => {
    await Promise.all([
      setQuery(null),
      setBrand(null),
      setProductGroup(null),
    ]);
  };
  return {
    filters: getFilters(),
    updateFilter,
    clearFilter,
    clearFilters,
  };
};

export default useBomsFilter;
