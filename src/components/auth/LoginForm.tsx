import React, { useEffect, useState, type FC } from 'react';
import { login as loginApi } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { getDomain } from '@/utils/domainUtils';
import Tenant from '@/models/tenant';
import { getTenantByName } from '@/api/tenant';

const LoginForm: FC = () => {
    const { login } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [tenant, setTenant] = useState<Tenant | undefined>(undefined)
    const [notFound, setNotFound] = useState<boolean>(false)

    useEffect(() => {
        const controller = new AbortController()

        const fetchTenant = async () => {
            try {
                const tenant = await getTenantByName(getDomain()!)

                setTenant(tenant);
            } catch (err) {
                if (err instanceof DOMException && err.name === "AbortError") return;
                setError((err as Error).message);
                setNotFound(true)
            } finally {
            }
        };

        fetchTenant();
        return () => {
            controller.abort();
        };
    }, []);

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

    if (getDomain() == null) {
        return (
            <h2>Please go to <span className='underline text-red-400'>&lt;organisation&gt;.edunova.com</span></h2>
        )
    }

    if(notFound == true){
        return(
            <h2>Domain '{getDomain()}' not found, visit <span className='underline text-red-400'>&lt;organisation&gt;.edunova.com</span></h2>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2 className=''>Login to {tenant?.name} using your {tenant?.emailDomain} domain</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <br />
            <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            <br />
            <Button type="submit">Log in</Button>
        </form>
    );
}

export default LoginForm