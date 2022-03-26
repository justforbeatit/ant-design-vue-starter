type JsonData = Json<unknown>

type PromiseResponse = Promise<JsonData>

export interface ApiRequestMethods {
  auth: {
    login: (data: JsonData) => PromiseResponse,
    logout: (data: JsonData) => PromiseResponse,
  },
  users: {
    query: () => PromiseResponse
    queryRow: (data: JsonData) => PromiseResponse
  }
}
