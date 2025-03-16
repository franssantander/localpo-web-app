import { Accordion, Card } from "@mantine/core";
import React from "react";

const LogsActivity: React.FC = () => {
  const groceries = [
    {
      emoji: "🍎",
      value: "Apples",
      description:
        "Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.",
    },
    {
      emoji: "🍌",
      value: "Bananas",
      description:
        "Naturally sweet and potassium-rich fruit. Bananas are a popular choice for their energy-boosting properties and can be enjoyed as a quick snack, added to smoothies, or used in baking.",
    },
    {
      emoji: "🥦",
      value: "Broccoli",
      description:
        "Nutrient-packed green vegetable. Broccoli is packed with vitamins, minerals, and fiber. It has a distinct flavor and can be enjoyed steamed, roasted, or added to stir-fries.",
    },
  ];

  const items = groceries.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));
  return (
    <>
      <Card p={0} withBorder>
        <div className="p-2 flex items-center border-b-[.8px]">
          <h1 className="text-xs text-textBlack mb-4 font-semibold">
            Logs Activity
          </h1>
        </div>
        <div className="p-4">
          <Accordion defaultValue="Apples">{items}</Accordion>
        </div>
      </Card>
    </>
  );
};

export default LogsActivity;
