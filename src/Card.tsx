import { Box, Image, Loader, Card as MantineCard, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useState } from "react";
import { Data } from "./type";

function getImageUrl(id: number) {
  return `https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-${id}.png`;
}

type CardProp = {
  item: Data;
};

export function Card({ item }: CardProp) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageUrl = getImageUrl(item.position + 1);

  const handleClick = () => {
    modals.open({
      children: <Image src={imageUrl} alt={item.title} />,
      withCloseButton: false,
      centered: true,
      size: "xl",
      padding: "0",
    });
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <MantineCard
      style={{
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <Text mb="sm">{item.title}</Text>

      <Box mih={200}>
        <Image
          src={imageUrl}
          alt={item.title}
          onLoad={handleImageLoad}
          style={{
            display: imageLoaded ? "block" : "none",
          }}
        />
        {!imageLoaded && <Loader />}
      </Box>
    </MantineCard>
  );
}
