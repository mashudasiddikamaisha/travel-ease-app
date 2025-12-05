import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import { IoMdEye } from 'react-icons/io';
import { LuEyeClosed } from 'react-icons/lu';
import toast from 'react-hot-toast';
import { AuthContext } from '../Provider/AuthProvider';

const Register = () => {
    const { createUser, setUser, updateUser, googleSignIn } = use(AuthContext);
    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        if (name.length < 5) {
            setNameError("Name should be more than 5 characters");
            return;
        } else {
            setNameError("");
        }
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError("Password must have at least 6 characters, including uppercase and lowercase letters.");
            return;
        } else {
            setPasswordError("");
        }

        createUser(email, password)
            .then((result) => {
                const user = result.user;
                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        setUser({ ...user, displayName: name, photoURL: photo });
                        toast.success("Registered successfully!");
                        navigate("/");
                    }).catch(() => {
                        setUser(user);
                    });
            }).catch((error) => {
                toast.error(error.message);
            });
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                setUser(result.user);
                toast.success("Logged in With Google");
                navigate("/");
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-gradient-to-b from-[#788475] to-[#a0ac9e] px-4'>
            <div className='w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 sm:p-10 transition-colors'>
                <h2 className='text-center text-3xl sm:text-4xl font-bold text-[#788475] mb-6'>Create Your Account</h2>
                <form onSubmit={handleRegister} className='space-y-5'>
                    <div className='flex flex-col'>
                        <label className='mb-2 font-medium'>Name</label>
                        <input name='name' type='text' placeholder='Your Name' required className='input input-bordered w-full focus:ring-[#788475]' />
                        {nameError && <p className='text-xs text-red-500'>{nameError}</p>}
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-2 font-medium'>Email</label>
                        <input name='email' type='email' placeholder='Enter your Email' required className='input input-bordered w-full focus:ring-[#788475]' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-2 font-medium'>Photo URL</label>
                        <input name='photo' type='text' placeholder='Photo URL' className='input input-bordered w-full focus:ring-[#788475]' />
                    </div>
                    <div className='flex flex-col relative'>
                        <label className='mb-2 font-medium'>Password</label>
                        <input name='password' type='password' placeholder='Enter your Password' required className='input input-bordered w-full pr-10 focus:ring-[#788475]' />
                        
                        {passwordError && <p className='text-xs text-red-500 mt-1'>{passwordError}</p>}
                    </div>
                    <button type='submit' className='btn w-full bg-[#788475] border-none hover:bg-[#657064] text-white mt-2'>Register</button>

                    <div className='flex items-center my-4'>
                        <div className='flex-grow border-t border-gray-300'></div>
                        <span className='px-3 text-gray-500 text-sm font-medium'>OR</span>
                        <div className='flex-grow border-t border-gray-300'></div>
                    </div>

                    <button type='button' onClick={handleGoogleSignIn} className='btn btn-outline w-full flex items-center justify-center gap-2 text-[#788475] border-[#788475] hover:bg-[#788475] hover:text-white transition'>
                        <FcGoogle size={24} /> Continue with Google
                    </button>

                    <p className='text-center text-sm pt-5'>Already have an account? <Link to='/login' className='text-blue-400 underline'>Login</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Register;
