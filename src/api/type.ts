export interface ApiRequestMethods {
  auth: {
    login: (data: JsonData) => PromiseResponse,
    logout: () => PromiseResponse,
  },
  menu: {
    query: () => PromiseResponse
  },
}
