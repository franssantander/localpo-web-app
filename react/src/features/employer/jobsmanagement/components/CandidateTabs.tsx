import { Card, Divider, ScrollArea, Tabs } from "@mantine/core";
import React, { useState } from "react";
// import appliedApplications from "../../../../data/appliedApplications.json";
import ListApplicants from "./ListApplicants";
import CandidateFilter from "./CandidateFilter";
import ViewApplicationDrawer from "../../../../components/employer/ViewApplicationDrawer";
import { useOpenDrawer } from "../hooks/useOpenDrawer";

const CandidateTabs: React.FC = (props) => {
    const { appliedApplicants } = props;

    console.log("viewJobData: ", appliedApplicants);

    if (!appliedApplicants) {
        return [];
    }

    const [activeTab, setActiveTab] = useState<string | null>("allApplied");

    const { opened, close, selectedApplicant, handleOpenApplicant } =
        useOpenDrawer();

    return (
        <>
            <Tabs variant="pills" value={activeTab} onChange={setActiveTab}>
                <Tabs.List className="border-2 rounded-md" grow>
                    <Tabs.Tab value="allApplied">All Applied</Tabs.Tab>
                    <Tabs.Tab value="scheduleInterview">Interview</Tabs.Tab>
                    <Tabs.Tab value="shortListed">Shortlisted</Tabs.Tab>
                    <Tabs.Tab value="hiredDeclined">Hired/Declined</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="allApplied">
                    <Card className="my-4" shadow="sm" withBorder>
                        <div className="grid grid-cols gap-y-3 pb-10">
                            <h1 className="font-bold text-sm text-textBlack">
                                Candidate that applied for this Position
                            </h1>
                            <CandidateFilter />
                        </div>
                        <ScrollArea h={560}>
                            {appliedApplicants?.map((applied, index) => (
                                <>
                                    <ListApplicants
                                        applied={applied}
                                        open={() =>
                                            handleOpenApplicant(applied)
                                        }
                                        key={index}
                                    />
                                    {index < appliedApplicants?.length - 1 && (
                                        <Divider my={17} />
                                    )}
                                </>
                            ))}
                        </ScrollArea>
                    </Card>
                </Tabs.Panel>
                <Tabs.Panel value="scheduleInterview">Second panel</Tabs.Panel>
                <Tabs.Panel value="shortListed">First panel</Tabs.Panel>
                <Tabs.Panel value="hiredDeclined">Second panel</Tabs.Panel>
            </Tabs>

            {selectedApplicant && (
                <ViewApplicationDrawer
                    selectedApplicant={selectedApplicant!}
                    opened={opened}
                    close={close}
                />
            )}
        </>
    );
};

export default CandidateTabs;
