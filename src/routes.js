import Base from './Base';
import LandingPage from './components/landing/LandingPage';
import LoginForm from './components/login/LoginForm';
import SignUp from './components/login/SignUp';
import MainPage from './components/main/MainPage';

export default [
  {
    component: Base,
    routes: [
      {
        path: '/',
        exact: true,
        component: LandingPage,
        name: "LandingPage"
      },
      {
        path: '/login',
        exact: true,
        component: LoginForm,
        name: "LoginForm"
      },
      {
        path: '/signup',
        exact: true,
        component: SignUp,
        name: "LoginForm"
      },
      {
        path: '/main',
        exact: true,
        component: MainPage,
        name: "MainPage"
      },
    ]
  },
]
