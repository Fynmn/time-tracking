import SideBar from "./components/SideBar";
import TaskCard from "./components/TaskCard";

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
      groups[weekNumber] = [];
    }
    groups[weekNumber].push(entry);
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
  return sortGroups(groups);
};

// Step 6: Parse data from local storage.
const parsedGroupEntriesByWeekDescending = groupEntriesByWeekDescending(
  JSON.parse(localStorage.getItem("timeEntries"))
);

const App = () => {
  return (
    <>
      <div className="flex max-w-7xl mx-auto">
        <SideBar></SideBar>
        <div className="flex flex-col px-8 py-[32px]">
          {JSON.stringify(parsedGroupEntriesByWeekDescending)}
          <div className="text-accent text-2xl font-bold mb-4">
            Time Entries
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <TaskCard
              hours={1}
              desc={"I created a TaskCard component"}
              project={"Project 1"}
              timeStamp={"2023-07-29T05:34:45.391Z"}
            ></TaskCard>
            <TaskCard
              hours={0.5}
              desc={"I created a Button component"}
              project={"Project 1"}
              timeStamp={"2023-07-29T05:34:45.391Z"}
            ></TaskCard>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
