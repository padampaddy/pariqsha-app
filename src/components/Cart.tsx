import BaseLayout from "../layouts/Base";
import imgs from "../assets/images/Amazon.webp";
import { espTransform, } from "../utils";
// import { useMemo, useState } from "react";

const items = [
  {
    img: imgs,
    name: "amazon",
    price: "140",
    desc: "amazon coupan details",
  },
  {
    img: imgs,
    name: "flipkart",
    price: "150",
    desc: "flipkart coupan details",
  },
  {
    img: imgs,
    name: "lenskart",
    price: "160",
    desc: "lenskart coupan details",
  },
];

const Cart = () => {

    // const [addedItems, setAddedItems] = useState([]);

    // const itemsCost = useMemo(
    //     () =>
    //       addedItems
    //         .map((item) => convertToNum(item.cost))
    //         .reduce(reducer, 0),
    //     [addedItems]
    //   );
    
  return (
    <BaseLayout title="Cart" showBack>
      <div className="bg-white shadow-lg md:m-7 mx-5 my-6">
        <div className=" py-4 md:px-5 px-3.5">
            {/* {cartItems.length ===  && <div>Cart Is Empty</div>} */}
          <p className="md:text-3xl text-2xl font-semibold capitalize">
            Cart
            <span className=" md:text-base text-sm text-gray-600 capitalize mt-6 float-right">
              Price
            </span>
          </p>
          <hr className="mt-4" />
          {items.flatMap((item, index) => (
            <>
              <div key={index} className="flex mt-4">
                <div className="flex-grow-0 md:w-32 w-24">
                  <img src={item.img} alt="logo" className="py-2" />
                </div>
                <div className="flex-grow md:ml-6 ml-3.5 mr-1">
                  <p className="md:text-2xl text-xl capitalize font-medium">
                    {item.name}
                  </p>
                  <span className="md:text-base text-xs capitalize">{item.desc}</span>
                  <div className="mt-2 flex">
                    <button className="border border-gray-400 text-xs md:p-1.5 p-1 rounded flex items-center market-btn">
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
                <div className="flex-grow-0 md:text-lg text-sm font-semibold">
                {espTransform(145).format()}
                
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
            <div className="">
              <p className="md:text-lg text-base">
                Subtotal : <span className=" font-semibold">{espTransform(435).format()}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Cart;
