import dayjs, { Dayjs } from "dayjs";
import { dataSource, MockRow } from "./mockup";

export type FilterType = "search" | "dateRange" | "select" | "radio" | "checkbox";

export type FilterOption = { label: string; value: string };

export type FilterCatalogItem = {
  catalogId: string;
  type: FilterType;
  field: keyof MockRow;
  label: string;
  options?: FilterOption[];
};

export type FilterInstance = FilterCatalogItem & {
  id: string;
  value: unknown;
};

function toOptions(values: string[]): FilterOption[] {
  return Array.from(new Set(values)).map((value) => ({ label: value, value }));
}

export const FILTER_CATALOG: FilterCatalogItem[] = [
  {
    catalogId: "name-search",
    type: "search",
    field: "name",
    label: "이름",
  },
  {
    catalogId: "createdAt-range",
    type: "dateRange",
    field: "createdAt",
    label: "등록일",
  },
  {
    catalogId: "owner-select",
    type: "select",
    field: "owner",
    label: "담당자",
    options: toOptions(dataSource.map((row) => row.owner)),
  },
  {
    catalogId: "status-radio",
    type: "radio",
    field: "status",
    label: "상태",
    options: toOptions(dataSource.map((row) => row.status)),
  },
  {
    catalogId: "category-checkbox",
    type: "checkbox",
    field: "category",
    label: "카테고리",
    options: toOptions(dataSource.map((row) => row.category)),
  },
];

export function getDefaultFilterValue(type: FilterType): unknown {
  switch (type) {
    case "search":
    case "select":
    case "radio":
      return undefined;
    case "checkbox":
      return [];
    case "dateRange":
      return null;
  }
}

function matchFilter(row: MockRow, filter: FilterInstance): boolean {
  switch (filter.type) {
    case "search": {
      const keyword = (filter.value as string | undefined)?.trim();
      if (!keyword) return true;
      return String(row[filter.field]).toLowerCase().includes(keyword.toLowerCase());
    }
    case "select":
    case "radio": {
      const value = filter.value as string | undefined;
      if (!value) return true;
      return String(row[filter.field]) === value;
    }
    case "checkbox": {
      const values = filter.value as string[] | undefined;
      if (!values || values.length === 0) return true;
      return values.includes(String(row[filter.field]));
    }
    case "dateRange": {
      const range = filter.value as [Dayjs, Dayjs] | null;
      if (!range || !range[0] || !range[1]) return true;
      const target = dayjs(String(row[filter.field]));
      return (
        !target.isBefore(range[0].startOf("day")) &&
        !target.isAfter(range[1].endOf("day"))
      );
    }
  }
}

export function applyFilters(rows: MockRow[], filters: FilterInstance[]): MockRow[] {
  if (filters.length === 0) return rows;
  return rows.filter((row) => filters.every((filter) => matchFilter(row, filter)));
}
