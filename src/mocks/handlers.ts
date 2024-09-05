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

    if (!items) {
      return new HttpResponse(null, { status: 404 });
    }
    addDataToLocalStorage(items as Item[]);
    return new HttpResponse(null, { status: 200 });
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
  http.delete("/api/items/:title", async ({ params }) => {
    // I am assuming title as primary key here. For a real world application,
    // this should be an unique key like UUID
    const title = params.title;
    const localData = getDataFromLocalStorage();

    if (!localData || !title || typeof title !== "string") {
      return new HttpResponse(null, { status: 404 });
    }
    const localJsonData: Item[] = JSON.parse(localData);
    const filteredData = localJsonData.filter((item) => item.title !== title);

    // if the condition is true, that means no data is deleted. That means the title is wrong
    if (filteredData.length === localJsonData.length) {
      return new HttpResponse(null, { status: 404 });
    }

    addDataToLocalStorage(filteredData);
    return new HttpResponse(null, { status: 204 });
  }),
];
