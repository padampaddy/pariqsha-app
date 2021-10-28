import BaseLayout from "../layouts/Base";
import money from "../assets/images/money.png";
import { motion } from "framer-motion";
import { espTransform } from "../Utils/utils";
import { useMutation, useQuery } from "@apollo/client";
import { ICoins, ICoinsOrder } from "../types/Market";
import { GET_COINS, SEND_COINS_ORDER } from "../api/queries";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Coins = () => {
  const user = useSelector((state: RootState) => state.user.entities?.user);
  const { data } = useQuery<ICoins>(GET_COINS, {
    variables: {
      status: "published",
    },
  });
  const [createOrder] = useMutation<ICoinsOrder>(SEND_COINS_ORDER);
  const handleSend = () => {
    createOrder({
      variables: {
        userId: user?.id,
        costCoin: 0
      },
    })
      .then((info) => {
        console.error(info)
      })
      .catch((e) => console.error(e));
  };
  
  return (
    <BaseLayout title="Earn Coins">
      <div className="px-4 flex flex-col h-full">
        <div className="header pt-8 text-center">
          <p className="text-gray-500 font-medium text-xs">You have 75 Coins</p>
        </div>

        <div className="mt-6 h-full">
          <div className="flex flex-wrap">
            {data?.users_coin_plans.flatMap((earn, index) => (
              <div
                key={index}
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
                      alt="Profile image"
                    />
                  </div>
                  <div className="font-bold">+ {earn.coins}</div>
                  <button onClick={handleSend} className="common-btn md:p-2 p-1 md:px-8 px-2 mt-1 rounded text-sm md:text-base">
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
