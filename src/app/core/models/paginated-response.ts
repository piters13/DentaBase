export interface PaginatedResponse<T> {
  items: ReadonlyArray<T>;
  hasNext: boolean;
}
