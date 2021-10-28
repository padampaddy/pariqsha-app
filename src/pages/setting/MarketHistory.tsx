import BaseLayout from "../../layouts/Base";
import dp from "../../assets/images/dp.jpeg";

const items = [
  { img: dp, name: "Jane Gilsob", score: "45", date: "27 Oct, 2021" },
  { img: dp, name: "Jane Gilsob", score: "45", date: "27 Oct, 2021" },
  { img: dp, name: "Jane Gilsob ", score: "45", date: "27 Oct, 2021" },
  { img: dp, name: "Jane Gilsob", score: "45", date: "27 Oct, 2021" },
  { img: dp, name: "Jane Gilsob", score: "45", date: "27 Oct, 2021" },
  { img: dp, name: "Jane Gilsob", score: "45", date: "27 Oct, 2021" },
  { img: dp, name: "Jane ", score: "4555", date: "27 Oct, 2021" },
  { img: dp, name: "Jane Gilsob", score: "45", date: "27 Oct, 2021" },
  { img: dp, name: "Jane ", score: "45", date: "27 Oct, 2021" },
];

const MarketHistory = () => {
  return (
    <BaseLayout title="Market Transactions History" showBack>
      <div className="px-4 py-8">
        <div className="px-2 py-4 bg-white shadow-lg rounded-md">
          <div className="flex uppercase md:font-bold mb-3 font-semibold text-sm md:text-base md:p-2 p-0.5">
            {/* <div className=" flex-grow-0 md:px-3 ml-1 px-2">Profile</div> */}
            <div className=" w-1/2"> Name</div>
            <div className=" w-1/4 text-right">Date</div>
            <div className="w-1/4 text-right">Coins</div>
          </div>
          <hr className="border-gray-300"></hr>
          <div className="overflow-y-auto h-96 px-1 md:h-full ">
            {items.flatMap((item) => (
              <div className="flex  items-center md:text-base py-1 font-medium text-xs uppercase mt-2 md:p-2.5 md:font-bold ">
                <div className=" w-1/2">{item.name}</div>
                <div className=" w-1/4 text-right">{item.date}</div>
                {/* <img
                  className="flex-grow-0 ml-8 rounded-full object-cover  w-10 h-10 m-auto"
                  src={item.img}
                  alt="Profile image"
                /> */}
                <div className="w-1/4 text-right">{item.score}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default MarketHistory;
