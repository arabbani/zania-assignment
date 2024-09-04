import { Image, Card as MantineCard, Text } from "@mantine/core";
import { Data } from "./type";

function getImageUrl(id: number) {
  return `https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-${id}.png`;
}

type CardProp = {
  item: Data;
};

export function Card({ item }: CardProp) {
  const imageUrl = getImageUrl(item.position + 1);
  return (
    <MantineCard
      style={{
        cursor: "pointer",
      }}
    >
      <Text mb="sm">{item.title}</Text>
      <Image src={imageUrl} alt={item.title} />
    </MantineCard>
  );
}
