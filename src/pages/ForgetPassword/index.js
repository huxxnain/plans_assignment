import React, {useEffect, useState} from "react";
import {Formik, Field, Form} from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {ForgetPass} from "../../api/services";

const validationSchemaFor = Yup.object({
    email: Yup.string().required("Required"),
});

const ForgetPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [initialValues] = useState({
        email: "",
    });

    useEffect(() => {
        if (window.location.href?.includes('forgetpassword')) {
            let header = document.getElementsByClassName('header')[0];
            if (header) {
                header.style.display = 'none';
            }
        }
    }, []);

    const updateFor = async (values) => {
        try {
            setIsLoading(true);
            const {data} = await ForgetPass({...values});
            if (data) {
                toast.success("A token is sent to your email address", {
                    style: {
                        padding: '20px',
                    }
                });
            }
        } catch (ex) {
            console.error(ex.message);
            toast.error(ex.message, {
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
                                <div className="card-header py-4">Forget Password</div>
                                <div className="card-body">
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={validationSchemaFor}
                                        onSubmit={async (values) => {
                                            updateFor(values);
                                        }}
                                    >
                                        {({handleSubmit, values, errors}) => {
                                            return (
                                                <Form onSubmit={handleSubmit}>
                                                    <div className="form-group">
                                                        <label
                                                            className=" small text-gray-600"
                                                            htmlFor="email"
                                                        >
                                                            Email
                                                        </label>
                                                        <Field
                                                            type="email"
                                                            id="email"
                                                            name="email"
                                                            className="form-control"
                                                            placeholder="Your Email"
                                                            value={values.email}
                                                        />
                                                        <span className={`error_notifier error-message `}>
                              {errors.email}
                            </span>
                                                    </div>
                                                    <div className="d-grid mt-4">
                                                        <button
                                                            type="submit"
                                                            disabled={isLoading}
                                                            className="btn btn-primary fw-500 mb-2 "
                                                        >
                                                            {isLoading ? "Please wait..." : "Submit"}
                                                        </button>
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
export default ForgetPassword;
