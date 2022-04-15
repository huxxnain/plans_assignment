const URLS = {
    //   AUTH: {
    //     LOGIN: "/login",
    //   },
    MAIN: "/home",
    DASHBOARD: "/dashboard",
    PLANS : "/plans",
    FORGETPASSWORD: "/forgetpassword",
    HOME: "/home",
    SIGNIN: "/signin",
    SIGNUP: "/signup",
    GOOGLESIGNIN: "/sign-in/google",
    RESETPASSWORD: (token) => `/resetPassword/${token}`,
    SECURITY: 'security',
    PROFILE: 'profile'
};

export default URLS;
