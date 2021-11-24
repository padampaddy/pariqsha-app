import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { useContext } from "react";
import useFetch from "use-http";
import { GET_COINS } from "../api/queries";
import money from "../assets/images/money.png";
import { RP_KEY_ID_TEST } from "../Constants";
import UserContext from "../contexts/userContext";
import BaseLayout from "../layouts/Base";
import { ICoin, ICoins } from "../types/Market";
import { espTransform } from "../Utils/utils";

declare let Razorpay: any;

const Coins = () => {
  const {coinsBalance} = useContext(UserContext);
  const { data } = useQuery<ICoins>(GET_COINS, {
    variables: {
      status: "published",
    },
  });

  const { post: createCoinOrder } = useFetch(`coins_orders`, {
    cache: "no-cache",
  });
  
  const handleSend = async (earn: ICoin) => {
    const data = await createCoinOrder({
      planId: earn.id,
    });
    const options = {
      key: RP_KEY_ID_TEST,
      amount: data.amount * 100,
      currency: "INR",
      name: "Pariqsha",
      description: "Test Transaction",
      image: "https://pariqsha.com/static/media/pariqsha.8035258e.png",
      order_id: data.id,
      handler: function (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) {
        console.log(response);
        Promise.all([]);
      },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
  };

  return (
    <BaseLayout title="Buy Coins">
      <div className="px-4 flex flex-col h-full">
        <div className="header pt-8 text-center">
          <p className="text-gray-500 font-medium text-xs">
            You have{" "}
            {espTransform(coinsBalance, {
              showSymbol: false,
              precision: 0,
            }).format()}{" "}
            Coins
          </p>
        </div>

        <div className="mt-6 h-full">
          <div className="flex flex-wrap">
            {data?.users_coin_plans.flatMap((earn) => (
              <div
                key={earn.id}
                className="md:p-4 p-2 w-1/2 md:w-1/3 text-center "
              >
                <motion.div
                  className=" relative overflow-hidden bg-white md:p-4 p-2 shadow-lg rounded"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 30,
                  }}
                >
                  {earn.most_popular && (
                    <div className="inline-flex items-center justify-center md:w-36 w-32 py-2 absolute md:top-5 top-4 md:text-sm text-xs  -right-9 bg-pink-600 font-bold transform rotate-45 text-gray-200 bg-opacity-80">
                      Most Popular
                    </div>
                  )}
                  <div className="justify-center items-center">
                    <img
                      className="inline object-cover md:w-20 md:h-20 w-14 h-14 mb-2"
                      src={earn.images ? earn.images : money}
                      alt="image"
                    />
                  </div>
                  <div className="font-bold">+ {earn.coins}</div>
                  <button
                    onClick={() => handleSend(earn)}
                    className="common-btn md:p-2 p-1 md:px-8 px-2 mt-1 rounded text-sm md:text-base"
                  >
                    {espTransform(earn.price).format()}
                  </button>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Coins;
