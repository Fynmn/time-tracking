import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();

  const signupSchema = z
    .object({
      email: z
        .string()
        .nonempty("Email is required")
        .email({ message: "Must be a valid email" }),
      password: z
        .string()
        .nonempty("Password is required")
        .min(8, { message: "Password too short" }),
      confirmPassword: z
        .string()
        .nonempty("Password is required")
        .min(8, { message: "Password too short" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"], // path of error
    });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: toFormikValidationSchema(signupSchema),
      onSubmit: () => {
        navigate("/dashboard");
      },
    });

  return (
    <>
      <section className="min-h-screen bg-secondary dark:bg-gray-900 flex flex-col lg:flex-row md:px-16 md:gap-x-16 justify-center items-center">
        <div className="flex flex-col items-center gap-y-4 pt-6">
          <h1 className="text-white bg-primary rounded-lg p-1 md:p-2 text-2xl md:text-4xl font-black ">
            Time Tracking App
          </h1>
          <div className="relative w-80 h-80 md:w-96 md:h-96">
            <img
              className="object-contain w-full h-full absolute"
              src="/cuate.png"
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col px-6 py-8 lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 min-w-[340px] sm:max-w-xl sm:min-w-[420px] md:min-w-[480px] xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                    />
                    {touched.email && errors.email ? (
                      <div className="text-red-500 text-xs pt-1 w-full flex justify-end">
                        {errors.email}
                      </div>
                    ) : (
                      <div className="text-xs pt-1 invisible">email</div>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {touched.password && errors.password ? (
                      <div className="text-red-500 text-xs pt-1 w-full flex justify-end">
                        {errors.password}
                      </div>
                    ) : (
                      <div className="text-xs pt-1 invisible">password</div>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm Password
                    </label>
                    <input
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="password"
                      name="confirmPassword"
                      id="confirm_password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {touched.confirmPassword && errors.confirmPassword ? (
                      <div className="text-red-500 text-xs pt-1 w-full flex justify-end">
                        {errors.confirmPassword}
                      </div>
                    ) : (
                      <div className="text-xs pt-1 invisible">
                        confirmPassword
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full flex justify-center">
                  <button
                    type="submit"
                    className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-2 focus:outline-none focus:ring-accent font-medium rounded-lg text-sm px-5 py-2.5 mt-4 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign up
                  </button>
                </div>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Log in
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupForm;
