import { Grid } from "@mantine/core";
import data from "./data.json";
import { Card } from "./Card";

export function Home() {
  const sortedItems = data.sort(
    (itemA, itemB) => itemA.position - itemB.position
  );

  return (
    <Grid justify="center">
      {sortedItems.map((item) => (
        <Grid.Col span={4}>
          <Card item={item} />
        </Grid.Col>
      ))}
    </Grid>
  );
}
