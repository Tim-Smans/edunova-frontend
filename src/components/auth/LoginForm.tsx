import React, { useState, type FC } from 'react';
import { login as loginApi } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';

const LoginForm: FC = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const result = await loginApi({ email, password });
            login(result.token);
        } catch (err: any) {
            if (err.response?.data) {
                setError(err.response.data);
            } else {
                setError('Unexpected error occurred.');
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2 className=''>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required/>
            <br />
            <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required/>
            <br />
            <Button type="submit">Log in</Button>
        </form>
    );
}

export default LoginForm