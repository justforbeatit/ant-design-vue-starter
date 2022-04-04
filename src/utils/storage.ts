export function useStorage() {
  return new Proxy({}, {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(target: any, prop: string) {
      target.storage = vueuseStorage(prop, null, undefined, { serializer: StorageSerializers.object })
      return (value: undefined | null | string = undefined): string | void => {
        if (value === undefined) {
          return target.storage.vlaue
        }
        target.storage.value = value
      }
    }
  })
}
