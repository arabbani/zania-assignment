import { http, HttpResponse } from "msw";
import { Item } from "../utils/type";

const LOCAL_STORAGE_KEY = "zania-items";

export const handlers = [
  http.get("/api/items", async () => {
    const localData = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (localData) {
      return HttpResponse.json(JSON.parse(localData) as Item[]);
    } else {
      const fileDataModule = await import("../data/items.json");
      const fileItems: Item[] = fileDataModule.default;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fileItems));
      return HttpResponse.json(fileItems as Item[]);
    }
  }),
];
