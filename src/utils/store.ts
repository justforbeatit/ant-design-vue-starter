import {ref} from "vue";
import { StorageSerializers, useStorage as vueuseStorage } from "@vueuse/core";

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

export function useState() {
  return new Proxy({state: {}}, {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(target: any, prop: string) {
      return (value: undefined | null | string = undefined): string | void => {
        if (value === undefined) {
          return target.state[prop]?.value
        }
        target.state[prop] = ref(value)
      }
    }
  })
}
