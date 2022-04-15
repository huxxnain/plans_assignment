const apiBaseURL = 'http://localhost:8000/api/v1';
const API_URLS = {
  USER: {
    LOGIN: `${apiBaseURL}/users/login`,
    Signup: `${apiBaseURL}/users/signup`,
    ForgetPass: `${apiBaseURL}/users/forgotPassword`,
    GOOGLESIGNIN: `${apiBaseURL}/users/sign-in/google`,
    RESETPASSWORD: (token) => `${apiBaseURL}/users/resetPassword/${token}`,
    PERSONA_VERIFY: `${apiBaseURL}/users/verify`,
    CHANGEPASSWORD: `${apiBaseURL}/users/updateMyPassword`,
    CHANGEGOOGLEPASSWORD: `${apiBaseURL}/users/updateGooglePassword`,
    UPDATEME: `${apiBaseURL}/users/updateMe`,
    CONTACT_US: `${apiBaseURL}/contactus`,
  },
  SURVEY: {
    CREATE: `${apiBaseURL}/surveys`,
    LIST: `${apiBaseURL}/surveys`,
    LISTBYUSER: (userId) => `${apiBaseURL}/surveys/user/${userId}`,
    GETBYID: (surveyId) => `${apiBaseURL}/surveys/${surveyId}`,
    DELETE: (surveyId) => `${apiBaseURL}/surveys/${surveyId}`,
    UPDATE: (surveyId) => `${apiBaseURL}/surveys/${surveyId}`,
    SUBMIT: (surveyId) => `${apiBaseURL}/surveys/survey/${surveyId}`,
    GETSURVEYDATA: (userId) => `${apiBaseURL}/users/user/${userId}/stats`,
  }
};

export default API_URLS;
