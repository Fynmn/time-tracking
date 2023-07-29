/* eslint-disable */

import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FiLogOut as LogOut } from "react-icons/fi";

const DropDownProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="text-right flex hover:text-primary z-30">
      {isModalOpen && (
        <GenericModal onClose={handleCloseModal} data={modalData} />
      )}
      <Menu as="div" className="relative inline-block text-left">
        <div className="flex items-center">
          <Menu.Button className="inline-flex w-full justify-center items-center p-2">
            <CgProfile className="w-6 h-6 text-darkGray hover:text-primary" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <form className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/login"
                    className={`${
                      active ? "bg-primary text-white" : "text-black"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <LogOut className="mr-2 h-5 w-5 " aria-hidden="true" />
                    Log-out
                  </a>
                )}
              </Menu.Item>
            </form>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default DropDownProfile;
