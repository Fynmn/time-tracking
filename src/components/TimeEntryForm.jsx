import { Menu } from "@headlessui/react";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const TimeEntryForm = () => {
  // const [hours, setHours] = useState();
  // const [description, setDescription] = useState();
  // const [project, setProject] = useState();
  const [timeEntries, setTimeEntries] = useState();

  // Uncomment code below for placeholder data

  // localStorage.setItem(
  //   "timeEntries",
  //   JSON.stringify([
  //     {
  //       hours: 6,
  //       desc: "I created a custom card component and then made http requests to render all the data for the card",
  //       project: "Project 1",
  //       timeStamp: new Date().toISOString(),
  //     },
  //     {
  //       hours: 2,
  //       desc: "I created a custom button component",
  //       project: "Project 2",
  //       timeStamp: new Date().toISOString(),
  //     },
  //     {
  //       hours: 2,
  //       desc: 'I fixed the responsiveness in different devices such as iPhone 14 Pro Max, iPad Air 5, Macbook Pro 15" and a Desktop Computer',
  //       project: "Project 3",
  //       timeStamp: new Date().toISOString(),
  //     },
  //   ])
  // );

  // useEffect(() => {
  //   const entries = JSON.parse(localStorage.getItem("timeEntries")) || [];
  //   setTimeEntries(entries);
  // }, []);

  const fetchTimeEntriesFromLocalStorage = () => {
    try {
      const entries = JSON.parse(localStorage.getItem("timeEntries")) || [];
      setTimeEntries(entries);
    } catch (error) {
      console.error("Error fetching time entries from Local Storage:", error);
    }
  };

  useEffect(() => {
    // Fetch initial data from Local Storage on component mount
    fetchTimeEntriesFromLocalStorage();

    // Set up event listener to listen for changes in Local Storage
    const handleStorageChange = (event) => {
      if (event.key === "timeEntries") {
        fetchTimeEntriesFromLocalStorage();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // const handleAddEntry = (e) => {
  //   e.preventDefault();

  //   // console.log([...timeEntries]);
  //   localStorage.setItem(
  //     "timeEntries",
  //     JSON.stringify([
  //       ...timeEntries,
  //       {
  //         hours: parseInt(hours),
  //         desc: description,
  //         project: project,
  //         timeStamp: new Date().toISOString(),
  //       },
  //     ])
  //   );

  // console.log(
  //   "New Entries:",
  //   JSON.parse(localStorage.getItem("timeEntries"))
  // );

  //   window.location.reload();
  // };

  const timeEntrySchema = z.object({
    hours: z.number().min(0).max(24),
    description: z.string(),
    project: z.string(),
    // timeStamp: z.string(),
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    setFieldValue,
    // setFieldError,
    // setFieldTouched,
  } = useFormik({
    initialValues: {
      hours: undefined,
      description: undefined,
      project: "Project 1",
      timeStamp: undefined,
    },
    validationSchema: toFormikValidationSchema(timeEntrySchema),
    onSubmit: ({ hours, description, project }) => {
      localStorage.setItem(
        "timeEntries",
        JSON.stringify([
          ...timeEntries,
          {
            hours: hours,
            description: description,
            project: project,
            timeStamp: new Date().toISOString(),
          },
        ])
      );
      setTimeEntries(...timeEntries, {
        hours: hours,
        description: description,
        project: project,
        timeStamp: new Date().toISOString(),
      });
      // window.location.reload();
    },
  });

  return (
    <>
      <div className="p-6 rounded-2xl border border-secondary bg-white flex flex-col gap-y-4 max-w-[354px]">
        <div>
          <p className="text-primary text-[18px] leading-6 font-bold">
            Time Entry
          </p>
        </div>
        {/* {JSON.stringify(localStorage.getItem("timeEntries"), null, 2)} */}
        {/* <div>{JSON.stringify(hours)}</div>
        <div>{JSON.stringify(description)}</div>
        <div>{JSON.stringify(project)}</div> */}
        {values.hours}
        {values.description}
        {values.project}

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
          <div>
            <label
              htmlFor="hours"
              className="block mb-[6px] text-sm font-medium text-gray-700"
            >
              Number of Hours
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M13.675 14.825L14.8 13.7L10.825 9.7V4.675H9.325V10.3L13.675 14.825ZM10 20C8.63333 20 7.34167 19.7375 6.125 19.2125C4.90833 18.6875 3.84583 17.9708 2.9375 17.0625C2.02917 16.1542 1.3125 15.0917 0.7875 13.875C0.2625 12.6583 0 11.3667 0 10C0 8.63333 0.2625 7.34167 0.7875 6.125C1.3125 4.90833 2.02917 3.84583 2.9375 2.9375C3.84583 2.02917 4.90833 1.3125 6.125 0.7875C7.34167 0.2625 8.63333 0 10 0C11.3667 0 12.6583 0.2625 13.875 0.7875C15.0917 1.3125 16.1542 2.02917 17.0625 2.9375C17.9708 3.84583 18.6875 4.90833 19.2125 6.125C19.7375 7.34167 20 8.63333 20 10C20 11.3667 19.7375 12.6583 19.2125 13.875C18.6875 15.0917 17.9708 16.1542 17.0625 17.0625C16.1542 17.9708 15.0917 18.6875 13.875 19.2125C12.6583 19.7375 11.3667 20 10 20ZM10 18.5C12.3333 18.5 14.3333 17.6667 16 16C17.6667 14.3333 18.5 12.3333 18.5 10C18.5 7.66667 17.6667 5.66667 16 4C14.3333 2.33333 12.3333 1.5 10 1.5C7.66667 1.5 5.66667 2.33333 4 4C2.33333 5.66667 1.5 7.66667 1.5 10C1.5 12.3333 2.33333 14.3333 4 16C5.66667 17.6667 7.66667 18.5 10 18.5Z"
                    fill="#010205"
                  />
                </svg>
              </div>
              <input
                value={values.hours}
                onChange={handleChange}
                onBlur={handleBlur}
                type="number"
                id="hours"
                className="bg-white border border-gray-300 text-gray-500 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 px-[14px] py-[10px]"
                placeholder="Number of Hours"
              />
            </div>
            {touched.hours && errors.hours ? (
              <div className="text-xs text-red-500 w-full flex justify-end pt-1">
                {errors.hours}
              </div>
            ) : (
              <div className="text-xs invisible">hours</div>
            )}
          </div>

          <div className="w-full">
            <label
              htmlFor="project"
              className="block mb-[6px] text-sm font-medium text-gray-700"
            >
              Project
            </label>
            <Menu as="div" className="relative inline-block text-left w-full">
              <div>
                <Menu.Button className="bg-white border border-gray-300 text-gray-500 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 px-[14px] py-[10px] text-start">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M10.3439 20C9.78907 20 9.31987 19.8082 8.93635 19.4247C8.55284 19.0412 8.36108 18.572 8.36108 18.0171H12.3268C12.3268 18.572 12.135 19.0412 11.7515 19.4247C11.368 19.8082 10.8988 20 10.3439 20ZM6.37821 16.4994V15.0306H14.3097V16.4994H6.37821ZM6.50061 13.5373C5.4235 12.8356 4.57079 11.9584 3.94247 10.9058C3.31416 9.85312 3 8.66585 3 7.34394C3 5.35292 3.72623 3.63117 5.1787 2.1787C6.63117 0.726234 8.35292 0 10.3439 0C12.335 0 14.0567 0.726234 15.5092 2.1787C16.9616 3.63117 17.6879 5.35292 17.6879 7.34394C17.6879 8.66585 17.3778 9.85312 16.7577 10.9058C16.1375 11.9584 15.2807 12.8356 14.1873 13.5373H6.50061ZM7.03917 12.0685H13.6732C14.4565 11.5463 15.0767 10.869 15.5337 10.0367C15.9906 9.20441 16.2191 8.30681 16.2191 7.34394C16.2191 5.72827 15.6438 4.34517 14.4933 3.19461C13.3427 2.04406 11.9596 1.46879 10.3439 1.46879C8.72827 1.46879 7.34517 2.04406 6.19461 3.19461C5.04406 4.34517 4.46879 5.72827 4.46879 7.34394C4.46879 8.30681 4.69727 9.20441 5.15422 10.0367C5.61118 10.869 6.23949 11.5463 7.03917 12.0685Z"
                        fill="#010205"
                      />
                    </svg>
                  </div>

                  {values.project && values.project
                    ? values.project
                    : "Project 1"}
                </Menu.Button>
              </div>
              <Menu.Items className="absolute z-10 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setFieldValue("project", "Project 1")}
                      className={`${
                        active ? "bg-primary text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Project 1
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setFieldValue("project", "Project 2")}
                      className={`${
                        active ? "bg-primary text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Project 2
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setFieldValue("project", "Project 3")}
                      className={`${
                        active ? "bg-primary text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Project 3
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>

          <div>
            <label
              htmlFor="task"
              className="block mb-[6px] text-sm font-medium text-gray-700"
            >
              Task Description
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-start pt-3.5 pl-3.5 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g clipPath="url(#clip0_23_195)">
                    <path
                      d="M10 20C8.58333 20 7.26667 19.7458 6.05 19.2375C4.83333 18.7292 3.775 18.025 2.875 17.125C1.975 16.225 1.27083 15.1667 0.7625 13.95C0.254167 12.7333 0 11.4167 0 10C0 8.6 0.254167 7.29167 0.7625 6.075C1.27083 4.85833 1.975 3.8 2.875 2.9C3.775 2 4.83333 1.29167 6.05 0.775C7.26667 0.258333 8.58333 0 10 0C11.25 0 12.4167 0.2 13.5 0.6C14.5833 1 15.5583 1.55 16.425 2.25L15.35 3.325C14.6167 2.74167 13.8 2.29167 12.9 1.975C12 1.65833 11.0333 1.5 10 1.5C7.58333 1.5 5.5625 2.3125 3.9375 3.9375C2.3125 5.5625 1.5 7.58333 1.5 10C1.5 12.4167 2.3125 14.4375 3.9375 16.0625C5.5625 17.6875 7.58333 18.5 10 18.5C12.4167 18.5 14.4375 17.6875 16.0625 16.0625C17.6875 14.4375 18.5 12.4167 18.5 10C18.5 9.5 18.4625 9.0125 18.3875 8.5375C18.3125 8.0625 18.2 7.6 18.05 7.15L19.2 6C19.4667 6.61667 19.6667 7.25833 19.8 7.925C19.9333 8.59167 20 9.28333 20 10C20 11.4167 19.7417 12.7333 19.225 13.95C18.7083 15.1667 18 16.225 17.1 17.125C16.2 18.025 15.1417 18.7292 13.925 19.2375C12.7083 19.7458 11.4 20 10 20ZM8.525 14.55L4.4 10.4L5.525 9.275L8.525 12.275L18.875 1.925L20.025 3.05L8.525 14.55Z"
                      fill="#010205"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_23_195">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <textarea
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                name="description"
                type="textarea"
                id="task"
                className="bg-white border border-gray-300 text-gray-500 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 px-[14px] py-[10px] min-h-[80px]"
                placeholder="Task Description"
              />
            </div>
            {touched.description && errors.description ? (
              <div className="text-xs text-red-500 w-full flex justify-end pt-1">
                {errors.description}
              </div>
            ) : (
              <div className="text-xs invisible">description</div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-primary text-white text-base font-semibold py-[10px] px-[18px]"
            >
              Add Time Entry
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default TimeEntryForm;
