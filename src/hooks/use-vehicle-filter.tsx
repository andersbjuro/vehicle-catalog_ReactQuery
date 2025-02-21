"use client";

import {
  parseAsString,
  useQueryState,
} from "nuqs";

type FilterKeys = "query"

const useVehicleFilter = () => {
  const [query, setQuery] = useQueryState(
    "query",
    parseAsString.withDefault("")
  );

  const getFilters = () => ({
    query,
  });

  const updateFilter = (
    key: FilterKeys,
    values: string[] | string | number | null
  ) => {
    switch (key) {
      case "query":
        return setQuery(typeof values === "string" ? values : null);

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
    ]);
  };
  return {
    filters: getFilters(),
    updateFilter,
    clearFilter,
    clearFilters,
  };
};

export default useVehicleFilter;
