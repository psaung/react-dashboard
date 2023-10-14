import { atom } from "jotai";
import { isArray, isObject } from "lodash";

export function isJson(item: unknown) {
  let value = typeof item !== "string" ? JSON.stringify(item) : item;
  try {
    value = JSON.parse(value);
  } catch (e) {
    return false;
  }

  return typeof value === "object" && value !== null;
}

export function atomWithWebStorage<Value>(
  key: string,
  initialValue: Value,
  storage = localStorage,
) {
  const storedValue: string = storage.getItem(key) || "";
  const value = isJson(storedValue) ? JSON.parse(storedValue) : storedValue;

  const storageValue = value;

  const baseAtom = atom(storageValue ?? initialValue);

  return atom(
    (get) => get(baseAtom) as Value,
    (_get, set, nextValue: Value) => {
      set(baseAtom, nextValue);
      if (isObject(nextValue) || isArray(nextValue)) {
        storage.setItem(key, JSON.stringify(nextValue));
      } else {
        storage.setItem(key, nextValue!.toString());
      }
    },
  );
}
