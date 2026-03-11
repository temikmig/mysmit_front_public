export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SortParams<T> {
  sortColumn?: keyof T;
  sortOrder?: "asc" | "desc";
}

export interface SearchParams {
  search?: string;
}
