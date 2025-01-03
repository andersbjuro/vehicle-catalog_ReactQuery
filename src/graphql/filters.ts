
export const createBomFilter = (filter: any) => {
  let _filter = "{"

  if (filter.searchValue !== '')
    _filter = ` { "or": [ {"name": { "contains": "${filter.searchValue}"}} ${!isNaN(filter.searchValue) ? `, {"id": { "eq": ${parseInt(filter.searchValue)}}}` : ""} ] `;

  if (filter.brandId) {
    if (filter.searchValue !== '')
      _filter = _filter + ', '
    _filter = _filter +
      ` "and": [{ "brandId": { "eq": ${filter.brandId} }} ${filter.productGroupId ? `, { "productGroupId": { "eq": ${filter.productGroupId} }}` : ""}] `;
  }

  _filter = _filter + " }";
  return JSON.parse(_filter);
};

export const createOeItemsFilter = (filter: any) => {
  let _filter = "{"

  if (filter.searchValue !== '')
    _filter = ` { "or": [ {"oeName": { "contains": "${filter.searchValue}"}}, {"oeItemId": { "startsWith": "${filter.searchValue}"} } ] `;

  if (filter.brandId > 0) {
    if (filter.searchValue !== '')
      _filter = _filter + ', '
    _filter =
      _filter +
      ` "and": [{ "brandId": { "eq": ${filter.brandId} }} ${filter.productGroupId ? `, { "productGroupId": { "eq": ${filter.productGroupId} }}` : ""}] `;
  }

  _filter = _filter + " }";
  return JSON.parse(_filter);
};
