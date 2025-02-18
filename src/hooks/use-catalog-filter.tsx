"use client";
import {
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "nuqs";

type FilterKeys =
  | "query"
  | "valueType"

type FilterTypes = {
  query: string
  valueType: number;
};

const useCatalogFilter = () => {
  const [query, setQuery] = useQueryState(
    "query",
    parseAsString.withDefault("")
  );

  const [valueType, setValueType] = useQueryState(
    "valueType",
    parseAsInteger
  );

  const getFilters = () => ({
    query,
    valueType,

  });

  const updateFilter = (
    key: FilterKeys,
    values: string[] | string | number | null
  ) => {
    switch (key) {
      case "query":
        return setQuery(typeof values === "string" ? values : null);

      case "valueType":
        return setValueType(typeof values === "number" ? values : null);

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
      setValueType(null),
    ]);
  };
  return {
    filters: getFilters(),
    updateFilter,
    clearFilter,
    clearFilters,
  };
};

export default useCatalogFilter;
