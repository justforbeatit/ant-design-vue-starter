export function useStorage() {
  return new Proxy({ storage: window.localStorage }, {
    get({ storage }: JsonData, prop: string) {
      return (value: undefined | null | string = undefined): string | void => {
        if (value === undefined) {
          return <string>storage.getItem(prop)
        }
        storage.setItem(prop, <string>value)
      }
    }
  })
}
