import BaseLayout from "../layouts/Base";
import coin from "../assets/images/money.png";
import { useQuery } from "@apollo/client";
import { IMarketProduct } from "../types/Market";
import { GET_MARKET_PRODUCT } from "../api/queries";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import modalSlice from "../redux/slices/modal-slice";
import CoupenDetails from "../components/CoupenDetails";

const Market = () => {
  const { data } = useQuery<IMarketProduct>(GET_MARKET_PRODUCT, {
    variables: {
      status: "published",
    },
  });

  const dispatch = useDispatch();

  return (
    <BaseLayout title="Market">
      <div className="px-2">
        <div className="mb-8 text-center flex  pt-3 flex-row">
          <h4 className="text-gray-500 text-lg flex justify-center items-center flex-grow flex-1">
            <span className="text-sm">
              <img src={coin} className="h-8 w-8 mr-2" alt="coin" />
            </span>
            23456
          </h4>
          <div className="pr-1 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <div className="absolute common-btn text-black rounded-full w-3.5 h-3.5 flex justify-center items-center -right-0 p-1  -top-1 text-xs">
              1
            </div>
          </div>
        </div>

        <div className="flex w-full flex-wrap">
          {data?.market_product.flatMap((market, index) => (
            <motion.div
              className="md:w-1/3 w-1/2 p-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 100,
              }}
            >
              <div key={index} className="bg-white shadow-lg rounded-md">
                <div className="p-8 ">
                  <div className="flex items-center h-9">
                    <img
                      className=" text-center w-24 object-cover mx-auto "
                      src={market.images}
                      alt="cover"
                    />
                  </div>
                </div>

                <div className=" pb-1 text-center ">
                  <div
                    id="header-text"
                    className="leading-5 w-full relative  sm"
                  >
                    <h4
                      id="name"
                      className="text-lg pb-3  font-semibold capitalize"
                    >
                      {market.name}
                    </h4>
                  </div>

                  {/* <div className="text-xs capitalize">{market.description}</div> */}
                </div>

                <div className="border-t-2 flex flex-row px-2 py-2 justify-between items-center">
                  <button
                    className="border border-gray-400 p-1 md:px-4 md:py-2 flex rounded market-btn"
                    style={{ fontSize: "10px" }}
                    onClick={() => {
                      dispatch(
                        modalSlice.actions.showModal({
                          body: <CoupenDetails
                          desc={market.description}/>,
                        })
                      );
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 md:mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    Detail
                  </button>
                  <button
                    className="border border-gray-400 md:px-4 md:py-2 p-1 rounded flex market-btn"
                    style={{ fontSize: "10px" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 md:mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </BaseLayout>
  );
};
export default Market;
