import React from "react";
import { BenefitsProps } from "../../../../interface/interface";
import { Icon } from "@iconify/react/dist/iconify.js";

const BenefitList: React.FC<BenefitsProps> = (props) => {
  const { benefit } = props;
  const { icon, title, description } = benefit;
  return (
    <>
      <div>
        <div className="grid grid-cols gap-y-3 sm:gap-y-4">
          <Icon icon={icon} fontSize={34} />
          <h1 className="font-bold text-2xl text-textBlack">{title}</h1>
          <p className="md:text-lg text-textGray">{description}</p>
        </div>
      </div>
    </>
  );
};

export default BenefitList;
