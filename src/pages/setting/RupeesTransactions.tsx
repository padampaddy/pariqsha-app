import BaseLayout from "../../layouts/Base";
import dp from "../../assets/images/dp.jpeg";
import { espTransform } from "../../Utils/utils";
// import coin from "../../assets/images/money.png";

const items = [
  { img: dp, name: "Pariqsha test1", price: 45, date: "27 Oct, 2021" },
  { img: dp, name: "Pariqsha test2", price: 45, date: "27 Oct, 2021" },
  { img: dp, name: "Pariqsha test3", price: 45, date: "27 Oct, 2021" },
  { img: dp, name: "Pariqsha test4", price: 45, date: "27 Oct, 2021" },
  { img: dp, name: "Pariqsha test5", price: 45, date: "27 Oct, 2021" },
  { img: dp, name: "Pariqsha test6", price: 45, date: "27 Oct, 2021" },
  { img: dp, name: "Pariqsha test7", price: 45, date: "27 Oct, 2021" },
  { img: dp, name: "Pariqsha test8", price: 45, date: "27 Oct, 2021" },
];

const RupeesTransactions = () => {
  return (
    <BaseLayout title="My Transactions History" showBack>
      <div className="bg-white shadow-lg md:m-7 mx-5 my-6">
        <div className=" py-4 md:px-5 px-3.5">
          <p className=" md:text-base text-sm font-medium capitalize text-right ">
            Amount
          </p>
          <hr className="mt-1" />
          {items.flatMap((item, index) => (
            <>
            <div key={index} className="flex mt-4 items-center">
              {/* <div className="flex-grow-0 flex justify-center items-center md:w-28 w-16 ">
                      <img
                        src={dp}
                        alt="logo"
                        className=" p-2"
                      />
                    </div> */}
              <div className="flex-grow md:ml-5 ml-3 mr-1">
                <p className=" md:text-lg text-md capitalize font-medium">
                  {item.name}
                </p>
                <span className="text-gray-500 text-xs capitalize">
                  {item.date}
                </span>
              </div>
              <div className="flex-grow-0 flex  md:text-base text-sm font-semibold">
                {/* <img src={coin} alt="price" className="h-5 w-5 mr-1" /> */}
                {espTransform(item.price).format()}
              </div>
            </div>
            <hr className="mt-4" />
            </>
          ))}
          <div className="flex items-center mt-3  md:text-xl text-lg md:font-semibold font-medium justify-end">
            <span className="mr-4">Subtotal:</span>
            {/* <img src={coin} alt="price" className="h-5 w-5 mr-1" /> */}
            {espTransform(
              items.reduce((pV, item) => pV + item.price, 0)
              // {
              //   showSymbol: false,
              //   precision: 0,
              // }
            ).format()}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default RupeesTransactions;
