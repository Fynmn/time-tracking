import SideNavbar from "./components/SideNavBar";
import TaskCard from "./components/TaskCard";

const App = () => {
  return (
    <>
      <div className="flex">
        <SideNavbar></SideNavbar>
        <div className="flex flex-col px-8 py-[72px]">
          <div className="text-accent text-2xl font-bold mb-8">
            Time Entries
          </div>
          <div className="flex">
            <TaskCard
              hours={0.5}
              desc={"I created a TaskCard component"}
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
