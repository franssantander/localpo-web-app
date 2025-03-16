import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import ScheduleInterviewDrawer from "./components/ScheduleInterviewDrawer";
import { useEventHandler } from "./hooks/useEventHandler";

const ScheduleInterview: React.FC = () => {
  const { events, handleEventClick, opened, close, selectedEvent } =
    useEventHandler();

  return (
    <>
      <div className="grid grid-cols gap-y-9">
        <div className="grid grid-cols gap-y-2">
          <h1 className="font-bold text-textBlack text-xl">
            Schedule Interview
          </h1>
          <p className="text-textGray text-sm max-w-[16rem] md:max-w-[32rem] md:text-lg">
            Manage and track your assigned HR for candidates scheduled interview
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[.4fr_1fr] gap-6 py-10">
          {/* Left: List view of events */}
          <div className="p-4 border rounded-lg shadow">
            <h2 className="font-bold text-textBlack text-sm mb-4">
              Upcoming Interviews
            </h2>
            <FullCalendar
              plugins={[listPlugin]}
              initialView="listWeek"
              events={events}
              height="auto"
              headerToolbar={false}
              eventClick={handleEventClick}
            />
          </div>

          {/* Right: Calendar view */}
          <div className="p-4 border rounded-lg shadow">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={events}
              eventClick={handleEventClick}
            />
          </div>
        </div>
      </div>

      <ScheduleInterviewDrawer
        opened={opened}
        close={close}
        selectedEvent={selectedEvent}
      />
    </>
  );
};

export default ScheduleInterview;
