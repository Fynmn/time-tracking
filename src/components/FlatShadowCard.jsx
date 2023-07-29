/* eslint-disable react/prop-types */

import { useState } from "react";

const FlatShadowCard = ({
  className = "",
  children,
  defaultIsFlat = false,
  elevation = 7,
  bgColor = "bg-accent",
  borderColor = "border-accent",
  onClick = () => {},
  flatOnMouseEnter = false,
  flatOnMouseLeave = false,
  flatOnMouseDown = false,
  flatOnMouseUp = false,
  interactivity,
}) => {
  const [isFlat, setIsFlat] = useState(defaultIsFlat);

  const defaultInteractivity = {
    flatOnMouseEnter: false,
    flatOnMouseLeave: false,
    flatOnMouseDown: true,
    flatOnMouseUp: false,
  };
  const spreadInteractivity = {
    ...defaultInteractivity,
    flatOnMouseEnter,
    flatOnMouseLeave,
    flatOnMouseDown,
    flatOnMouseUp,
  };

  if (interactivity === false)
    return (
      <FlatShadowCardElement
        elevation={elevation}
        isFlat={isFlat}
        className={className}
        bgColor={bgColor}
        borderColor={borderColor}
      >
        {children}
      </FlatShadowCardElement>
    );

  return (
    <button
      onClick={() => {
        onClick();
      }}
      onMouseEnter={() => {
        setIsFlat(spreadInteractivity.flatOnMouseEnter);
      }}
      onMouseLeave={() => {
        setIsFlat(spreadInteractivity.flatOnMouseLeave);
      }}
      onMouseDown={() => {
        setIsFlat(spreadInteractivity.flatOnMouseDown);
      }}
      onMouseUp={() => {
        setIsFlat(spreadInteractivity.flatOnMouseUp);
      }}
      className="outline-none"
    >
      <FlatShadowCardElement
        elevation={elevation}
        isFlat={isFlat}
        className={className}
        bgColor={bgColor}
        borderColor={borderColor}
      >
        {children}
      </FlatShadowCardElement>
    </button>
  );
};

// Props Types of FlatShadowCard (alternative to TypeScript - uncomment if needed to enable eslint)
// import PropTypes from "prop-types";

// FlatShadowCard.propTypes = {
//   className: PropTypes.string,
//   children: PropTypes.node.isRequired,
//   defaultIsFlat: PropTypes.bool,
//   elevation: PropTypes.number,
//   bgColor: PropTypes.string,
//   borderColor: PropTypes.string,
//   onClick: PropTypes.func,

//   /** `true` if you want the card to be flat on the specified events. `false` if not. */
//   flatOnMouseEnter: PropTypes.bool,
//   flatOnMouseLeave: PropTypes.bool,
//   flatOnMouseDown: PropTypes.bool,
//   flatOnMouseUp: PropTypes.bool,
//   interactivity: PropTypes.bool,
// };

const FlatShadowCardElement = ({
  elevation,
  isFlat,
  className = "",
  bgColor = "bg-accent",
  borderColor = "border-accent",
  children,
}) => {
  return (
    <>
      {/* Elevation Spacer (for padding) */}
      <div style={{ height: elevation }} />
      <div className="relative group flat-shadow-card">
        {/* Shadow */}
        <div
          className={`absolute inset-0 rounded-2xl border ${borderColor} ${bgColor}`}
        />
        {/* Content */}
        <div
          className={`relative border ${borderColor} rounded-2xl bg-white ${className} will-change-transform transition-transform -translate-y-1.5 group-[.flat-shadow-card]:group-hover:translate-y-0`}
          style={{
            transform: isFlat
              ? "translateX(0px)"
              : `translateX(${elevation}px)`,
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

// Props Types of FlatShadowCardElement (alternative to TypeScript - uncomment if needed to enable eslint)

// FlatShadowCardElement.propTypes = {
//   elevation: PropTypes.number.isRequired,
//   isFlat: PropTypes.bool.isRequired,
//   className: PropTypes.string,
//   bgColor: PropTypes.string,
//   borderColor: PropTypes.string,
//   children: PropTypes.node.isRequired,
// };

export default FlatShadowCard;
