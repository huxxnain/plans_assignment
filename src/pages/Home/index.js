import React, { useEffect} from "react";
import { useNavigate} from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";
import URLS from "../../Paths/URLS";
import * as LocalStorage from "../../utils/localStorage.util";
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios';
import API_URLS from '../../api/apiUrls';
import { setUser } from "../../store/auth/authSlice";


const Home = () => {
    const currentUser = useSelector(state => state.auth.user);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate(URLS.MAIN);
        }
    }, [currentUser]);


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
const {data} = await axios.patch(`http://localhost:8000/api/v1/users/${_id}/updatePlan/${id}`);
console.log("data" , data)
LocalStorage.setUserData(data.data.user);
dispatch(setUser(data.data.user));
if (currentUser._id == id){
toast.success("You have successfully ADD Subscription")
}

}
console.log('currentUser',currentUser)
  return (
    <>
      <div>


          <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">

              <ol className="carousel-indicators">
                  <li data-bs-target="#myCarousel" data-bs-slide-to="0" className="active"></li>
                  <li data-bs-target="#myCarousel" data-bs-slide-to="1"></li>
                  <li data-bs-target="#myCarousel" data-bs-slide-to="2"></li>
              </ol>


              <div className="carousel-inner banner">
                  <div className="carousel-item active">
                      <img src="assets/img/bg-5.jpg" className="d-block w-100" alt="Slide 1" />
                  </div>
                  <div className="carousel-item">
                      <img src="assets/img/bg_4.jpg"  className="d-block w-100" alt="Slide 2" />
                  </div>
                  <div className="carousel-item">
                      <img src="assets/img/bg-6.jpeg" className="d-block w-100" alt="Slide 3" />
                  </div>
              </div>


              <a className="carousel-control-prev" href="#myCarousel" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon"></span>
              </a>
              <a className="carousel-control-next" href="#myCarousel" data-bs-slide="next">
                  <span className="carousel-control-next-icon"></span>
              </a>
          </div>
        <div className="page-header-ui page-header-ui-dark  center-content">
          <div className="page-header-ui-content ">


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
        return (<>
        
        <div className="col-md-4 ml-auto pricing-box align-self-center">
                              <div className={ currentUser && currentUser?.plan_id  == item.id  ? 'cardSelect card mb-4' :  "card mb-4"}>
                               
                              
                                  <div className="card-body p-4 text-center">
                                      <h5 className="font-weight-normal">{item.type}</h5>
                                      <sup>$</sup><span className="text-dark display-5">{item.price}</span>
                                      <h6 className="font-weight-light font-14">{item.duration}</h6>
                                      <p className="mt-4">{item.detail}</p>
                                  </div>
                                  <button type="submit" 
                                   className={currentUser && currentUser?.plan_id == item.id ?
                                    'btn btn-danger-gradiant p-3 btn-block border-0 text-white': "btn btn-info-gradiant p-3 btn-block border-0 text-white"} 
                                    onClick={()=>plansHandle(item)}  > {currentUser && currentUser?.plan_id  == item.id ? 'Selected Plan' : 'Choose Plan'  }
                                     </button>
                              </div>
                          </div>
        </>);
    })
                          }
             </div>
                  </div>
              </div>


                    </div>

                </div>
            </div>
        </>
    );
};

export default Home;
