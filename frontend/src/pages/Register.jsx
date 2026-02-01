import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineErrorOutline } from "react-icons/md";
import { Ring2 } from 'ldrs/react';
import 'ldrs/react/Ring2.css';

import PrimaryNavbar from '../components/nav/PrimaryNavbar';
import Footer from '../components/Footer/Footer';
import GridMotion from '../reactBits/GridMotion/GridMotion';

import { authDataContext } from '../store/AuthContext';

const Register = () => {

  // UI STATES
  const [showPassword, setShowPassword] = useState(false);
  const [authType, setAuthType] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // FORM STATES
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { handleLogin, handleSignup } = useContext(authDataContext);

  // SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (authType) {
        const result = await handleSignup(
          firstName,
          lastName,
          email,
          phone,
          dob,
          gender,
          password
        );

        if (result?.data?.success) {
          navigate('/');
        } else {
          setError(
            result?.message?.response?.data?.message ||
            "Sign up failed. Please try again"
          );
        }
      } else {
        const result = await handleLogin(email, password);

        if (result?.data?.success) {
          navigate('/');
        } else {
          setError(
            result?.message?.response?.data?.message ||
            "Login failed. Please try again"
          );
        }
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-(--bg-color) relative">
      <PrimaryNavbar />

      <div className="relative w-full min-h-[calc(100vh-5rem)] flex items-center justify-center px-6 sm:px-9">

        {/* GRID BACKGROUND */}
        <div className="hidden md:block absolute inset-0">
          <GridMotion />
        </div>

        {/* FORM CARD */}
        <div className="
          z-20
          border-4 border-black
          backdrop-blur-xl
          rounded-xl md:rounded-2xl
          p-4 sm:p-6 md:p-8
          w-full max-w-md md:max-w-lg lg:max-w-xl
          flex flex-col gap-4
        ">

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-(--text-secondary)">
            {!authType ? (
              <>Log in to <span className="text-rose-600 font-semibold">exclusive</span></>
            ) : (
              <>Create an <span className="text-rose-600 font-semibold">Account</span></>
            )}
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* SIGN UP ONLY */}
            {authType && (
              <>
                <div className="flex flex-col sm:flex-row gap-4">
                  <InputCard
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <InputCard
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <InputCard
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  disabled={loading}
                />

                <div className="flex flex-col sm:flex-row gap-4">
                  <InputCard
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                    disabled={loading}
                  />

                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    disabled={loading}
                    className="
                      p-3 sm:p-3.5
                      rounded-lg
                      bg-zinc-700
                      text-white
                      outline-none
                      focus:ring-2 focus:ring-rose-600
                      disabled:opacity-50
                    "
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
            <InputCard
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />

            <InputCard
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="pr-16"
            >
              <span
                onClick={() => !loading && setShowPassword(!showPassword)}
                className={`
                  absolute right-4 top-1/2 -translate-y-1/2
                  text-xs sm:text-sm
                  cursor-pointer
                  text-(--text-secondary)
                  hover:text-(--color-primary)
                  ${loading ? "opacity-50 pointer-events-none" : ""}
                `}
              >
                {showPassword ? "hide" : "show"}
              </span>
            </InputCard>

            {/* ERROR */}
            {error && (
              <div className="
                flex items-center justify-center gap-2
                bg-red-500 text-white
                p-3 rounded-lg
                text-sm
              ">
                <MdOutlineErrorOutline />
                {error}
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                bg-black text-white
                rounded-lg p-3
                hover:bg-white hover:text-black
                transition-all
                disabled:opacity-70
              "
            >
              {loading ? <Ring2 size={20} stroke={3} speed={2} color="red" /> :
                authType ? "Sign up" : "Log in"}
            </button>
          </form>

          <p className="text-center text-sm text-(--text-secondary)">
            {!authType ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              onClick={() => !loading && setAuthType(!authType)}
              className="text-(--color-primary) font-semibold cursor-pointer hover:underline"
            >
              {!authType ? "Sign up" : "Log in"}
            </span>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;

const InputCard = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  className = "",
  children,
}) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`
          p-3 sm:p-3.5
          outline-none
          text-sm sm:text-base
          rounded-lg
          text-white
          bg-zinc-700
          w-full
          focus:ring-2 focus:ring-rose-600
          transition-all
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
      />
      {children}
    </div>
  );
};

