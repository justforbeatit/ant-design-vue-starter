export interface ApiRequestMethods {
  auth: {
    login: (data: JsonData) => PromiseResponse,
    logout: (data: JsonData) => PromiseResponse,
  },
  menu: {
    query: () => PromiseResponse
  },
}
