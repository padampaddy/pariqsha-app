import { useState } from "react";
// import { useHistory } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import BaseLayout from "../layouts/Base";
import img from "../assets/images/pariqsha.png";
import { useDispatch } from "react-redux";
import modalSlice from "../redux/slices/modal-slice";
import UserResult from "../components/UserResult";

const items = [
  { name: "Pariqsha test1", status: "Check Result", img: img },
  { name: "Pariqsha test4", status: "Not Declared Yet", img: img },
  { name: "Pariqsha test2", status: "Not Declared Yet", img: img },
  { name: "Pariqsha test2", status: "Check Result", img: img },
  { name: "Pariqsha test5", status: "Check Result", img: img },
  { name: "Pariqsha test6", status: "Not Declared Yet", img: img },
  { name: "Pariqsha test7", status: "Check Result", img: img },
];

const Results = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const [searchTerm, setSearchTerm] = useState<string>("");
  return (
    <BaseLayout title="Results">
      <div className=" px-4 my-4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="mt-4">
          <div className="mt-4 flex flex-wrap">
            {items.flatMap((item) => (
              <div className="md:p-4 p-2 w-1/2 md:w-1/3 text-center ">
                <div className="bg-white md:p-4 p-2 shadow-lg rounded md:flex items-center justify-between">
                  <div className="md:flex  items-center justify-start">
                    {item.img && (
                      <img
                        className="rounded-full inline object-cover mt-1.5 md:mt-0 w-10 h-10 md:mr-1.5 mb-2 md:mb-0"
                        src={item.img}
                        alt="Profile image"
                      />
                    )}
                    <div>{item.name}</div>
                  </div>
                  {item.status === "Check Result" ? (
                    <button
                      // onClick={() => history.push("/leaderboard")}
                      onClick={() => {
                        dispatch(
                          modalSlice.actions.showModal({
                            body: (
                              <UserResult/>
                            ),
                          })
                        );
                      }}
                      className="common-btn p-2 mt-3 md:mt-0 rounded-lg text-sm"
                    >
                      {item.status}
                    </button>
                  ) : (
                    <div className="text-sm text-red-500 my-3.5 md:my-0">({item.status})</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Results;
