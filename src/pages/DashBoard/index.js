import React, {useEffect, useState} from "react";
import Sidebar from "../../components/sidebar";
import axios from "../../api/requestInterceptor";
import {useSelector} from "react-redux";
import API_URLS from "../../api/apiUrls";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {useNavigate} from "react-router-dom";
import URLS from '../../Paths/URLS';
import FadeLoader from "react-spinners/FadeLoader";

dayjs.extend(relativeTime);

const DashBoard = () => {
    const currentUser = useSelector((state) => state.auth.user);
    const [surveys, setSurveys] = useState([]);
    const [getSurveysData, setSurveysData] = useState({});
    const navigate = useNavigate();
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        const feather = require("feather-icons");
        feather.replace();
    }, []);

    useEffect(() => {
        (async () => {
            const {data} = await axios.get(
                API_URLS.SURVEY.LISTBYUSER(currentUser._id)
            );
            if (data && data.data) {
                console.log('survey data testing : ', data.data)
                setSurveys(data.data.surveys);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const {data} = await axios.get(API_URLS.SURVEY.GETSURVEYDATA(currentUser._id));
            if (data && data.data) {
                setSurveysData(data.data);
            }
            setLoading(false)
        })();
    }, []);


    useEffect(() => {
        let header = document.getElementsByClassName('header')[0];
        if(header) {
            header.style.display = 'block'
        }
    }, []);

        const compare = (due_date) => {
            let before = new Date(due_date);
            let today = new Date();
            const diff = today.getTime() - before.getTime()
            const mins = Math.round(diff / 1000 / 60)
            const hours = Math.round(mins / 60)
            const days = Math.round(hours / 60)

            if (days > 0) {
                return false
            } else {
                return true
            }
        }

    const handleSurveyClick = (survey, surveyId) => {
        if (!compare(survey.due_date)) {
            return false
        } else {
            navigate(URLS.TAKESURVEY(surveyId));
        }
    };

    return (
        <>
            <div id="layoutSidenav">
                <Sidebar/>
                <div id="layoutSidenav_content">
                    <main>
                        <header
                            className="
              page-header page-header-dark
              bg-gradient-primary-to-secondary
              mb-4
            "
                        >

                            <div className="container-xl px-4">
                                <div className="page-header-content pt-4">
                                    <div className="row align-items-center justify-content-between">
                                        <div className="col-auto mt-4">
                                            <h1 className="page-header-title">
                                                <div className="page-header-icon">
                                                    <i data-feather="life-buoy"></i>
                                                </div>
                                                Knowledge Base
                                            </h1>
                                            <div className="page-header-subtitle">
                                                What are you looking for? Our knowledge base is here to
                                                help.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>

                        {
                            loading && loading ?
                                <div className="container">
                                    <FadeLoader loading={loading} size={150} />
                                </div>
                                :
                                <div className="container-xl px-4 mt-n10">
                                    <div className="row">
                                        <div className=" col-xl-12 mb-4">
                                            <div className="card h-100">
                                                <div className="card-body h-100 p-5">
                                                    <div className="row align-items-center">
                                                        <div className="col-xl-8 col-xxl-8">
                                                            <div className="text-xl-start mb-4 mb-xl-0 mb-xxl-4">
                                                                <h1 className="text-primary">
                                                                    Welcome to SB Admin Pro!
                                                                </h1>
                                                                <p className="text-gray-700 mb-0">
                                                                    Browse our fully designed UI toolkit! Browse our
                                                                    prebuilt app pages, components, and utilites, and
                                                                    be sure to look at our full documentation!
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-4 col-xxl-4 text-center">
                                                            <img
                                                                alt="img"
                                                                className="img-fluid"
                                                                src="assets/img/illustrations/at-work.svg"
                                                                style={{maxWidth: "26rem"}}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 col-xl-3 mb-4">
                                            <div className="card bg-primary text-white h-100">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="me-3">
                                                            <div className="text-white-75 small">
                                                                Total earnings
                                                            </div>
                                                            <div className="text-lg fw-bold">${getSurveysData.moneyEarned}</div>
                                                        </div>
                                                        <i
                                                            className="feather-xl text-white-50"
                                                            data-feather="calendar"
                                                        ></i>
                                                    </div>
                                                </div>
                                                <div
                                                    className="card-footer d-flex align-items-center justify-content-between small">
                                                    <a className="text-white stretched-link" href="#!">
                                                        View Report
                                                    </a>
                                                    <div className="text-white">
                                                        <i className="fas fa-angle-right"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-xl-3 mb-4">
                                            <div className="card bg-warning text-white h-100">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="me-3">
                                                            <div className="text-white-75 small">Total Spent</div>
                                                            <div className="text-lg fw-bold">${getSurveysData.moneySpent}</div>
                                                        </div>
                                                        <i
                                                            className="feather-xl text-white-50"
                                                            data-feather="dollar-sign"
                                                        ></i>
                                                    </div>
                                                </div>
                                                <div
                                                    className="card-footer d-flex align-items-center justify-content-between small">
                                                    <a className="text-white stretched-link" href="#!">
                                                        View Report
                                                    </a>
                                                    <div className="text-white">
                                                        <i className="fas fa-angle-right"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-xl-3 mb-4">
                                            <div className="card bg-success text-white h-100">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="me-3">
                                                            <div className="text-white-75 small">
                                                                Surveys Taken
                                                            </div>
                                                            <div className="text-lg fw-bold">{getSurveysData.surveyTaken}</div>
                                                        </div>
                                                        <i
                                                            className="feather-xl text-white-50"
                                                            data-feather="check-square"
                                                        ></i>
                                                    </div>
                                                </div>
                                                <div
                                                    className="card-footer d-flex align-items-center justify-content-between small">
                                                    <a className="text-white stretched-link" href="#!">
                                                        View Tasks
                                                    </a>
                                                    <div className="text-white">
                                                        <i className="fas fa-angle-right"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-xl-3 mb-4">
                                            <div className="card bg-danger text-white h-100">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="me-3">
                                                            <div className="text-white-75 small">
                                                                Surveys Created
                                                            </div>
                                                            <div
                                                                className="text-lg fw-bold">{getSurveysData.surveyCreated}</div>
                                                        </div>
                                                        <i
                                                            className="feather-xl text-white-50"
                                                            data-feather="message-circle"
                                                        ></i>
                                                    </div>
                                                </div>
                                                <div
                                                    className="card-footer d-flex align-items-center justify-content-between small">
                                                    <a className="text-white stretched-link" href="#!">
                                                        View Requests
                                                    </a>
                                                    <div className="text-white">
                                                        <i className="fas fa-angle-right"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="container-xl px-4 text-start">
                                        <h4 className="mb-0 mt-5">Main Categories</h4>
                                        <hr className="mt-2 mb-4"/>

                                        <a
                                            className="card card-icon lift lift-sm mb-4"
                                            href="knowledge-base-category.html"
                                        >
                                            <div className="row g-0">
                                                <div className="col-auto card-icon-aside bg-primary">
                                                    <i className="text-white-50" data-feather="compass"></i>
                                                </div>
                                                <div className="col">
                                                    <div className="card-body py-4">
                                                        <h5 className="card-title text-primary mb-2">
                                                            Getting Started
                                                        </h5>
                                                        <p className="card-text mb-1">
                                                            Basic information about getting started including
                                                            installation instructions, setup, and basic usage.
                                                        </p>
                                                        <div className="small text-muted">
                                                            5 articles in this category
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>

                                        <a
                                            className="card card-icon lift lift-sm mb-4"
                                            href="knowledge-base-category.html"
                                        >
                                            <div className="row g-0">
                                                <div className="col-auto card-icon-aside bg-secondary">
                                                    <i className="text-white-50" data-feather="users"></i>
                                                </div>
                                                <div className="col">
                                                    <div className="card-body py-4">
                                                        <h5 className="card-title text-secondary mb-2">
                                                            Account Information
                                                        </h5>
                                                        <p className="card-text mb-1">
                                                            Troubleshooting guides specific to your account
                                                            including creating new accounts, modifying existing
                                                            accounts, and deleting accounts.
                                                        </p>
                                                        <div className="small text-muted">
                                                            3 articles in this category
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>

                                        <a
                                            className="card card-icon lift lift-sm mb-4"
                                            href="knowledge-base-category.html"
                                        >
                                            <div className="row g-0">
                                                <div className="col-auto card-icon-aside bg-teal">
                                                    <i className="text-white-50" data-feather="book"></i>
                                                </div>
                                                <div className="col">
                                                    <div className="card-body py-4">
                                                        <h5 className="card-title text-teal mb-2">
                                                            Terms of Service
                                                        </h5>
                                                        <p className="card-text mb-1">
                                                            Our terms, licensing, and other legal documentation.
                                                        </p>
                                                        <div className="small text-muted">
                                                            7 articles in this category
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <h4 className="mb-0 mt-5">Top Surveys</h4>
                                        <hr className="mt-2 mb-4"/>
                                        <div className="row">
                                            {surveys?.map((survey) => (
                                                <div
                                                    key={survey._id}
                                                    className={`col-lg-4 mb-4 cursor-pointer ${compare(survey.due_date) == false ? 'cardDiv-disabled' : ''}`}
                                                    onClick={() => handleSurveyClick(survey, survey._id)}
                                                >
                                                    <div className="card lift lift-sm h-100">
                                                        <div className="card card-header-actions">
                                                            <div className="card-header">
                                                                <div className="title">
                                                                    {survey.title || "No title"}
                                                                </div>
                                                                <span>${Math.round(((survey.amount/survey.usersCount) * 1000 )) / 1000}</span>
                                                            </div>
                                                            <div className="card-body">
                                                                <p className="card-text mb-1">
                                                                    <b>Description of Survey</b>:{" "}
                                                                    {survey.description || "Not Available"}{" "}
                                                                </p>
                                                            </div>
                                                            <div className="card-footer">
                                                                <div className="small text-muted">
                                                                    <i className="me-2" data-feather="clock"></i>Est
                                                                    Time
                                                                    - {(survey.estimated_time) + " Min" || "No Estimated Time Available"}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                        }

                    </main>
                </div>
            </div>
        </>
    );
};

export default DashBoard;
