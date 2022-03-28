import { StorageSerializers, useStorage } from "@vueuse/core";

const KEY = '__token__';
const storage = useStorage(KEY, null, undefined, { serializer: StorageSerializers.object })

export function setToken(token: string): void {
  storage.value = token
}

export function getToken(): string | null {
  return storage.value
}

export function removeToken(): void {
  storage.value = null
}
