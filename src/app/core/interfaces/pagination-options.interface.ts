export interface PaginationOptions {
  limit: number;
  skip: number;
}

export interface PaginationMetaData {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PaginationResult<T> {
  data: T[];
  meta: PaginationMetaData;
}
