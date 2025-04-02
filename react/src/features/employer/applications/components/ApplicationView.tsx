import { Breadcrumbs, Card, Tabs } from "@mantine/core";
import React from "react";
import { Link, useParams } from "react-router-dom";
import ApplicantProfile from "./ApplicantProfile";
import HiringProgressTab from "./HiringProgressTab";
import CardProfile from "./CardProfile";
import applicationsData from "../../../../data/applications.json";
import { useApplicationsView } from "../hooks/useApplicationsView";

const ApplicationView: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const candidateData = applicationsData.find((app) => app.id === Number(id));

    const { data } = useApplicationsView(id);

    const items = [
        { title: "Applications", href: "#" },
        { title: "Senior Software Engineer", href: "#" },
    ].map((item, index) => (
        <Link to={item.href} key={index}>
            {item.title}
        </Link>
    ));
    return (
        <>
            <div className="grid grid-cols gap-y-2">
                <h1 className="font-bold text-textBlack text-xl">
                    Application
                </h1>
                <Breadcrumbs className="text-blue-500">{items}</Breadcrumbs>
                <div className="py-14 grid md:grid-cols-[.5fr_1fr] gap-7">
                    <CardProfile cardProfileData={candidateData} />
                    <div>
                        <Card shadow="sm" withBorder>
                            <Card.Section>
                                <Tabs defaultValue="applicantProfile">
                                    <Tabs.List>
                                        <Tabs.Tab value="applicantProfile">
                                            Applicant Profile
                                        </Tabs.Tab>
                                        <Tabs.Tab
                                            value="hiringProgress"
                                            color="blue"
                                        >
                                            Hiring Progress
                                        </Tabs.Tab>
                                    </Tabs.List>
                                    <Tabs.Panel
                                        px="md"
                                        value="applicantProfile"
                                        pt="xs"
                                    >
                                        <ApplicantProfile
                                            applicantProfileData={candidateData}
                                        />
                                    </Tabs.Panel>
                                    <Tabs.Panel
                                        px="md"
                                        value="hiringProgress"
                                        pt="xs"
                                    >
                                        <HiringProgressTab
                                            hiringProgressData={candidateData}
                                        />
                                    </Tabs.Panel>
                                </Tabs>
                            </Card.Section>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ApplicationView;
