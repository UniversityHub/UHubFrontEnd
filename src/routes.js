import Base from './Base';
import LoginForm from './components/login/LoginForm';

export default [
  {
    component: Base,
    routes: [
      {
        path: '/login',
        exact: true,
        component: LoginForm,
        name: "LoginForm"
      },
    ]
  },
]
