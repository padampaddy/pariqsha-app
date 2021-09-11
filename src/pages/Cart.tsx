import BaseLayout from "../layouts/Base";
import coin from "../assets/images/money.png";
// import price from "../assets/images/dollar.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import cartSlice from "../redux/slices/cart-slice";

const Cart = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <BaseLayout title="Cart" showBack>
      <div className="bg-white shadow-lg md:m-7 mx-5 my-6">
        <div className=" py-4 md:px-5 px-3.5">
          {items.length === 0 ? (
            <div className="text-center text-lg font-medium capitalize">
              Cart Is Empty
            </div>
          ) : (
            <>
              <p className=" md:text-base text-sm text-gray-600 capitalize text-right ">
                Price
              </p>

              <hr className="mt-1" />
              {items.flatMap((item, index) => (
                <>
                  <div key={index} className="flex mt-4">
                    <div className="flex-grow-0 flex justify-center items-center md:w-28 w-16 ">
                      <img
                        src={item.getCoverImage()}
                        alt="logo"
                        className=" p-2"
                      />
                    </div>
                    <div className="flex-grow md:ml-5 ml-3 mr-1">
                      <p className=" text-xl capitalize font-medium">
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
                      {item.getPrice()}
                    </div>
                  </div>
                  <hr className="mt-4" />
                </>
              ))}
              <div className="mt-3 flex  justify-between">
                <div className="">
                  <button
                    className=" md:text-lg text-base md:py-1.5 md:px-3 py-1 px-2 rounded flex items-center text-white"
                    style={{ backgroundColor: "#00d5df" }}
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
                <div className="flex items-center md:text-lg text-base md:font-semibold font-medium">
                  Subtotal:
                  <img src={coin} alt="price" className="h-5 w-5 mr-1" />
                  {items.reduce((pV, item) => pV + item.getPrice(), 0)}
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