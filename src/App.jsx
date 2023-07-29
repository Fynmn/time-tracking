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
      <div className="flex max-w-7xl mx-auto h-full flex-grow">
        <div className="hidden md:block min-h-screen bg-lightGray">
          <SideBar></SideBar>
        </div>
        <div className="flex flex-col px-8 py-[32px]">
          <div className="text-accent text-2xl font-bold mb-4">
            Time Entries
          </div>
          {/* {JSON.stringify(
            JSON.parse(localStorage.getItem("timeEntries")),
            null,
            2
          )} */}
          <div className="flex flex-col flex-wrap gap-y-8">
            {parsedGroupEntriesByWeekDescending.map((array, index) => (
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
                <div className="flex flex-wrap gap-x-8 gap-y-4">
                  {array.map((item, itemIndex) => (
                    <TaskCard key={itemIndex} {...item}></TaskCard>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
