import { http, HttpResponse } from "msw";
import { Item } from "../utils/type";
import {
  addDataToLocalStorage,
  getDataFromLocalStorage,
} from "../utils/localstorage";

export const handlers = [
  http.get("/api/items", async () => {
    const localData = getDataFromLocalStorage();

    if (localData) {
      return HttpResponse.json(JSON.parse(localData) as Item[]);
    } else {
      const fileDataModule = await import("../data/items.json");
      const fileItems: Item[] = fileDataModule.default;
      addDataToLocalStorage(fileItems);
      return HttpResponse.json(fileItems as Item[]);
    }
  }),
  http.post("/api/items", async ({ request }) => {
    const items = await request.json();

    if (items) {
      addDataToLocalStorage(items as Item[]);
    }
    return HttpResponse.json(items);
  }),
];
