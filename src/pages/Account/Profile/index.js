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
import * as LocalStorage from "../../../utils/localStorage.util";
import {setUser} from "../../../store/auth/authSlice";
import {Link, useNavigate} from "react-router-dom";
import IMG from '../../../assets/img/illustrations/profiles/profile-1.png'
import URLS from "../../../Paths/URLS";
import FadeLoader from "react-spinners/FadeLoader";

dayjs.extend(relativeTime);

const validationSchemaForProfile = Yup.object({
    name: Yup.string(),
    lastname: Yup.string(),
    email: Yup.string()
});

const validationSchemaForGoogle = Yup.object({
    password: Yup.string().required("Required"),
    passwordConfirm: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Required"),
});

const Profile = () => {

    const currentUser = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const [initialValues] = useState({
        password: "",
        passwordConfirm: "",
    });

    useEffect(() => {
        let header = document.getElementsByClassName('header')[0];
        if(header) {
            header.style.display = 'block'
        }
    }, []);

    const handleChangeGooglePassword = async (values) => {
        try {
            setIsGoogleLoading(true);
            const {data} = await axios.patch(API_URLS.USER.CHANGEGOOGLEPASSWORD, values);
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
            setIsGoogleLoading(false);
        }
    };

    const uploadProfile = async (e) => {
        if (!e.target.files[0])
            return false
        try {
            setIsProfileLoading(true);
            let dataObj = new FormData()
            dataObj.append('photo', e.target.files[0])
            const {data} = await axios.patch(API_URLS.USER.UPDATEME, dataObj);
            if (data && data.data) {
                toast.success("Profile image updated successfully", {
                    style: {
                        padding: '20px',
                    }
                });
                dispatch(setUser(data.data.user));
                LocalStorage.setUserData(data.data.user);
            }
        } catch (error) {
            setIsError(!isError);
            toast.error("Failed to change profile picture", {
                style: {
                    padding: '20px',
                }
            });
        } finally {
            setIsProfileLoading(false);
        }
    }

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
                                                Account Settings - Profile
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                        {/* Main page content*/}
                        <div className="container-xl px-4 mt-4">
                            <nav className="nav nav-borders">
                                <Link className="nav-link active ms-0" to="/profile">Profile</Link>
                                <Link className="nav-link" to="/security">Security</Link>
                            </nav>
                            <hr className="mt-0 mb-4"/>

                            <div className="row">
                                {/* Profile picture card*/}
                                <div className="col-xl-4">
                                    <div className="card mb-4 mb-xl-0">
                                        <div className="card-header">Profile Picture</div>
                                        <div className="card-body text-center">
                                            {
                                                isProfileLoading && isProfileLoading ?
                                                    <div className="container">
                                                        <FadeLoader loading={isProfileLoading} size={150}/>
                                                    </div>
                                                    :
                                                    <img className="img-account-profile rounded-circle mb-2"
                                                         src={currentUser && !currentUser?.photo?.includes('default') ? `${process.env.REACT_APP_AUTH_PROFILE_URL}/img/users/${currentUser?.photo}` : IMG}
                                                         alt=""/>
                                            }
                                            <div className="small font-italic image-style text-muted mb-4">Please select
                                                only JPG JPEG or PNG
                                            </div>
                                            <label className="custom-file-upload btn-primary">
                                                <input
                                                    type="file" accept="image/png,image/jpg,image/jpeg"
                                                    onChange={uploadProfile}
                                                />
                                                {isProfileLoading ? "Please wait..." : "Upload Profile"}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                {/* Account details card*/}
                                <div className="col-xl-8">
                                    <div className="card mb-4">
                                        <div className="card-header">Account Details</div>
                                        <div className="card-body">


                                            <Formik
                                                initialValues={currentUser}
                                                validationSchema={validationSchemaForProfile}
                                                enablereinitialize={true}
                                                onSubmit={async (values) => {
                                                    delete values.password

                                                    try {
                                                        setIsLoading(true);
                                                        const {data} = await axios.patch(API_URLS.USER.UPDATEME, values);
                                                        if (data && data.data) {
                                                            console.log(data)
                                                            toast.success("Profile has been successfully updated", {
                                                                style: {
                                                                    padding: '20px',
                                                                }
                                                            });

                                                            dispatch(setUser(data.data.user));
                                                            LocalStorage.setUserData(data.data.user);

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

                                                    return (
                                                        <Form onSubmit={handleSubmit}>
                                                            <div className="row gx-3 mb-3">
                                                                <div className="col-md-6">
                                                                    <label className="small mb-1"
                                                                           htmlFor="inputFirstName">First name</label>
                                                                    <input value={values.name}
                                                                           onChange={handleChange} name='name'
                                                                           className="form-control" id="inputFirstName"
                                                                           type="text"
                                                                           placeholder="Enter your first name"/>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label className="small mb-1"
                                                                           htmlFor="inputLastName">Last name</label>
                                                                    <input value={values.lastname}
                                                                           onChange={handleChange} name='lastname'
                                                                           className="form-control" id="inputLastName"
                                                                           type="text"
                                                                           placeholder="Enter your last name"/>
                                                                </div>
                                                                <div className="col-md-6 mt-2">
                                                                    <label className="small mb-1"
                                                                           htmlFor="inputEmailAddress">Email
                                                                        address</label>
                                                                    <input value={values.email}
                                                                           onChange={handleChange} name='email'
                                                                           className="form-control"
                                                                           id="inputEmailAddress"
                                                                           type="email" name='email'
                                                                           placeholder="Enter your email address"/>
                                                                </div>
                                                            </div>
                                                            <button disabled={isLoading}
                                                                    className="btn btn-primary" type="submit"
                                                            >
                                                                {isLoading ? "Please wait..." : "Save changes"}
                                                            </button>
                                                        </Form>
                                                    );
                                                }}
                                            </Formik>
                                        </div>
                                    </div>

                                    {/*Set Google Password for first time*/}
                                    {
                                        currentUser && currentUser.isLoggedInFirstTime === true ?
                                            <div className="card mb-4">
                                                <div className="card-header">Set Password</div>
                                                <div className="card-body">
                                                    <Formik
                                                        initialValues={initialValues}
                                                        validationSchema={validationSchemaForGoogle}
                                                        enableReinitialize={true}
                                                        onSubmit={async (values) => {
                                                            await handleChangeGooglePassword(values);
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
                                                                    <div className="row gx-3 mb-3">
                                                                        <div className="col-md-6">
                                                                            <label
                                                                                className=" small text-gray-600"
                                                                                htmlFor="password"
                                                                            >
                                                                                New Password <span
                                                                                className="text-danger">*</span>
                                                                            </label>
                                                                            <input
                                                                                type="password"
                                                                                className="form-control"
                                                                                placeholder="Enter new password"
                                                                                {...setFieldProps("password")}
                                                                            />
                                                                            {touched.password && errors.password && (
                                                                                <span
                                                                                    className={`error_notifier error-message `}>
                                {errors.password}
                              </span>
                                                                            )}
                                                                        </div>
                                                                        <div className="col-md-6">
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
                                                                                <span
                                                                                    className={`error_notifier error-message `}>
                                {errors.passwordConfirm}
                              </span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <button
                                                                        disabled={isGoogleLoading}
                                                                        type="submit"
                                                                        className="btn btn-primary"
                                                                    >
                                                                        {isGoogleLoading ? "Please wait..." : "Set password"}
                                                                    </button>
                                                                </Form>
                                                            );
                                                        }}
                                                    </Formik>
                                                </div>
                                            </div>
                                            : ''
                                    }
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default Profile;
