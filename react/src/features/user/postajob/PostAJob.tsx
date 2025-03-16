import React from "react";
import Hero from "./components/Hero";
import Features from "./components/Features";
import CtaSection from "./components/CtaSection";

const PostAJob: React.FC = () => {
  return (
    <>
      <div className="bg-bgColor">
        <div className="lg:max-w-[85rem] mx-auto">
          <Hero />
          <Features />
          <CtaSection />
        </div>
      </div>
    </>
  );
};

export default PostAJob;
