import React, { useContext, useState } from 'react';
import PrimaryNavbar from '../components/nav/PrimaryNavbar';
import google from '../assets/googleBlack.png';
import { authDataContext } from '../store/AuthContext';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { Ring2 } from 'ldrs/react';
import 'ldrs/react/Ring2.css';

const Register = () => {

  // USE STATES
  const [showPassword, setShowPassword] = useState(false);
  const [authType, setAuthType] = useState(false);
  const [loading, setLoading] = useState(false);

  // Registration states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // CONTEXT DATA
  const {
    handleLogin, handleSignup,
    googleSignup, googleLogin
  } = useContext(authDataContext);

  // TOAST
  // const handleToast = () => {
  //   toast.success(`${!authType ? "Logged In" : "Registered"}`, {
  //     position: "top-right",
  //     autoClose: 3000,
  //   })
  // }

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (authType) {
      const result = await handleSignup(firstName, lastName, email, phone, dob, gender, password);
      if (result?.data?.success) {
        navigate('/');
        // handleToast();
      }
    } else {
      const result = await handleLogin(email, password);
      if (result?.data?.success) {
        navigate('/');
        // handleToast();
      }
    }
  }

  return (
    <div className='w-full min-h-screen bg-(--bg-color) authContainer relative'>
      <PrimaryNavbar />

      <div
        className="
          registerContainer
          w-full
          flex items-center justify-center
          min-h-[calc(100vh-5rem)]
          px-5
          ">
          {/* FORM */}
          <div
            className='
              border-3 border-rose-800
              bg-black/90
              rounded-xl md:rounded-2xl
              p-6 sm:p-8 md:p-10 lg:p-8 xl:p-10
              w-[40rem]
              
              flex flex-col justify-around
            '>
            <h1 
              className='
                font-medium
                text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl
                text-(--text-secondary) leading-tight
              '>
              {!authType ? <p>Log in to <span className='text-rose-600'>exclusive</span></p> : <p>Create an<span className='text-rose-600'> Account</span></p>}
            </h1>
            <p className='text-sm sm:text-base lg:text-sm xl:text-lg text-(--text-secondary) mt-1 sm:mt-2 underline underline-offset-4'>
              Enter your details below...
            </p>

            <form onSubmit={handleSubmit} className='flex flex-col gap-3 sm:gap-4 lg:gap-3 xl:gap-4 mt-6 sm:mt-8 lg:mt-6 xl:mt-8'>

              {/* SIGNUP INPUTS */}
              {authType && (
                <>
                  <div className='flex flex-col sm:flex-row gap-3 sm:gap-6'>
                    <input
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                      type="text"
                      placeholder='First Name'
                      required
                      className='p-3 sm:p-3.5 lg:p-3 xl:p-3.5 outline-none text-sm sm:text-base lg:text-sm xl:text-base rounded-lg text-white bg-zinc-700 w-full sm:w-1/2 focus:ring-2 focus:ring-rose-600 transition-all'
                    />
                    <input
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                      type="text"
                      placeholder='Last Name'
                      required
                      className='p-3 sm:p-3.5 lg:p-3 xl:p-3.5 outline-none text-sm sm:text-base lg:text-sm xl:text-base rounded-lg text-white bg-zinc-700 w-full sm:w-1/2 focus:ring-2 focus:ring-rose-600 transition-all'
                    />
                  </div>

                  <input
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    type="tel"
                    placeholder='Phone Number'
                    required
                    className='p-3 sm:p-3.5 lg:p-3 xl:p-3.5 outline-none text-sm sm:text-base lg:text-sm xl:text-base rounded-lg text-white bg-zinc-700 focus:ring-2 focus:ring-rose-600 transition-all'
                  />

                  <div className='sm:flex items-center justify-between gap-4'>
                    <input
                    onChange={(e) => setDob(e.target.value)}
                    value={dob}
                    type="date"
                    required
                    className='w-full mb-3 sm:mb-0 p-3 sm:p-3.5 lg:p-3 xl:p-3.5 outline-none text-sm sm:text-base lg:text-sm xl:text-base rounded-lg text-white bg-zinc-700 focus:ring-2 focus:ring-rose-600 transition-all'
                  />

                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    className='w-full p-3 sm:p-3.5 lg:p-3 xl:p-3.5 outline-none text-sm sm:text-base lg:text-sm xl:text-base rounded-lg text-white bg-zinc-700 cursor-pointer focus:ring-2 focus:ring-rose-600 transition-all'
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  </div>
                </>
              )}

              {/* COMMON FIELDS */}
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                value={email}
                placeholder='Email'
                required
                className='p-3 sm:p-3.5 lg:p-3 xl:p-3.5 outline-none text-sm sm:text-base lg:text-sm xl:text-base rounded-lg text-white bg-zinc-700 focus:ring-2 focus:ring-rose-600 transition-all'
              />

              <div className='relative'>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type={!showPassword ? "password" : "text"}
                  name="password"
                  value={password}
                  placeholder='Password'
                  required
                  className='p-3 sm:p-3.5 lg:p-3 xl:p-3.5 pr-16 outline-none text-sm sm:text-base lg:text-sm xl:text-base text-white rounded-lg bg-zinc-700 w-full focus:ring-2 focus:ring-rose-600 transition-all'
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 cursor-pointer text-(--text-secondary) text-xs sm:text-sm hover:text-(--color-primary) transition-colors select-none'
                >
                  {!showPassword ? "show" : "hide"}
                </span>
              </div>

              <button
              type="submit"
              disabled={loading}
              className={`
                w-full h-11 sm:h-12 bg-black
                text-(--text-secondary) mt-2
                rounded-lg font-medium tracking-wide
                text-sm sm:text-base
                transition-all duration-200
                hover:text-(--color-primary) hover:bg-white
                hover:font-semibold
                active:scale-[0.98]
                ${loading ? 'opacity-70 cursor-not-allowed' : ''}
              `}
            >
              {
                loading
                  ? <div className="flex justify-center items-center">
                      <Ring2 size={20} stroke={3} speed={2} color="red" />
                    </div>
                  : (!authType ? "Log in" : "Sign up")
              }
            </button>

              {/* Google Button */}
            <button
              onClick={async () => {
                setLoading(true);
                try {
                  if (!authType) {
                    await googleLogin();
                    navigate('/');
                  } else {
                    await googleSignup();
                    navigate('/');
                  }
                } catch (error) {
                  console.error(error);
                } finally {
                  setLoading(false);
                }
              }}
              type="button"
              className='
                w-full h-11 sm:h-12
                flex items-center justify-center
                gap-2
                bg-zinc-300 hover:bg-zinc-200
                rounded-lg cursor-pointer
                text-sm sm:text-base
                transition-all duration-200
                active:scale-[0.98]
              '
            >
              <img src={google} alt="Google" className='w-5 h-5 sm:w-6 sm:h-6' />
              <p className='font-medium'>
                {!authType ? "Log in with Google" : "Sign up with Google"}
              </p>
            </button>
            </form>

            <p className='text-center mt-6 sm:mt-8 lg:mt-6 xl:mt-8 text-(--text-secondary) text-sm sm:text-base lg:text-sm xl:text-base'>
              {!authType ? "Don't have an account?" : "Already have an account?"}{" "}
              <span
                onClick={() => setAuthType(!authType)}
                className='cursor-pointer text-(--color-primary) tracking-wider font-semibold hover:underline'>
                {!authType ? "Sign up" : "Log in"}
              </span>
            </p>
          </div>
      </div>
    </div>
  )
}

export default Register;