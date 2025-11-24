/**
 * Strapi-like query operators
 * @see https://docs.strapi.io/cms/api/rest/filters
 */
export type FilterOperator =
  | "$eq"
  | "$eqi"
  | "$ne"
  | "$nei"
  | "$lt"
  | "$lte"
  | "$gt"
  | "$gte"
  | "$in"
  | "$notIn"
  | "$contains"
  | "$notContains"
  | "$containsi"
  | "$notContainsi"
  | "$null"
  | "$notNull"
  | "$between"
  | "$startsWith"
  | "$startsWithi"
  | "$endsWith"
  | "$endsWithi"
  | "$or"
  | "$and"
  | "$not";

export type FilterValue =
  | string
  | number
  | boolean
  | null
  | string[]
  | number[]
  | [number, number]; // for $between

export type Filter = {
  [key: string]: FilterValue | { [K in FilterOperator]?: FilterValue };
};

export type QueryParams = {
  page?: number;
  limit?: number;
  orderBy?: string;
  orderDirection?: "ASC" | "DESC";
  filters?: Filter;
};

/**
 * Build query filters with Strapi-like operators
 */
export function buildFilters(
  filters?: Filter
): Record<string, FilterValue | { [K in FilterOperator]?: FilterValue }> {
  if (!filters) return {};

  const queryFilters: Record<
    string,
    FilterValue | { [K in FilterOperator]?: FilterValue }
  > = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    // If value is a plain string/number/boolean, use $eq
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      queryFilters[key] = { $eq: value };
      return;
    }

    // If value is an array, use $in
    if (Array.isArray(value)) {
      queryFilters[key] = { $in: value };
      return;
    }

    // If value is an object with operators
    if (typeof value === "object") {
      queryFilters[key] = value;
    }
  });

  return queryFilters;
}

/**
 * Build complete query parameters
 */
export function buildQueryParams(
  params: QueryParams
): Record<
  string,
  | string
  | number
  | Record<string, FilterValue | { [K in FilterOperator]?: FilterValue }>
> {
  const queryParams: Record<
    string,
    | string
    | number
    | Record<string, FilterValue | { [K in FilterOperator]?: FilterValue }>
  > = {};

  if (params.page !== undefined) {
    queryParams.page = params.page;
  }

  if (params.limit !== undefined) {
    queryParams.limit = params.limit;
  }

  if (params.orderBy) {
    queryParams.orderBy = params.orderBy;
  }

  if (params.orderDirection) {
    queryParams.orderDirection = params.orderDirection;
  }

  const filters = buildFilters(params.filters);
  if (Object.keys(filters).length > 0) {
    queryParams.filters = filters;
  }

  return queryParams;
}
