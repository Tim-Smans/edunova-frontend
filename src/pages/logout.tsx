import { type FC } from 'react';
import DefaultLayout from '@/layouts/default';
import { useAuth } from '@/context/AuthContext';

const LogoutPage: FC = () => {
    const {logout} = useAuth()

    logout()
    return (
        <div>
            <DefaultLayout>
                ...
            </DefaultLayout>
        </div>
    );
};

export default LogoutPage;