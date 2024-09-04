import { Grid } from "@mantine/core";
import { Card } from "./Card";
import data from "./data.json";

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
