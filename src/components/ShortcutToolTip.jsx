/* eslint-disable react/prop-types */
import Tippy from "@tippyjs/react";

const ShortcutToolTip = ({ label, shortcut, children }) => {
  return (
    <Tippy
      content={
        <div className="flex flex-col text-xs">
          <span className="font-semibold">{label}</span>
          <span className="text-gray-200">{shortcut}</span>
        </div>
      }
      placement="right"
    >
      {children}
    </Tippy>
  );
};

// Props Types of ShortcutToolTip (alternative to TypeScript - uncomment if needed to enable eslint)
// import PropTypes from "prop-types";
// ShortcutToolTip.propTypes = {
//   label: PropTypes.string,
//   shortcut: PropTypes.string,
//   children: PropTypes.any,
// };

export default ShortcutToolTip;
