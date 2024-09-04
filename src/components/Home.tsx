import { Grid } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { Item } from "../utils/type";
import { Card } from "./Card";

export function Home() {
  const [items, setItems] = useState<Item[]>();

  const draggedItemRef = useRef<number>(0);
  const draggedOverItemRef = useRef<number>(0);

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

  const handleDragEnd = () => {
    const clonedItems = JSON.parse(JSON.stringify(items));
    const draggedItem = clonedItems[draggedItemRef.current];
    const draggedOverItem = clonedItems[draggedOverItemRef.current];

    draggedOverItem.position = draggedItemRef.current;
    draggedItem.position = draggedOverItemRef.current;

    clonedItems[draggedItemRef.current] = draggedOverItem;
    clonedItems[draggedOverItemRef.current] = draggedItem;
    setItems(clonedItems);
  };

  return (
    <Grid justify="center">
      {sortedItems?.map((item, index) => (
        <Grid.Col
          span={4}
          key={item.position}
          draggable
          onDragStart={() => (draggedItemRef.current = index)}
          onDragEnter={() => (draggedOverItemRef.current = index)}
          onDragEnd={handleDragEnd}
        >
          <Card item={item} />
        </Grid.Col>
      ))}
    </Grid>
  );
}
