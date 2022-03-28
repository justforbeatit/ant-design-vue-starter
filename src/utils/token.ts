import { StorageSerializers, useStorage } from "@vueuse/core";

const KEY = '__token__';
const storage = useStorage(KEY, null, undefined, { serializer: StorageSerializers.object })

export function useToken() {
  return {
    get(): string | null {
      return storage.value
    },
    set(token: string): void {
      storage.value = token
    },
    remove(): void {
      storage.value = null
    }
  }
}
