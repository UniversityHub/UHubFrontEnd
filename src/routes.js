import Base from './Base';
import LandingPage from './components/landing/LandingPage';
import LoginForm from './components/login/LoginForm';
import SignUp from './components/login/SignUp';
import ForgotPassword from './components/login/ForgotPassword';
import MainPage from './components/main/MainPage';
import SettingsPage from './components/Settings/SettingsPage';
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
        path: '/forgot-password',
        exact: true,
        component: ForgotPassword,
        name: "LoginForm"
      },
      {
        path: '/main',
        exact: true,
        component: MainPage,
        name: "MainPage"
      },
      {
        path: '/settings',
        exact: true,
        component: SettingsPage,
        name: "SettingsPage"
      },
    ]
  },
]
