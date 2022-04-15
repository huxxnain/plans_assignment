import React, {useState, useEffect, useRef} from "react";
import IMG from "../../assets/img/illustrations/profiles/profile-1.png";
import * as LocalStorage from "../../utils/localStorage.util";
import toast from "react-hot-toast";
import {Link, useNavigate} from "react-router-dom";
import URLS from "../../Paths/URLS";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../store/auth/authSlice";
import Persona from "persona";
import axios from "axios";
import API_URLS from "../../api/apiUrls";
import {useMetaMask} from "metamask-react";
import FadeLoader from "react-spinners/FadeLoader";

const METAMASK_STATUSES = {
    CONNECTED: 'connected'
}

const Header = () => {

    const {status, connect, account} = useMetaMask();
    const btnRef = useRef(null)
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        const feather = require("feather-icons");
        feather.replace();
    }, []);

    const handleMetamask = async () => {
      btnRef.current.click()
        if(status == 'unavailable'){
            toast.error("Please install Metamask extension ")
        }
    }

    const handleProfile = () => {
        navigate(URLS.PROFILE);
    }

    // const handleFAQ = () => {
    //     navigate(URLS.FAQ)
    // }

    // const handleContactUs = () => {
    //     navigate(URLS.CONTACTUS);
    // }

    const handleLogout = () => {
        LocalStorage.clearAllData();
        dispatch(setUser(null));
        toast.success("You have successfully signed out ", {
            style: {
                padding: '20px',
                fontSize: '16px'
            }
        });
        navigate(URLS.HOME);
    }

    // const handlePersonaVerification = async () => {
    //     const client: Client = new Persona.Client({
    //         templateId: 'itmpl_NNHX1ti8ozEAo1LH6ChDpCMB',
    //         environment: 'sandbox',
    //         onReady: () => client.open(),
    //         onComplete: async ({inquiryId, status, fields}) => {
    //             try {
    //                 let response = await axios({
    //                     method: "PATCH",
    //                     url: API_URLS.USER.PERSONA_VERIFY,
    //                     data: {userId: currentUser._id, is_verified: status === 'completed' ? true : false},
    //                 });
    //                 if (response.status === 200) {
    //                     dispatch(setUser({...currentUser, is_verified: status === 'completed' ? true : false}));
    //                     toast.success("Persona verification has been successful", {
    //                         style: {
    //                             padding: '20px',
    //                         }
    //                     });
    //                 }
    //             } catch (err) {
    //                 console.log(err);
    //                 toast.error(err.message, {
    //                     style: {
    //                         padding: '20px',
    //                     }
    //                 });
    //             }
    //             // console.log(`Completed inquiry ${inquiryId} with status ${status} and the fields is ${JSON.stringify(fields)}`);
    //         },
    //         onCancel: ({inquiryId, sessionToken}) => console.log('onCancel'),
    //         onError: (error) => console.log(error),
    //     });
    // }

    if (!currentUser) {
        return (
            <div className="header-container">
                <Link to={URLS.HOME}><span className="text-light navbar-brand">Poll Shark</span></Link>
            </div>
        )
    }

    return (
        <div className="header" id="header-cus">
            <nav
                className="
        topnav
        navbar navbar-expand
        shadow
        justify-content-between justify-content-sm-start
        navbar-light
        bg-white
      "
                id="sidenavAccordion"
            >
                <button
                    className="
          btn btn-icon btn-transparent-dark
          order-1 order-lg-0
          me-2
          ms-lg-2
          d-flex
          me-lg-0
        "
                    id="sidebarToggle"
                >
                    <i data-feather="menu"></i>
                </button>

                <Link className="navbar-brand pe-3 ps-4 ps-lg-2" to="/home">
                    Poll Shark
                </Link>

                {/*<form className="form-inline me-auto d-none d-lg-block me-3">*/}
                {/*    <div className="input-group input-group-joined input-group-solid">*/}
                {/*        <input*/}
                {/*            className="form-control pe-0"*/}
                {/*            type="search"*/}
                {/*            placeholder="Search"*/}
                {/*            aria-label="Search"*/}
                {/*        />*/}
                {/*        <div className="input-group-text">*/}
                {/*            <i data-feather="search"></i>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</form>*/}

                <ul className="navbar-nav align-items-center ms-auto">
                    <li className="nav-item dropdown no-caret d-none d-md-block me-3">
                            {/*{*/}
                            {/*    status === METAMASK_STATUSES.CONNECTED ?*/}
                            {/*        <span className={'badge text-light bg-primary'}>Metamask Connected</span> :*/}
                            {/*        <button className="btn btn-warning" type="button"  onClick={handleMetamask}>*/}
                            {/*            Connect*/}
                            {/*        </button>*/}
                            {/*}*/}
                            {/*<button className="btn btn-warning d-none" type="button" ref={btnRef} onClick={connect}>*/}
                            {/*    Connect*/}
                            {/*</button>*/}
                    </li>

                    <li className="nav-item dropdown no-caret me-3 d-lg-none">
                        <div
                            className="
              dropdown-menu dropdown-menu-end
              p-3
              shadow
              animated--fade-in-up
            "
                            aria-labelledby="searchDropdown"
                        >
                            <form className="form-inline me-auto w-100">
                                <div className="input-group input-group-joined input-group-solid">
                                    <input
                                        className="form-control pe-0"
                                        type="text"
                                        placeholder="Search for..."
                                        aria-label="Search"
                                        aria-describedby="basic-addon2"
                                    />
                                    <div className="input-group-text">
                                        <i data-feather="search"></i>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </li>

                    <li
                        className="
            nav-item
            dropdown
            no-caret
            d-none d-sm-block
            me-3
            dropdown-notifications
          "
                    >
                        <div
                            className="
              dropdown-menu dropdown-menu-end
              border-0
              shadow
              animated--fade-in-up
            "
                            aria-labelledby="navbarDropdownAlerts"
                        >
                            <h6 className="dropdown-header dropdown-notifications-header">
                                <i className="me-2" data-feather="bell"></i>
                                Alerts Center
                            </h6>

                            <a
                                className="dropdown-item dropdown-notifications-item"
                                href="#!"
                            >
                                <div className="dropdown-notifications-item-icon bg-warning">
                                    <i data-feather="activity"></i>
                                </div>
                                <div className="dropdown-notifications-item-content">
                                    <div className="dropdown-notifications-item-content-details">
                                        December 29, 2021
                                    </div>
                                    <div className="dropdown-notifications-item-content-text">
                                        This is an alert message. It's nothing serious, but it
                                        requires your attention.
                                    </div>
                                </div>
                            </a>

                            <a
                                className="dropdown-item dropdown-notifications-item"
                                href="#!"
                            >
                                <div className="dropdown-notifications-item-icon bg-info">
                                    <i data-feather="bar-chart"></i>
                                </div>
                                <div className="dropdown-notifications-item-content">
                                    <div className="dropdown-notifications-item-content-details">
                                        December 22, 2021
                                    </div>
                                    <div className="dropdown-notifications-item-content-text">
                                        A new monthly report is ready. Click here to view!
                                    </div>
                                </div>
                            </a>

                            <a
                                className="dropdown-item dropdown-notifications-item"
                                href="#!"
                            >
                                <div className="dropdown-notifications-item-icon bg-danger">
                                    <i className="fas fa-exclamation-triangle"></i>
                                </div>
                                <div className="dropdown-notifications-item-content">
                                    <div className="dropdown-notifications-item-content-details">
                                        December 8, 2021
                                    </div>
                                    <div className="dropdown-notifications-item-content-text">
                                        Critical system failure, systems shutting down.
                                    </div>
                                </div>
                            </a>

                            <a
                                className="dropdown-item dropdown-notifications-item"
                                href="#!"
                            >
                                <div className="dropdown-notifications-item-icon bg-success">
                                    <i data-feather="user-plus"></i>
                                </div>
                                <div className="dropdown-notifications-item-content">
                                    <div className="dropdown-notifications-item-content-details">
                                        December 2, 2021
                                    </div>
                                    <div className="dropdown-notifications-item-content-text">
                                        New user request. Woody has requested access to the
                                        organization.
                                    </div>
                                </div>
                            </a>
                            <a
                                className="dropdown-item dropdown-notifications-footer"
                                href="#!"
                            >
                                View All Alerts
                            </a>
                        </div>
                    </li>
                    <li>
                        <div
                            className="
              dropdown-menu dropdown-menu-end
              border-0
              shadow
              animated--fade-in-up
            "
                            aria-labelledby="navbarDropdownMessages"
                        >
                            <a
                                className="dropdown-item dropdown-notifications-item"
                                href="#!"
                            >
                                <img
                                    className="dropdown-notifications-item-img"
                                    src={currentUser && !currentUser?.photo?.includes('default') ? `${process.env.REACT_APP_AUTH_PROFILE_URL}/img/users/${currentUser?.photo}` : `assets/img/illustrations/profiles/profile-2.png`}

                                />
                                <div className="dropdown-notifications-item-content">
                                    <div className="dropdown-notifications-item-content-text">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                        sed do eiusmod tempor incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit
                                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                                        occaecat cupidatat non proident, sunt in culpa qui officia
                                        deserunt mollit anim id est laborum.
                                    </div>
                                    <div className="dropdown-notifications-item-content-details">
                                        Thomas Wilcox · 58m
                                    </div>
                                </div>
                            </a>

                            <a
                                className="dropdown-item dropdown-notifications-item"
                                href="#!"
                            >
                                <img
                                    className="dropdown-notifications-item-img"
                                    src="assets/img/illustrations/profiles/profile-3.png"
                                />
                                <div className="dropdown-notifications-item-content">
                                    <div className="dropdown-notifications-item-content-text">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                        sed do eiusmod tempor incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit
                                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                                        occaecat cupidatat non proident, sunt in culpa qui officia
                                        deserunt mollit anim id est laborum.
                                    </div>
                                    <div className="dropdown-notifications-item-content-details">
                                        Emily Fowler · 2d
                                    </div>
                                </div>
                            </a>

                            <a
                                className="dropdown-item dropdown-notifications-item"
                                href="#!"
                            >
                                <img
                                    className="dropdown-notifications-item-img"
                                    src="assets/img/illustrations/profiles/profile-4.png"
                                />
                                <div className="dropdown-notifications-item-content">
                                    <div className="dropdown-notifications-item-content-text">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                        sed do eiusmod tempor incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit
                                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                                        occaecat cupidatat non proident, sunt in culpa qui officia
                                        deserunt mollit anim id est laborum.
                                    </div>
                                    <div className="dropdown-notifications-item-content-details">
                                        Marshall Rosencrantz · 3d
                                    </div>
                                </div>
                            </a>

                            <a
                                className="dropdown-item dropdown-notifications-item"
                                href="#!"
                            >
                                <img
                                    className="dropdown-notifications-item-img"
                                    src="assets/img/illustrations/profiles/profile-5.png"
                                />
                                <div className="dropdown-notifications-item-content">
                                    <div className="dropdown-notifications-item-content-text">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                        sed do eiusmod tempor incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit
                                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                                        occaecat cupidatat non proident, sunt in culpa qui officia
                                        deserunt mollit anim id est laborum.
                                    </div>
                                    <div className="dropdown-notifications-item-content-details">
                                        Colby Newton · 3d
                                    </div>
                                </div>
                            </a>

                            <a
                                className="dropdown-item dropdown-notifications-footer"
                                href="#!"
                            >
                                Read All Messages
                            </a>
                        </div>
                    </li>

                    {currentUser && (
                        <li className="nav-item dropdown no-caret dropdown-user me-3 me-lg-4">
                            <a
                                className="btn btn-icon btn-transparent-dark dropdown-toggle"
                                id="navbarDropdownUserImage"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <img
                                    className="img-fluid"
                                    src={currentUser && !currentUser?.photo?.includes('default') ? `${process.env.REACT_APP_AUTH_PROFILE_URL}/img/users/${currentUser?.photo}` : `assets/img/illustrations/profiles/profile-2.png`}

                                />
                                {/*<img className="img-fluid" src={IMG}/>*/}
                            </a>
                            <div
                                className="
              dropdown-menu dropdown-menu-end
              border-0
              shadow
              animated--fade-in-up
            "
                                aria-labelledby="navbarDropdownUserImage"
                            >
                                <h6 className="dropdown-header d-flex align-items-center">
                                    <img
                                        className="dropdown-user-img"
                                        src={currentUser && !currentUser?.photo?.includes('default') ? `${process.env.REACT_APP_AUTH_PROFILE_URL}/img/users/${currentUser?.photo}` : `assets/img/illustrations/profiles/profile-2.png`}
                                    />
                                    {/*<img className="dropdown-user-img" src={IMG}/>*/}
                                    <div className="dropdown-user-details">
                                        <div className="dropdown-user-details-name">
                                            {currentUser?.name}
                                        </div>
                                        <div className="dropdown-user-details-email">
                                            {currentUser?.email}
                                        </div>
                                    </div>
                                </h6>
                                <div className="dropdown-divider"></div>

                                <span
                                    className="dropdown-item cursor-pointer"
                                    onClick={handleProfile}
                                >
                  <div className="dropdown-item-icon">
                    <i data-feather="user"></i>
                  </div>
                  Account
                </span>
                                {/*{*/}
                                {/*    currentUser && currentUser.is_verified ?*/}
                                {/*        <button*/}
                                {/*            disabled*/}
                                {/*            className="dropdown-item cursor-pointer"*/}
                                {/*        >*/}
                                {/*            <div className="dropdown-item-icon">*/}
                                {/*                <i data-feather="check-circle"></i>*/}
                                {/*            </div>*/}
                                {/*            Verified*/}
                                {/*        </button>*/}
                                {/*        :*/}
                                {/*        <button*/}
                                {/*            className="dropdown-item cursor-pointer"*/}
                                {/*            onClick={handlePersonaVerification}*/}
                                {/*        >*/}
                                {/*            <div className="dropdown-item-icon">*/}
                                {/*                <i data-feather="check-circle"></i>*/}
                                {/*            </div>*/}
                                {/*            Verify*/}
                                {/*        </button>*/}
                                {/*}*/}

                {/*                <span*/}
                {/*                    className="dropdown-item cursor-pointer"*/}
                {/*                    onClick={handleFAQ}*/}
                {/*                >*/}
                {/*  <div className="dropdown-item-icon">*/}
                {/*    <i data-feather="user"></i>*/}
                {/*  </div>*/}
                {/*  FAQ*/}
                {/*</span>*/}
                {/*                <span*/}
                {/*                    className="dropdown-item cursor-pointer"*/}
                {/*                    onClick={handleContactUs}*/}
                {/*                >*/}
                {/*  <div className="dropdown-item-icon">*/}
                {/*    <i data-feather="user"></i>*/}
                {/*  </div>*/}
                {/*  Contact us*/}
                {/*</span>*/}

                                <span
                                    className="dropdown-item cursor-pointer"
                                    onClick={handleLogout}
                                >
                  <div className="dropdown-item-icon">
                    <i data-feather="log-out"></i>
                  </div>
                  Logout
                </span>

                            </div>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Header;
