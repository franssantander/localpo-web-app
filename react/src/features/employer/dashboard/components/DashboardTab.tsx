import React, { useState } from "react";
import { Tabs, ScrollArea } from "@mantine/core";
import upcomingInterview from "../../../../data/applications.json";
import appliedApplications from "../../../../data/appliedApplications.json";
import RecentApplication from "./RecentApplication";
import UpcomingInterview from "./UpcomingInterview";
import { useOpenDrawer } from "../../jobsmanagement/hooks/useOpenDrawer";
import ViewApplicationDrawer from "../../../../components/employer/ViewApplicationDrawer";
import { useDashboardTab } from "../hooks/useDashboardTab";

const DashboardTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>("first");
  const { opened, close, selectedApplicant, handleOpenApplicant } =
    useOpenDrawer();

  const { recentApplicantData } = useDashboardTab();

  return (
    <div className="border-2 rounded-md">
      <Tabs
        classNames={{ tabLabel: "text-xs" }}
        value={activeTab}
        onChange={setActiveTab}
      >
        <Tabs.List grow>
          <Tabs.Tab
            className={`text-textGray
             ${activeTab === "first" && "font-bold text-textBlack"}`}
            value="first"
          >
            Recent Application
          </Tabs.Tab>
          <Tabs.Tab
            className={`text-textGray
                ${activeTab === "second" && "font-bold text-textBlack"}`}
            value="second"
          >
            Upcoming Interviews
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel p={10} value="first">
          <ScrollArea h={700}>
            <div className="grid grid-cols gap-y-3">
              {recentApplicantData?.map((recent, index) => (
                <RecentApplication
                  recent={recent}
                  handleOpenApplicant={() => handleOpenApplicant(recent)}
                  key={index}
                />
              ))}
            </div>
          </ScrollArea>
          <ViewApplicationDrawer
            selectedApplicant={selectedApplicant!}
            opened={opened}
            close={close}
          />
        </Tabs.Panel>
        <Tabs.Panel p={10} value="second">
          <ScrollArea h={700}>
            <div className="grid grid-cols gap-y-3">
              {upcomingInterview.map((inter, index) => (
                <UpcomingInterview inter={inter} key={index} />
              ))}
            </div>
          </ScrollArea>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default DashboardTab;
