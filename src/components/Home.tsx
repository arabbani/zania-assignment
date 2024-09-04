import { Grid } from "@mantine/core";
import { Card } from "./Card";
import { Item } from "../utils/type";
import { useEffect, useState } from "react";

export function Home() {
  const [items, setItems] = useState<Item[]>();

  const sortedItems: Item[] | undefined = items?.sort(
    (itemA, itemB) => itemA.position - itemB.position
  );

  useEffect(() => {
    const getItems = async () => {
      const response = await fetch("/api/items");
      const data: Item[] = await response.json();
      setItems(data);
    };

    getItems();
  }, []);

  return (
    <Grid justify="center">
      {sortedItems?.map((item) => (
        <Grid.Col span={4} key={item.position}>
          <Card item={item} />
        </Grid.Col>
      ))}
    </Grid>
  );
}
