import BaseLayout from "../layouts/Base";
import dp from "../assets/images/dp.jpeg";

const items = [
  { img: dp, name: "Jane Gilsob", score: "45",  },
  { img: dp, name: "Jane Gilsob", score: "45",  },
  { img: dp, name: "Jane Gilsob ", score: "45",  },
  { img: dp, name: "Jane Gilsob", score: "45",  },
  { img: dp, name: "Jane Gilsob", score: "45", },
  { img: dp, name: "Jane Gilsob", score: "45",  },
  { img: dp, name: "Jane ", score: "45",  },
  { img: dp, name: "Jane Gilsob", score: "45",  },
  { img: dp, name: "Jane ", score: "45", },
];

const LeaderB = () => {
  return (
    <BaseLayout title="Leaderborad" showBack>
      <div className="md:mx-20 mx-3 border-4 border-blue-500 rounded-lg md:my-20 my-16">
        <div className="uppercase tracking-wide w-40 p-3 common-btn mx-auto text-white  text-center font-bold rounded-lg -mt-6">
          leaderboard
        </div>
        <div className="md:m-6 my-3 mx-2 md:p-3">
          <div className="flex uppercase md:font-bold mb-3 font-semibold text-sm md:text-base md:p-2 p-0.5 text-center">
            <div className=" flex-grow-0 md:px-3">Rank</div>
            <div className=" flex-grow-0 md:px-3 ml-1 px-2">Profile</div>
            <div className=" flex-grow md:pr-3 pr-2"> Name</div>
            <div className=" flex-grow-0 md:px-3 px-2">Score</div>
          </div>
          <div className="overflow-y-auto h-96 md:h-full ">
          {items.flatMap((item,idx) => (
            <div className="flex bg-white items-center md:text-base py-1 font-medium text-sm uppercase mt-2 border-2 border-blue-500 rounded-lg md:p-2.5 md:font-bold text-center">
              <div className=" flex-grow-0 ml-2 md:px-6 px-2">{idx+1}</div>
              <img
                className="flex-grow-0 ml-8 rounded-full object-cover  w-10 h-10 m-auto"
                src={item.img}
                alt="Profile image"
              />
              <div className="flex-grow px-6 ">{item.name}</div>
              <div className=" flex-grow-0 px-6">{item.score}</div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default LeaderB;
