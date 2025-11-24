# Query Builder - Strapi-like Filtering

This module provides a flexible query building system inspired by [Strapi's REST API filters](https://docs.strapi.io/cms/api/rest/filters).

## Supported Operators

### Comparison Operators

- `$eq` - Equal
- `$eqi` - Equal (case-insensitive)
- `$ne` - Not equal
- `$nei` - Not equal (case-insensitive)
- `$lt` - Less than
- `$lte` - Less than or equal
- `$gt` - Greater than
- `$gte` - Greater than or equal

### Array Operators

- `$in` - Included in an array
- `$notIn` - Not included in an array

### String Operators

- `$contains` - Contains (case-sensitive)
- `$notContains` - Does not contain (case-sensitive)
- `$containsi` - Contains (case-insensitive)
- `$notContainsi` - Does not contain (case-insensitive)
- `$startsWith` - Starts with
- `$startsWithi` - Starts with (case-insensitive)
- `$endsWith` - Ends with
- `$endsWithi` - Ends with (case-insensitive)

### Null Operators

- `$null` - Is null
- `$notNull` - Is not null

### Range Operators

- `$between` - Between two values (use array with 2 elements)

### Logical Operators

- `$and` - Logical AND
- `$or` - Logical OR
- `$not` - Logical NOT

## Usage Examples

### Basic Equality Filter

```typescript
import { useGetEmployees } from "@/features/employee/api";

const { data } = useGetEmployees({
  filters: {
    status: "active", // Automatically uses $eq
  },
});
```

### Array Filter ($in)

```typescript
const { data } = useGetEmployees({
  filters: {
    position: ["Senior", "Manager"], // Automatically uses $in
  },
});
```

### Explicit Operators

```typescript
const { data } = useGetEmployees({
  filters: {
    name: { $containsi: "john" }, // Case-insensitive contains
    salary: { $gte: 50000 }, // Greater than or equal
    email: { $endsWith: "@company.com" },
  },
});
```

### Range Filter

```typescript
const { data } = useGetEmployees({
  filters: {
    salary: { $between: [40000, 80000] },
  },
});
```

### Multiple Conditions

```typescript
const { data } = useGetEmployees({
  filters: {
    position: { $in: ["Senior", "Manager"] },
    status: { $eq: "active" },
    salary: { $gte: 60000 },
    department: { $ne: "HR" },
  },
});
```

### With Sorting and Pagination

```typescript
const { data } = useGetEmployees({
  limit: 20,
  orderBy: "salary",
  orderDirection: "DESC",
  filters: {
    position: ["Senior", "Manager"],
    status: "active",
  },
});
```

### Complex Queries (Logical Operators)

```typescript
const { data } = useGetEmployees({
  filters: {
    $or: [{ position: { $eq: "Manager" } }, { salary: { $gte: 100000 } }],
  },
});
```

### Null Checks

```typescript
const { data } = useGetEmployees({
  filters: {
    avatar: { $notNull: true },
    departmentId: { $null: false },
  },
});
```

## Query String Output

The filters are automatically converted to query strings using the `qs` library:

### Simple Filter

```typescript
filters: {
  status: "active";
}
```

Becomes: `?filters[status][$eq]=active`

### Array Filter

```typescript
filters: {
  position: ["Senior", "Manager"];
}
```

Becomes: `?filters[position][$in][0]=Senior&filters[position][$in][1]=Manager`

### Multiple Filters

```typescript
filters: {
  status: "active",
  position: { $in: ["Senior", "Manager"] },
  salary: { $gte: 50000 }
}
```

Becomes: `?filters[status][$eq]=active&filters[position][$in][0]=Senior&filters[position][$in][1]=Manager&filters[salary][$gte]=50000`

## Type Safety

The system is fully typed with TypeScript:

```typescript
import { Filter } from "@/lib/query-builder";

const myFilters: Filter = {
  name: "John", // string
  age: { $gte: 18 }, // number with operator
  tags: ["admin", "user"], // string array
  salary: { $between: [40000, 80000] }, // range
};
```

## Integration with React Query

Both `useGetEmployees` and `useGetDepartments` hooks support the full filter system:

```typescript
const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
  useGetEmployees({
    limit: 20,
    orderBy: "createdAt",
    orderDirection: "DESC",
    filters: {
      status: "active",
      position: { $in: ["Senior", "Manager"] },
      name: { $containsi: "john" },
    },
  });
```

## Best Practices

1. **Use simple values for exact matches**: `{ status: "active" }` instead of `{ status: { $eq: "active" } }`
2. **Use arrays for multiple values**: `{ position: ["Senior", "Manager"] }` instead of `{ position: { $in: ["Senior", "Manager"] } }`
3. **Be explicit with operators for complex queries**: Use `$gte`, `$contains`, etc. when needed
4. **Combine with pagination and sorting** for optimal performance
5. **Use case-insensitive operators** (`$containsi`, `$eqi`) for user-friendly searches
