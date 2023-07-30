/* eslint-disable react/prop-types */
import FlatShadowCard from "./FlatShadowCard";
import { MdTaskAlt as TaskIcon } from "react-icons/md";
import { AiOutlineClockCircle as HoursIcon } from "react-icons/ai";
import { format } from "fecha";

const TaskCard = ({ hours, desc, project, timeStamp }) => {
  return (
    <>
      <FlatShadowCard
        className="px-6 py-6 md:px-10 md:py-8 bg-white flex flex-col items-start gap-y-4 min-w-[260px] max-w-[260px] md:min-w-[336px] md:max-w-[336px] text-black"
        flatOnMouseDown={true}
      >
        <div className="flex gap-x-2 items-center w-full">
          <p className="text-base md:text-lg md:leading-[29px] font-black">
            {project}
          </p>
          <div className="flex-1"></div>
          <div className="flex gap-x-1 justify-end items-center">
            <div className="text-base md:text-xl" style={{ color: "#ADB6C3" }}>
              <HoursIcon />
            </div>
            <p
              className="font-normal text-xs md:text-sm"
              style={{ color: "#ADB6C3" }}
            >
              {hours === 1 ? hours + " hour" : hours + " hours"}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 text-base font-light min-h-[96px] max-h-[96px] w-full">
          <div className="flex text-start gap-x-1">
            <div className="text-primary min-h-[24px] text-lg md:text-2xl">
              <TaskIcon />
            </div>
            <p className="line-clamp-3 text-sm md:text-base">{desc}</p>
          </div>
          <div className="flex-1"></div>
          <div className="flex justify-end">
            <p
              className="font-normal text-[10px] md:text-[11px]"
              style={{ color: "#ADB6C3" }}
            >
              {format(new Date(timeStamp), "MMMM DD, YYYY, hh:mm A")}
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
