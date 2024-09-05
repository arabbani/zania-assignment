import { delay, http, HttpResponse } from "msw";
import {
  addDataToLocalStorage,
  getDataFromLocalStorage,
} from "../utils/localstorage";
import { Item } from "../utils/type";

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
  http.patch("/api/items", async ({ request }) => {
    // wait for 2000ms before responding
    await delay(2000);

    const items = await request.json();

    if (items) {
      addDataToLocalStorage(items as Item[]);
      return new HttpResponse(null, { status: 200 });
    }
    return new HttpResponse(null, { status: 404 });
  }),
  http.post("/api/items", async ({ request }) => {
    const item = (await request.json()) as Omit<Item, "position">;

    if (!item) {
      return new HttpResponse(null, { status: 404 });
    }

    const localData = getDataFromLocalStorage();

    if (localData) {
      const localJsonData: Item[] = JSON.parse(localData);
      const dataToAdd = { ...item, position: localJsonData.length };
      const newData: Item[] = [...localJsonData, dataToAdd];
      addDataToLocalStorage(newData);
      return HttpResponse.json(dataToAdd, { status: 201 });
    } else {
      const dataToAdd = { ...item, position: 0 };
      addDataToLocalStorage([dataToAdd]);
      return HttpResponse.json(dataToAdd, { status: 201 });
    }
  }),
];
