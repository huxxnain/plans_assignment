import React from "react";
import { useSelector } from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import URLS from "../../Paths/URLS";

const Footer = () => {
  const currentUser = useSelector((state) => state.auth.user);
  // const navigate = useNavigate();

  // const handleContactUs = () => {
  //   navigate(URLS.CONTACTUS);
  // }
  return (
    <footer className={`footer-admin ${!currentUser ? 'unsigned' : ''}`}>
      <div className="container-xl px-4 py-3">
        <div className="row foot-customStyle">
          {/*<div className="col-lg-8 col-sm-6">Copyright &copy; Your Website 2022</div>*/}
          <div className="col-lg-4 col-sm-6">
            {/*<a href="#!">Privacy Policy</a>*/}
            {/*&middot;*/}
            {/*<a href="#!">Terms &amp; Conditions</a>*/}
          </div>

          {/*<div className="col-lg-2 col-sm-2 small">*/}
          {/*  <Link to="/ContactUs" onClick={handleContactUs}>*/}
          {/*    Contact us*/}
          {/*  </Link>*/}
          {/*</div>*/}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
