import React, { useContext } from 'react';
import { authDataContext } from '../../store/AuthContext';
import { FaHeadphones } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { BiLogIn } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

const ProfilePopUp = ({ navigate, popupRef }) => {

  const { loggedinUserData, setLoggedinUserData, handleLogout } = useContext(authDataContext);


  // console.log(loggedinUserData);

  const profileLinks = [
    { name: "Profile", icon: <CgProfile className='text-2xl'/>, path: "/profile" },
    { name: "Contact", icon: <FaHeadphones className='text-2xl'/>, path: "/contact" },
    { name: "Orders", icon: <MdCurrencyRupee className='text-2xl'/>, path: "/myorder" },
  ]

  return (

    <div
      ref={popupRef}
      className='
        absolute right-0 top-17 xl:top-20 z-50 
        w-[12rem] 2xl:w-[14rem]
        flex flex-col gap-[0.6rem] xl:gap-[0.8rem]
        p-[0.7rem] xl:p-[0.9rem]
        border-2 border-zinc-700 rounded-lg
        backdrop-blur-2xl 
        shadow-xl
      '>

      {
        profileLinks.map((item, index) => {
          return (
            <div
              onClick={() => {
                if (loggedinUserData) {
                  navigate(item.path)
                } else {
                  navigate('/auth')
                }
              }}
              key={index}
              className='
                  text-[0.95rem] xl:text-[1rem] 2xl:text-[1.1rem] text-white font-medium 
                   hover:bg-zinc-500 hover:text-black
                   bg-zinc-900
                  border border-zinc-700
                  p-[0.4rem_0.8rem] xl:p-[0.5rem_1rem]
                  rounded-[0.4rem] xl:rounded-[0.5rem]
                  cursor-pointer transition-colors duration-200
                  active:scale-95
            '>
              <p className='flex items-center justify-between'>{item.name} {item.icon}</p>
            </div>
          )
        })
      }

      <div
        onClick={() => {
          if (loggedinUserData) {
            handleLogout()
            setLoggedinUserData(null);
            navigate('/')
          } else {
            navigate('/auth')
          }
        }}
        className='
            text-[0.95rem] xl:text-[1rem] 2xl:text-[1.1rem] text-white font-medium 
            bg-zinc-900 hover:bg-zinc-500 hover:text-black
            p-[0.4rem_0.8rem] xl:p-[0.5rem_1rem]
            rounded-[0.4rem] xl:rounded-[0.5rem]
            cursor-pointer transition-colors duration-200
            active:scale-95

        '>
        {
          loggedinUserData
            ? <p className='flex items-center justify-between'>Logout <TbLogout className='text-2xl'/></p>
            : <p className='flex items-center justify-between'>Login <BiLogIn className='text-2xl'/></p>
        }
      </div>
    </div>
  );
}

export default ProfilePopUp