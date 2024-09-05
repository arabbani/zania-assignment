import { Item } from "./type";

const LOCAL_STORAGE_KEY = "zania-items";

export function addDataToLocalStorage(items: Item[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
}

export function getDataFromLocalStorage() {
  return localStorage.getItem(LOCAL_STORAGE_KEY);
}
