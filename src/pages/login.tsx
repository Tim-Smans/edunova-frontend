import { type FC } from 'react';
import LoginForm from '../components/auth/LoginForm';
import LoginLayout from '@/layouts/loginLayout';
import { ThemeSwitch } from '@/components/theme-switch';

const LoginPage: FC = () => {
  return (
    <div>
      <LoginLayout>
        <ThemeSwitch/>
        <LoginForm />
      </LoginLayout>
    </div>
  );
};

export default LoginPage;