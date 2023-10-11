export type IFilterResponse<T> = {
  meta: {
    page: number
    total: number
    limit: number
  }
  data: T
}
