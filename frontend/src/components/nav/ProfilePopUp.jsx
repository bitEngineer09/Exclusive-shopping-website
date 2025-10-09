import React, { useContext } from 'react';
import { authDataContext } from '../../store/AuthContext';

const ProfilePopUp = ({ navigate, popupRef }) => {

  const { loggedinUserData, setLoggedinUserData, handleLogout } = useContext(authDataContext);


  // console.log(loggedinUserData);

  const profileLinks = [
    { name: "Profile", path: "/profile" },
    { name: "Contact", path: "/contact" },
    { name: "Orders", path: "/myorder" },
  ]

  return (

    <div
      ref={popupRef}
      className='
        absolute right-0 z-50
        w-[10rem] xl:w-[12rem] 2xl:w-[14rem]
        flex flex-col gap-[0.6rem] xl:gap-[0.8rem]
        p-[0.7rem] xl:p-[0.9rem]
        border-2 border-rose-700 rounded-xl
        bg-black/80
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
                  text-[0.95rem] xl:text-[1rem] 2xl:text-[1.1rem] text-rose-800 font-medium 
                  bg-zinc-100 hover:bg-white
                  p-[0.4rem_0.8rem] xl:p-[0.5rem_1rem]
                  rounded-[0.4rem] xl:rounded-[0.5rem]
                  cursor-pointer transition-colors duration-200
                  active:scale-95
            '>{item.name}
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
            text-[0.95rem] xl:text-[1rem] 2xl:text-[1.1rem] text-rose-800 font-medium 
            bg-zinc-100 hover:bg-white
            p-[0.4rem_0.8rem] xl:p-[0.5rem_1rem]
            rounded-[0.4rem] xl:rounded-[0.5rem]
            cursor-pointer transition-colors duration-200
            active:scale-95
        '>
        {
          loggedinUserData
            ? "Logout"
            : "Login"
        }
      </div>
    </div>
  );
}

export default ProfilePopUp