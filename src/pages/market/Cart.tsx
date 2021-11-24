import BaseLayout from "../../layouts/Base";
import coin from "../../assets/images/money.png";
// import price from "../assets/images/dollar.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import cartSlice from "../../redux/slices/cart-slice";
import { useMutation } from "@apollo/client";
import { IMarketOrder, IMarketTransactions } from "../../types/Market";
import { MARKET_TRANSACTIONS, SEND_MARKET_ORDER } from "../../api/queries";
import alertSlice from "../../redux/slices/alert-slice";
import { useHistory } from "react-router-dom";
import { espTransform } from "../../Utils/utils";
import { useContext } from "react";
import UserContext from "../../contexts/userContext";

const Cart = () => {
  const history = useHistory();
  const user = useSelector((state: RootState) => state.user.entities?.user);
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const { coinsBalance } = useContext(UserContext);

  const [sendOrder] = useMutation<IMarketOrder>(SEND_MARKET_ORDER);
  const [sendTransaction] =
    useMutation<IMarketTransactions>(MARKET_TRANSACTIONS);

  const handleSend = () => {
    sendOrder({
      variables: {
        userId: user?.id,
        details: items,
        costCoin: items.reduce((pV, item) => pV + item.getPrice(), 0),
      },
    })
      .then((res) => {
        sendTransaction({
          variables: {
            userId: user?.id,
            orderId: res.data?.insert_market_orders_one.id,
            startAmount: coinsBalance,
            endAmount: Math.abs(
              coinsBalance - res.data!.insert_market_orders_one.cost_coins
            ),
            // endAmount: Math.abs(parseInt(coinsBalance)-parseInt(res.data!.market_orders.cost_coins.toString()))
          },
        })
          .then((info) => {
            console.log(info);
          })
          .catch((e) => console.error(e));
          dispatch(cartSlice.actions.clearItem());
          dispatch(
          alertSlice.actions.showAlert({
            body: "Order Placed",
          })
        );
      })
      .catch((e) => console.error(e));
  };

  return (
    <BaseLayout title="Cart" showBack>
      <div className="bg-white shadow-lg md:m-7 mx-5 my-6">
        <div className=" py-4 md:px-5 px-3.5">
          {items.length === 0 ? (
            <>
              <div className="text-lg font-medium capitalize flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
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
                Cart Is Empty
              </div>
              <button
                className="common-btn rounded px-3.5 py-1.5 m-auto mt-4 flex items-center justify-center"
                onClick={() => history.push("/market")}
              >
                Add Card
              </button>
            </>
          ) : (
            <>
              <p className=" md:text-base text-sm font-medium capitalize text-right ">
                Price
              </p>

              <hr className="mt-1" />
              {items.flatMap((item, index) => (
                <>
                  <div key={index} className="flex mt-4 items-center">
                    <div className="flex-grow-0 flex justify-center items-center md:w-28 w-16 ">
                      <img
                        src={item.getCoverImage()}
                        alt="logo"
                        className=" p-2"
                      />
                    </div>
                    <div className="flex-grow md:ml-5 ml-3 mr-1">
                      <p className=" md:text-lg text-md capitalize font-medium">
                        {item.getName()}
                      </p>
                      <span className="text-gray-500 text-xs capitalize">
                        {item.getShortDescription()}
                      </span>
                      <div className="mt-2 flex">
                        <button
                          className="border border-gray-400 text-xs md:p-1.5 p-1 rounded flex items-center market-btn"
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
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="flex-grow-0 flex  md:text-base text-sm font-semibold">
                      <img src={coin} alt="price" className="h-5 w-5 mr-1" />
                      {espTransform(item.getPrice(), {
                        showSymbol: false,
                        precision: 0,
                      }).format()}
                    </div>
                  </div>
                  <hr className="mt-4" />
                </>
              ))}
              <div className="mt-3 flex  justify-between">
                <div className="">
                  <button
                    onClick={handleSend}
                    className=" md:text-lg text-base md:py-1.5 md:px-3 py-1 px-2 rounded flex items-center text-white common-btn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="md:h-5 md:w-5 h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    Buy
                  </button>
                </div>
                <div className="flex items-center md:text-xl text-lg md:font-semibold font-medium">
                  <span className="mr-4">Subtotal:</span>
                  <img src={coin} alt="price" className="h-5 w-5 mr-1" />
                  {espTransform(
                    items.reduce((pV, item) => pV + item.getPrice(), 0),
                    {
                      showSymbol: false,
                      precision: 0,
                    }
                  ).format()}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </BaseLayout>
  );
};

export default Cart;
