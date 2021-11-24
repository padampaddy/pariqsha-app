import BaseLayout from "../../layouts/Base";
import { espTransform } from "../../Utils/utils";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useQuery } from "@apollo/client";
import { ICoinsOrder } from "../../types/Market";
import { GET_COINS_TRANSACTIONS } from "../../api/queries";
import moment from "moment";
import Loader from "../../components/Loader/Loader";

const RupeesTransactions = () => {
  const user = useSelector((state: RootState) => state.user.entities?.user);
  const { data, loading } = useQuery<ICoinsOrder>(GET_COINS_TRANSACTIONS, {
    variables: {
      id: user?.id,
    },
  });
  return (
    <BaseLayout title="My Transactions History" showBack>
      <div className="bg-white shadow-lg md:m-7 mx-5 my-6">
        <div className=" py-4 md:px-5 px-3.5">
          {loading ? (
            <Loader />
          ) : (
            <>
              <p className=" md:text-base text-sm font-medium capitalize text-right ">
                Price
              </p>
              <hr className="mt-1" />
              {data?.users_coin_orders.flatMap((item, index) => (
                <div key={index}>
                  <div className="flex mt-4 items-center">
                    <div className="flex-grow md:ml-5 ml-3 mr-1">
                      <p className=" md:text-lg text-md font-medium">
                        Plan of {item.no_of_coins} coins
                      </p>
                      <span className="text-gray-500 text-xs capitalize">
                        {moment(item.created_at).format("Do MMM YYYY")}
                      </span>
                    </div>
                    <div className="flex-grow-0 flex  md:text-base text-sm font-semibold">
                      {espTransform(item.cost_coins, {}).format()}
                    </div>
                  </div>
                  <hr className="mt-4" />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </BaseLayout>
  );
};

export default RupeesTransactions;
