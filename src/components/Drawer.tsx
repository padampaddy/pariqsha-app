import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/pariqsha.png";
import coin from "../assets/images/money.png";
import userSlice from "../redux/slices/user-slice";
import modalSlice from "../redux/slices/modal-slice";
import Profile from "./Profile";
import { RootState } from "../redux/store";
// import useAuthSubscription from "../hooks/useAuthSubscription";
import { USERS_PROFILE, USER_PROFILE_ADD } from "../api/queries";
import { IUsersProfile } from "../types/Chat";
import DEFAULT_AVATAR from "../assets/images/profileuser.png";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useCallback, useEffect } from "react";

interface Props {
  onClose: () => void;
}

const Drawer = ({ onClose }: Props) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.entities?.user);
  const [getData, { data }] = useLazyQuery<IUsersProfile>(USERS_PROFILE, {
    onCompleted: (res) => {
      if (!res) {
        addProfile({
          variables: {
            id: user?.id,
            name: user?.email,
            imageUrl: "",
          },
        }).then(() => {
          getData({ variables: { id: user?.id } });
        });
      }
    },
    fetchPolicy: "network-only",
  });
  const [addProfile] = useMutation(USER_PROFILE_ADD);

  const getUserData = useCallback(()=>{
    getData({ variables: { id: user?.id } });
  },[]);

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="z-50 h-full flex flex-row">
      <div className="flex flex-col bg-white w-screen overflow-hidden">
        <div className="flex items-center justify-start text-4xl py-2 px-4">
          <button
            onClick={() => {
              onClose();
            }}
            className="focus:outline-none lg:hidden absolute  top-5 left-5"
            style={{ color: "#01D5DD" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="pr-4 md:pl-4">
            <img src={logo} className="h-8 w-8 float-right md:float-left" alt="pariqsha logo" />
          </div>

        <div className="mb-16 mx-auto text-center h-1/5">
   
          <button
            type="button"
            onClick={() => {
              dispatch(
                modalSlice.actions.showModal({
                  body: (
                    <Profile
                      onUpdate={() => {
                        console.log("Updated");
                        getData({
                          variables: {
                            id: user?.id,
                          },
                        });
                      }}
                      oName={data?.users_profile_by_pk?.name}
                      oUrl={data?.users_profile_by_pk?.image_url}
                    />
                  ),
                })
              );
            }}
          >
            <img
              className="inline object-cover w-20 h-20  rounded-full"
              src={
                data?.users_profile_by_pk?.image_url
                  ? data?.users_profile_by_pk.image_url
                  : DEFAULT_AVATAR
              }
              alt="Profile image"
            />
            <h1 className="text-black font-medium md:text-xl text-xl leading-8 mt-4 capitalize">
              {data?.users_profile_by_pk?.name}
            </h1>
          </button>
          <h4 className="text-gray-500 text-sm md:mt-2 flex justify-center items-center">
           <span><img src={coin} className="h-7 w-7 mr-2" alt="coin"/></span> 23456 </h4>  
        </div>

        <ul className="flex flex-col  justify-center text-center mx-4 md:mx-0">  
          <li className="nav-item">
            <NavLink
              to="/home"
              onClick={() => {
                onClose();
                dispatch(modalSlice.actions.hideModal());
              }}
              className="nav-link"
              activeClassName="selected common-btn"
            >
              Quizzes
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/chats"
              onClick={() => {
                onClose();
              }}
              className="nav-link"
              activeClassName="selected common-btn"
            >
              My Chats
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/market"
              onClick={() => {
                onClose();
              }}
              className="nav-link"
              activeClassName="selected common-btn"
            >
              Market Place
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/notification"
              onClick={() => {
                onClose();
              }}
              className="nav-link pl-4 flex justify-center items-center"
              activeClassName="selected common-btn"
            >
              Notifications
              <span className="rounded-full h-5 w-5 md:h-6 md:w-6 flex items-center justify-center ml-2 mt-1 text-white font-medium common-btn text-xs">
                4
              </span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/coins"
              onClick={() => {
                onClose();
              }}
              className="nav-link"
              activeClassName="selected common-btn"
            >
              Earn Coins
            </NavLink>
          </li>
        </ul>

        <div className="flex flex-row w-full absolute  bottom-0 bg-white z-10">
          <Link
            to="/setting"
            onClick={() => {
              onClose();
            }}
            className="drawer-button"
          >
            <span className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            Settings
          </Link>
          <Link
            to="/login"
            onClick={() => {
              dispatch(userSlice.actions.logout());
              onClose();
            }}
            className="drawer-button border-l"
          >
            <span className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </span>
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
