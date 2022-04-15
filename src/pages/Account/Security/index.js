import React, {useEffect, useState} from "react";
import Sidebar from "../../../components/sidebar";
import axios from "../../../api/requestInterceptor";
import {useDispatch, useSelector} from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {Formik, Field, Form} from "formik";
import * as Yup from "yup";
import API_URLS from "../../../api/apiUrls";
import toast from "react-hot-toast";
import URLS from "../../../Paths/URLS";
import * as LocalStorage from "../../../utils/localStorage.util";
import {setUser} from "../../../store/auth/authSlice";
import {Link, useNavigate} from "react-router-dom";

dayjs.extend(relativeTime);

const validationSchemaFor = Yup.object({
    passwordCurrent: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    passwordConfirm: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Required"),
});

const Security = () => {

    const currentUser = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [initialValues] = useState({
        passwordCurrent: "",
        password: "",
        passwordConfirm: "",
    });

    useEffect(() => {
        let header = document.getElementsByClassName('header')[0];
        if(header) {
            header.style.display = 'block'
        }
    }, []);

    const handleChangePassword = async (values) => {
        try {
            setIsLoading(true);
            const {data} = await axios.patch(API_URLS.USER.CHANGEPASSWORD, values);
            if (data && data.data) {
                toast.success("Password changed successfully", {
                    style: {
                        padding: '20px',
                    }
                });
                LocalStorage.clearAllData();
                dispatch(setUser(null));
                navigate(URLS.MAIN);
            }
        } catch (error) {
            setIsError(!isError);
            toast.error("Failed to changed password", {
                style: {
                    padding: '20px',
                }
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div id="layoutSidenav">
                <Sidebar/>
                <div id="layoutSidenav_content">
                    <main>
                        <header
                            className="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
                            <div className="container-xl px-4">
                                <div className="page-header-content">
                                    <div className="row align-items-center justify-content-between pt-3">
                                        <div className="col-auto mb-3">
                                            <h1 className="page-header-title">
                                                <div className="page-header-icon"><i data-feather="user"/></div>
                                                Account Settings - Security
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                        <div className="container-xl px-4 mt-4">
                            <nav className="nav nav-borders">
                                <Link className="nav-link  ms-0" to="/profile">Profile</Link>
                                <Link className="nav-link active" to="/security">Security</Link>
                            </nav>
                            <hr className="mt-0 mb-4"/>
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="card mb-4">
                                        <div className="card-header">Change Password</div>
                                        <div className="card-body">
                                            <Formik
                                                initialValues={initialValues}
                                                validationSchema={validationSchemaFor}
                                                enableReinitialize ={true}
                                                onSubmit={async (values) => {
                                                    await handleChangePassword(values);
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
                                                    const setFieldProps = (password) => {
                                                        return {
                                                            password,
                                                            id: password,
                                                            onChange: handleChange,
                                                            onBlur: handleBlur,
                                                            value: values[password],
                                                        };
                                                    };

                                                    return (
                                                        <Form onSubmit={handleSubmit}>
                                                            <div className="form-group">
                                                                <label
                                                                    className=" small text-gray-600"
                                                                    htmlFor="passwordCurrent"
                                                                >
                                                                    Current Password <span
                                                                    className="text-danger">*</span>
                                                                </label>
                                                                <input
                                                                    type="password"
                                                                    className="form-control"
                                                                    placeholder="Enter current password"
                                                                    {...setFieldProps("passwordCurrent")}
                                                                />
                                                                {touched.passwordCurrent && errors.passwordCurrent && (
                                                                    <span className={`error_notifier error-message `}>
                                {errors.passwordCurrent}
                              </span>
                                                                )}
                                                            </div>
                                                            <div className="form-group">
                                                                <label
                                                                    className=" small text-gray-600"
                                                                    htmlFor="password"
                                                                >
                                                                    New Password <span className="text-danger">*</span>
                                                                </label>
                                                                <input
                                                                    type="password"
                                                                    className="form-control"
                                                                    placeholder="Enter new password"
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
                                                                    Confirm Password <span
                                                                    className="text-danger">*</span>
                                                                </label>
                                                                <input
                                                                    type="password"
                                                                    className="form-control"
                                                                    placeholder="Confirm new password"
                                                                    {...setFieldProps("passwordConfirm")}
                                                                />
                                                                {touched.passwordConfirm && errors.passwordConfirm && (
                                                                    <span className={`error_notifier error-message `}>
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
                                                                    {isLoading ? "Please wait..." : "Save"}
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
                    </main>
                </div>
            </div>
        </>
    );
};

export default Security;
