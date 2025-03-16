import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Card, Image } from "@mantine/core";
import React from "react";
import { CompaniesProps } from "../../../../interface/interface";

const CompanyList: React.FC<CompaniesProps> = (props) => {
  const { company } = props;
  const { img, title, location, industry, description } = company;

  return (
    <>
      <Card radius="md" withBorder>
        <div className="grid grid-cols gap-y-3">
          <Image
            radius="md"
            src={img}
            h={80}
            w={80}
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
          />
          <div className="grid grid-cols gap-y-2">
            <div className="grid grid-cols gap-y-1">
              <h1 className="text-textBlack font-bold">{title}</h1>
              <div className="flex items-center gap-x-2">
                <h1 className="text-textGray text-xs">{location}</h1>
                <Icon fontSize={6} color="gray" icon="ri:circle-fill" />
                <h1 className="text-textGray text-xs">{industry}</h1>
              </div>
            </div>
            <p className="text-textGray text-sm">{description}</p>
          </div>
        </div>
        <Button fullWidth mt="md" radius="sm">
          Explore Career
        </Button>
      </Card>
    </>
  );
};

export default CompanyList;
