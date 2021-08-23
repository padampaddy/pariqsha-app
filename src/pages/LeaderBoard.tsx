import BaseLayout from "../layouts/Base";
import shield from "../assets/images/shield.png";
import star from "../assets/images/star.png";
import tag from "../assets/images/tag.png";
import crown from "../assets/images/crown.png";
import medal2 from "../assets/images/medal2.png";
import medal3 from "../assets/images/medal3.png";
import medal from "../assets/images/medal.png";
import trophy from "../assets/images/trophy.png";
// import graph from "../assets/images/graph.jpg";

const LeaderBoard = () => {
  return (
    <BaseLayout title="Leaderboard"> 
      <div className="mb-8 text-center pt-10">
        <img
          className="inline object-cover w-20 h-20 mr-2 rounded-full"
          src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt="Profile image"
        />
        <h1 className="text-black font-medium text-2xl leading-8 mt-4">
          Hanna Fields
        </h1>
        <p className="text-gray-400 font-medium text-md pt-1">2,9848 coins</p>
      </div>
    
        <div className="flex justify-between md:w-1/2 mx-auto">
          <div className="p-2">
            <div className="leaderboard-img bg-green-900">
              <img src={shield} className="animate-pulse	"></img>
            </div>
          </div>
          <div className="p-2">
            <div className="leaderboard-img bg-pink-900">
              <img src={medal}></img>
            </div>
          </div>
          <div className="p-2">
            <div className="leaderboard-img bg-purple-900">
              <img src={crown} ></img>
            </div>
          </div>
          <div className="p-2">
            <div className="bg-green-500 leaderboard-img">
              <img src={trophy}></img>
            </div>
          </div>
        </div>
        <div className="flex justify-between mx-auto md:w-1/2">
          <div className="p-2">
            <div className="leaderboard-img bg-pink-500 md:p-9">
              <img src={medal3}></img>
            </div>
          </div>
          <div className="p-2">
            <div className="bg-purple-500 leaderboard-img">
              <img src={medal2}></img>
            </div>
          </div>
          <div className="p-2">
            <div className="bg-yellow-900 leaderboard-img">
              <img src={star}></img>
            </div>
          </div>
          <div className="p-2">
            <div className="bg-blue-500 leaderboard-img">
              <img src={tag}></img>
            </div>
          </div>
        </div>
        {/* <div className="mt-4 md:w-1/3 mx-auto">
            <img src={graph}></img>
        </div> */}
   
    

    </BaseLayout>
  );
};
export default LeaderBoard;
