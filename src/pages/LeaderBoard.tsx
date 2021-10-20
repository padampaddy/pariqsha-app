import BaseLayout from "../layouts/Base";
import dp from "../assets/images/dp.jpeg";

const items = [
  { img: dp, name: "Jane Gilsob", score: "45", rank: "1" },
  { img: dp, name: "Jane Gilsob", score: "45", rank: "1" },
  { img: dp, name: "Jane Gilsob", score: "45", rank: "1" },
  { img: dp, name: "Jane Gilsob", score: "45", rank: "1" },
  { img: dp, name: "Jane Gilsob", score: "45", rank: "1" },
  { img: dp, name: "Jane Gilsob", score: "45", rank: "1" },
  { img: dp, name: "Jane Gilsob", score: "45", rank: "1" },
];

const LeaderBoard = () => {
  return (
    <BaseLayout title="Leaderborad" showBack>
      <div className="header"></div>
      <div
        className={
          "header bg-blue-400 sticky text-center top-0 w-full common-btn pt-20 pb-10 "
        }
        style={{ borderRadius: "0% 0% 50% 50% / 10% 10% 30% 30% " }}
      >
        <div className="relative w-20 h-20 m-auto">
          <img
            className="inline object-cover w-20 h-20 mr-2 rounded-full border-4  border-white"
            src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Profile image"
          />
          <div
            className="absolute right-0 w-6 bottom-0 text-sm h-6   text-black rounded-full flex justify-center items-center"
            style={{ backgroundColor: "#FDB93C" }}
          >
            1
          </div>
        </div>
        <h4 className="text-white font-bold text-xl pt-4 leading-none">
          Celeb Johns
        </h4>
        <span className="text-white text-sm">Points:20,805,389</span>
      </div>
      <span className="absolute left-4 top-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="currentColor"
          style={{ color: "#fff" }}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </span>
      <div className="mt-2">
        <ul>
          {items.flatMap((item) => (
            <li>
              <div className="p-2 w-1/3 text-center mt-2 float-left">
                <div className="relative w-20 h-20 m-auto">
                  <img
                    className="rounded-full object-cover w-20 h-20 m-auto"
                    src={item.img}
                    alt="Profile image"
                  />
                  <div className="absolute right-0 w-6 bottom-0 text-sm h-6 font-bold bg-black  text-white rounded-full flex justify-center items-center">
                    {item.rank}
                  </div>
                </div>
                <h3 className="font-bold  text-black leading-none mt-2">
                  {item.name}
                </h3>
                <span className="text-gray-400 text-xs font-medium">
                  {item.score}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </BaseLayout>
  );
};

export default LeaderBoard;
