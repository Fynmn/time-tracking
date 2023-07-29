import SideBar from "./components/SideBar";
import TaskCard from "./components/TaskCard";

const App = () => {
  return (
    <>
      <div className="flex max-w-7xl mx-auto">
        <SideBar></SideBar>
        <div className="flex flex-col px-8 py-[32px]">
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
