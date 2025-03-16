import React from "react";
import Hero from "./components/Hero";
import JobsSection from "../jobs/JobsSection";
import Companies from "../companies/Companies";
import Benefits from "../benefits/Benefits";
import CtaSection from "../ctasection/CtaSection";

const Home: React.FC = () => {
  return (
    <div className="bg-bgColor h-full">
      <div className="lg:max-w-[85rem] mx-auto">
        <Hero />
        <JobsSection />
        <Companies />
        <Benefits />
        <CtaSection />
      </div>
    </div>
  );
};

export default Home;
