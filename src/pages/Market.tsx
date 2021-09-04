import BaseLayout from "../layouts/Base";
import shield from "../assets/images/shield.png";
import star from "../assets/images/star.png";
import tag from "../assets/images/tag.png";
import crown from "../assets/images/crown.png";
import medal2 from "../assets/images/medal2.png";
import medal3 from "../assets/images/medal3.png";
import medal from "../assets/images/medal.png";
import trophy from "../assets/images/trophy.png";
import DEFAULT_AVATAR from "../assets/images/profileuser.png";
import { useEffect } from "react";
import { USERS_PROFILE, USER_PROFILE_ADD } from "../api/queries";
import { useLazyQuery, useMutation } from "@apollo/client";
import { IUsersProfile } from "../types/Chat";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import coin from "../assets/images/money.png";
// import graph from "../assets/images/graph.jpg";

const Market = () => {
  const user = useSelector((state: RootState) => state.user.entities?.user);
  const [getData, { data }] = useLazyQuery<IUsersProfile>(USERS_PROFILE, {
    onCompleted: (res) => {
      if (!res) {
        addProfile({
          variables: {
            id: user?.id,
            name: user?.email,
            imageUrl: "",
          },
        }).then(() => {
          getData({ variables: { id: user?.id } });
        });
      }
    },
    fetchPolicy: "network-only",
  });
  const [addProfile] = useMutation(USER_PROFILE_ADD);

  useEffect(() => {
    getData({ variables: { id: user?.id } });
  }, []);
  
  return (
    <BaseLayout title="Market Place">
      <div className="mb-8 text-center pt-10">
        <img
          className="inline object-cover w-20 h-20  rounded-full"
          src={data?.users_profile_by_pk?.image_url
            ? data?.users_profile_by_pk.image_url
            : DEFAULT_AVATAR}
          alt="Profile image"
        />
        <h1 className="text-black font-medium text-2xl leading-8 mt-4">
        {data?.users_profile_by_pk?.name}
        </h1>
        <h4 className="text-gray-500 text-sm md:mt-2 flex justify-center items-center">
           <span><img src={coin} className="h-7 w-7 mr-2" alt="coin"/></span> 23456 </h4>  
     
      </div>

      <div className="flex justify-between md:w-1/2 mx-auto">
        <div className="p-2">
          <div className="leaderboard-img bg-green-900">
            <img src={shield} className=""></img>
          </div>
        </div>
        <div className="p-2">
          <div className="leaderboard-img bg-pink-900">
            <img src={medal} className=""></img>
          </div>
        </div>
        <div className="p-2">
          <div className="leaderboard-img bg-purple-900">
            <img src={crown} className=""></img>
          </div>
        </div>
        <div className="p-2">
          <div className="bg-green-500 leaderboard-img">
            <img src={trophy} className=""></img>
          </div>
        </div>
      </div>
      <div className="flex justify-between mx-auto md:w-1/2">
        <div className="p-2">
          <div className="leaderboard-img bg-pink-500 md:p-9">
            <img src={medal3} className=""></img>
          </div>
        </div>
        <div className="p-2">
          <div className="bg-purple-500 leaderboard-img">
            <img src={medal2} className=""></img>
          </div>
        </div>
        <div className="p-2">
          <div className="bg-yellow-900 leaderboard-img">
            <img src={star} className=""></img>
          </div>
        </div>
        <div className="p-2">
          <div className="bg-blue-500 leaderboard-img">
            <img src={tag} className=""></img>
          </div>
        </div>
      </div>
      {/* <div className="mt-4 md:w-1/3 mx-auto">
            <img src={graph}></img>
        </div> */}
    </BaseLayout>
  );
};
export default Market;
