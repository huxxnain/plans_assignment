import React, {useState, useEffect} from "react";
import {Formik, Field} from "formik";
import {Link, useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {Login} from "../../api/services";
import {GoogleLogin} from "react-google-login";
import toast from "react-hot-toast";
import URLS from "../../Paths/URLS";
import * as LocalStorage from "../../utils/localStorage.util";
import {useSelector, useDispatch} from 'react-redux'
import {setUser} from "../../store/auth/authSlice";
import axios from 'axios';
import API_URLS from '../../api/apiUrls';

const validationSchemaFor = Yup.object({
    email: Yup.string().email('Invalid email address').required("Required"),
    password: Yup.string().required("Required"),
});

const SignIn = () => {
    const [isLoading, setIsLoading] = useState(false);
    const currentUser = useSelector(state => state.auth.user);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [initialValues] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (currentUser) {
            navigate(URLS.MAIN);
        }
    }, [currentUser]);

    const updateFor = async (values, resetForm) => {
        try {
            setIsLoading(true);
            const {data} = await Login({...values});
            if (data) {
                toast.success("You have successfully signed in", {
                    style: {
                        padding: '20px', fontSize: '16px'
                    }
                });
                LocalStorage.setUserToken(data.token);
                LocalStorage.setUserData(data.data.user);
                dispatch(setUser(data.data.user));
                if (resetForm) {
                    resetForm();
                }
                setIsLoading(false);
                navigate(URLS.MAIN);
            }
        } catch (ex) {
            setIsLoading(false);
            if(ex.message) {
                toast.error('Incorrect email or password', {
                    style: {
                        padding: '20px',
                        fontSize: '16px'
                    }
                });
            }
        }
    };

    const onSuccess = async (res) => {
        try {
            let response = await axios({
                method: "POST",
                url: API_URLS.USER.GOOGLESIGNIN,
                data: { tokenId: res.tokenId },
            });
            if (response.status === 200) {
                toast.success("You have successfully signed in", {
                    style: {
                        padding: '20px',
                        fontSize: '16px'
                    }
                });
                LocalStorage.setUserToken(response.data.token);
                LocalStorage.setUserData(response.data.data.user);
                dispatch(setUser(response.data.data.user));
                navigate(URLS.MAIN);
            }
        } catch (ex) {
            if(ex) {
                toast.error(toast.error(ex.message), {
                    style: {
                        padding: '20px',
                        fontSize: '16px'
                    }
                });
            }
        }
    };

    return (
        <>
            <div>
                <div className="page-header-ui page-header-ui-dark bg-gradient-primary-to-secondary center-content">
                    <div className="page-header-ui-content ">
                        <div className=" row px-5 align-items-center">
                          <div className="col-lg-6 ">
                            <div className="badge badge-marketing rounded-pill bg-secondary-soft text-secondary mb-3 mt-3">
                              Start today!
                            </div>
                            <h1 className="page-header-ui-title text-white mb-3 mt-3">
                              Get more leads, more customers, and more revenue
                            </h1>
                            <p className="page-header-ui-text text-white mb-3 mt-3">
                              Stop losing leads because of a non-optimized landing page.
                              Start converting your users to paying customers and winning
                              more sales today with a new landing page!
                            </p>
                          </div>
                          <div className="col-lg-5 mx-auto ">
                            <div className="card rounded-3 text-dark">
                              <div className="card-header py-4">Sign In</div>
                              <div className="card-body">
                                <Formik
                                  initialValues={initialValues}
                                  validationSchema={validationSchemaFor}
                                  onSubmit={async (
                                    values,
                                    { resetForm, setSubmitting }
                                  ) => {
                                    await updateFor(values, resetForm, setSubmitting);
                                  }}
                                >
                                  {({
                                    handleSubmit,
                                    handleChange,
                                    values,
                                    errors,
                                    touched
                                  }) => {
                                    return (
                                      <form onSubmit={handleSubmit}>
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
                                            onChange={handleChange}
                                            value={values.email}
                                          />
                                          {errors.email && touched.email && (
                                            <span
                                              className={`error_notifier error-message `}
                                            >
                                              {errors.email}
                                            </span>
                                                                        )}
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label
                                                                            className=" small text-gray-600"
                                                                            htmlFor="email"
                                                                        >
                                                                            Password
                                                                        </label>
                                                                        <Field
                                                                            type="password"
                                                                            id="password"
                                                                            name="password"
                                                                            className="form-control"
                                                                            placeholder="Password"
                                                                            onChange={handleChange}
                                                                            value={values.password}
                                                                        />
                                                                        {errors.password && touched.password && (
                                                                            <span
                                                                                className={`error_notifier error-message `}
                                                                            >
                                              {errors.password}
                                            </span>
                                                                        )}
                                                                    </div>
                                                                    <Link
                                                                        className="small text-primary  mt-3"
                                                                        to="/forgetpassword"
                                                                    >
                                                                        ForgetPassword?
                                                                    </Link>
                                                                    <div className="d-grid mt-4">
                                                                        <button
                                                                            className="btn btn-primary fw-500 mb-2"
                                                                            type="submit"
                                                                            disabled={isLoading}
                                                                            // disabled={
                                                                            //   Object.keys(errors).length ||
                                                                            //   values === initialValues
                                                                            // }
                                                                        >
                                                                            {isLoading ? "Please wait..." : "Log In"}
                                                                        </button>
                                                                        <GoogleLogin
                                                                            clientId="553547714480-n5a3q4rg3d36o30die2b2i92ksm2dksm.apps.googleusercontent.com"
                                                                            buttonText="Google Sign In"
                                                                            onSuccess={onSuccess}
                                                                            cookiePolicy={"single_host_origin"}
                                                                        />
                                                                    </div>
                                                                    <div className="mb-4 mt-1">
                                                                        <div className="small text-gray-600 mt-1 text-center">
                                                                            Not registered Yet?
                                                                            <Link
                                                                                className=" text-primary ms-2"
                                                                                to="/signup"
                                                                            >
                                                                                Create Account
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                </form>
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
        </>
    );
};

export default SignIn;

