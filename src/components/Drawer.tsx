import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import userSlice from "../redux/slices/user-slice";

interface Props {
    onClose: () => void;
}

const Drawer = ({ onClose }: Props) => {
    const dispatch = useDispatch();
    return (
        <div className="z-50 h-full flex flex-row">
            <div className="flex flex-col bg-white w-screen overflow-hidden">
                <div className="flex items-center justify-start text-4xl py-2 px-4">
                    <button
                        onClick={() => {
                            onClose();
                        }}
                        className="focus:outline-none lg:hidden absolute  top-3 left-5" style={{ color: '#01D5DD' }}
                    >
                        &times;
                    </button>
                </div>

                <div className="mb-8 mx-auto text-center pt-16 ">
                    <img
                        className="inline object-cover w-20 h-20 mr-2 rounded-full"
                        src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                        alt="Profile image"
                    />
                    <h1 className="text-black font-medium text-2xl leading-8 mt-4">
                        Hanna Fields
                    </h1>
                    <p className="text-gray-400 font-medium text-md pt-1">2,9848 coins</p>
                </div>

                <ul className="flex flex-col  justify-center text-center">

                    <li className="py-4 flex justify-center  hover:bg-gray-100">
                        <Link to="/home" onClick={() => onClose()}
                            className="font-medium text-black text-xl transform hover:translate-x-2 transition-transform ease-in duration-200 hover:text-gray-800">
                            Quizzes
                        </Link>
                    </li>

                    <li className="py-4 flex justify-center  hover:bg-gray-100 ">
                        <Link to="/chats" onClick={() => onClose()}
                            className="font-medium text-black text-xl transform hover:translate-x-2 transition-transform ease-in duration-200 hover:text-gray-800">
                            My Chats
                        </Link>
                    </li>

                    <li className="py-4 flex justify-center  hover:bg-gray-100">
                        <Link to="/leader" onClick={() => onClose()}
                            className="font-medium text-black text-xl transform hover:translate-x-2 transition-transform ease-in duration-200 hover:text-gray-800">
                            Leaderboard
                        </Link>
                    </li>

                    <li className="py-4  flex justify-center hover:bg-gray-100 ">
                        <Link to="/notification" onClick={() => onClose()}
                            className="font-medium text-black text-xl ml-10 transform hover:translate-x-2 transition-transform ease-in duration-200 hover:text-gray-800">
                            Notifications
                        </Link>
                        <span className="rounded-full h-6 w-6 flex items-center justify-center ml-3 text-white font-bold common-btn">
                            4
                        </span>
                    </li>

                    <li className="py-4 flex justify-center hover:bg-gray-100">
                        <Link to="/coins" onClick={() => onClose()}
                            className="font-medium text-black text-xl transform hover:translate-x-2 transition-transform ease-in duration-200 hover:text-gray-800">
                            Earn Coins
                        </Link>
                    </li>
                </ul>

                <div className="flex flex-row w-full absolute  bottom-0 bg-white z-10">
                    <Link to="/setting" className="text-gray-400 font-medium text-md w-1/2 py-4 border-t border-b flex justify-center items-center">
                        <span className="mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                            </svg>
                        </span>
                        Setting
                    </Link>
                    <Link to="/login"
                        onClick={() => {
                            dispatch(userSlice.actions.logout());
                            onClose();
                        }}
                        className="text-gray-400 font-medium text-md w-1/2 py-4 border-b border-t border-l flex justify-center items-center">
                        <span className="mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
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
