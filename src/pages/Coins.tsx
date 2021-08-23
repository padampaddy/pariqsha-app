import BaseLayout from "../layouts/Base";
import tv from '../assets/images/tv-monitor.png';
import chat from '../assets/images/chat.png';
import fb from '../assets/images/facebook.png';
import star from '../assets/images/favourite.png';
import like from '../assets/images/like.png';
import coin from '../assets/images/money.png';

const Coins = () => {
    return (
        <BaseLayout title="Earn Coins">
            <div className="px-4">
                <div className="header pt-8 text-center">
                    <h4 className="text-black text-xl font-bold">Earn Coins
                        <p className="text-gray-400 font-medium text-xs">You have 2.589 Coins</p>
                    </h4>
                </div>

            </div>
            <div className="pt-2  mt-3 h-screen ">
                <div className="flex  w-full">
                    <div className="flex justify-center items-center m-2 w-1/2  hover:bg-gray-100  border border-gray-300 p-6 rounded-2xl bg-white">
                        <a href="" className="text-center">
                            <img src={tv} className="w-16 h-16 object-cover m-auto"></img>
                            <h4 className="text-black text-sm font-bold mt-4 capitalize">Watch add</h4>
                            <p className="text-gray-400 text-xs">+50 coins</p>
                        </a>
                    </div>
                    <div className="flex justify-center items-center m-2  hover:bg-gray-50  w-1/2 border border-gray-300 p-6 rounded-2xl bg-white">
                        <a href="" className="text-center">
                            <img src={chat} className="w-16 h-16 object-cover m-auto"></img>
                            <h4 className="text-black text-sm font-bold mt-4 capitalize">Invite Friends</h4>
                            <p className="text-gray-400 text-xs">+1000 coins</p>
                        </a>
                    </div>
                </div>
                <div className="flex  w-full">
                    <div className="flex justify-center items-center m-2  hover:bg-gray-100  w-1/2 border border-gray-300 p-6 rounded-2xl bg-white">
                        <a href="" className="text-center">
                            <img src={fb} className="w-16 h-16 object-cover m-auto"></img>
                            <h4 className="text-black text-sm font-bold mt-4 capitalize">Connect Fb</h4>
                            <p className="text-gray-400 text-xs">+50 coins</p>
                        </a>
                    </div>
                    <div className="flex justify-center items-center m-2  hover:bg-gray-100  w-1/2 border border-gray-300 p-6 rounded-2xl bg-white">
                        <a href="" className="text-center">
                            <img src={star} className="w-16 h-16 object-cover m-auto"></img>
                            <h4 className="text-black text-sm font-bold mt-4 capitalize">Rate us</h4>
                            <p className="text-gray-400 text-xs">+1000 coins</p>
                        </a>
                    </div>
                </div>
                <div className="flex  w-full">
                    <div className="flex justify-center items-center m-2  hover:bg-gray-100  w-1/2 border border-gray-300 p-6 rounded-2xl bg-white">
                        <a href="" className="text-center">
                            <img src={like} className="w-16 h-16 object-cover m-auto "></img>
                            <h4 className="text-black text-sm font-bold mt-4 capitalize">Like us on Fb</h4>
                            <p className="text-gray-400 text-xs">+50 coins</p>
                        </a>
                    </div>
                    <div className="flex justify-center items-center m-2  hover:bg-gray-100  w-1/2 border border-gray-300 p-6 rounded-2xl bg-white">
                        <a href="" className="text-center">
                            <img src={coin} className="w-16 h-16 object-cover m-auto"></img>
                            <h4 className="text-black text-sm font-bold mt-4 capitalize">Buy coins</h4>
                            <p className="text-gray-400 text-xs">+1000 coins</p>
                        </a>
                    </div>
                </div>

            </div>

        </BaseLayout>
    )
}

export default Coins
