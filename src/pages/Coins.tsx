import BaseLayout from "../layouts/Base";
import money from "../assets/images/money.png";
import { motion } from "framer-motion";

const earns = [
  { coin: "10", rs: "50" },
  { coin: "50", rs: "100" },
  { coin: "100", rs: "150" },
  { coin: "200", rs: "200" },
  { coin: "300", rs: "500" },
  { coin: "500", rs: "1,000" },
];

const Coins = () => {
  return (
    <BaseLayout title="Earn Coins">
      <div className="px-4 flex flex-col h-full">
        <div className="header pt-8 text-center">
          <p className="text-gray-500 font-medium text-xs">
            You have 2.589 Coins
          </p>
        </div>

        <div className="mt-6 h-full">
          <div className="flex flex-wrap">
            {earns.flatMap((earn, index) => (
              <div className="md:p-4 p-2 w-1/3 text-center">
                <motion.div
                  key={index}
                  className="  bg-white md:p-4 p-2 shadow-lg rounded"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 30,
                  }}
                >
                  <div className="justify-center items-center">
                    <img
                      className="inline object-cover md:w-20 md:h-20 w-14 h-14 mb-2"
                      src={money}
                      alt="Profile image"
                    />
                  </div>
                  <div className=" text-center font-bold">{earn.coin}</div>
                  <button className="common-btn md:p-2 p-1 md:px-8 px-6 mt-1 rounded">
                    ₹ {earn.rs}
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
