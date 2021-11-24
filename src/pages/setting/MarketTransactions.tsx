import BaseLayout from "../../layouts/Base";
import { espTransform } from "../../Utils/utils";
import coin from "../../assets/images/money.png";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useQuery } from "@apollo/client";
import { IMarketTransactions } from "../../types/Market";
import { GET_MARKET_TRANSACTIONS } from "../../api/queries";
import moment from "moment";
import Loader from "../../components/Loader/Loader";

const MarketTransactions = () => {
  const user = useSelector((state: RootState) => state.user.entities?.user);
  const { data, loading } = useQuery<IMarketTransactions>(
    GET_MARKET_TRANSACTIONS,
    {
      variables: {
        id: user?.id,
      },
    }
  );

  return (
    <BaseLayout title="Market Transactions History" showBack>
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
              {data?.market_transactions.flatMap((item, index) => (
                <div key={index}>
                  <div className="flex mt-4 items-center">
                    <div className="flex-grow md:ml-5 ml-3 mr-1">
                      <p className=" md:text-lg text-md capitalize font-medium">
                        {item.order.details.parse}
                      </p>
                      <span className="text-gray-500 text-xs capitalize">
                        {moment(item.created_at).format("Do MMM YYYY")}
                      </span>
                    </div>
                    <div className="flex-grow-0 flex  md:text-base text-sm font-semibold">
                      <img src={coin} alt="price" className="h-5 w-5 mr-1" />
                      {espTransform(item.order.cost_coins, {
                        showSymbol: false,
                        precision: 0,
                      }).format()}
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

export default MarketTransactions;
