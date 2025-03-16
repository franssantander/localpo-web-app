import React from "react";
import world from "../../../../assets/world.svg";
import medal from "../../../../assets/medal.svg";
import group from "../../../../assets/group.svg";
import statistics from "../../../../assets/statistics.svg";

const Features: React.FC = () => {
  const features = [
    {
      icon: world,
      title: "Expand Your Horizons with Unmatched Visibility",
      subTitle: "Tap into a Global Network of Qualified Candidates",
    },
    {
      icon: statistics,
      title: "Post, Manage, and Track Your Listings with Ease",
      subTitle: "Effortless Posting with Intuitive Tools.",
    },
    {
      icon: medal,
      title: "Highlight What Makes Your Workplace Exceptional",
      subTitle: "Showcase Your Company with a Strong Employer Brand",
    },
    {
      icon: group,
      title: "Leverage AI to Find the Perfect Match for Your Roles",
      subTitle: "Connect with the Right Talent Faster",
    },
  ];

  return (
    <>
      <div className="w-full h-full py-32 px-4">
        <div className="grid grid-cols gap-y-4">
          <h1 className="font-bold text-textBlack text-3xl">
            Simplify Your Hiring Process with Ease.
          </h1>
          <p className="text-textGray max-w-2xl md:text-lg">
            Finding the perfect candidate shouldn't be complicated. Our
            intuitive platform empowers you to post, screen, and hire quickly
            and efficiently.
          </p>
        </div>
        <div className="grid grid-cols gap-x-3 md:grid-grid-cols-2 md:gap-y-16 pt-20 lg:grid-cols-2">
          {features.map((item, index) => (
            <div key={index}>
              <div className="flex items-center gap-x-4">
                <img src={item.icon} alt={item.icon} />
                <div className="grid grid-cols gap-y-2">
                  <p className="text-textGray">{item.subTitle}</p>
                  <h1 className="font-bold text-2xl max-w-sm text-textBlack">{item.title}</h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Features;
