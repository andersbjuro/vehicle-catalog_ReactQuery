"use client";

import { parseAsInteger, parseAsString, useQueryState, } from "nuqs";

type FilterKeys = "query" | "country"

const useVehicleFilter = () => {
  const [query, setQuery] = useQueryState("query", parseAsString.withDefault(""));
  const [country, setCountry] = useQueryState("country", parseAsInteger.withDefault(752));

  const getFilters = () => ({
    query,
    country
  });

  const updateFilter = (
    key: FilterKeys,
    values: string[] | string | number | null
  ) => {
    switch (key) {
      case "query":
        return setQuery(typeof values === "string" ? values : null);

      case "country":
        return setCountry(typeof values === "number" ? values : null);

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
      setCountry(null),
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
