import React from 'react';
import adminLogo from '../../assets/adminLogo.png';
import { IoMailOutline } from "react-icons/io5";
import { FiLock } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useState } from 'react';
import { useContext } from 'react';
import { authDataContext } from '../../store/AuthContext';
import Nav from '../../components/nav/Nav';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const { handleAdminLogin } = useContext(authDataContext);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const result = await handleAdminLogin(email, password);
        if (result) {
            navigate('/')
        } else {
            alert("Invalid Credentials")
        }
        console.log(result);
    }


    return (
        <div className=''>
            <Nav />
            <div className='w-full h-[calc(100%-6rem)] flex items-center justify-center mt-[3rem]'>
                <div className="loginContainer w-[65rem] h-[70rem] p-[2rem] flex flex-col items-center">
                    <div className="header flex flex-col items-center justify-center">
                        <img src={adminLogo} alt="" className='w-[6rem]' />
                        <p className='text-[3rem] font-medium '>Admin Dashboard
                        </p>
                        <p className='text-[1.7rem] text-zinc-600'>Sign in to your account</p>
                    </div>

                    <div className="formContainer w-full h-full rounded-[2rem] mt-[4rem] p-[2.5rem] bg-zinc-950 text-white">
                        <h1 className='text-[2.7rem] mb-[3rem] text-center'>Welcome Back
                        </h1>
                        <div className='form w-full'>
                            <form
                                onSubmit={handleFormSubmit}
                                action="">
                                <div className="emailDiv flex flex-col relative">
                                    <label htmlFor="email" className='text-[1.6rem] font-medium mb-[0.5rem]'>Email Address</label>
                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeholder='Enter your email'
                                        required
                                        value={email}
                                        className='
                                            w-full 
                                            bg-slate-100
                                            p-[1.5rem_4.5rem]
                                            border border-zinc-300 rounded-[1rem]
                                            text-2xl
                                            placeholder:text-black placeholder:font-medium
                                '/>
                                    <IoMailOutline className='absolute top-[4.5rem] left-[1.3rem] text-[2rem] text-black' />
                                </div>

                                <div className="passwordDiv flex flex-col relative mt-[2rem]">
                                    <label htmlFor="password" className='text-[1.6rem] font-medium mb-[0.5rem]'>Password</label>
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        required
                                        value={password}
                                        placeholder='Enter your password'
                                        className='
                                             w-full 
                                            bg-slate-100
                                            p-[1.5rem_4.5rem]
                                            border border-zinc-300 rounded-[1rem]
                                            text-2xl
                                            placeholder:text-black placeholder:font-medium
                                        '/>
                                    <FiLock className='absolute top-[4.5rem] left-[1.3rem] text-[2rem] text-black' />
                                    {
                                        showPassword ?
                                            <FaEye
                                                onClick={() => setShowPassword(false)}
                                                className='absolute right-[1rem] top-[5.1rem] text-[2rem] cursor-pointer' />
                                            :
                                            <FaEyeSlash
                                                onClick={() => setShowPassword(true)}
                                                className='absolute right-[1rem] top-[5.1rem] text-[2rem] cursor-pointer' />
                                    }
                                </div>

                                <button
                                    className='
                                        w-full h-[5rem]
                                        mt-[6rem]
                                        rounded-[1rem]
                                        text-[1.6rem] text-(--text-secondary) font-medium 
                                        cursor-pointer
                                        bg-zinc-600 
                                    '>Sign in
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

    )
}

export default Login