import DoughnutChart from "../components/DoughnutChart";
import DropDownProfile from "../components/DropDownProfile";
import SideBar from "../components/SideBar";
import TaskCard from "../components/TaskCard";
import TimeEntryForm from "../components/TimeEntryForm";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Step 1: Parse the timestamp string into a JavaScript Date object.
const parseTimestamp = (timestamp) => {
  return new Date(timestamp);
};

// Step 2: Calculate the week number for each entry using the getWeek function.
const getWeek = (date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const daysOffset = firstDayOfYear.getDay() - 1 + 1;
  const startDate = new Date(date.getFullYear(), 0, 1 + daysOffset);
  const timeDiff = date.getTime() - startDate.getTime();
  const dayDiff = Math.floor(timeDiff / (24 * 60 * 60 * 1000));
  return Math.ceil((dayDiff + startDate.getDay() + 1) / 7);
};

const calculateWeekNumber = (entry) => {
  const timestamp = parseTimestamp(entry.timeStamp);
  return getWeek(timestamp);
};

// Step 3: Group the entries based on their week numbers.
const groupEntriesByWeek = (entries) => {
  const groups = {};

  entries.forEach((entry) => {
    const weekNumber = calculateWeekNumber(entry);
    if (!groups[weekNumber]) {
      groups[weekNumber] = {
        entries: [],
        totalHoursPerProject: {},
      };
    }

    groups[weekNumber].entries.push(entry);

    const { project, hours } = entry;
    if (!groups[weekNumber].totalHoursPerProject[project]) {
      groups[weekNumber].totalHoursPerProject[project] = hours;
    } else {
      groups[weekNumber].totalHoursPerProject[project] += hours;
    }
  });

  return groups;
};

// Step 4: Sort the groups in descending order based on the week numbers.
const sortGroups = (groups) => {
  const sortedGroups = Object.keys(groups).sort((a, b) => b - a);
  return sortedGroups.map((weekNumber) => groups[weekNumber]);
};

// Step 5: Return the groups as an array.
const groupEntriesByWeekDescending = (entries) => {
  const groups = groupEntriesByWeek(entries);
  const sortedGroups = sortGroups(groups);

  return sortedGroups.map((group) => ({
    totalHoursPerProject: group.totalHoursPerProject,
    entries: group.entries,
  }));
};

// Step 6: Parse data from local storage.
// const parsedGroupEntriesByWeekDescending =
//   groupEntriesByWeekDescending(timeEntries);

function parsedGroupEntriesByWeekDescending() {
  if (!localStorage.getItem("timeEntries")) return null;
  return groupEntriesByWeekDescending(
    JSON.parse(localStorage.getItem("timeEntries"))
  );
}

const Dashboard = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const taskCardVariants = {
    hidden: {
      y: 0.1,
    },
    visible: {
      y: 0,
      transition: {
        delay: 0.2,
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const taskCardChildVariants = {
    hidden: {
      y: -35,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        ease: "easeOut",
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="flex flex-col items-center w-full bg-accent py-8 md:hidden">
        <h1 className="text-white text-2xl font-black ">Time Tracking App</h1>
        <h2 className="text-lightGray text-base font-normal">
          Make an entry, track your hours!
        </h2>
      </div>
      <div className="flex max-w-7xl mx-auto h-full flex-grow">
        <div className="hidden md:block min-h-screen bg-lightGray">
          <SideBar></SideBar>
        </div>
        <div className="flex flex-col px-8 py-[32px] w-full">
          <div className="flex justify-center md:hidden mb-8">
            <TimeEntryForm></TimeEntryForm>
          </div>
          <div className="flex items-center mb-4">
            <div className="flex-grow text-accent text-2xl font-bold ">
              Time Entries
            </div>
            <div className="flex justify-end">
              <DropDownProfile></DropDownProfile>
            </div>
          </div>
          {/* {JSON.stringify(
            JSON.parse(localStorage.getItem("timeEntries")),
            null,
            2
          )} */}
          {/* {JSON.stringify(parsedGroupEntriesByWeekDescending())} */}
          <div className="flex flex-col flex-wrap gap-y-8" ref={ref}>
            {localStorage.getItem("timeEntries") &&
              parsedGroupEntriesByWeekDescending().map((array, index) => (
                <div key={index} className="">
                  <div>
                    {index === 0 ? (
                      <p className="text-darkGray font-medium text-base">
                        This week
                      </p>
                    ) : index === 1 ? (
                      <p className="text-darkGray font-medium text-base">
                        {index} week ago
                      </p>
                    ) : (
                      <p className="text-darkGray font-medium text-base">
                        {index} weeks ago
                      </p>
                    )}
                  </div>
                  <motion.div
                    variants={taskCardVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className=""
                    viewport={{ once: true }}
                  >
                    <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center md:justify-start">
                      <motion.span
                        variants={taskCardChildVariants}
                        viewport={{ once: true }}
                        key={index}
                      >
                        <div className="flex justify-center max-h-[210px] min-w-[260px] max-w-[260px] md:min-w-[336px] md:max-w-[336px]">
                          <DoughnutChart
                            values={[
                              array["totalHoursPerProject"]["Project 1"],
                              array["totalHoursPerProject"]["Project 2"],
                              array["totalHoursPerProject"]["Project 3"],
                            ]}
                          ></DoughnutChart>
                        </div>
                      </motion.span>
                      {array["entries"].map((item, itemIndex) => (
                        <motion.span
                          variants={taskCardChildVariants}
                          viewport={{ once: true }}
                          key={itemIndex}
                        >
                          <TaskCard key={itemIndex} {...item}></TaskCard>
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
