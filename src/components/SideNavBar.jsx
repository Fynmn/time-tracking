import { useState } from "react";
import { Resizable } from "re-resizable";
import { useHotkeys } from "react-hotkeys-hook";
import Tippy from "@tippyjs/react";
import { followCursor } from "tippy.js";
import { CgPushChevronLeft as CloseIcon } from "react-icons/cg";
import ShortcutToolTip from "./ShortcutToolTip";

const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [width, setWidth] = useState(250);

  useHotkeys("ctrl+b", (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  });

  if (!isOpen) {
    return (
      <Tippy
        content={
          <ShortcutToolTip label="Open Sidebar" shortcut="Ctrl + B">
            <button
              className="absolute p-2 shadow-md border rounded-lg bg-white hover:pointer-events-auto hover:bg-gray-50 active:scale-90"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <CloseIcon size="1.2rem" className="text-gray-700 rotate-180" />
            </button>
          </ShortcutToolTip>
        }
        offset={[0, -5]}
        arrow={false}
        interactive={true}
        placement="right"
        followCursor="vertical"
        plugins={[followCursor]}
        animation="shift-away-extreme"
        duration={100}
        theme="transparent"
      >
        <div
          onClick={() => {
            setIsOpen(true);
          }}
          className="group z-20 w-6 fixed top-0 left-0 bottom-0 bg-gradient-to-r from-transparent hover:from-gray-200 to-transparent transition"
        ></div>
      </Tippy>
    );
  }
  return (
    <div className="text-sm max-h-screen">
      <Resizable
        enable={{
          bottom: false,
          bottomLeft: false,
          bottomRight: false,
          left: false,
          right: true,
          top: false,
          topLeft: false,
          topRight: false,
        }}
        size={{ width: width, height: "100%" }}
        maxWidth="418px"
        minWidth="418px"
        handleClasses={{
          right:
            "hover:bg-blue-300 active:bg-primary-500 transition relative z-20",
        }}
        handleStyles={{
          right: {
            width: "6px",
          },
        }}
        onResizeStop={(e, direction, ref, d) => {
          setWidth(width + d.width);
        }}
        className="h-full relative bg-white flex flex-col group sidenav-container"
      >
        {/* Close */}
        <ShortcutToolTip label="Close Sidebar" shortcut="Ctrl + B">
          <button
            className="absolute top-0 right-0 p-2 shadow-md border rounded-lg m-5 opacity-0 bg-white pointer-events-none transition
            
            group-[.sidenav-container]:group-hover:opacity-100
            
            group-hover:pointer-events-auto hover:bg-gray-50 active:scale-90"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <CloseIcon size="1.2rem" className="text-gray-700" />
          </button>
        </ShortcutToolTip>
        {/* Logo */}
        <div className="bg-blue-300 min-h-screen">Test</div>
      </Resizable>
    </div>
  );
};

export default SideNavbar;