import { BomFilterTypes } from "@/types";

export const createBomFilter = (filter: BomFilterTypes) => {
  let _filter = "{"

  if (filter.query !== '')
    _filter = ` { "or": [ {"name": { "contains": "${filter.query}"}} ${!isNaN(Number(filter.query)) ? `, {"id": { "eq": ${parseInt(filter.query)}}}` : ""} ] `;

  if (filter.brand) {
    if (filter.query !== '')
      _filter = _filter + ', '
    _filter = _filter +
      ` "and": [{ "brandId": { "eq": ${filter.brand} }} ${filter.productGroup ? `, { "productGroupId": { "eq": ${filter.productGroup} }}` : ""}] `;
  }

  _filter = _filter + " }";
  return JSON.parse(_filter);
};

export const createOeItemsFilter = (filter: any) => {
  let _filter = "{"

  if (filter.query ) {
    _filter = ` { "or": [ {"oeName": { "contains": "${filter.query}"}}, {"oeItemId": { "startsWith": "${filter.query}"} } ] `;
  }

  if (filter.brand > 0) {
    if (filter.query)
      _filter = _filter + ', '
    _filter =
      _filter +
      ` "and": [{ "brandId": { "eq": ${filter.brand} }} ${filter.productGroup ? `, { "productGroupId": { "eq": ${filter.productGroup} }}` : ""}] `;
  }

  _filter = _filter + " }";

  return JSON.parse(_filter);
};

export const createSearchValueFilter = (filter: any) => {
  let _filter = ` { "value": {"contains": "${filter.query}"} `;
  if (filter.valueType) {
    _filter = _filter + `,  "valueType": {"eq": ${filter.valueType} } `;
  }
  _filter = _filter + " }";
  return JSON.parse(_filter);
};
