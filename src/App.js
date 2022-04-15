import React, { useEffect } from "react";
import "./App.css";
import "./sass/styling/styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "jquery/dist/jquery";
import "datatables/media/js/jquery.dataTables";
import "feather-icons/dist/feather";
import { BrowserRouter as Router, Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import URLS from "./Paths/URLS";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from './pages/ResetPassword';
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Plans from './pages/Plans';
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { useSelector } from 'react-redux'
import DashBoard from './pages/DashBoard'
import Security from "./pages/Account/Security";
import Profile from "./pages/Account/Profile";

function RequireAuth({ children }) {
  const currentUser = useSelector(state => state.auth.user);
console.log("hjd",currentUser)
  if (!currentUser) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/home" />;
  }

  return children;
}

function App() {
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.auth.user);

  useEffect(() => {
    const feather = require("feather-icons");
    feather.replace();
    // Enable tooltips globally
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      const bootstrap = "";
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Enable popovers globally
    var popoverTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="popover"]')
    );
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      const bootstrap = "";
      return new bootstrap.Popover(popoverTriggerEl);
    });

    // Activate Bootstrap scrollspy for the sticky nav component
    const stickyNav = document.body.querySelector("#stickyNav");
    if (stickyNav) {
      const bootstrap = "";
      new bootstrap.ScrollSpy(document.body, {
        target: "#stickyNav",
        offset: 82,
      });
    }

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector("#sidebarToggle");
    if (sidebarToggle) {

      sidebarToggle.addEventListener("click", (event) => {
        event.preventDefault();
        document.body.classList.toggle("sidenav-toggled");
        localStorage.setItem(
          "sb|sidebar-toggle",
          document.body.classList.contains("sidenav-toggled")
        );
      });
    }

    // Close side navigation when width < LG
    const sidenavContent = document.body.querySelector(
      "#layoutSidenav_content"
    );
    if (sidenavContent) {
      sidenavContent.addEventListener("click", (event) => {
        const BOOTSTRAP_LG_WIDTH = 992;
        if (window.innerWidth >= 992) {
          return;
        }
        if (document.body.classList.contains("sidenav-toggled")) {
          document.body.classList.toggle("sidenav-toggled");
        }
      });
    }

    let activatedPath = window.location.pathname.match(/([\w-]+\.html)/, "$1");

    if (activatedPath) {
      activatedPath = activatedPath[0];
    } else {
      activatedPath = "index.html";
    }

    const targetAnchors = document.body.querySelectorAll(
      '[href="' + activatedPath + '"].nav-link'
    );

    targetAnchors.forEach((targetAnchor) => {
      let parentNode = targetAnchor.parentNode;
      while (parentNode !== null && parentNode !== document.documentElement) {
        if (parentNode.classList.contains("collapse")) {
          parentNode.classList.add("show");
          const parentNavLink = document.body.querySelector(
            '[data-bs-target="#' + parentNode.id + '"]'
          );
          parentNavLink.classList.remove("collapsed");
          parentNavLink.classList.add("active");
        }
        parentNode = parentNode.parentNode;
      }
      targetAnchor.classList.add("active");
    });
  }, []);

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path={URLS.DASHBOARD} element={<RequireAuth><DashBoard /></RequireAuth>}  />
          <Route exact={true} path={URLS.RESETPASSWORD(":token")} element={<ResetPassword />} />
          <Route path={URLS.SECURITY} element={<RequireAuth><Security /></RequireAuth>} />
          <Route path={URLS.PROFILE} element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path='/' element={<Home />} exact={true}/>
          <Route path={URLS.HOME} element={<Home />} exact={true}/>
          <Route path={URLS.SIGNIN} element={<SignIn />} />
          <Route path={URLS.FORGETPASSWORD} element={<ForgetPassword />} />
          <Route path={URLS.SIGNUP} element={<SignUp />} />
          <Route path={URLS.PLANS} element={<RequireAuth><Plans /></RequireAuth>} />
        </Routes>
      </Layout>
      <Toaster />
    </div>
  );
}

const AppMain = () => {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
};

export default AppMain;
