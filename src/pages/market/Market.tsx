import BaseLayout from "../../layouts/Base";
import coin from "../../assets/images/money.png";
import { useQuery } from "@apollo/client";
import { IMarketProduct } from "../../types/Market";
import { GET_MARKET_PRODUCT } from "../../api/queries";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import modalSlice from "../../redux/slices/modal-slice";
import cartSlice from "../../redux/slices/cart-slice";
import CartButton from "./Component/CartButton";
import { useCallback } from "react";
import { CartItem } from "../../types/Cart";
import alertSlice from "../../redux/slices/alert-slice";
import CoupenDetails from "./Component/CoupenDetails";

const Market = () => {
  const { data } = useQuery<IMarketProduct>(GET_MARKET_PRODUCT, {
    variables: {
      status: "published",
    },
  });

  const dispatch = useDispatch();

  const onAdd = useCallback((item: CartItem) => {
    dispatch(cartSlice.actions.addItem(item));
  }, []);

  return (
    <BaseLayout title="Market" actionButtons={[<CartButton key="cart" />]}>
      <div className="px-2">
        <div className="md:mb-8 mb-2 text-center flex  pt-3 flex-row">
          <h4 className="text-gray-500 text-lg flex justify-center items-center flex-grow flex-1">
            <span className="text-sm">
              <img src={coin} className="h-8 w-8 mr-2" alt="coin" />
            </span>
            75
          </h4>
        </div>

        <div className="flex w-full flex-wrap">
          {data?.market_product.flatMap((market, index) => (
            <motion.div
              key={index}
              className="md:w-1/3 w-1/2 p-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 30,
              }}
            >
              <div className="bg-white shadow-lg rounded-md relative overflow-hidden">
                <div className="inline-flex items-center justify-center w-32 py-2 absolute top-3 text-base -right-9 bg-pink-600 font-bold transform rotate-45 text-gray-200 bg-opacity-80">
                  <img src={coin} alt="price" className="h-4 w-4 mr-1" />
                  {market.price_coins}
                </div>
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
                  <div id="header-text" className="leading-5 w-full relative">
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
                    className=" market-btn"
                    style={{ fontSize: "10px" }}
                    onClick={() => {
                      dispatch(
                        modalSlice.actions.showModal({
                          body: <CoupenDetails desc={market.description} />,
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
                    className="market-btn"
                    style={{ fontSize: "10px" }}
                    onClick={() => {
                      onAdd(new CartItem(market));
                      dispatch(
                        alertSlice.actions.showAlert({
                          body: "Add to cart",
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
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Add to Cart
                  </button>

                  {/* <button
                      className="border border-gray-400 md:px-4 md:py-2 p-1 rounded flex market-btn"
                      style={{ fontSize: "10px" }}
                      onClick={() =>
                        dispatch(cartSlice.actions.removeItem(index))
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Remove
                    </button> */}
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
