import React, {useEffect, useState} from "react";
import Sidebar from "../../components/sidebar";
import axios from "../../api/requestInterceptor";
import API_URLS from "../../api/apiUrls";
import dayjs from "dayjs";
import { useDispatch} from 'react-redux'
import * as LocalStorage from "../../utils/localStorage.util";

import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate} from "react-router-dom";
import URLS from "../../Paths/URLS";
import * as Survey from "survey-react";
import "survey-react/modern.css";
import {useSelector} from "react-redux";
import toast from "react-hot-toast";
import { setUser } from "../../store/auth/authSlice";

Survey.StylesManager.applyTheme("modern");

dayjs.extend(relativeTime);

const Plans = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.auth.user);

    const plans = [
        {
            id: 1,
            type: 'Regular Plan',
            price: '39',
            duration: 'weekly',
            detail: 'The Master license allows you to customize, store and even host your website using your platform'
   },
   {
       id: 2,
     type: 'Master Plan',
     price: '49',
     duration: 'Monthly',
     detail: 'The Master license allows you to customize, store and even host your website using your platform'
 },
 {
     id: 3,
     type: 'Premium Plan',
     price: '69',
     duration: 'yearly',
     detail: 'The Master license allows you to customize, store and even host your website using your platform'
 },
 
 ];
 
 const plansHandle = async (values)=> {
     currentUser ? navigate(URLS.PLANS) : navigate(URLS.SIGNIN);
 console.log("values" , values);
 const id = values.id;
 const _id = currentUser._id;
 const {data} = await axios.patch(`https://planappsyedahsan.herokuapp.com/api/v1/users/${_id}/updatePlan/${id}`);
 console.log("data" , data)
 LocalStorage.setUserData(data.data.user);
 dispatch(setUser(data.data.user));
 if (currentUser._id == id){
 toast.success("You have successfully ADD Subscription")
 }
 
 }


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
                        <div className="pricing8 ">
                  <div className="container">
                      <div className="row justify-content-center">
                          <div className="col-md-8 text-center">
                              <h3 className="mb-3">Pricing to make your Work Effective</h3>
                              <h6 className="subtitle font-weight-normal">We offer 100% satisafaction and Money back
                                  Guarantee</h6>
                          </div>
                      </div>

                      <div className="row mt-4">
{
    plans.map((item , index)=>{
        // console.log("item",item)
        return (<>
        
        <div className="col-md-4 ml-auto pricing-box align-self-center">
                              <div className={ currentUser && currentUser.plan_id  == item.id  ? 'cardSelect card mb-4' :  "card mb-4"}>
                                 {currentUser.plan_id }
                                 {item.id}
                                  <div className="card-body p-4 text-center">
                                      <h5 className="font-weight-normal">{item.type}</h5>
                                      <sup>$</sup><span className="text-dark display-5">{item.price}</span>
                                      <h6 className="font-weight-light font-14">{item.duration}</h6>
                                      <p className="mt-4">{item.detail}</p>
                                  </div>
                                  <button type="submit"  className={currentUser && currentUser.plan_id == item.id ? 'btn btn-danger-gradiant p-3 btn-block border-0 text-white': "btn btn-info-gradiant p-3 btn-block border-0 text-white"} onClick={()=>plansHandle(item)}  > {currentUser && currentUser.plan_id  == item.id ? 'Selected Plan' : 'Choose Plan'  } </button>
                              </div>
                          </div>
        </>);
    })
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

export default Plans;
