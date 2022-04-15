import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { Signup } from "../../api/services";

const validationSchemaFor = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  name: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const SignUp = () => {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [initialValues] = useState({
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
  });
  const updateFor = async (values) => {
    try {
      setIsLoading(true);
      const { data } = await Signup({ ...values });
      if (data && data.data) {
        toast.success("Account created successfully", {
          style: {
            padding: '20px',
          }
        });
      }
      navigate("/signin");
    } catch (error) {
      setIsError(!isError);
      toast.error("Signup failed!", {
        style: {
          padding: '20px',
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="layoutSidenav ">
      <div className="page-header-ui page-header-ui-dark bg-gradient-primary-to-secondary center-content">
        <div className="page-header-ui-content ">
          <div className="row px-5 align-items-center">
            <div className="col-lg-6  ">
              <h1 className="page-header-ui-title text-white mb-3 mt-3">
                Get more leads, more customers, and more revenue
              </h1>
              <p className="page-header-ui-text text-white mb-3 mt-3">
                Stop losing leads because of a non-optimized landing page. Start
                converting your users to paying customers and winning more sales
                today with a new landing page!
              </p>
            </div>

            <div className=" col-lg-5 mx-auto">
              <div className="card rounded-3 text-dark">
                <div className="card-header py-4">Sign Up for Free</div>
                <div className="card-body">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchemaFor}
                    onSubmit={async (values) => {
                      updateFor(values);
                    }}
                  >
                    {({
                      handleSubmit,
                      handleBlur,
                      values,
                      handleChange,
                      errors,
                      touched,
                    }) => {
                      const setFieldProps = (name) => {
                        return {
                          name,
                          id: name,
                          onChange: handleChange,
                          onBlur: handleBlur,
                          value: values[name],
                        };
                      };

                      return (
                        <Form onSubmit={handleSubmit}>
                          <div className="row">
                            <div className="form-group">
                              <label
                                className="small text-gray-600"
                                htmlFor="name"
                              >
                                Name <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                {...setFieldProps("name")}
                              />
                              {errors.name && touched.name && (
                                <span
                                  className={`error_notifier error-message`}
                                >
                                  {errors.name}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="form-group">
                            <label
                              className="small text-gray-600"
                              htmlFor="email"
                            >
                              Email <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              placeholder="Your Email"
                              {...setFieldProps("email")}
                            />
                            {errors.email && touched.email && (
                              <span className={`error_notifier error-message`}>
                                {errors.email}
                              </span>
                            )}
                          </div>
                          <div className="form-group">
                            <label
                              className=" small text-gray-600"
                              htmlFor="password"
                            >
                              Password <span className="text-danger">*</span>
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              placeholder="Your Password"
                              {...setFieldProps("password")}
                            />
                            {touched.password && errors.password && (
                              <span className={`error_notifier error-message `}>
                                {errors.password}
                              </span>
                            )}
                          </div>
                          <div className="form-group">
                            <label
                              className=" small text-gray-600"
                              htmlFor="passwordConfirm"
                            >
                              Confirm Password{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <Field
                              type="password"
                              className="form-control"
                              placeholder="Your Confirm Password"
                              {...setFieldProps("passwordConfirm")}
                            />
                            {touched.passwordConfirm &&
                              errors.passwordConfirm && (
                                <span
                                  className={`error_notifier error-message `}
                                >
                                  {errors.passwordConfirm}
                                </span>
                              )}
                          </div>
                          <div className="d-grid mt-4">
                            <button
                              disabled={isLoading}
                              type="submit"
                              className="btn btn-primary fw-500 mb-2"
                            >
                              {isLoading ? "Please wait..." : "Sign Up"}
                            </button>
                          </div>
                          <div className="mb-4 mt-1">
                            <div className="small text-gray-600 mt-1 text-center">
                              Already have a account
                              <Link className=" text-primary ms-2" to="/signin">
                                Sign in
                              </Link>
                            </div>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
