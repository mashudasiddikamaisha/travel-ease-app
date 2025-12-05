import React, { useState, use } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import { IoMdEye } from 'react-icons/io';
import { LuEyeClosed } from 'react-icons/lu';
import toast from 'react-hot-toast';
import { AuthContext } from '../Provider/AuthProvider';

const Login = () => {
    const { signIn, googleSignIn } = use(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const password = form.password.value;
        signIn(email, password)
            .then(() => {
                toast.success('Login Successful');
                navigate(location.state?.from || '/');
            })
            .catch(err => {
                setError(err.code || err.message);
                toast.error(err.code || err.message);
            });
    };

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(() => {
                toast.success('Logged in with Google.');
                navigate(location.state?.from || '/');
            })
            .catch(err => {
                setError(err.message);
                toast.error(err.message);
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#788475] to-[#a0ac9e] px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 sm:p-10 transition-colors">
                <h2 className="text-center text-3xl sm:text-4xl font-bold text-[#788475] dark:text-green-200 mb-6">Login</h2>
                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="flex flex-col">
                        <label className="mb-2 font-medium">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required 
                            placeholder="Enter your email"
                            className="input input-bordered w-full focus:ring-[#788475]" 
                        />
                    </div>

                    <div className="flex flex-col relative">
                        <label className="mb-2 font-medium">Password</label>
                        <input 
                            type='password' 
                            name="password" 
                            required 
                            placeholder="Enter your password"
                            className="input input-bordered w-full pr-10 focus:ring-[#788475]"
                        />

                    </div>

                    <div className="text-right text-sm">
                        <Link to='/forgot-password' state={{email}} className='link link-hover text-blue-400'>Forgot password?</Link>
                    </div>

                    {error && <p className='text-red-500 text-sm'>{error}</p>}

                    <button type='submit' className='btn w-full bg-[#788475] border-none hover:bg-[#657064] text-white mt-2'>Login</button>

                    <div className='flex items-center my-4'>
                        <div className='flex-grow border-t border-gray-300'></div>
                        <span className='px-3 text-gray-500 text-sm font-medium'>OR</span>
                        <div className='flex-grow border-t border-gray-300'></div>
                    </div>

                    <button type='button' onClick={handleGoogleLogin} className='btn btn-outline w-full flex items-center justify-center gap-2 text-[#788475] border-[#788475] hover:bg-[#788475] hover:text-white transition'>
                        <FcGoogle size={24} /> Continue with Google
                    </button>

                    <p className='text-center text-sm pt-5'>Don't have an account? <Link to='/register' className='text-blue-400 underline'>Register</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;
