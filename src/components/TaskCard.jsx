/* eslint-disable react/prop-types */
import FlatShadowCard from "./FlatShadowCard";
import { MdTaskAlt as TaskIcon } from "react-icons/md";
import { AiOutlineClockCircle as HoursIcon } from "react-icons/ai";

const TaskCard = ({ hours, desc, project, timeStamp }) => {
  return (
    <>
      <FlatShadowCard
        className="px-10 py-8 bg-white flex flex-col items-start gap-y-4 min-w-[380px] max-w-[380px] text-black"
        flatOnMouseDown={true}
      >
        <div className="flex gap-x-2 items-center w-full">
          <p className="text-lg leading-[29px] font-black">{project}</p>
          <div className="flex-1"></div>
          <div className="flex gap-x-1 justify-end">
            <div style={{ color: "#ADB6C3" }}>
              <HoursIcon size={24} />
            </div>
            <p className="font-normal text-base" style={{ color: "#ADB6C3" }}>
              {hours === 1 ? hours + " hour" : hours + " hours"}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 text-base font-light min-h-[112px] max-h-[112px] w-full">
          <div className="flex text-start gap-x-1">
            <div className="text-primary min-h-[24px]">
              <TaskIcon size={24} />
            </div>
            <p className="line-clamp-3">{desc}</p>
          </div>
          <div className="flex-1"></div>
          <div className="flex justify-end">
            <p className="font-normal text-base" style={{ color: "#ADB6C3" }}>
              {timeStamp}
            </p>
          </div>
        </div>
      </FlatShadowCard>
    </>
  );
};

// Props Types of TaskCard (alternative to TypeScript - uncomment if needed to enable eslint)
// import PropTypes from "prop-types";

// TaskCard.propTypes = {
//   hours: PropTypes.number.isRequired,
//   desc: PropTypes.string.isRequired,
//   project: PropTypes.string.isRequired,
//   timeStamp: PropTypes.string.isRequired,
// };

export default TaskCard;
