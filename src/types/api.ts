export interface ApiResponse<T> {
  data: T;
  meta?: {
    total?: number;
    nextCursor?: string;
    hasPrevious?: boolean;
    hasNext?: boolean;
  };
  errors?: ApiError[];
}

export interface ApiError {
  code: string;
  message: string;
  field?: string;
}

export interface PaginatedParams {
  cursor?: string;
  limit?: number;
}
