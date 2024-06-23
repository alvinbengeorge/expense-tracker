"use client";
import React, { useState } from 'react';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const { token } = await response.json();
                localStorage.setItem('expense_tracker_token', token);
                window.location.href = '/dashboard';

            } else {
                if (response.status === 404) {
                    alert('Invalid username or password');
                    setUsername('');
                    setPassword('');
                } else {
                    alert('Something went wrong');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='grid place-items-center h-screen'>
            <div className='grid place-items-center gap-4 p-8 bg-zinc-700 rounded-2xl w-'>
                <h1 className='text-4xl'>Login</h1>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='p-2 text-black rounded-2xl'
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='p-2 text-black rounded-2xl'
                />
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default LoginPage;