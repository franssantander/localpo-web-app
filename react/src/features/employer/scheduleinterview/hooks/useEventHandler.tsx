import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import { useState } from "react";
import {
  EventExtendedProps,
  EventProps,
  UseEventHandlerReturn,
} from "../../../../interface/interface";

export const useEventHandler = (): UseEventHandlerReturn => {
  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0];
  const [selectedEvent, setSelectedEvent] = useState<EventExtendedProps | null>(
    null
  );
  const [opened, { open, close }] = useDisclosure(false);

  const events: EventProps[] = [
    {
      title: "Interview with John Doe",
      start: formattedToday,
      end: formattedToday,
      extendedProps: {
        img_profile:
          "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        bg_cover:
          "https://cdn.shopify.com/s/files/1/0066/4574/3686/files/Abstract_LinkedIn_Background.png?v=1627912075",
        applicant_name: "John Doe",
        applicant_email: "johndoe@gmail.com",
        phone_number: "09123456789",
        applicant_live: "Metro Manila",
        status: "New",
        job_applied: "Software Engineer",
        job_title: "Full Software Engineer",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis ex tempore deserunt illo at voluptates architecto earum, sed velit quis odio ea soluta blanditiis natus dolorem nulla. Necessitatibus velit totam minus voluptatibus quia obcaecati provident, sequi maiores quaerat! Velit expedita repellat, praesentium consequuntur eum laborum doloribus ipsum inventore iusto, sequi cupiditate debitis dolorum libero exercitationem mollitia tempore animi totam facilis! Vitae, id, placeat accusantium neque animi voluptas quae tenetur possimus ut aut cumque suscipit laboriosam, quidem unde amet facere esse soluta? Laborum veritatis enim quisquam molestiae maiores odit deleniti, distinctio vero exercitationem doloremque tempora, officia neque assumenda ipsam voluptas sed.",
        date_interview: "1-12-2024",
        experience: [
          {
            job_title: "Frontend Developer",
            company: "Google",
            years_experience: "June 2023 - May 2024",
          },
          {
            job_title: "Frontend Developer",
            company: "Microsoft",
            years_experience: "June 2023 - May 2024",
          },
        ],
        skills: [
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Redux",
          "Jest",
          "Cypress",
          "Docker",
          "Kubernetes",
        ],
        start_time: "1:00 PM",
        end_time: "2:00 PM",
        interview_type: "Virtual - Google Meet",
        location: null,
      },
    },
  ];

  const handleEventClick = (eventInfo: any) => {
    open();
    const scheduleData = eventInfo.event._def.extendedProps;
    const parsedDate = dayjs(scheduleData.date_interview, "DD-MM-YYYY");
    const nativeDate = parsedDate.toDate();

    setSelectedEvent({
      ...scheduleData,
      date_interview: nativeDate,
    });
  };

  return { events, handleEventClick, opened, close, selectedEvent };
};
