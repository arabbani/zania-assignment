import { Box, Flex, Grid, LoadingOverlay } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { Item } from "../utils/type";
import { Card } from "./Card";
import { useInterval } from "../utils/hooks/useInterval";
import { getTimeDifference } from "../utils/time";

export function Home() {
  const [items, setItems] = useState<Item[]>();
  const [saving, toggleSaving] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date>();
  const [lastSavedTime, setLastSavedTime] = useState<Date>();

  const changeDetectorRef = useRef<boolean>(false);
  const draggedItemRef = useRef<number>(0);
  const draggedOverItemRef = useRef<number>(0);

  // In case the data comes out of order
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

  useInterval(async () => {
    if (!changeDetectorRef.current) {
      return;
    }

    toggleSaving(true);

    await fetch("/api/items", {
      method: "POST",
      body: JSON.stringify(items),
    });

    setLastSavedTime(new Date());
    changeDetectorRef.current = false;
    toggleSaving(false);
  }, 5000);

  useInterval(() => {
    setCurrentTime(new Date());
  }, 1000);

  const handleDragEnd = () => {
    if (draggedItemRef.current === draggedOverItemRef.current) {
      return;
    }

    const clonedItems = JSON.parse(JSON.stringify(items));
    const draggedItem = clonedItems[draggedItemRef.current];
    const draggedOverItem = clonedItems[draggedOverItemRef.current];

    draggedOverItem.position = draggedItemRef.current;
    draggedItem.position = draggedOverItemRef.current;

    clonedItems[draggedItemRef.current] = draggedOverItem;
    clonedItems[draggedOverItemRef.current] = draggedItem;
    setItems(clonedItems);
    changeDetectorRef.current = true;
    draggedItemRef.current = 0;
    draggedOverItemRef.current = 0;
  };

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={saving}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      {lastSavedTime && currentTime && (
        <Flex justify="center">
          Time since last save: {getTimeDifference(lastSavedTime, currentTime)}
        </Flex>
      )}
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
    </Box>
  );
}
