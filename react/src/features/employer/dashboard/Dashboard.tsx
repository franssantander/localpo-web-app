import React from "react";
import PostedJobCards from "./components/PostedJobCards";
import overviewCards from "../../../data/overviewCards.json";
// import postedJobs from "../../../data/postedJobs.json";
import DashboardTab from "./components/DashboardTab";
import StatCard from "../../../components/employer/StatCard";
import { useDashboard } from "./hooks/useDashboard";
import { ActionIcon, Button } from "@mantine/core";
import { Icon } from "@iconify/react/dist/iconify.js";

const Dashboard: React.FC = (apiKey) => {
  const {
    postedJobs,
    overviewCards,
    totalPages,
    currentPage,
    setCurrentPage,
    isLoading,
    isError,
  } = useDashboard(apiKey, 10);

  return (
    <>
      <div className="w-full h-full">
        <div className="grid grid-cols gap-y-2">
          <h1 className="font-bold text-textBlack text-xl">Dashboard</h1>
          <p className="text-textGray text-sm max-w-[16rem] md:max-w-[32rem] md:text-lg">
            Manage your job postings and track applications with ease.
          </p>
        </div>
        <div className="grid grid-cols gap-y-14 my-14">
          <div className="grid grid-cols gap-y-3">
            <h1 className="text-textBlack font-bold">Overview</h1>
            <div className="grid grid-cols gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {overviewCards?.map((card, index) => (
                <StatCard
                  key={index}
                  title={card.title}
                  description={card.description}
                  total={card.total}
                  icon={card.icon}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols gap-y-3">
            <h1 className="text-textBlack font-bold">Posted Jobs</h1>
            <div className="grid gap-y-10 md:grid-cols-[1fr_0.4fr] gap-x-4">
              <div className="space-y-10">
                <div className="grid grid-cols gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {postedJobs &&
                    postedJobs.map((card, index) => (
                      <div key={index} className="w-full md:w-full">
                        <PostedJobCards postedJobCards={card} key={index} />
                      </div>
                    ))}
                </div>
                <div className="flex justify-end items-center gap-x-4 mt-6 md:mt-8">
                  <ActionIcon
                    variant="outline"
                    color="gray"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`px-4 py-2 border rounded-md ${
                      currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <Icon icon="radix-icons:chevron-left" fontSize={18} />
                  </ActionIcon>
                  <span className="text-sm font-medium text-textBlack">
                    Page {currentPage} of {totalPages}
                  </span>
                  <ActionIcon
                    variant="outline"
                    color="gray"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 border rounded-md ${
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <Icon icon="radix-icons:chevron-right" fontSize={18} />
                  </ActionIcon>
                </div>
              </div>
              <DashboardTab />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
