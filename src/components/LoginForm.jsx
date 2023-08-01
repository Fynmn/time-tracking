import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { AuthData } from "../auth/AuthWrapper";
import { useState } from "react";
import { useEffect } from "react";
// import { AuthData } from "../auth/AuthWrapper";
// import { useState } from "react";

const LoginForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const { login } = AuthData();

  useEffect(() => {
    if (sessionStorage.getItem("email")) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, []);

  const loginSchema = z.object({
    email: z
      .string()
      .nonempty("Email is required")
      .email({ message: "Must be a valid email" }),
    password: z
      .string()
      .nonempty("Password is required")
      .min(8, { message: "Password too short" }),
  });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: toFormikValidationSchema(loginSchema),
      onSubmit: async ({ email, password }) => {
        try {
          await login(email, password);
          // localStorage.setItem("email", email);
        } catch (error) {
          setErrorMessage(error);
        }
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
                Sign in to your account
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {touched.password && errors.password ? (
                      <div className="text-red-500 text-xs pt-1 w-full flex justify-end">
                        {errors.password}
                      </div>
                    ) : (
                      <div className="text-xs pt-1 invisible">password</div>
                    )}
                    {errorMessage && errorMessage ? (
                      <div className="text-red-500 text-xs w-full flex justify-end">
                        {errorMessage}
                      </div>
                    ) : (
                      <div className="invisible text-xs">errorMessage</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-accent hover:underline dark:text-accent"
                  >
                    Forgot password?
                  </a>
                </div>

                <div className="w-full flex justify-center">
                  <button
                    type="submit"
                    className="w-full text-white bg-primary hover:bg-accent focus:ring-2 focus:outline-none focus:ring-accent font-medium rounded-lg text-sm px-5 py-2.5 mt-4 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign in
                  </button>
                </div>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
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

export default LoginForm;
