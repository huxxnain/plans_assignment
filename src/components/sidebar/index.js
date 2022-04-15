import React, { useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const Sidebar = () => {

  const currentUser = useSelector(state => state.auth.user);

  useEffect(() => {
    const feather = require("feather-icons");
    feather.replace();
  }, []);





  return (
    <div className="sidebar-menu ">
      <div id="layoutSidenav_nav">
        <nav className="sidenav shadow-right sidenav-light">
          <div className="sidenav-menu">
            <div className="nav accordion" id="accordionSidenav">
              <div className="sidenav-menu-heading">Welcome</div>

              <Link className="nav-link" to="/dashboard">
                <div className="nav-link-icon">
                  <i data-feather="bar-chart"></i>
                </div>
                DashBoard
              </Link>

              <Link className="nav-link" to="/plans">
                <div className="nav-link-icon">
                  <i data-feather="filter"></i>
                </div>
                Plans
              </Link>
             
            </div>
          </div>

          <div className="sidenav-footer">
            <div className="sidenav-footer-content">
              <div className="sidenav-footer-subtitle">Logged in as:</div>
              <div className="sidenav-footer-title">{currentUser?.name}</div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
